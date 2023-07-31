import { prisma } from '../../prisma/client'
import type { cars } from '@prisma/client'

export default async function getCars(id: number) {
  let car: cars | null

  try {
    car = await prisma.cars.findUnique({
      where: {
        id: id
      }
    })
    return car

  } catch (err) {
    console.error(err)
  }
}
