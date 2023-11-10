import { instance } from '@/api/api.interceptor'
import { EnumServicePath } from '@/api/const'
import { StatisticsResponse } from '@/interfaces/statistics.interface'

export const StatisticsService = {
  async getUserStatistics() {
    return instance<StatisticsResponse[]>({
      url: `${EnumServicePath.STATISTICS}/main`,
      method: 'GET'
    })
  }
}
