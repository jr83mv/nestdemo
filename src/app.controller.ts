/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';
import { productdto } from './product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('products')
  async getAllProducts(): Promise<any> {
    try {
      const response = await this.appService.getAllProduct();
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Post('product')
  async addProducts(@Body() body: productdto):Promise<any>{
    try {
      const response = await this.appService.addProduct(body);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }

  }

  @Put('product')
  async updateProduct(@Body() body: productdto):Promise<any>{
    try {
      const response = await this.appService.updateProduct(body);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Delete("product")
  async removeProduct(@Body() id:string):Promise<any>{
    try {
      const response = await this.appService.removeProduct(id);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }
}



