import {Role} from "../role";

export interface UserToken {
  id: number,
  username: string,
  email: string,
  token: string,
  role: Role[]
}
