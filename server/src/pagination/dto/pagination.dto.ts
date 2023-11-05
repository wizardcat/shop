import { IsOptional, IsString } from 'class-validator'

export class PaginationDto {
  @IsString()
  @IsOptional()
  page?: string

  @IsString()
  @IsOptional()
  perPage?: string
}

// export class OrderByWithPaginaion extends PaginationDto {
//   @IsString()
//   @IsOptional()
//   orderBy?: 'desc' | 'asc'
// }
