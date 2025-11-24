import React from 'react';
import NewestCars from '../NewestCars/NewestCars';
import HeroSection from '../HeroSection/HeroSection';
import WhyRentWithUs from '../WhyRentWithUs/WhyRentWithUs';
import CustomerTestimonials from '../CustomerTestomonials/CustomerTestimonials';
import TopRatedCars from '../TopRatedCars/TopRatedCars';
import RandomCars from '../RandomCars/RandomCars';
import FramerMotionAnimation from '../FramerMotionAnimation/FramerMotionAnimation';


const carsPromise = fetch('http://localhost:5000/cars/browsecars').then(res => res.json());

const Home = () => {
    return (
        <div >

            <FramerMotionAnimation>
                <HeroSection />
            </FramerMotionAnimation>

            <FramerMotionAnimation>
                <RandomCars />
            </FramerMotionAnimation>

            <FramerMotionAnimation>
                <NewestCars carsPromise={carsPromise} />
            </FramerMotionAnimation>

            <FramerMotionAnimation>
                <WhyRentWithUs />
            </FramerMotionAnimation>

            <FramerMotionAnimation>
                <TopRatedCars />
            </FramerMotionAnimation>

            <FramerMotionAnimation>
                <CustomerTestimonials />
            </FramerMotionAnimation>

        </div>
    );
};

export default Home;
