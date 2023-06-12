import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getProduct():any{
    return {name:'iphone',version:3};
  }

  addProduct(data:any):any{
    return { message: 'Data saved successfully' };
  }

  removeProduct(name:string):string{
    return "product removed";
  }

  updateProduct(data:any):string{
    return "updated";
  }
}
