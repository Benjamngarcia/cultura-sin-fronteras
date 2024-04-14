import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Typography, Box } from '@mui/material';

const libraries = ['places'];

function MapaConGoogleMaps() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBo69BTUOUejxqNKdRywbS2qw2icGKTqnU', // Coloca aquí tu clave de API de Google Maps
    libraries: libraries,
  });

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);

    // Añadir marcador en las coordenadas 19.4326, -99.1332
    const initialMarker = new window.google.maps.Marker({
      position: { lat: 19.4326, lng: -99.1332 },
      map: map,
    });
    setMarkers([initialMarker]);

    // Llamar a la función de geocodificación inversa
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: 19.4326, lng: -99.1332 };
    geocoder.geocode({ location: latlng }, function(results, status) {
      if (status === "OK") {
        if (results[0]) {
          const direccion = results[0].formatted_address;
          console.log(`Dirección: ${direccion}`);
          const locationText = document.createElement("div");
          locationText.textContent = `Dirección: ${direccion}`;
          document.getElementById("location-text").innerHTML = ''; // Limpia el texto anterior
          document.getElementById("location-text").appendChild(locationText);
        } else {
          console.log("No se encontraron resultados de geocodificación inversa.");
        }
      } else {
        console.log("La geocodificación inversa falló debido a: " + status);
      }
    });
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '70vh',
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 19.4326, lng: -99.1332 }} // Centrar el mapa en las coordenadas proporcionadas
        zoom={13} // Zoom suficiente para mostrar la ubicación con detalle
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
      </GoogleMap>
      <Box
        id="location-text"
        position="fixed"
        top={10}
        right={10}
        bgcolor="white"
        p={2}
        border={1}
        borderColor="#ccc"
        borderRadius={1}
      >
        <Typography variant="body1">Dirección:</Typography>
      </Box>
    </div>
  ) : (
    <></>
  );
}

export default MapaConGoogleMaps;
