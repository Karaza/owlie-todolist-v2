export interface Note {
  id: string;
  title: string;
  content: string;
  date: number;
  done: boolean;
  expanded: boolean;
}

const arr: Note[] = [];
