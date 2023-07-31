import { prisma } from '../../prisma/client'
import type { cars as car } from '@prisma/client'

export async function getCars() {
  let cars: car[]

  try {
    cars = await prisma.cars.findMany()
    return cars

  } catch (err) {
    console.error(err)
  }
}

export async function getAllCarIds() {
  const carIds = await prisma.cars.findMany({
    select: {
      id: true
    }
  })

  return carIds.map(car => {
    return {
      params: {
        id: car.id.toString()
      }
    }
  })
}
