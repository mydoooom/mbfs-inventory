import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Card, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { cars as car } from '@prisma/client'


interface Props {
  cars?: car[]
}

export default function CarsList ({ cars }: Props) {
  const router = useRouter()
  const [carsList, setCarsList] = useState<car[]>()

  useEffect(() => {
    setCarsList(cars)
  }, [])

  const handleChangeRoute = (id: number) => {
    router.push(`/${id}`)
  }

  return (
    <>
      {!carsList
        ? <p>Loading</p>
        : carsList.length === 0
          ? <p>There are no cars</p>
          : (
            <Card variant={'outline'}>
              <TableContainer>
                <Table variant={'striped'}>
                  <TableCaption>List of cars available</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Brand</Th>
                      <Th>Model</Th>
                      <Th>Fuel type</Th>
                      <Th>Color</Th>
                      <Th>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {carsList.map(car => (
                      <Tr key={car.id} cursor={'pointer'} onClick={() => handleChangeRoute(car.id)}>
                        <Td>{car.brand}</Td>
                        <Td>{car.model_name}</Td>
                        <Td>{car.fuel}</Td>
                        <Td>{car.color}</Td>
                        <Td>{car.price_czk} CZK</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
          )
      }
    </>
  )
}
