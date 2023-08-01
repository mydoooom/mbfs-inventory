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


export default function CarForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onTouched'
  })

  const onSubmit = data => console.log(data);

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
            <FormControl isInvalid={!!errors.model}>
              <FormLabel>Model</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. S-Class'}
                {...register('model', { required: true })}
              >
              </Input>
              {errors.model && <FormErrorMessage>Model name is required</FormErrorMessage>}
            </FormControl>
          </HStack>
          <HStack mb={'4'}>
            <FormControl isInvalid={!!errors.priceCZK}>
              <FormLabel>Price</FormLabel>
              <Input
                type={'text'}
                placeholder={'Price in CZK'}
                {...register('priceCZK', {
                  required: true,
                  pattern: /^[0-9]+$/
                })}
              >
              </Input>
              {errors.priceCZK?.type === 'pattern' && <FormErrorMessage>Should be a number</FormErrorMessage>}
              {errors.priceCZK?.type === 'required' && <FormErrorMessage>Price is required</FormErrorMessage>}
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
            <FormControl isInvalid={!!errors.modelYear}>
              <FormLabel>Model Year</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. 2022'}
                {...register('modelYear', {
                  required: true,
                  pattern: /^[0-9]+$/
                })}
              >
              </Input>
              {errors.modelYear?.type === 'pattern' && <FormErrorMessage>Should be a number</FormErrorMessage>}
              {errors.modelYear?.type === 'required' && <FormErrorMessage>Price is required</FormErrorMessage>}
            </FormControl>
          </HStack>
          <HStack mb={'4'}>
            <FormControl isInvalid={!!errors.fuelType}>
              <FormLabel>Fuel Type</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. diesel'}
                {...register('fuelType', { required: true })}
              >
              </Input>
              {errors.fuelType && <FormErrorMessage>Fuel type is required</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.engineDisplacement}>
              <FormLabel>Engine Displacement in Liters</FormLabel>
              <Input
                type={'text'}
                placeholder={'e.g. 1.9'}
                {...register('engineDisplacement', {
                  required: true,
                  pattern: /(\d*\.|,\d+|\d+\.|,\d*|\d+)/
                })}
              >
              </Input>
              {errors.engineDisplacement?.type === 'pattern' && <FormErrorMessage>Should be a number</FormErrorMessage>}
              {errors.engineDisplacement?.type === 'required' && <FormErrorMessage>Engine displacement is required</FormErrorMessage>}
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
