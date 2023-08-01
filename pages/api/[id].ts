import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const carId = req.query.id!

  if (req.method === 'DELETE') {
    const car = await prisma.cars.delete({
      where: {
        id: +carId
      }
    })

    res.json(car)
  } else {
    console.log(`Car with ID ${carId} does not exist.`)
  }
}
