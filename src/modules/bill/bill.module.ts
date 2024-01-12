import { Module } from '@nestjs/common';
import { BillRepository, BillUsecase } from './bill.repository';
import { BillService } from './bill.service';
import { MetricsService } from './pdf-parser.service';
import { BillController } from './bill.controller';

@Module({
  controllers: [BillController],
  providers: [
    BillService,
    MetricsService,
    BillUsecase,
    { provide: BillRepository, useClass: BillUsecase },
  ],
})
export class BillModule {}
