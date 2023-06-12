/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('products')
  getproducts(): JSON {
    return this.appService.getProduct();
  }

  @Post('product')
  addProducts(@Body() data: any):JSON{
    return this.appService.addProduct(data);

  }

  @Put('product')
  updateProduct(@Body() name:string):string{
return this.appService.updateProduct(name);
  }

  // eslint-disable-next-line prettier/prettier
  @Delete("product")
  removeProduct(@Body() name:string):string{
    return this.appService.removeProduct(name);
  }
}



