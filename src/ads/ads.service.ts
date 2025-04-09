import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class Ad {
  // Must be a class, not an interface
  @ApiProperty({ description: 'Unique ID of the ad', example: 1 })
  id: number;

  @ApiProperty({ description: 'Title of the ad', example: 'Sample Ad' })
  title: string;

  @ApiProperty({
    description: 'Base64-encoded image',
    example: 'data:image/jpeg;base64,...',
  })
  image: string;
}

@Injectable()
export class AdsService {
  private ads: Ad[] = [];
  private idCounter = 1;

  create(title: string, image: Express.Multer.File): Ad {
    const base64Image = image.buffer.toString('base64');
    const newAd: Ad = { id: this.idCounter++, title, image: base64Image };
    this.ads.push(newAd);
    return newAd;
  }

  findAll(): Ad[] {
    return this.ads;
  }

  findOne(id: number): Ad {
    const ad = this.ads.find((ad) => ad.id === id);
    if (!ad) throw new Error('Ad not found');
    return ad;
  }

  update(id: number, title: string, image?: Express.Multer.File): Ad {
    const ad = this.findOne(id);
    if (title) ad.title = title;
    if (image) ad.image = image.buffer.toString('base64');
    return ad;
  }

  remove(id: number): void {
    const index = this.ads.findIndex((ad) => ad.id === id);
    if (index === -1) throw new Error('Ad not found');
    this.ads.splice(index, 1);
  }
}
