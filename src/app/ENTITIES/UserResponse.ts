import { UserRole } from "../enums/user-role.enum";

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  roles: UserRole[];
}
