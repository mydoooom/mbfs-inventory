import { useEffect, useState } from 'react'
import type { cars } from '@prisma/client'


interface Props {
  cars?: cars[]
}

export default function CarsList({ cars }: Props) {
  const [carsList, setCarsList] = useState<cars[]>()

  useEffect(() => {
    setCarsList(cars)
  }, [])

  return (
    <>
      {!carsList
        ? <p>Loading</p>
        : carsList.length === 0
          ? <p>There are no cars</p>
          : carsList.map(car => (
            <h1>{car.brand}</h1>
          ))
      }
    </>
  )
}
