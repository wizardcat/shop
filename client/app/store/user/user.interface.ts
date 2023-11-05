import { IUser } from '@/interfaces/user.interface'

export interface IUserState {
  email: string
  // isAdmin: boolean
}

export interface ITokens {
  refreshToken: string
  accessToken: string
}

export interface IInitialState {
  user: IUserState | null
  isLoading: boolean
}

export interface IEmailPassword {
  email: string
  password: string
}

export interface IAuthResponse extends ITokens {
  user: IUser
  // & {
  //   isAdmin: boolean
  // }
}
