import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { TextField, Button, Typography, Box } from '@mui/material';

const libraries = ['places'];

function MapaConGoogleMaps() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBo69BTUOUejxqNKdRywbS2qw2icGKTqnU',
    libraries: libraries,
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);

    // Añadir evento click al mapa para agregar marcadores
    window.google.maps.event.addListener(map, 'click', function (event) {
      const marker = new window.google.maps.Marker({
        position: event.latLng,
        map: map,
      });

      // Añadir el marcador al array de marcadores
      setMarkers((prevMarkers) => [...prevMarkers, marker]);

      // Hacer zoom al mapa
      map.setZoom(11);

      // Obtener las coordenadas del clic
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Mostrar las coordenadas y el texto de ubicación
      displayLocationInfo(lat, lng);

      // Llamar a la función de geocodificación inversa
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: lat, lng: lng };
      geocoder.geocode({ location: latlng }, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            const direccion = results[0].formatted_address;
            console.log(`Dirección: ${direccion}`);
            const locationText = document.createElement('div');
            locationText.textContent = `Dirección: ${direccion}`;
            document.getElementById('location-text').innerHTML = ''; // Limpiar el texto anterior
            document.getElementById('location-text').appendChild(locationText);
          } else {
            console.log('No se encontraron resultados de geocodificación inversa.');
          }
        } else {
          console.log('La geocodificación inversa falló debido a: ' + status);
        }
      });
    });
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && map && searchTerm) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchTerm }, function (results, status) {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(13);
          displayLocationInfo(location.lat(), location.lng());
        } else {
          console.error('Error al buscar la ubicación:', status);
        }
      });
    }
  }, [isLoaded, map, searchTerm]);

  const displayLocationInfo = (lat, lng) => {
    console.log(`Coordenadas: Latitud: ${lat}, Longitud: ${lng}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(searchInput);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const clearMarkers = () => {
    // Remover cada marcador del mapa
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    // Vaciar el array de marcadores
    setMarkers([]);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '70vh',
  };

  return isLoaded ? (
    <div>
      <Box display="flex" justifyContent="flex-end" alignItems="center" p={2}>
        <form onSubmit={handleSearch}>
          <TextField
            id="search-input"
            label="Buscar ubicación..."
            variant="outlined"
            value={searchInput}
            onChange={handleInputChange}
          />
          <Button variant="contained" type="submit">
            Buscar
          </Button>
        </form>
        <Button variant="outlined" onClick={clearMarkers} sx={{ ml: 2 }}>
          Vaciar Marcadores
        </Button>
      </Box>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 24.344, lng: -102.031 }}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
        <Marker position={{ lat: 24.344, lng: -102.031 }} />
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
