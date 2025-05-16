import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from './images/images.module';
import { ImageEntity } from './images/entities/image.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'aws-0-eu-west-2.pooler.supabase.com',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres.nnrynmpwnlhinoxwovkn',
      password: process.env.DB_PASSWORD || 'Abcde@12345678',
      database: process.env.DB_NAME || 'postgres',
      entities: [ImageEntity],
      synchronize: true,
    }),
    ImagesModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
