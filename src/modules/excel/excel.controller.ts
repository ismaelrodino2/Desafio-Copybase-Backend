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
import { ExcelService } from './excel.service';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post()
  @UseInterceptors(FileInterceptor('excelFile'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
    return this.excelService.create(file);
  }
}
