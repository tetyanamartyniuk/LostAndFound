import { CustomError } from "./CustomError.js";
export class NotFoundError extends CustomError {
    
    statusCode: number = 404;
    name: string = "Not Found Error"
    constructor(message: string){
        super(message)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    
    
    // public statusCode: number; //так як ми додаємо нову властивість до конструктора Error треба її оголосити в класі як поле
    // constructor(message: string){ //якщо оголошувати поле в конструкторі, ви-вуючи модифікатор доступу, то this.властивість = властивість можна не писати
    // super(message);
    // this.statusCode = 404;
    // this.name = "Not Found Error",
    // Object.setPrototypeOf(this, NotFoundError.prototype)//кажемо, що конкретно цей об'єкт помилки наслідує прототип NotFoundError, бо інколи це може загубитись
    // }

    //statusCode = 404
    //будь-яке поле класу автоматично додається в конструктор і працює як this.statusCode = statusCode
}

export class UnauthorizedError extends CustomError{
    statusCode: number = 401;
    name: string = "Unauthorized Error"
    constructor(message: string){
        super(message)
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }
}

export class ForbiddenError extends CustomError{
    statusCode: number = 403;
    name: string = 'Forbidden Error'
    constructor(message: string){
        super(message)
        Object.setPrototypeOf(this, ForbiddenError.prototype)
    }
}