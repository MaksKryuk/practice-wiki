import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemTagsService } from './itemTags.service';
import { JwtAuthGuard } from 'src/modules/users/auth/jwt-auth.guard';
import { ItemTagDTO } from 'src/modules/dto/item-tag.dto';
import { ItemtagOutputDTO } from 'src/modules/output-dto/item-tag.output.dto';

@Controller('/itemTags')
export class ItemTagsController {
  constructor(private readonly itemTagsService: ItemTagsService) {}

  @Get('/')
  async findAll() {
    return (await this.itemTagsService.findAll()).map((tag) => new ItemtagOutputDTO(tag));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() itemtag: ItemTagDTO ) {
    const newTag = await this.itemTagsService.create(itemtag.tag_name);
    return new ItemtagOutputDTO(newTag);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tag = this.itemTagsService.findOne(id);
    return new ItemtagOutputDTO(tag);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() itemtag: ItemTagDTO,
  ): Promise<ItemtagOutputDTO> {
    const updatedTag = await this.itemTagsService.update(id, itemtag.tag_name);
    return new ItemtagOutputDTO(updatedTag);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemTagsService.delete(id);
  }
}
