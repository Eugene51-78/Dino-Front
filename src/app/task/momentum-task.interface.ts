import {Employee} from '../content/employee.interface';

export interface MomentumTask{
  id: number;
  from: Employee;
  to: Employee;
  type: { id: number, type: string };
  status: { id: number, status: string };
  comment: string;
  creationDate: string;
  groupId: number;
}
