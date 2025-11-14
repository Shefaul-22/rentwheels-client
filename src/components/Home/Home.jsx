import React from 'react';
import NewestCars from '../NewestCars/NewestCars';
import HeroSection from '../HeroSection/HeroSection';
import WhyRentWithUs from '../WhyRentWithUs/WhyRentWithUs';
import CustomerTestimonials from '../CustomerTestomonials/CustomerTestimonials';
import TopRatedCars from '../TopRatedCars/TopRatedCars';

const carsPromise = fetch('http://localhost:3000/cars/newest').then(res => res.json());
const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <NewestCars carsPromise={carsPromise}></NewestCars>
            <WhyRentWithUs></WhyRentWithUs>
            <TopRatedCars></TopRatedCars>
            <CustomerTestimonials></CustomerTestimonials>
        </div>
    );
};

export default Home;