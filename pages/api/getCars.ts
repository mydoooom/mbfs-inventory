import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'
import type { cars } from '@prisma/client'

export default async function getCars (
  req?: NextApiRequest,
  res?: NextApiResponse
) {
  let cars: cars[]

  try {
    cars = await prisma.cars.findMany()
    return cars

  } catch (err) {
    console.error(err)
  }

}
