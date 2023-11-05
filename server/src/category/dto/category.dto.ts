import { Prisma } from '@prisma/client'
import { IsString } from 'class-validator'

export class CategoryDto implements Prisma.ProductUpdateInput {
  @IsString()
  name?: string
}
