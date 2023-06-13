import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'istDate' })
export class ISTDatePipe implements PipeTransform {

    transform(value: any, format = 'mediumDate'): string {
        let date = new Date(value).valueOf();
        let transformDate = new Date(date - 19800000);
        return new DatePipe("en-US").transform(transformDate, format);
    }

}