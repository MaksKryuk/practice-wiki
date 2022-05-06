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
import { TextBlocksService } from './textBlocks.service';
import { Text_blocks } from './textBlocks.model';
import { TextblockDTO } from 'src/modules/dto/textblock.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/modules/users/auth/jwt-auth.guard';
import { TextblockOutputDTO } from 'src/modules/output-dto/textblock.output.dto';

@Controller('/textBlocks')
export class TextBlocksController {
  constructor(private readonly textBlocksService: TextBlocksService) {}

  @Get('/')
  async findAll() {
    return (await this.textBlocksService.findAll()).map((textblock) => new TextblockOutputDTO(textblock));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body(new ValidationPipe) textblock: TextblockDTO) {
    const newTextblock = await this.textBlocksService.create(textblock); 
    return new TextblockOutputDTO(newTextblock);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const textblock = await this.textBlocksService.findOne(id);
    return new TextblockOutputDTO(textblock);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe) textblock: TextblockDTO,
  ): Promise<TextblockOutputDTO> {
    const updatedTextblock =  await this.textBlocksService.update(id, textblock);
    return new TextblockOutputDTO(updatedTextblock);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.textBlocksService.delete(id);
  }
}
