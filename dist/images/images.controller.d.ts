import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { CategoryValue } from './dto/categories-value';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    uploadImage(file: Express.Multer.File, createImageDto: CreateImageDto): Promise<import("./entities/image.entity").ImageEntity>;
    getCategories(): Promise<any[]>;
    getMultipleImagesByTypes(types: string): Promise<import("./entities/image.entity").ImageEntity[]>;
    getOneImagePerType(types: string): Promise<import("./entities/image.entity").ImageEntity[]>;
    findAll(): Promise<import("./entities/image.entity").ImageEntity[]>;
    findOne(id: number): Promise<import("./entities/image.entity").ImageEntity>;
    update(id: number, body: UpdateImageDto): Promise<import("./entities/image.entity").ImageEntity>;
    deleteImage(id: number): Promise<import("./entities/image.entity").ImageEntity>;
    getCategoryImages(category: CategoryValue): Promise<import("./entities/image.entity").ImageEntity[]>;
}
