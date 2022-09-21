export interface ITodo {
  id: number;
  title: string;
  dateCreated: Date;
  isFinished: boolean;
  note?: string;
}
