export interface PasswordExpiredResponse {
  status: 'PASSWORD_EXPIRED';
  message: string;
  forcePasswordChange: true;
}