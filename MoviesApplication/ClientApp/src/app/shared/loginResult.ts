export class LoginResult {
  token: string;
  expiration: Date;
}

export class LoginRequest {
  email: string;
  password: string;
}
