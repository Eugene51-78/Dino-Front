
export interface User {
  id: number;
  firstName: string;
  secondName: string;
  middleName: string;
  role: string;
  age: number;
  email: string;
}

export const UserColumns = [
  {
    key: "id",
    type: "number",
    label: "ИД"
  },
  {
    key: "secondName",
    type: "text",
    label: "Фамилия"
  },
  {
    key: "firstName",
    type: "text",
    label: "Имя"
  },
  {
    key: "middleName",
    type: "text",
    label: "Отчество"
  },
  {
    key: "role",
    type: "text",
    label: "Должность"
  },
  {
    key: "age",
    type: "number",
    label: "Возраст"
  },
  {
    key: "email",
    type: "text",
    label: "Почта"
  }
]
