import { faker } from '@faker-js/faker'
import { PrismaClient, Product } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const generateProducts = async (quantity: number) => {
  const products: Product[] = []

  for (let index = 0; index < quantity; index++) {
    const productName = faker.commerce.productName()
    const categoryName = faker.commerce.department()

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: faker.helpers.slugify(productName).toLowerCase(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
        images: Array.from({
          length: faker.number.int({ min: 2, max: 6 })
        }).map(() => faker.image.url({ width: 500, height: 500 })),
        category: {
          create: {
            name: categoryName,
            slug: faker.helpers.slugify(categoryName).toLowerCase()
          }
        },
        reviews: {
          create: [
            {
              rating: faker.number.int({ min: 1, max: 5 }),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 1
                }
              }
            },
            {
              rating: faker.number.int({ min: 1, max: 5 }),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 1
                }
              }
            }
          ]
        }
        //user for favorities. rename the field
        // user: {
        //   connect: {
        //     id: 5
        //   }
        // }
      }
    })

    products.push(product)
  }

  console.log(`Created ${products.length} products`)
}

async function main() {
  console.log('Start seeding...')
  await generateProducts(10)
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
  .catch(e => console.error(e))
