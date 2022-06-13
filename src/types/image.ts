import { User } from "./user";

export type ImageResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  color: `#${string}`;
  description: string;
  alt_description: string;
  categories: readonly string[];
  likes: number;
  user: User;
  url: string;
};
