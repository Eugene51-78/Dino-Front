import { Injectable } from '@angular/core';

@Injectable()
export class ContentService {

  employeeRole: string | undefined;
  isAlarmOn: boolean | undefined;

  constructor() {
    this.employeeRole = "Manager";
  }

  getEmployeeRole(): string{
    return <string>this.employeeRole;
  }

  setEmployeeRole(val: string){
    this.employeeRole = val;
  }

  getIsAlarmOn(): boolean{
    return <boolean>this.isAlarmOn;
  }

  setIsAlarmOn(val: boolean){
    this.isAlarmOn = val;
  }

}
