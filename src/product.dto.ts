/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

export class productdto{
    @ApiProperty({
        required:true,
        description: 'product Id',
        
    })
    @IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty({
        required:true,
        description: 'product name',
    })
    @IsNotEmpty()
    @IsString()
    productName: string;

    @ApiProperty({
        required:true,
        description: 'product version',
        default:'0.1'
    })
    @IsNotEmpty()
    @IsString()
    productVersion: string;


}