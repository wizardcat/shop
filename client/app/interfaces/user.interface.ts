export interface User {
  id: number
  email: string
  name: string
  avatarPath: string
  phone: string
}

export interface UserData {
  email: string
  password?: string
  name?: string
  avatarPath?: string
  phone?: string
}
