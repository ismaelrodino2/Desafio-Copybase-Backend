import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BillService } from './bill.service';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  @UseInterceptors(FileInterceptor('excelFile'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
    return this.billService.create(file);
  }
}
