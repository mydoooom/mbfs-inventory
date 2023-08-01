import { Container } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import CarDetail from '../components/CarDetail'
import getCar from '../api/getCar'
import { getAllCarIds } from '../api/getCars'
import { cars as car } from '.prisma/client'


interface Props {
  car: car
}

export default function Car ({ car }: Props) {
  return (
    <Container maxWidth={'100%'}>
      <CarDetail car={car} />
    </Container>
  )
}

export async function getStaticPaths () {
  const paths = await getAllCarIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const car = await getCar(+context.params!.id!)

  return {
    props: {
      car
    }
  }
}
