/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TextBlocksService } from './textBlocks.service';
import { Text_blocks } from './textBlocks.model';

@Controller('/textBlocks')
export class TextBlocksController {
  constructor(
    private readonly textBlocksService: TextBlocksService,
  ) {}

  @Get('/')
  findAll(){
    return this.textBlocksService.findAll();
  }

  @Post('/')
  create(@Body() body: { text: string }) {
    return this.textBlocksService.create(body.text);
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.textBlocksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body:{ text: string } ): Promise<Text_blocks> {
    return this.textBlocksService.update(id, body.text);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.textBlocksService.delete(id);
  }

}
