import { useState } from 'react'
import { Box, Heading, Text, HStack, Button, Link } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box w="100vw" h="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Heading>GeoLocalization Application</Heading>
      <Text>Made With Vite(React) and ASP.NET</Text>
      <HStack>
        <Link href='/create'>
        <Button colorScheme="purple">Create New Location</Button>
        </Link>
        <Link href='/get'>
        <Button colorScheme="yellow">Get Locations Around Me</Button>
        </Link>
      </HStack>
    </Box>
  )
}

export default App
