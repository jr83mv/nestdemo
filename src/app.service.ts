/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {productdto} from './product.dto';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAllProduct():any{
    return {name:'iphone',version:3};
  }

  addProduct(data:productdto):any{
    return { message: 'Data saved successfully' };
  }

  removeProduct(name:string):string{
    return "product removed";
  }

  updateProduct(data:productdto):string{
    return "updated";
  }
}
