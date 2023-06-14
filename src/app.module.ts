import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DynamoDBModule } from './dynamodb';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // makes the ConfigService available application-wide
    envFilePath: ['.env.local', '.env'],
  }),DynamoDBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
