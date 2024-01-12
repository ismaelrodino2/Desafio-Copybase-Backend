import { Injectable } from '@nestjs/common';
import { MetricsService } from './pdf-parser.service';
import * as xlsx from 'node-xlsx';
import * as Papa from 'papaparse';
import { Express } from 'express';

export abstract class BillRepository {
  abstract create(file: Express.Multer.File): Promise<any>;
}

@Injectable()
export class BillUsecase extends BillRepository {
  constructor(private metricsService: MetricsService) {
    super();
  }

  private converterCSVParaArray(buffer: Buffer): any[][] {
    const resultado = Papa.parse(buffer.toString(), {
        header: true,
        skipEmptyLines: true
    });

    return resultado.data.map(linha => this.transformarLinha(linha));
  }

  private transformarLinha(linha: any): any[] {
    // Implementação da transformação da linha aqui
    // Exemplo genérico baseado em sua descrição anterior:
    return [
      linha.periodicidade,
      parseInt(linha['quantidade cobranças']),
      parseInt(linha['cobrada a cada X dias']),
      this.converterDataParaExcel(linha['data início']),
      linha.status,
      this.converterDataParaExcel(linha['data status']),
      linha['data cancelamento'] ? this.converterDataParaExcel(linha['data cancelamento']) : null,
      parseFloat(linha.valor.replace(/,/g, '')),
      linha['próximo ciclo'],
      linha['ID assinante']
    ];
  }

  private converterDataParaExcel(dataString: string): number {
    const data = new Date(dataString);
    const dataBase = new Date('1899-12-30');
    const diferencaTempo = data.getTime() - dataBase.getTime();
    return diferencaTempo / (24 * 3600 * 1000);
  }

  async create(file: Express.Multer.File): Promise<any> {
    const fileType = file.originalname.split('.').pop().toLowerCase();

    let rows: any[][];
    if (fileType === 'xlsx') {
      const workbook = xlsx.parse(file.buffer); // Aqui vem em formato de [[...]]
      rows = workbook[0].data as any[][];
    } else if (fileType === 'csv') {
      rows = this.converterCSVParaArray(file.buffer);
    } else {
      throw new Error('Formato de arquivo não suportado.');
    }

    try {
      const metrics = await this.metricsService.processFile(rows);
      return metrics;
    } catch (error) {
      console.error('Error processing the file:', error);
      throw error;
    }
  }
}
