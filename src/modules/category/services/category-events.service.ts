import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CategoryEventsEnum } from '../models/category-events.enum';
import { CategoryEventsInterface } from '../models/category-events.interface';

@Injectable()
export class CategoryEventsService {
  @OnEvent(CategoryEventsEnum.CREATED)
  public async handleCategoryCreated(event: CategoryEventsInterface): Promise<void> {
    console.log(`Evento recebido: category.created | categoryId=${event.categoryId} | title=${event.title}`);
  }
}
