import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/pagination/dto/pagination.dto'
import { EnumProductSort } from 'src/types'

export class ProductSortDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EnumProductSort)
  sort?: EnumProductSort

  @IsOptional()
  @IsString()
  searchTerm?: string
}
