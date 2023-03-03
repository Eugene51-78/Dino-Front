
// export interface Dino {
//   id: number;
//   firstName: string;
//   secondName: string;
//   middleName: string;
//   role: string;
//   age: number;
//   email: string;
// }

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
    label: "Рост, см"
  },
  {
    key: "weight",
    type: "number",
    label: "Вес, кг"
  },
  {
    key: "training",
    type: "number",
    label: "Дрессировка, %"
  },
  {
    key: "calm",
    type: "number",
    label: "Спокойствие, %"
  },
  {
    key: "location",
    type: "text",
    label: "Локация"
  }
]
