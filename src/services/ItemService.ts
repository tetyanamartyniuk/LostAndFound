import { Between, type Repository } from "typeorm";
import type { Item, StatusEnum } from "../entity/Item.js";
import { NotFoundError } from "../exceptions/exceptions.js";
import { itemRepo } from "../repos/itemRepository.js";
import type { CreateItemBody } from "../types/item.js";
import { Raw } from "typeorm";

class ItemService {
  constructor(private itemRepo: Repository<Item>) {}

  async getItems(): Promise<Item[]> {
    return await this.itemRepo.find();
  }

  async getMyItems(id: number): Promise<Item[]> {
    const myItems = await this.itemRepo.find({ where: { userId: id } });
    return myItems;
  }

  async getItemById(id: number): Promise<Item> {
    const item = await this.itemRepo.findOneBy({ id: id });
    console.log(item);
    if (!item) {
      throw new NotFoundError("Item with this id wasn`t found");
    }
    return item;
  }

  async addItem(item: CreateItemBody, image: string | null): Promise<Item> {
    const itemData = this.itemRepo.create({
      ...item,
      image,
    });

    return await this.itemRepo.save(itemData);
  }

  async deleteItem(id: number): Promise<void> {
    const { affected } = await this.itemRepo.delete({ id: id });
    if (affected === 0) {
      throw new NotFoundError("Item with this id doesn`t exist");
    }
  }

  async updateItem(
    id: number,
    itemData: Partial<CreateItemBody>,
  ): Promise<Item> {
    //почистити, бо тепер в мене є zod
    const itemFromDB = await this.getItemById(id);

    const updatedData: Partial<CreateItemBody> = {};

    if (itemData.title !== undefined) {
      updatedData.title = itemData.title;
    }
    if (itemData.description !== undefined) {
      updatedData.description = itemData.description;
    }
    if (itemData.place !== undefined) {
      updatedData.place = itemData.place;
    }
    if (itemData.foundAt !== undefined) {
      updatedData.foundAt = itemData.foundAt;
    }
    if (itemData.status !== undefined) {
      updatedData.status = itemData.status;
    }

    const updatedItem = this.itemRepo.merge(itemFromDB, updatedData);
    return this.itemRepo.save(updatedItem);
  }

  async filterByDate(startDate: Date, endDate: Date): Promise<Item[]> {
    const items = await this.itemRepo.find({
      where: {
        foundAt: Between(startDate, endDate),
      },
    });
    return items;
  }

  async filterByStatus(status: StatusEnum): Promise<Item[]> {
    const items = await this.itemRepo.find({
      where: {
        status: status,
      },
    });
    return items;
  }

  async filterByPlace(place: string): Promise<Item[]> {
    const items = await this.itemRepo.find({
      where: { place: place },
    });
    return items;
  }
}

export const itemService = new ItemService(itemRepo);
