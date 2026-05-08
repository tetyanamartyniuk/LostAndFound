import type { Repository } from "typeorm";
import { isApproved, type Item } from "../entity/Item.js";
import { itemRepo } from "../repos/itemRepository.js";
import { NotFoundError } from "../exceptions/exceptions.js";

class AdminService {
  //зробити приватний допоміжний метод, який оновлює isApproved і кидає оці помилки NotFound
  constructor(private itemRepo: Repository<Item>) {}

  async approveItem(id: number) {
    const { affected } = await this.itemRepo.update(id, {
      isApproved: isApproved.APPROVED,
    });

    if (affected === 0) {
      throw new NotFoundError("Item wasn`t found");
    }

    if (affected !== 1) {
      throw new Error("ooops, smth went wrong");
    }
  }

  async disApproveItem(id: number) {
    const { affected } = await this.itemRepo.update(id, {
      isApproved: isApproved.DISAPPROVED,
    });

    if (affected === 0) {
      throw new NotFoundError("Item wasn`t found");
    }

    if (affected !== 1) {
      throw new Error("ooops, smth went wrong");
    }
  }
}

export const adminService = new AdminService(itemRepo);
