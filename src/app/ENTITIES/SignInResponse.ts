import { PasswordExpiredResponse } from "./PasswodExpiredResponse";
import { UserResponse } from "./UserResponse";

export type SignInResponse =
  | UserResponse
  | PasswordExpiredResponse;