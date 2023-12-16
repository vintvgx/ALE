import { UserModel } from "./userModel";

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
  user: UserModel | undefined; //TODO change in models.py author -> user
  topic: Topic;
  title: string;
  content: string;
  created_at?: string | undefined; //TODO change in models.py created_at -> published
  cover?: File | string | null;
}

export interface BlogPostData {
  topic: Topic;
  title: string;
  content: string;
  cover?: string | null;
  user: number;
}
