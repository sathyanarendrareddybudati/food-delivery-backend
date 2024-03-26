import { IsNotEmpty, IsNumber, IsString, isNumber } from 'class-validator';

export class CalculateDeliveryCost {
  @IsString()
  @IsNotEmpty()
  zone: string;

  @IsNumber()
  @IsNotEmpty()
  organization_id: number;

  @IsNumber()
  @IsNotEmpty()
  total_distance: number;

  @IsString()
  @IsNotEmpty()
  item_type: string;
}
