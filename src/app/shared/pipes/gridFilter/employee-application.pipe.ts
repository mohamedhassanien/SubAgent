import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeApplication'
})
export class EmployeeApplicationPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.studentEmpName?.toLocaleLowerCase().includes(args));
    })

  }
}