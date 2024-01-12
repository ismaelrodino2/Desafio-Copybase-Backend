import { Injectable } from '@nestjs/common';
import { MetricsService } from './pdf-parser.service';

export abstract class BillRepository {
  abstract create(file: Express.Multer.File): Promise<any>;
}

@Injectable()
export class BillUsecase extends BillRepository {
  constructor(private metricsService: MetricsService) { // Injete o MetricsService
    super();
  }

  async create(file: Express.Multer.File): Promise<any> {
    try {
      console.log('asdasd', file.buffer);
      const metrics = await this.metricsService.processFile(file.buffer);
      console.log('asdasd22', metrics);

      return metrics;
    } catch (error) {
      console.error('Error processing the file:', error);
    }
  }
}
