import { Module } from '@nestjs/common';
import { ExcelRepository, ExcelUsecase } from './excel.repository';
import { ExcelService } from './excel.service';
import { MetricsService } from './excel-parser.service';
import { ExcelController } from './excel.controller';

@Module({
  controllers: [ExcelController],
  providers: [
    ExcelService,
    MetricsService,
    ExcelUsecase,
    { provide: ExcelRepository, useClass: ExcelUsecase },
  ],
})
export class ExcelModule {}
