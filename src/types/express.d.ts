import type { UserRole } from "../entity/User.ts"

declare global {
    namespace Express{
        interface Request{
            user?: {
                id: number,
                email: string,
                role: string
            }
        }
    }
}