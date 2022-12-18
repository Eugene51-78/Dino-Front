
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
    key: "second_name",
    type: "text",
    label: "Фамилия"
  },
  {
    key: "first_name",
    type: "text",
    label: "Имя"
  },
  {
    key: "middle_name",
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
