import { IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
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