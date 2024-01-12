import { Injectable } from '@nestjs/common';
import * as xlsx from 'node-xlsx';
import { addDays, startOfDay, eachMonthOfInterval, lastDayOfMonth, isBefore, isAfter, addMonths } from 'date-fns';

@Injectable()
export class MetricsService {
  // Função auxiliar para converter o número de série do Excel em uma data
  public excelDateToJSDate(serial: number): Date {
    const excelBaseDate = new Date(1900, 0, 1);
    return startOfDay(addDays(excelBaseDate, serial - 2));
  }

  // Função para processar o arquivo Excel
  public async processFile(rows: any): Promise<{ mrr: any[], churnRate: any[] }> {
    console.log('rowsssssss', rows)

    // Remova o cabeçalho se houver
    rows.shift();

    // Mapeie as linhas para objetos, convertendo datas do Excel para objetos Date do JavaScript
    const subscriptions = rows.map((row) => ({
      periodicidade: row[0],
      dataInicio: this.excelDateToJSDate(row[3] as number),
      dataCancelamento: row[6] ? this.excelDateToJSDate(row[6] as number) : null,
      valor: row[7],
      status: row[4]
    }));

    // Calcula o intervalo de meses abrangidos pelos dados
    const minDate = new Date(Math.min(...subscriptions.map(s => s.dataInicio.getTime())));
    const maxDate = new Date(Math.max(...subscriptions.map(s => s.dataCancelamento ? s.dataCancelamento.getTime() : new Date().getTime())));

    // Calcula o MRR e a Churn Rate para cada mês no intervalo
    const monthlyMetrics = eachMonthOfInterval({ start: minDate, end: maxDate }).map(month => {
      const endOfMonth = lastDayOfMonth(month);

      const mrr = subscriptions
        .filter(s => isBefore(s.dataInicio, endOfMonth) && (s.dataCancelamento === null || isAfter(s.dataCancelamento, month)))
        .map(s => s.periodicidade === 'Anual' ? s.valor / 12 : s.valor)
        .reduce((sum, value) => sum + value, 0);

      const activeAtStart = subscriptions.filter(s => isBefore(s.dataInicio, month)).length;
      const churned = subscriptions.filter(s => s.dataCancelamento && isBefore(s.dataCancelamento, addMonths(month, 1)) && isAfter(s.dataCancelamento, month)).length;
      const churnRate = activeAtStart ? (churned / activeAtStart) * 100 : 0;

      return { 
        month: month.toISOString().substring(0, 7), // Formato YYYY-MM
        mrr,
        churnRate
      };
    });

    const mrr = monthlyMetrics.map(m => ({ month: m.month, mrr: m.mrr }));
    const churnRate = monthlyMetrics.map(m => ({ month: m.month, churnRate: m.churnRate }));

    return { mrr, churnRate };
  }
}
