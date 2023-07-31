import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'
import type { cars as car } from '@prisma/client'

export default async function getCars (
  req?: NextApiRequest,
  res?: NextApiResponse
) {
  let cars: car[]

  try {
    cars = await prisma.cars.findMany()
    return cars

  } catch (err) {
    console.error(err)
  }

}
