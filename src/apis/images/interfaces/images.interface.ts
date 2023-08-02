import { PickType } from '@nestjs/swagger';
import { Image } from '../entities/image.entity';
import { SaveImagesDto } from '../dto/saveImages.dto';

export class IImagesSave {
  sitterUserId: string;
  saveImagesDto: SaveImagesDto;
}

export class SaveImagesReturn extends PickType(Image, ['id'] as const) {}
