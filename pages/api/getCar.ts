import { prisma } from '../../prisma/client'
import type { cars as car } from '@prisma/client'

export default async function getCars(id: number) {
  let car: car | null

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
