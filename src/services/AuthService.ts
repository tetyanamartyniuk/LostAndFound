import type { Repository } from "typeorm";
import type { User } from "../entity/User.js";
import { UnauthorizedError } from "../exceptions/exceptions.js";
import type { UserBody, UserLoginBody } from "../types/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { userService } from "./UserService.js";
import bcrypt from "bcrypt";
import type { RefreshToken } from "../entity/RefreshToken.js";
import { tokenRepo } from "../repos/refreshTokenRepo.js";
import type { TokenPayload } from "../middlewares/authMiddleware.js";

class AuthService {
  constructor(
    private service: typeof userService,
    private tokenRepo: Repository<RefreshToken>,
  ) {}

  async register(user: UserBody): Promise<{ savedUser: User; token: string }> {
    console.log(user);
    const savedUser = await this.service.createUser(user);
    console.log(savedUser);
    const token = await generateAccessToken(savedUser); //генерує токен
    return { savedUser, token };
  }

  async login(
    credentials: UserLoginBody,
  ): Promise<{ user: User; token: string; refreshToken: string }> {
    const user = await this.service.findUserByEmail(credentials.email);

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new UnauthorizedError("Credentials are wrong");
    }
    const token = await generateAccessToken(user);
    const refreshToken: string = await generateRefreshToken(user, token);
    const userId = user.id;

    const tokenEntry = this.tokenRepo.create({ refreshToken, userId });
    await this.tokenRepo.save(tokenEntry);

    return { user, token, refreshToken };
  }

  async refresh(user: TokenPayload) {
    const newAccessToken = await generateAccessToken(user);
    return newAccessToken;
  }

  async getTokenById(id: number): Promise<RefreshToken> {
    const refreshToken = await this.tokenRepo.findOneBy({ userId: id });
    if (!refreshToken) {
      throw new UnauthorizedError("Your token is not valid");
    }
    return refreshToken;
  }

  async getTokenFromDB(token: string): Promise<RefreshToken> {
    const refreshToken = await this.tokenRepo.findOne({
      where: {
        refreshToken: token,
      },
    });
    if (!refreshToken) {
      throw new UnauthorizedError("Your token is not valid");
    }
    return refreshToken;
  }
}

export const authService = new AuthService(userService, tokenRepo);
