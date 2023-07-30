import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';

export interface IOAuthUser {
  user: {
    phoneNum: string;
    password: string;
  };
}

export interface IAuthServiceSetRefreshToken {
  user?: User;
  res: Response;
}

export interface IAuthUser {
  user?: {
    id: string;
  };
}
export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}
