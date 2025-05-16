"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const image_entity_1 = require("./entities/image.entity");
const supabase_service_1 = require("../supabase/supabase.service");
const common_1 = require("@nestjs/common");
let ImagesService = class ImagesService {
    imageRepository;
    supabaseService;
    constructor(imageRepository, supabaseService) {
        this.imageRepository = imageRepository;
        this.supabaseService = supabaseService;
    }
    async uploadImage(file, createImageDto) {
        try {
            const supabase = this.supabaseService.getClient();
            if (!file) {
                throw new Error('No file uploaded');
            }
            console.log('Original filename:', file.originalname);
            console.log('File buffer length:', file.buffer.length);
            const fileExt = file.originalname.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `images/${fileName}`;
            console.log('Uploading to path:', filePath);
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
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);
            console.log('Generated public URL:', publicUrl);
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
        }
        catch (error) {
            console.error('Service error:', error);
            throw error;
        }
    }
    async create(imageData) {
        const image = new image_entity_1.ImageEntity();
        image.filename = imageData.filename;
        image.path = imageData.path;
        image.type = imageData.type;
        image.title = imageData.title || imageData.filename;
        image.description = imageData.description || '';
        image.category = imageData.category || null;
        return this.imageRepository.save(image);
    }
    async findAll() {
        return this.imageRepository.find();
    }
    async findOne(id) {
        const image = await this.imageRepository.findOne({
            where: { id }
        });
        if (!image) {
            throw new common_1.NotFoundException(`Image with ID ${id} not found`);
        }
        return image;
    }
    async update(id, updateData) {
        const image = await this.findOne(id);
        Object.assign(image, updateData);
        return this.imageRepository.save(image);
    }
    async remove(id) {
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
        return this.imageRepository.remove(image);
    }
    async getAllCategories() {
        const result = await this.imageRepository
            .createQueryBuilder('image')
            .select('DISTINCT(image.category)', 'category')
            .where('image.category IS NOT NULL')
            .getRawMany();
        return result.map(item => item.category);
    }
    async findMultipleImagesByTypes(types) {
        return this.imageRepository.find({
            where: {
                category: (0, typeorm_2.In)(types),
            },
            order: { created_at: 'DESC' },
        });
    }
    async findOnePerCategory(types) {
        return this.imageRepository
            .createQueryBuilder('image')
            .distinctOn(['image.category'])
            .where('image.category IN (:...types)', { types })
            .orderBy('image.category', 'ASC')
            .addOrderBy('image.created_at', 'DESC')
            .getMany();
    }
    async findMultipleImagesByType(category) {
        return this.imageRepository.find({
            where: { category },
            order: { created_at: 'DESC' }
        });
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(image_entity_1.ImageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        supabase_service_1.SupabaseService])
], ImagesService);
//# sourceMappingURL=images.service.js.map