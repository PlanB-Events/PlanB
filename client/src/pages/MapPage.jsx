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
                if(event.space !== null){
                const marker = new mapboxgl.Marker({element: elemRef.current})
                .setLngLat([event.space.address.coordinates[0], event.space.address.coordinates[1]])
                .setPopup(new mapboxgl.Popup().setHTML(`
                <h5>${event.title}</h5>
                <p>${event.space.address.direction}</p>
                `))
                .addTo(map.current)
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
    
    
    const [searchText, setSearchText] = useState("");
    
    function handleChange(event){
        setSearchText(event.target.value);
    }
    
    function handleSubmit(event){
        event.preventDefault();
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?proximity=-74.70850,40.78375&access_token=${process.env.REACT_APP_MAP_API_TOKEN}`)
        .then((response)=>{
            setLng(response.data.features[0].center[0])
            setLat(response.data.features[0].center[1])
            map.current.flyTo({center: [response.data.features[0].center[0], response.data.features[0].center[1]], zoom: 15})
            const marker1 = new mapboxgl.Marker({element: elemRef.current})
            .setLngLat([response.data.features[0].center[0], response.data.features[0].center[1]])
            .addTo(map.current)
        })
    }

    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input name="searchText" value={searchText} onChange={handleChange}/>
                <button class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" type="submit">Search</button>
            </form>
            <div className="sidebar">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
            <div ref={mapContainer} className="map-container" />
            
        </div>
    )
}