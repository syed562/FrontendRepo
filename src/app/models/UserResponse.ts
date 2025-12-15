import { UserRole } from "../ROLE/user-role.enum";

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  roles: UserRole[];
}
