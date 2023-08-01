import { Container } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllCarIds();
  return {
    paths,
    fallback: "blocking",

  };
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const car = await getCar(+context.params!.id!)

  if(!car){
    return {
      notFound: true
    }
  }

  return {
    props: {
      car
    },
    revalidate: true
  }
}
