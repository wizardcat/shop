import { User } from '@/interfaces/user.interface'

export interface UserState {
  email: string
  // isAdmin: boolean
}

export interface Tokens {
  refreshToken: string
  accessToken: string
}

export interface InitialState {
  user: UserState | null
  isLoading: boolean
}

export interface EmailPassword {
  email: string
  password: string
}

export interface AuthResponse extends Tokens {
  user: User
  // & {
  //   isAdmin: boolean
  // }
}
