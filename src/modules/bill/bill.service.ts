import { Injectable } from '@nestjs/common';
import { BillRepository } from './bill.repository';

@Injectable()
export class BillService {
  constructor(private readonly billUsecase: BillRepository) {}

  async create(file: Express.Multer.File): Promise<any> {
    console.log('teste')
    try {
      return this.billUsecase.create(file);
    } catch (error) {
      console.error('Error processing the file:', error);
    }
  }
}
