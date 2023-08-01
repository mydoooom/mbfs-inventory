import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  HStack,
  Image,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { cars as car } from '@prisma/client'
import { useRouter } from 'next/router'


interface InformationBitProps {
  title: string
  value: string | number
  unit?: string
}

const InformationBit = ({ title, value, unit }: InformationBitProps) => (
  <Box>
    <Text fontSize={'md'}>{title}</Text>
    {typeof value == 'number'
      ? <Text fontSize={'3xl'}>{`${Intl.NumberFormat('cs-CZ').format(value)} ${unit ? unit : ''}`}</Text>
      : <Text fontSize={'3xl'}>{`${value}`}</Text>
    }
  </Box>
)

interface Props {
  car: car
}

export default function CarDetail ({ car }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/${id}`, {
        method: 'DELETE'
      })
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Card maxW={'6xl'} overflow='hidden' variant={'outline'} direction={{ base: 'column', md: 'row' }}>
        <Image
          src={car.photo as string | undefined}
          alt={`${car.brand} ${car.model_name}`}
          objectFit={'cover'}
          maxW={{ base: '100%', md: '500px' }}
        />
        <Stack>
          <CardBody>
            <Heading mb={8}>{`${car.brand} ${car.model_name}`}</Heading>
            <HStack spacing={'5rem'} mb={4}>
              <InformationBit title={'Price'} value={car.price_czk} unit={'CZK'}/>
              <InformationBit title={'Color'} value={car.color}/>
              <InformationBit title={'Model Year'} value={car.model_year.toString()}/>
            </HStack>
            <HStack spacing={'5rem'}>
              <InformationBit title={'Fuel Type'} value={car.fuel}/>
              <InformationBit title={'Engine Displacement'} value={car.engine_displacement} unit={'L'}/>
            </HStack>
          </CardBody>
          <CardFooter>
            <Flex gap={1}>
              <Button colorScheme={'yellow'}><EditIcon/>&nbsp;Edit</Button>
              <Button colorScheme={'red'} onClick={onOpen}><DeleteIcon/>&nbsp;Delete</Button>
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warning!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure to delete this car?
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme={'red'} onClick={() => handleDelete(car.id)}><DeleteIcon/>&nbsp;Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
