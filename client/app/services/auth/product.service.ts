import { instance } from '@/api/api.interceptor'
import { EnumServicePath } from '@/api/const'
import { Product, ProductDataFilters } from '@/interfaces/product.interface'

export const ProductService = {
  async getAllProducts(queryData: ProductDataFilters) {
    return instance<Product[]>({
      url: EnumServicePath.PRODUCTS,
      method: 'GET',
      params: queryData || {}
    })
  },

  async getSimilarProduct(productId: string | number) {
    return instance<Product[]>({
      url: `${EnumServicePath.PRODUCTS}/similar/${productId}`,
      method: 'GET'
    })
  },

  async getProductBySlug(slug: string) {
    return instance<Product>({
      url: `${EnumServicePath.PRODUCTS}/by-category/${slug}`,
      method: 'GET'
    })
  },

  async getProductByCategory(categorySlug: string) {
    return instance<Product[]>({
      url: `${EnumServicePath.PRODUCTS}/by-slug/${categorySlug}`,
      method: 'GET'
    })
  },

  async getProductById(id: string) {
    return instance<Product>({
      url: `${EnumServicePath.PRODUCTS}/${id}`,
      method: 'GET'
    })
  },

  async addProduct() {
    return instance<Product>({
      url: EnumServicePath.PRODUCTS,
      method: 'POST'
    })
  },

  async updateProduct(id: string, name: string) {
    return instance<Product>({
      url: `${EnumServicePath.PRODUCTS}/${id}`,
      method: 'PUT',
      data: { name }
    })
  },

  async deleteProduct(id: string) {
    return instance<Product>({
      url: `${EnumServicePath.PRODUCTS}/${id}`,
      method: 'DELETE'
    })
  }
}
