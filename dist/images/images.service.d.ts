import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { CreateImageDto } from './dto/create-image.dto';
export declare class ImagesService {
    private readonly imageRepository;
    private readonly supabaseService;
    constructor(imageRepository: Repository<ImageEntity>, supabaseService: SupabaseService);
    uploadImage(file: Express.Multer.File, createImageDto: CreateImageDto): Promise<ImageEntity>;
    create(imageData: {
        filename: string;
        path: string;
        type: string;
        title?: string;
        description?: string;
        category?: string | null;
    }): Promise<ImageEntity>;
    findAll(): Promise<ImageEntity[]>;
    findOne(id: number): Promise<ImageEntity>;
    update(id: number, updateData: UpdateImageDto): Promise<ImageEntity>;
    remove(id: number): Promise<ImageEntity>;
    getAllCategories(): Promise<any[]>;
    findMultipleImagesByTypes(types: string[]): Promise<ImageEntity[]>;
    findOnePerCategory(types: string[]): Promise<ImageEntity[]>;
    findMultipleImagesByType(category: string): Promise<ImageEntity[]>;
}
