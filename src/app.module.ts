import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Item } from './modules/Items/items.model';
import { Articles } from './modules/articles/articles.model';
import { Items_item_tag } from './modules/Items/itemTags/itemsItemTags.model';
import { Item_tags } from './modules/Items/itemTags/itemTags.model';
import { Items_Recipes } from './modules/Items/itemsRecipes.model';
import { Recipes } from './modules/Items/recipes.model';
import { Text_blocks } from './modules/textBlocks/textBlocks.model';
import { Users } from './modules/users/users.model';
import { Articles_text_blocks } from './models/articlesTextBlocks.model';
import { ItemModule } from './modules/Items/item.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { TextBlocksModule } from './modules/textBlocks/textBlocks.module';
import { UsersModule } from './modules/users/users.module';
import { AuthService } from './modules/users/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './modules/users/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      logging: true,
      autoLoadModels: true,
      models: [
        Item,
        Articles,
        Items_item_tag,
        Item_tags,
        Items_Recipes,
        Recipes,
        Text_blocks,
        Users,
        Articles_text_blocks,
      ],
      synchronize: true,
    }),
    ItemModule,
    ArticlesModule,
    TextBlocksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
