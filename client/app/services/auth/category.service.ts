import { instance } from '@/api/api.interceptor'
import { EnumServicePath } from '@/api/const'
import { Category } from '@/interfaces/category.interface'

export const CategoryService = {
  async getAllCategories() {
    return instance<Category[]>({
      url: EnumServicePath.CATEGORIES,
      method: 'GET'
    })
  },

  async getCategoryById(id: string) {
    return instance<Category[]>({
      url: `${EnumServicePath.CATEGORIES}/${id}`,
      method: 'GET'
    })
  },

  async getCategoryBySlug(slug: string) {
    return instance<Category[]>({
      url: `${EnumServicePath.CATEGORIES}/by-slug/${slug}`,
      method: 'GET'
    })
  },

  async addCategory() {
    return instance<Category>({
      url: EnumServicePath.CATEGORIES,
      method: 'POST'
    })
  },

  async updateCategory(id: string, name: string) {
    return instance<Category>({
      url: `${EnumServicePath.CATEGORIES}/${id}`,
      method: 'PUT',
      data: { name }
    })
  },

  async deleteCategory(id: string) {
    return instance<Category>({
      url: `${EnumServicePath.CATEGORIES}/${id}`,
      method: 'DELETE'
    })
  }
}
