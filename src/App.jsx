import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)

function App() {
  const [data, setData] = useState(null);
  const [img, setImg] = useState(null);
  const [isAlive, setIsAlive] = useState(null);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function refreshData() {
    setData(null);
    setImg(null);
    useEffect(() => {
      async function fetchData() {
        const dataFromAPI = await getDataFromAPI();
        setData(dataFromAPI);
        setImg(`https://rickandmortyapi.com/api/character/avatar/${dataFromAPI.id}.jpeg`);
      }
      fetchData();
    }, []);
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  async function getDataFromAPI() {
    const id = getRandomInt(1, 826);
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();
    setIsAlive(data.status === "Alive");
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const dataFromAPI = await getDataFromAPI();
      setData(dataFromAPI);
      setImg(`https://rickandmortyapi.com/api/character/avatar/${dataFromAPI.id}.jpeg`);
    }
    fetchData();
  }, []);
  function aliveAlert() {
    if (data.status === "Alive") {
      Swal.fire({
        icon: 'success',
        title: 'Lets goouuu',
        text: 'The character is alive !',
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    }else{
      location.reload();
    }
  }
  
  
  function deadAlert() {
    if (data.status === "Dead") {
      Swal.fire({
        icon: 'warning',
        title: 'wubalubadubdub !',
        text: 'The character is already dead :( ...',
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    }else{
      location.reload();
    }
  }
  return (
    <>
      <div className="flex justify-center items-center pt-2 w-full">
        <h1>Rick and Morty </h1>
      </div>
      <div className="flex justify-center items-center pt-4 w-full h-full">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              className="p-6"
              src={img}
              alt="SeriesImage"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{data && data.name}</h2>
            <p>Specie: {data && data.species}</p>
            <p>Gender: {data && data.gender}</p>
            <p>Location: {data && data.location.name}</p>
            <div className="card-actions justify-between">
              <button className="btn btn-success" onClick={aliveAlert}>Alive</button>
              <button className="btn btn-danger" onClick={deadAlert}>Death</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
