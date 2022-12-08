import { Box, Heading, Text, Button, Tooltip } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
import NavBar from '../assets/components/navbar';
import { useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowDownIcon } from '@chakra-ui/icons';
import {BsPinMapFill} from 'react-icons/bs'
import L, { PosAnimation } from 'leaflet';
import marker from '../assets/placer.svg'
import { useQuery, useMutation } from '@tanstack/react-query';
const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});



const locations = [
    {
        name: "Location 1",
        description: "This is the first location",
        lat: 1,
        long: 0
    },
    {
        name: "Location 2",
        description: "This is the second location",
        lat: 0,
        long: 1
    },
    {
        name: "Location 3",
        description: "This is the third location",
        lat: 1,
        long: 1
    },
]
const fetchLocs = async (position: any) => {
    const res = await fetch(`https://geolocation20221206225938.azurewebsites.net/api/GeoLocs/${position.lat}/${position.lng}`);
    console.log(res.status)
    return res.json();
}




export default function Get() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [position, setPosition] = useState({ lat: 0, lng: 0 });
    const [posOn, setPosOn] = useState(false);
    const [activeLocation, setActiveLocation] = useState<any>(null);
    const handleClick = ()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            setPosOn(true);
          });
          mutation.mutate(position);
          console.log(mutation.data);
    }
    console.log("Active Location: ", activeLocation);
    
    
    const mutation = useMutation({mutationFn: fetchLocs});
    const handlePinClick = (location: any) => {
        setActiveLocation(location);
        onOpen();
    }

    if(mutation.error){
        return(<h1>Error!!!!!!!!!</h1>)
    }
    let locationElems;
    if(mutation.data){
        console.log(mutation.data);
        locationElems = mutation.data.map((location:any, index:any) => {
            return(
                <Marker key={index} position={[location.latitude, location.longitude]} icon={myIcon} eventHandlers={{click: (e)=>{handlePinClick(location)}}}
                />
            )
        })
    }

    const home= {
        name: "Home",
        description: "This is your home",
        lat: position.lat,
        long: position.lng
    }
    

    return (
        <>
        <Box>
            <NavBar />
            <Box as="main" display="flex" justifyContent="center">
                <Box maxW="64">
                    <Heading textAlign="center">Get Locations Around Me</Heading>
                    <Button colorScheme="blue" onClick={handleClick}>Get Based On My Location</Button>
                    {posOn && 
                    <MapContainer center={[position.lat, position.lng]} zoom={7} scrollWheelZoom={true} style={{ width: "350px", height: "350px" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Tooltip label="You Are Here">
                        <Marker position={[position.lat, position.lng]} icon={myIcon} eventHandlers={{click: (e)=>{handlePinClick(home)}}}/>
                        </Tooltip>
                        {locationElems}
                    </MapContainer>
                    }
                </Box>
            </Box>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{activeLocation ? activeLocation.name : null}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {activeLocation ? activeLocation.description : null}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}






// maps api key AIzaSyCxIzeuoRcUPihedvbt1AAtkm-ZaWB-vy4
