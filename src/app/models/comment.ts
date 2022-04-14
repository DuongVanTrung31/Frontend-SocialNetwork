import {User} from "./user";
import {LikeComment} from "./like-comment";

export interface Comment {
  id?: number,
  content: string,
  user: User,
  parentId?: number,
  createdDate? :Date,
  likeCommentList: LikeComment[]
}
