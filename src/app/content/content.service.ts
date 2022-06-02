import { Injectable } from '@angular/core';

@Injectable()
export class ContentService {

  employeeRole: string;
  isAlarmOn: boolean;

  constructor() { }

  getEmployeeRole(): string{
    return this.employeeRole;
  }

  setEmployeeRole(val: string){
    this.employeeRole = val;
  }

  getIsAlarmOn(): boolean{
    return this.isAlarmOn;
  }

  setIsAlarmOn(val: boolean){
    this.isAlarmOn = val;
  }

}
