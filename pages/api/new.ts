import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'
import type { cars as car } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const {
    brand,
    model_name,
    model_year,
    engine_displacement,
    fuel,
    color,
    price_czk
  }: car = req.body

  if(req.method === 'POST') {
    const newCar = await prisma.cars.create({
      data: {
        brand,
        model_name,
        model_year,
        engine_displacement,
        fuel,
        color,
        price_czk
      }
    })
  }
}
