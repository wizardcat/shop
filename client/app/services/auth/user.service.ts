import { instance } from '@/api/api.interceptor'
import { EnumServicePath } from '@/api/const'
import { User, UserData } from '@/interfaces/user.interface'

export const UsersService = {
  async getUserProfile() {
    return instance<User[]>({
      url: `${EnumServicePath.USERS}/profile`,
      method: 'GET'
    })
  },

  async updateUserProfile(data: UserData) {
    return instance<User[]>({
      url: `${EnumServicePath.USERS}/profile`,
      method: 'PUT',
      data
    })
  },

  async updateUserFavorities(productId: string) {
    return instance<User[]>({
      url: `${EnumServicePath.USERS}/profile/favourites/${productId}`,
      method: 'PATCH'
    })
  }
}
