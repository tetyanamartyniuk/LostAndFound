import { Between, type Repository } from "typeorm";
import { isApproved, type Item, type StatusEnum } from "../entity/Item.js";
import { NotFoundError } from "../exceptions/exceptions.js";
import { itemRepo } from "../repos/itemRepository.js";
import type { CreateItemBody } from "../types/item.js";
import { Raw } from "typeorm";
import { th } from "zod/locales";

class ItemService {
  constructor(private itemRepo: Repository<Item>) {}

  async getApprovedItems(): Promise<Item[]> {
    return await this.itemRepo.find({
      where: {
        isApproved: isApproved.APPROVED,
      },
    });
  }

  async getPendingItems() {
    return await this.itemRepo.find({
      where: { isApproved: isApproved.PENDING },
    });
  }

  //async getDisapprovedItems

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

  async addItem(item: CreateItemBody, image: string[] | null): Promise<Item> {
    const itemData = this.itemRepo.create({
      ...item,
      image,
    });
    console.log(itemData + "jfkfkfk");

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
    images: string[],
  ): Promise<Item> {
    const itemFromDB = await this.getItemById(id);

    const updatedData = {
      ...itemData,
      ...(images.length > 0 && { image: images }),
    };

    const updatedItem = this.itemRepo.merge(itemFromDB, updatedData);
    return await this.itemRepo.save(updatedItem);
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
