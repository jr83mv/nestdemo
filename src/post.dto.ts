import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class postdto{
@ApiProperty({
    required:true,
    description: 'post Id(uuid)',
})
@IsNotEmpty()
@IsString()
postId: string;

@ApiProperty({
    required:true,
    description: 'user id',
})
@IsNotEmpty()
@IsString()
userId: string;

@ApiProperty({
    description: 'post crested date',
})
@IsNotEmpty()
@IsString()
createdDate: string;

@ApiProperty({
    required:true,
    description: 'comments on post',
})
@IsArray()
comments: string[];

@ApiProperty({
    description:'friends of the user',
})
@IsNumber()
likes:number;
}
