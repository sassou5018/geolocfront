import { Box, Heading, HStack } from '@chakra-ui/react'
import Link from './links'
import { Link as RouterLink } from 'react-router-dom'

import {useState} from 'react'
export default function Navbar() {
    return (
        <Box as="nav" display="flex" justifyContent="space-between" w='100vw' minH="14" bgColor="violet">
            <Box marginLeft="3" marginY='1'>
                <Heading color='white'><RouterLink to="/">Geolocalization</RouterLink></Heading>
            </Box>
            <HStack marginRight="7" marginY="1" spacing='3'>
                <Link href="/">Home</Link>
                <Link href="/create">Create</Link>
                <Link href="/get">Get</Link>
            </HStack>
        </Box>
    );
}