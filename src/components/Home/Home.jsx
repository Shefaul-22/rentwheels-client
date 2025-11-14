import React from 'react';
import NewestCars from '../NewestCars/NewestCars';
import HeroSection from '../HeroSection/HeroSection';

const carsPromise = fetch('http://localhost:3000/cars/newest').then(res => res.json());
const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <NewestCars carsPromise={carsPromise}></NewestCars>
        </div>
    );
};

export default Home;