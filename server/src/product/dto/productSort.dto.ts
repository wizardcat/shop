import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/pagination/dto/pagination.dto'
import { ProductSort } from 'src/types'

export class ProductSortDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ProductSort)
  sort?: ProductSort

  @IsOptional()
  @IsString()
  searchTerm?: string
}
