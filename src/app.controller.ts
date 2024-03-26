import { Controller, Get, Query, BadRequestException, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { CalculateDeliveryCost } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('calculate/pricing')
  @HttpCode(HttpStatus.OK)
  async calculatePricing(@Body() CalculateDeliveryCost: CalculateDeliveryCost): Promise<any> {
    try {
      const result = await this.appService.calculatePricing(CalculateDeliveryCost);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
