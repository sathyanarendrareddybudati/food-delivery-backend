import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item, Pricing, Organization } from './app.entity';
import { CalculateDeliveryCost } from './app.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Pricing)
    private readonly pricingRepository: Repository<Pricing>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async calculatePricing(dto: CalculateDeliveryCost): Promise<{ total_price: number }> {
    const item = await this.itemRepository.findOne({ where: { type: dto.item_type } });
    
    if (!item) throw new NotFoundException('Item not found');

    const organization = await this.organizationRepository.findOne({ where: { id: dto.organization_id } });
    if (!organization) throw new NotFoundException('Organization not found');

    const pricing = await this.pricingRepository.findOne({
      where: {
        organization: { id: organization.id },
        item: { id: item.id },
        zone: dto.zone,
      },
    });
    if (!pricing) throw new NotFoundException('Pricing not found');

    const distanceBeyondBase = Math.max(dto.total_distance - pricing.base_distance_in_km, 0);
    const totalPriceInCents = ((pricing.fix_price * 100) + (distanceBeyondBase * pricing.km_price * 100)).toFixed(0);

    return { total_price: parseInt(totalPriceInCents) };
  }
}
