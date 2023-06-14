import { Injectable, Logger } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private readonly logger = new Logger(DynamoDBService.name);

  constructor(
    private readonly dynamoDB: AWS.DynamoDB.DocumentClient,
  ) {}

  async getItem(
    tableName: string,
    key: any,
  ): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput | null> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key,
    };
    try {
      const result = await this.dynamoDB.get(params).promise();
      return result.Item || null;
    } catch (error) {
      this.logger.error(`Failed to get item from ${tableName}: ${error}`);
      return null;
    }
  }

  async putItem(tableName: string, item: any): Promise<boolean> {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    };
    try {
      await this.dynamoDB.put(params).promise();
      return true;
    } catch (error) {
      this.logger.error(`Failed to put item to ${tableName}: ${error}`);
      return false;
    }
  }

  async query(
    tableName: string,
    expression: any,
    expressionAttributeValues: any,
  ): Promise<AWS.DynamoDB.DocumentClient.QueryOutput | null> {
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: tableName,
      KeyConditionExpression: expression,
      ExpressionAttributeValues: expressionAttributeValues,
    };
    try {
      const result = await this.dynamoDB.query(params).promise();
      return result || null; // it will contain an `Items` property if the operation is successful
    } catch (error) {
      this.logger.error(`Failed to query items from ${tableName}: ${error}`);
      return null;
    }
  }

 

  async deleteItem(tableName: string, key: any): Promise<boolean> {

    const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: tableName,
      Key: key,
    };
    try {
      await this.dynamoDB.delete(params).promise();
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete item from ${tableName}: ${error}`);
      return false;
    }
  }

  async updateItem(
    tableName: string,
    key: any,
    updateExpression: string,
    expressionAttributeValues: any,
  ): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput | null> {
    
    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW',
    };
    try {
      const result = await this.dynamoDB.update(params).promise();
      return result.Attributes || null;
    } catch (error) {
      this.logger.error(`Failed to update item in ${tableName}: ${error}`);
      return null;
    }
  }

  async batchWrite(tableName: string, posts: any[]):Promise<any>{
    console.log(posts)
    const params: AWS.DynamoDB.DocumentClient.BatchWriteItemInput = {
        RequestItems: {
          [tableName]: posts,
        },
      };
      console.log(params)
      try {
        await this.dynamoDB.batchWrite(params).promise();
      } catch (error) {
        console.error(`Failed to perform batch write for ${tableName}`, error);
    throw new Error(`Failed to perform batch write for ${tableName}: ${error.message}`);
  }
}

// async batchDelete(tableName: string, request: any[]):Promise<any>{
//     const params: AWS.DynamoDB.DocumentClient.BatchWriteItemInput = {
//         RequestItems: {
//           [tableName]: request,
//         },
//       };
//       try {
//         await this.dynamoDB.batchWrite(params).promise();
//       } catch (error) {
//         console.error(`Failed to perform batch write for ${tableName}`, error);
//     throw new Error(`Failed to perform batch write for ${tableName}: ${error.message}`);
//   }
// }


}
