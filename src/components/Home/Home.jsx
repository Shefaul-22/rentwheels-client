import React from 'react';
import NewestCars from '../NewestCars/NewestCars';

const carsPromise = fetch('http://localhost:3000/cars').then(res => res.json());
const Home = () => {
    return (
        <div>
            <NewestCars carsPromise={carsPromise}></NewestCars>
        </div>
    );
};

export default Home;