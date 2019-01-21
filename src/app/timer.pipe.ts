import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timer' })
export class TimerPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) { return `00:00`; } else {
      return `${this.pad(Math.floor(value / 60))}:${this.pad(Math.floor(value % 60))}`;
    }
  }

  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
}
