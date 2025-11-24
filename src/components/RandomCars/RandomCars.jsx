import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";

import Loading from "../Loading/Loading";
import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCar } from "react-icons/fa";


const RandomCars = () => {
    const [cars, setCars] = useState([]);
    const { loading } = use(AuthContext);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    // fetch top rated cars
    useEffect(() => {
        fetch("http://localhost:5000/cars/randomCars")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCars(data);
            })
            .catch((err) => console.error(err));
    }, []);

    if (loading || !cars.length)
        return (
            <div className="text-center mt-10">
                <Loading />
            </div>
        );

    // react slick Settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 800,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 648,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="pt-5 bg-[#bdd7e7] mt-4">
            <div className="max-w-7xl mx-auto px-6">


                <h2 className="text-2xl md:text-5xl font-bold my-8 text-center ">
                    Recommended Cars For You
                </h2>

                {/* Slider Section */}
                <div className="w-full">
                    {
                        isMounted && <Slider className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" {...settings}>
                            {cars.map((car) => (
                                <div key={car._id} className="p-3">

                                    <div className="bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">

                                        {/* Car Image */}
                                        <div className="relative">
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-48 object-cover bg-white"
                                            />

                                            <span
                                                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white font-semibold ${car.status === "available" ? "bg-green-600" : "bg-red-600"
                                                    }`}
                                            >
                                                {car.status === "available" ? "Available" : "Unavailable"}
                                            </span>
                                        </div>

                                        {/* car Info here */}
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                                            <p className="text-gray-700 mb-2 h-36">{car.description}</p>

                                            <p className="text-gray-700 mb-1 flex  gap-2 items-center"><FaCar className="text-[#2231ff] text-xl"/> Category: {car.category}</p>

                                            <p className="text-gray-800 font-bold mb-1">${car.rentPrice}/day</p>

                                            <Link
                                                to={`/carDetails/${car._id}`}
                                                className="mt-4 inline-block w-full bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-amber-700 transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    }
                </div>
            </div>
        </section>
    );
};

export default RandomCars;
