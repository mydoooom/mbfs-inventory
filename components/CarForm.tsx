import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl, FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input, Spacer
} from '@chakra-ui/react'
import { cars as car } from '@prisma/client'


export default function CarForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<car>({
    mode: 'onTouched'
  })

  const onSubmit = async (data: car) => {
    const newCar: car = {
      ...data,
      model_year: +data.model_year.toString().trim(),
      engine_displacement: +data.engine_displacement
        .toString()
        .trim()
        .replaceAll(',', '.')
        .replaceAll(' ', ''),
      price_czk: +data.price_czk
        .toString()
        .trim()
        .replaceAll(',', '.')
        .replaceAll(' ', '')
    }
    try {
      await fetch('/api/new', {
        body: JSON.stringify(newCar),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })

      void router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  console.log(errors)
  return (
    <Card variant={'outline'} maxW={'2xl'}>
      <CardHeader>
        <Heading>Add a new car</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack mb={'4'}>
            <FormControl isInvalid={!!errors.brand}>
              <FormLabel>Brand</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. Mercedes-Benz'}
                {...register('brand', { required: true })}
              >
              </Input>
              {errors.brand && <FormErrorMessage>Brand name is required</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.model_name}>
              <FormLabel>Model</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. S-Class'}
                {...register('model_name', { required: true })}
              >
              </Input>
              {errors.model_name && <FormErrorMessage>Model name is required</FormErrorMessage>}
            </FormControl>
          </HStack>
          <HStack mb={'4'}>
            <FormControl isInvalid={!!errors.price_czk}>
              <FormLabel>Price</FormLabel>
              <Input
                type={'text'}
                placeholder={'Price in CZK'}
                {...register('price_czk', {
                  required: true,
                  pattern: /^[0-9]+$/
                })}
              >
              </Input>
              {errors.price_czk?.type === 'pattern' && <FormErrorMessage>Should be a number</FormErrorMessage>}
              {errors.price_czk?.type === 'required' && <FormErrorMessage>Price is required</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.color}>
              <FormLabel>Color</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. black'}
                {...register('color', { required: true })}
              >
              </Input>
              {errors.color && <FormErrorMessage>Color is required</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.model_year}>
              <FormLabel>Model Year</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. 2022'}
                {...register('model_year', {
                  required: true,
                  pattern: /^[0-9]+$/
                })}
              >
              </Input>
              {errors.model_year?.type === 'pattern' && <FormErrorMessage>Should be a number</FormErrorMessage>}
              {errors.model_year?.type === 'required' && <FormErrorMessage>Price is required</FormErrorMessage>}
            </FormControl>
          </HStack>
          <HStack mb={'4'}>
            <FormControl isInvalid={!!errors.fuel}>
              <FormLabel>Fuel Type</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. diesel'}
                {...register('fuel', { required: true })}
              >
              </Input>
              {errors.fuel && <FormErrorMessage>Fuel type is required</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.engine_displacement}>
              <FormLabel>Engine Displacement in Liters</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. 1.9'}
                {...register('engine_displacement', {
                  required: true,
                  pattern: /(\d*\.|,\d+|\d+\.|,\d*|\d+)/
                })}
              >
              </Input>
              {errors.engine_displacement?.type === 'pattern' && <FormErrorMessage>Should be a number</FormErrorMessage>}
              {errors.engine_displacement?.type === 'required' && <FormErrorMessage>Engine displacement is required</FormErrorMessage>}
            </FormControl>
          </HStack>
          <HStack>
            <Spacer></Spacer>
            <Button type={'submit'} colorScheme='teal'>Submit</Button>
            <Button>Cancel</Button>
          </HStack>
        </form>
      </CardBody>
    </Card>
  )
}
