import { prisma } from '../prisma/client'
import type { cars as car } from '@prisma/client'

export default async function getCar(id: number) {
  try {
    let car = await prisma.cars.findUnique({
      where: {
        id: id
      }
    })

    return car
  } catch (err) {
    console.error(err)
  }
}
