import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlocksController } from './textBlocks.controller';
import { Text_blocks } from './textBlocks.model';
import { TextBlocksService } from './textBlocks.service';

@Module({
  imports: [SequelizeModule.forFeature([Text_blocks])],
  controllers: [TextBlocksController],
  providers: [TextBlocksService],
})
export class TextBlocksModule {}
