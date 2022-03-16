import axios from "axios";
import { useEffect, useRef, useState } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import eventsService from "../services/events";
mapboxgl.accessToken = process.env.REACT_APP_MAP_API_TOKEN;


export default function MapPage(){

    const mapContainer = useRef(null);
    const map = useRef(null);
    const elemRef = useRef(null);
    const [lng, setLng] = useState(2.184007);
    const [lat, setLat] = useState(41.390205);
    const [zoom, setZoom] = useState(12);

    

    
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        eventsService.getAllEvents()
        .then((events)=>{
            events.forEach((event)=>{
                const today = new Date();
                if(event.space !== null){
                    if(event.date.slice(0, 10) === today.toISOString().slice(0, 10)){
                        const marker = new mapboxgl.Marker({element: elemRef.current})
                        .setLngLat([event.space.address.coordinates[0], event.space.address.coordinates[1]])
                        .setPopup(new mapboxgl.Popup().setHTML(`
                        <a href='/events/${event._id}?b=/events/map'><h6>${event.title}</h6></a>
                        <p>
                        Category: ${event.category}
                        <br/>
                        Time: ${event.time}
                        </p>
                        <p>
                        Address:
                        <br/>
                        ${event.space.address.direction}</p>
                        `))
                        .addTo(map.current)
                    }
                }
            })
        })
        
    });
    
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);
    

    return(
        <div>
            <h1>Today's Events</h1>
            <div className="sidebar">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}