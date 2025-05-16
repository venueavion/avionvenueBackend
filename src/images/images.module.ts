import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity]),  // Register the entity here
    SupabaseModule, // Add this line
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule { }
