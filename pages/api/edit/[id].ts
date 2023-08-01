import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/client'


export default async function handler (req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    await prisma.cars.update({
      where: {
        id: +req.query.id!
      },
      data: {
        ...req.body
      }
    })

    res.status(200).send('Succesfully edited a car')
  }
}
