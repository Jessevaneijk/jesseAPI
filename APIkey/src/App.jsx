import React, { useState, useEffect } from "react";
import './App.css';

const BusStopComponent = () => {
  const [stopInfo, setBusStop] = useState({});
  const [stopId, setStopId] = useState('');

  const BusStopData = async () => {
    if (!stopId) return; 

    const atApiUrl = `https://pp-api.at.govt.nz/gtfs/v3/stops/${stopId}`; 

    try {
      const response = await fetch(atApiUrl, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': '89898356ba9b4483872d2bdb618f07c6',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBusStop(data.data.attributes);
    } catch (error) {
      console.error('Error fetching bus stop data:', error);
    }
  };

  const handleInputChange = (event) => {
    setStopId(event.target.value); 
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    BusStopData(); 
  };

  return (
    <div>
      <h1>Bus stop</h1>
      <h2>Stop: {stopInfo.stop_name || 'N/A'}</h2>
        <p>Location: Lat: {stopInfo.stop_lat}, Lon: {stopInfo.stop_lon}</p>
        <p>Stop Code: {stopInfo.stop_code || 'N/A'}</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="stop-id" 
          value={stopId} 
          onChange={handleInputChange} 
        />
        <button type="submit" title="send">Fetch Stop Data</button>
      </form>
    </div>
  );
};

export default BusStopComponent;
