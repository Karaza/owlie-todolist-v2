export interface Note {
  id?: string;
  title: string;
  content: string;
  date: number;
  done: boolean;
  expanded: boolean;
}

export interface User {
  uid: string;
  email: string | null;
}
