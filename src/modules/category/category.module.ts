import { Module } from '@nestjs/common';
import { CategoryEventsService } from './services/category-events.service';
import { CategoryController } from './controllers/category.controller';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './services/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    CategoryService,
    CategoryRepository,
    CategoryEventsService,
  ],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
