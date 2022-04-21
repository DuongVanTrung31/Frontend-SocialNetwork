import {User} from "../user";
import {Post} from "../post";

export interface ResponseSearch {
  users:User[],
  posts:Post[]
}
