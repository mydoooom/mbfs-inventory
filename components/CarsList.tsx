import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Card, Flex, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { cars as car } from '@prisma/client'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'


interface Props {
  cars?: car[]
}

export default function CarsList ({ cars }: Props) {
  const router = useRouter()
  const [carsList, setCarsList] = useState<car[]>()

  useEffect(() => {
    setCarsList(cars)
  }, [])

  const handleChangeRoute = (id: number, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    const target = event.target as HTMLElement

    if(!target.innerText) {
      return
    } else {
      router.push(`/${id}`)
    }
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
                      <Tr
                        key={car.id}
                        cursor={'pointer'}
                        onClick={(event) => handleChangeRoute(car.id, event)}>
                        <Td>{car.brand}</Td>
                        <Td>{car.model_name}</Td>
                        <Td>{car.fuel}</Td>
                        <Td>{car.color}</Td>
                        <Td>{car.price_czk} CZK</Td>
                        <Td id={'editAndDeleteBtns'}>
                          <Flex gap={'1'}>
                            <IconButton aria-label={'Edit'} icon={<EditIcon />} />
                            <IconButton aria-label={'Delete'} icon={<DeleteIcon />} />
                          </Flex>
                        </Td>
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
