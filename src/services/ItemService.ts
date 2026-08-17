import { Between, ILike, type Repository } from "typeorm";
import { isApproved, type Item, type StatusEnum } from "../entity/Item.js";
import { NotFoundError } from "../exceptions/exceptions.js";
import { itemRepo } from "../repos/itemRepository.js";
import type { CreateItemBody } from "../types/Item.js";
import { Raw } from "typeorm";
import { th } from "zod/locales";

export type filters = {
  status?: "found" | "lost" | undefined;
  endDate?: Date | undefined;
  startDate?: Date | undefined;
  place?: string | undefined;
  categoryId?: number | undefined;
  title?: string | undefined;
};

class ItemService {
  constructor(private itemRepo: Repository<Item>) {}

  async getApprovedItems(filters?: filters): Promise<Item[]> {
    const whereClause = this.buildFilterWhereClause(filters);
    return await this.itemRepo.find({
      where: { isApproved: isApproved.APPROVED, ...whereClause },
      order: { foundAt: "DESC" },
    });
  }

  buildFilterWhereClause(filters?: filters): Object {
    const whereClause: any = {};
    if (filters?.status) {
      whereClause.status = filters.status;
    }

    if (filters?.place) {
      whereClause.place = filters.place;
    }

    if (filters?.categoryId) {
      whereClause.categoryId = filters.categoryId;
    }

    if (filters?.startDate && filters.endDate) {
      whereClause.foundAt = Between(filters.startDate, filters.endDate);
    }

    if (filters?.title) {
      whereClause.title = ILike(`%${filters.title}%`);
    }

    return whereClause;
  }

  async getPendingItems() {
    return await this.itemRepo.find({
      where: { isApproved: isApproved.PENDING },
    });
  }

  async getMyItems(id: number): Promise<Item[]> {
    const myItems = await this.itemRepo.find({ where: { userId: id } });
    return myItems;
  }

  async getItemById(id: number): Promise<Item> {
    const item = await this.itemRepo.findOne({
      where: {
        id: id,
      },
      relations: ["user"],
    });
    if (!item) {
      throw new NotFoundError(`Item with id ${id} wasn't found`);
    }
    console.log(item);
    return item;
  }

  async createItem(
    item: CreateItemBody,
    image: string[] | null,
  ): Promise<Item> {
    const itemData = this.itemRepo.create({
      ...item,
      image,
    });
    return await this.itemRepo.save(itemData);
  }

  async deleteItem(id: number): Promise<void> {
    const { affected } = await this.itemRepo.softDelete({ id: id });
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
