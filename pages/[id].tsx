import { GetStaticProps } from 'next'
import getCar from './api/getCar'
import { getAllCarIds } from './api/getCars'
import { cars as car } from '.prisma/client'

interface Props {
  car: car
}
export default function Car({car}: Props) {
  console.log(car)
  return (
    <h1>{car.brand}</h1>
  )
}

export async function getStaticPaths() {
  const paths = await getAllCarIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const car = await getCar(+context.params!.id!)
  console.log(car)
  return {
    props: {
      car
    }
  }
}
