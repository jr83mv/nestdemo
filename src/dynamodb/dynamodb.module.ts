import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { DynamoDBService } from './dynamodb.service';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Module({
    imports: [
      AwsSdkModule.forRootAsync({
        defaultServiceOptions: {
          useFactory: (configService: ConfigService) => {
            return {
              region: configService.get('AWS_REGION'),
              credentials: {
                accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
              },
            };
          },
          inject: [ConfigService],
        },
        services: [AWS.DynamoDB.DocumentClient],
      }),
    ],
    providers: [DynamoDBService,DocumentClient],
    exports: [DynamoDBService],
  })
  export class DynamoDBModule {}
  