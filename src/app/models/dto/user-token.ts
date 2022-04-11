import {Role} from "../role";

export interface UserToken {
  id: number,
  username: string,
  fullName: string,
  email: string,
  token: string,
  role: Role[]
}
