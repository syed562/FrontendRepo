import { UserRole } from "../enums/user-role.enum";
export interface userDetails{
    id?: number;
    username:string;
    email:string;
    password:string;
    roles:UserRole[];
}