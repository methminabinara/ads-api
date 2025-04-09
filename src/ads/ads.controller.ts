import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { Ad } from './ads.service'; // Import the Ad class directly
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Create a new ad' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Sample Ad' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Ad created successfully',
    type: Ad,
  }) // Use the imported Ad class
  create(
    @Body('title') title: string,
    @UploadedFile() image: Express.Multer.File,
  ): Ad {
    return this.adsService.create(title, image);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ads' })
  @ApiResponse({ status: 200, description: 'List of all ads', type: [Ad] }) // Array of Ad
  findAll(): Ad[] {
    return this.adsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one ad by ID' })
  @ApiParam({ name: 'id', description: 'ID of the ad', example: 1 })
  @ApiResponse({ status: 200, description: 'The ad', type: Ad })
  findOne(@Param('id') id: string): Ad {
    return this.adsService.findOne(parseInt(id, 10));
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Update an ad by ID' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'ID of the ad', example: 1 })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Updated Ad' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Updated ad', type: Ad })
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @UploadedFile() image?: Express.Multer.File,
  ): Ad {
    return this.adsService.update(parseInt(id, 10), title, image);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ad by ID' })
  @ApiParam({ name: 'id', description: 'ID of the ad', example: 1 })
  @ApiResponse({ status: 200, description: 'Ad deleted successfully' })
  remove(@Param('id') id: string): void {
    this.adsService.remove(parseInt(id, 10));
  }
}
