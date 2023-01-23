
export interface Dino {
  id: number;
  firstName: string;
  secondName: string;
  middleName: string;
  role: string;
  age: number;
  email: string;
}

export const DinoColumns = [
  {
    key: "id",
    type: "number",
    label: "ИД"
  },
  {
    key: "name",
    type: "text",
    label: "Кличка"
  },
  {
    key: "type",
    type: "text",
    label: "Вид"
  },
  {
    key: "age",
    type: "text",
    label: "Возраст"
  },
  {
    key: "height",
    type: "number",
    label: "Рост"
  },
  {
    key: "weight",
    type: "number",
    label: "Вес"
  },
  {
    key: "location",
    type: "text",
    label: "Локация"
  }
]
