import type { Repository } from "typeorm";
import { isApproved, type Item } from "../entity/Item.js";
import { itemRepo } from "../repos/itemRepository.js";
import { NotFoundError } from "../exceptions/exceptions.js";
import { afterEach } from "node:test";

class AdminService {
  //зробити приватний допоміжний метод, який оновлює isApproved і кидає оці помилки NotFound
  constructor(private itemRepo: Repository<Item>) {}

  private async changeIsApproved(id: number, isApproved: isApproved) {
    const { affected } = await this.itemRepo.update(id, {
      isApproved: isApproved,
    });
    if (affected === 0) {
      throw new NotFoundError("Item wasn`t found");
    }
    if (affected !== 1) {
      throw new Error("ooops, smth went wrong");
    }
  }

  async approveItem(id: number) {
    return this.changeIsApproved(id, isApproved.APPROVED);
  }

  async disApproveItem(id: number) {
    return this.changeIsApproved(id, isApproved.DISAPPROVED);
  }
}

export const adminService = new AdminService(itemRepo);
