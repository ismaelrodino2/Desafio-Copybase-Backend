import { Injectable } from '@nestjs/common';
import { ExcelRepository } from './excel.repository';

@Injectable()
export class ExcelService {
  constructor(private readonly excelUsecase: ExcelRepository) {}

  async create(file: Express.Multer.File): Promise<any> {
    console.log('teste')
    try {
      return this.excelUsecase.create(file);
    } catch (error) {
      console.error('Error processing the file:', error);
    }
  }
}
