import { Box, Card, CardBody, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react'
import { cars as car } from '@prisma/client'


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
  return (
    <>
      <Card maxW={'5xl'} overflow='hidden' variant={'outline'}>
        <Image
          src={car.photo as string | undefined}
          alt={`${car.brand} ${car.model_name}`}
          objectFit={'cover'}
        />
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
      </Card>
    </>
  )
}
