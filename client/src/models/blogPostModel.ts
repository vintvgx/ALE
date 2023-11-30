import { User } from "./userModel";

export interface BlogPost {
  title: string;
  content: string;
  cover: File | string | null;
  created_at: string; //TODO change in models.py created_at -> published
  user: User | undefined; //TODO change in models.py author -> user
}
