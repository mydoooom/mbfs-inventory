import React, { useEffect, useState } from 'react'
import { Card, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { cars } from '@prisma/client'


interface Props {
  cars?: cars[]
}

export default function CarsList ({ cars }: Props) {
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
                      <Tr key={car.id}>
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
