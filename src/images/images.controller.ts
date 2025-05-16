import { Controller, Post, Get, Param, Delete, Body, UploadedFile, UseInterceptors, Patch, BadRequestException, UseGuards, Req, UnauthorizedException, HttpException, HttpStatus, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { ParseIdPipe } from 'src/pipes/parse-id.pipe';
import { UpdateImageDto } from './dto/update-image.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { CategoryValue } from './dto/categories-value';
import { SupabaseAuthGuard } from 'src/auth/auth.guard';

@Controller('images')
// @UseGuards(SupabaseAuthGuard)   // Protects ALL routes
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  // Upload a single image 
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto
  ) {
    return this.imagesService.uploadImage(file, createImageDto);
  }

  // fetches all image categories type
  @Get('categories')
  async getCategories() {
    return this.imagesService.getAllCategories();
  }


  // Endpoint to fetch images by multiple category types 
  @Get('categories/type')
  async getMultipleImagesByTypes(
    @Query('types') types: string, // Expects "type1,type2,type3"
  ) {
    if (!types) {
      throw new BadRequestException('At least one type must be provided');
    }

    const typeList = types.split(',').map(t => t.trim());
    return this.imagesService.findMultipleImagesByTypes(typeList);
  }

  @Get('getOneImagePerType/types')
  async getOneImagePerType(
    @Query('types') types: string, // Expects "type1,type2"
  ) {
    if (!types) {
      throw new BadRequestException('At least one type must be provided');
    }

    const typeList = types.split(',').map(t => t.trim());
    return this.imagesService.findOnePerCategory(typeList);
  }

  // Getting all images
  @Get()
  async findAll() {
    return this.imagesService.findAll();
  }
  // Get a single image by id 
  @Get(':id')
  async findOne(@Param('id', ParseIdPipe) id: number) {
    console.log('Received ID:', id, typeof id); // Add this for debugging
    return this.imagesService.findOne(id);
  }

  // Update an image by id 
  @Patch(':id')
  async update(
    @Param('id', ParseIdPipe) id: number,
    @Body() body: UpdateImageDto
  ) {
    return this.imagesService.update(id, body);
  }

  // Delete image by id from Supabase storage 
  @Delete(':id')
  async deleteImage(@Param('id', ParseIdPipe) id: number) {
    return this.imagesService.remove(id);
  }

  // fetch images by specific or single category type
  @Get('category/:category')
  async getCategoryImages(
    @Param('category') category: CategoryValue // Using the defined type 
  ) {
    // No need for validation if using enum-like pattern
    return this.imagesService.findMultipleImagesByType(category);
  }

}