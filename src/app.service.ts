/* eslint-disable prettier/prettier */
import { Injectable,Logger } from '@nestjs/common';
import {postdto} from './post.dto';
import { DynamoDBService } from './dynamodb';
import { userdto } from './user.dto';
import { v4 as uuidv4 } from 'uuid';
import { resourceUsage } from 'process';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    private readonly DynamoDBService: DynamoDBService,
  ) {}

   getHello(): string {
    return 'Hello World!';
  }

  async getPost(postId:string,createdDate:string):Promise<any>{

    const tableName = `${process.env.POSTS_TABLE}`;
        const keys = {
            postId: postId,
            createdDate:createdDate
          };
          const result = await this.DynamoDBService.getItem(tableName, keys);
          return result||null;
  }

  async getComments(postId:string):Promise<any>{
    const tableName = `${process.env.POSTS_TABLE}`;
        const keys = {
            postId: postId,
          };
          const result = await this.DynamoDBService.getItem(tableName, keys);
          return result.Item.comments?result.Item.comments:null;
        
  }

  async getUserDetails(userId:string):Promise<any>{
    const tableName = `${process.env.USERS_TABLE}`;
        const keys = {
            userId: userId,
          };
          const result = await this.DynamoDBService.getItem(tableName,keys);
          return result.Item||null;
  }

  async getUserPost(userId:string):Promise<any>{
    const tableName = `${process.env.POSTS_TABLE}`;
    const keys = {
        userId: userId,
      };
      
      const result = await this.DynamoDBService.getItem(tableName, keys);
      return result.Item||null;
  }

  async addUser(body:userdto):Promise<any>{

  const tableName = `${process.env.USERS_TABLE}`;
  
      const result=await this.DynamoDBService.putItem(tableName,{
        userId:uuidv4(),
        userName:body.userName,
        gender:body.gender,
    });
      return result;
    
  }

  async addPost(body:postdto):Promise<any>{
    
  const tableName = `${process.env.POSTS_TABLE}`;
      const result=await this.DynamoDBService.putItem(tableName,{
        postId:uuidv4(),
        userdId:body.userId,
        createdDate:new Date().toISOString(),
        comments:[],
    });
      return result;
  }

  async addComment(data:any):Promise<any>{
    const tableName = `${process.env.POSTS_TABLE}`;
    let existingPost:any = await this.DynamoDBService.getItem(tableName, {postId:data.postId,createdDate:data.createdDate});
    existingPost.comments.push(data.newComment);

    await this.DynamoDBService.updateItem(tableName, { postId: data.postId,createdDate:data.createdDate }, 'SET comments = :comments', {
      ':comments': existingPost.comments,
    });
    return existingPost;
    
  }

  async removePost(body: any):Promise<boolean>{
    const tableName = `${process.env.POSTS_TABLE}`; 
    const result = await this.DynamoDBService.deleteItem(tableName, body);
    return result;
  }

  async batchAddPost(posts:postdto[]):Promise<any>{
    // console.log(posts)
    const tableName = `${process.env.POSTS_TABLE}`;
    posts.forEach(post => {
      post.createdDate=new Date().toISOString();
      console.log(typeof(post))
    });
    // console.log(posts)
    const PutRequests=posts.map(post=>({PutRequest:{Item:post,},}))
    const result =await this.DynamoDBService.batchWrite(tableName,PutRequests)
    return result
  }

  async batchDeletePosts(body: any[]): Promise<any> {
    const tableName = `${process.env.POSTS_TABLE}`;
    const deleteRequests = body.map(postKeys => ({
      DeleteRequest: {
        Key: {
          postId: postKeys.postId,
          createdDate: postKeys.createdDate
        },
      },
    }));

    await this.DynamoDBService.batchWrite(tableName, deleteRequests);
  }
}
