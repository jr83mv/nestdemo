import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { postdto } from './post.dto';
import { userdto } from './user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('posts/:id/:createdDate')
  async getPost(@Param('id') postId: string,@Param('createdDate') createdDate: string): Promise<any> {
    try {
      const response = await this.appService.getPost(postId,createdDate);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Get('post/:id/comments')
  async getComments(@Param('id') postId:string): Promise<any>{
    try {
      const response = await this.appService.getComments(postId);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }

  }

  @Get('user/:id')
  async getUserDetails(@Param('id') userId:string): Promise<any> {
    try {
      const response = await this.appService.getUserDetails(userId);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Get('user/:id/posts')
  async getUserPosts(@Param('id') userId:string): Promise<any> {
    try {
      const response = await this.appService.getUserPost(userId);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Post('user')
  async addUser(@Body() body: userdto):Promise<any>{
    try {
      const response = await this.appService.addUser(body);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Post('user/post')
  async addPost(@Body() body: postdto):Promise<any>{
    try {
      const response = await this.appService.addPost(body);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Put('post/:id/:createdDate')
  async addComment(@Body() body: any,@Param('id') postId: string,@Param('createdDate') createdDate: string):Promise<any>{
    try {
      const params={
        postId:postId,
        newComment:body.newComment,
        createdDate:createdDate
      }
      const response = await this.appService.addComment(params);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Delete("post")
  async removePost(@Body() body: any):Promise<any>{
    try {
      const response = await this.appService.removePost(body);
      return response;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Post("post/batch")
  async batchAddPost(@Body() body:postdto[]):Promise<any>{
    try{
      const response=await this.appService.batchAddPost(body);
      return response;
    }catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Delete('post/batch')
  async batchDeletePosts(@Body() body: any[]): Promise<any> {
    try{
      const response=await this.appService.batchDeletePosts(body);
      return response;
    }catch (error) {
      console.log({ error });
      throw error;
    }
  }
}