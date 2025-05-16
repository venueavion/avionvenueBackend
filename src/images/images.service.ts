// import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    private readonly supabaseService: SupabaseService,
  ) { }

  // Create or Upload a single image 
  async uploadImage(
    file: Express.Multer.File,
    createImageDto: CreateImageDto
  ) {
    try {
      const supabase = this.supabaseService.getClient();

      // Validate file exists
      if (!file) {
        throw new Error('No file uploaded');
      }

      console.log('Original filename:', file.originalname);
      console.log('File buffer length:', file.buffer.length);

      // Generate unique filename
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      console.log('Uploading to path:', filePath);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        throw new Error(uploadError.message);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log('Generated public URL:', publicUrl);

      // Create record
      const imageData = {
        filename: file.originalname,
        path: publicUrl,
        type: file.mimetype,
        title: createImageDto.title || file.originalname,
        description: createImageDto.description || '',
        category: createImageDto.category || null
      };

      console.log('Creating DB record:', imageData);
      return await this.create(imageData);

    } catch (error) {
      console.error('Service error:', error);
      throw error; // Re-throw for controller handling
    }
  }

  async create(imageData: {
    filename: string;
    path: string;
    type: string;
    title?: string;
    description?: string;
    category?: string | null;
  }) {
    const image = new ImageEntity();
    image.filename = imageData.filename;
    image.path = imageData.path;
    image.type = imageData.type;
    image.title = imageData.title || imageData.filename;
    image.description = imageData.description || '';
    image.category = imageData.category || null;

    return this.imageRepository.save(image);
  }

  // Getting all images
  async findAll() {
    return this.imageRepository.find();
  }


  // Get a single image by id 
  async findOne(id: number) {
    const image = await this.imageRepository.findOne({
      where: { id }
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  // Update an image by id 
  async update(id: number, updateData: UpdateImageDto) {
    const image = await this.findOne(id);
    Object.assign(image, updateData);
    return this.imageRepository.save(image);
  }

  // Delete image by id from Supabase storage 
  async remove(id: number) {
    const image = await this.findOne(id);

    const supabase = this.supabaseService.getClient();
    const path = image.path.replace('https://your-supabase-url.supabase.co/storage/v1/object/public/images/', '');

    const { error } = await supabase.storage
      .from('images')
      .remove([path]);

    if (error) {
      console.error('Failed to delete from storage:', error);
      throw new Error('Failed to delete image from storage');
    }

    // Then delete from database
    return this.imageRepository.remove(image);
  }

  // fetches all image categories type
  async getAllCategories() {
    const result = await this.imageRepository
      .createQueryBuilder('image')
      .select('DISTINCT(image.category)', 'category')
      .where('image.category IS NOT NULL')
      .getRawMany();

    return result.map(item => item.category);
  }

  // fetches images by multiple categories type 
  async findMultipleImagesByTypes(types: string[]) {
    return this.imageRepository.find({
      where: {
        category: In(types), // Finds records where category is in the provided list
      },
      order: { created_at: 'DESC' }, // Optional: Newest first
    });
  }

  async findOnePerCategory(types: string[]) {
    return this.imageRepository
      .createQueryBuilder('image')
      .distinctOn(['image.category']) // Ensures one per category
      .where('image.category IN (:...types)', { types })
      .orderBy('image.category', 'ASC')
      .addOrderBy('image.created_at', 'DESC') // Newest first per category
      .getMany();
  }

  // fetch images by specific or single category type
  async findMultipleImagesByType(category: string) {
    return this.imageRepository.find({
      where: { category },
      order: { created_at: 'DESC' } // Optional: newest first
    });
  }

}