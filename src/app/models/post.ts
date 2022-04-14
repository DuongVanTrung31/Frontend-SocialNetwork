import {User} from "./user";
import {Comment} from "./comment";
import {LikePost} from "./like-post";

export interface Post {
  id?:number,
  content?:string,
  image?:string,
  createdDate : Date,
  updatedDate :Date,
  status?:string,
  user: User,
  commentList: Comment[],
  likePostList: LikePost[]
}
