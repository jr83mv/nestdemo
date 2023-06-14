import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';

export class userdto{
    @ApiProperty({
        required:true,
        description: 'user Id(uuid)',
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    @ApiProperty({
        required:true,
        description: 'user name',
    })
    @IsNotEmpty()
    @IsString()
    userName: string;

    @ApiProperty({
        required:true,
        description: 'gender',
    })
    @IsNotEmpty()
    @IsString()
    gender: string;

    @ApiProperty({
        description:'friends of the user',
    })
    @IsArray()
    friends:string[];
}