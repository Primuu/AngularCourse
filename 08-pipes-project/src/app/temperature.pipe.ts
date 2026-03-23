import { Pipe, PipeTransform } from '@angular/core';

export type tempScale = 'cel' | 'fah';

@Pipe({
  name: 'temp',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number | null,
    inputType: tempScale,
    outputType?: tempScale,
  ) {
    if (!value) {
      return value;
    }

    let val: number;

    if (typeof value === 'string') {
      val = Number.parseFloat(value);
    } else {
      val = value;
    }

    let outputTemp: number;
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = val * (9 / 5) + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = (val - 32) * (5 / 9);
    } else {
      outputTemp = val;
    }

    let symbol: '°C' | '°F';

    if (!outputType) {
      symbol = inputType === 'cel' ? '°C' : '°F';
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }

    return `${Number.parseFloat(outputTemp.toFixed(2))} ${symbol}`;
  }
}
