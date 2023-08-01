import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Container, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const router = useRouter()

  return (
    <>
      <Container maxW={'100%'} mt={'2'}>
        <Heading>Car management</Heading>
        {router.route !== '/' &&
          <Link href={'/'}>
            <Button my={'4'}><ArrowBackIcon/>&nbsp;Back to Homepage</Button>
          </Link>}
      </Container>
      <main>{children}</main>
    </>
  )
}
