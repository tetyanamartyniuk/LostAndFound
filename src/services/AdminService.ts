import type { Repository } from "typeorm";
import { isApproved, type Item } from "../entity/Item.js";
import { itemRepo } from "../repos/itemRepository.js";
import { NotFoundError } from "../exceptions/exceptions.js";
import { afterEach } from "node:test";

class AdminService {
  constructor(private itemRepo: Repository<Item>) {}

  private async changeIsApproved(itemId: number, isApproved: isApproved) {
    const { affected } = await this.itemRepo.update(itemId, {
      isApproved: isApproved,
    });
    if (affected === 0) {
      throw new NotFoundError("Item wasn`t found");
    }
    if (affected !== 1) {
      throw new Error("Something went wrong");
    }
  }

  async approveItem(id: number) {
    return this.changeIsApproved(id, isApproved.APPROVED);
  }

  async disapproveItem(id: number) {
    return this.changeIsApproved(id, isApproved.DISAPPROVED);
  }
}

export const adminService = new AdminService(itemRepo);
