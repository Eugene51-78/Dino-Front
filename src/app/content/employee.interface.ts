export interface Employee{
  "id": number, email: string, firstName: string,
  secondName: string, middleName: string, role: { id: number, name: string },
  age: number, location:{"id": number, name: string, longitude: number, latitude: number},
  isBusy: boolean
};
