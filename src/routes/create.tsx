import { Box, FormLabel as Label, Input, Textarea, Button, VStack } from '@chakra-ui/react'
import NavBar from '../assets/components/navbar';
import { Form } from 'react-router-dom'
import {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import marker from '../assets/placer.svg'
import L from 'leaflet';
import {useMutation} from '@tanstack/react-query';
const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});
export default function Create() {
    const [position, setPosition] = useState({ lat: 0, lng: 0 });
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [posOn, setPosOn] = useState(false);
    const handleClick = ()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            setPosOn(true);
          });
    }
    const disableMap = ()=>{
        setPosOn(false);
    }
    const postFn = async (e: any) => {
        const res= await fetch('https://geolocation20221206225938.azurewebsites.net/api/GeoLocs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                name: e.target.name.value,
                description: e.target.description.value,
                latitude: posOn ? position.lat : e.target.lat.value,
                longitude: posOn ? position.lng : e.target.long.value
            })
        })
        console.log("done", res.status);
    }
    const mutation = useMutation({mutationFn: postFn});
    const handleSubmit = (e: any) => {
        e.preventDefault();
        mutation.mutate(e);
        //alert("Form Submitted");
    }
    return (
        <Box>
            <NavBar />
            <Box as="main" display="flex" justifyContent="center">
                <Form method="post" onSubmit={handleSubmit}>
                    <VStack maxW="64">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" placeholder="Name" required />
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Description" required />
                        <Button colorScheme="yellow" onClick={handleClick}>My Location</Button>
                        <Button onClick={disableMap}>Different Location</Button>
                        {!posOn &&
                        <>
                            <Input type="text" name="lat" placeholder="Latitude"  />
                            <Input type="text" name="long" placeholder="Longitude"  />
                        </>
                        }
                        {posOn &&
                            <MapContainer center={[position.lat, position.lng]} zoom={7} scrollWheelZoom={true} style={{ width: "350px", height: "350px" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[position.lat, position.lng]} icon={myIcon} />
                                <Popup position={[position.lat, position.lng]}>
                                    You Are Here
                                </Popup>
                            </MapContainer>
                        }
                        <Button type="submit">Submit</Button>
                    </VStack>
                </Form>
            </Box>
        </Box>
    )
}