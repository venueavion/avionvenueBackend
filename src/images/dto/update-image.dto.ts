import { IsOptional, IsString } from 'class-validator';

export class UpdateImageDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string | null;
}