import {useState} from 'react'
import {Box, Heading, HStack, Text} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

interface LinkProps{
    children: any;
    href: any;
}

export default function Link({children, href}: LinkProps){
    const [hover, setHover] = useState(false);
    const handleHoverEnter = () => setHover(true);
    const handleHoverLeave = () => setHover(false);
    return(
        <RouterLink to={href}><Text color={hover ? "blue" : "white"} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>{children}</Text></RouterLink>
    )
}