import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CalculateDeliveryCost {
  @ApiProperty({ description: 'The zone of delivery' })
  @IsString()
  @IsNotEmpty()
  zone: string;

  @ApiProperty({ description: 'The ID of the organization' })
  @IsNumber()
  @IsNotEmpty()
  organization_id: number;

  @ApiProperty({ description: 'Total distance of delivery' })
  @IsNumber()
  @IsNotEmpty()
  total_distance: number;

  @ApiProperty({ description: 'Type of the item' })
  @IsString()
  @IsNotEmpty()
  item_type: string;
}
