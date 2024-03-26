import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from 'src/app.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item, Organization, Pricing } from 'src/app.entity';

describe('PricingService', () => {
  let service: AppService;
  let mockPricingRepository: Partial<Repository<Pricing>>;
  let mockItemRepository: Partial<Repository<Item>>;
  let mockOrganizationRepository: Partial<Repository<Organization>>;

  beforeEach(async () => {
    mockPricingRepository = {
      findOne: jest.fn().mockImplementation(({ where: { zone, item: { id: itemId }, organization: { id: organizationId } } }) =>
        Promise.resolve({
          id: 1,
          zone,
          organizationId,
          itemId,
          base_distance_in_km: 5,
          km_price: 150,
          fix_price: 1000,
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Pricing),
          useValue: mockPricingRepository,
        },
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
        {
          provide: getRepositoryToken(Organization),
          useValue: mockOrganizationRepository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculatePricing', () => {
    it('should calculate the correct pricing for perishable items within base distance', async () => {
      const result = await service.calculatePricing({
        zone: 'South Zone',
        organization_id: 2,
        total_distance: 1,
        item_type: 'Books',
      });
      expect(result.total_price).toEqual(1000);
    });
  });
});
