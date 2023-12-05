import { User } from "./userModel";

export interface Topic {
  id: number;
  name: string;
}

export interface BlogContent {
  type: string;
  value?: string;
  level?: number;
  url?: string;
  alt?: string;
  caption?: string;
}

export interface BlogPost {
  title: string;
  content: string;
  created_at: string; //TODO change in models.py created_at -> published
  author: User | undefined; //TODO change in models.py author -> user
  cover: File | string | null;
  topic: number;
}
