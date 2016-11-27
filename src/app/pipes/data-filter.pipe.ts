import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      if (array[0].name) {
        return array.filter((value) => {
          return value.name.toLowerCase().match(query.toLowerCase());
        });
      }
      if (array[0].firstName) {
        return array.filter((value) => {
          return value.firstName.toLowerCase().match(query.toLowerCase());
        });
      }
    }
    return array;
  }

}
