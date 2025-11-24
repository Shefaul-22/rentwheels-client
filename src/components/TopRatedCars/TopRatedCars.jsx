import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";

import Loading from "../Loading/Loading";
import { Link } from "react-router";
import { FaCar } from "react-icons/fa";


const TopRatedCars = () => {
    const [cars, setCars] = useState([]);
    const { loading } = use(AuthContext)


    // fetch top rated cars 
    useEffect(() => {
        fetch("http://localhost:5000/cars/topRatedCars")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setCars(data)
            })

            .catch((err) => console.error(err));
    }, []);

    if (loading || !cars.length)
        return (
            <div className="text-center mt-10">
                <Loading />
            </div>
        );

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-5">Top Rated Cars</h2>
                <p className="text-center text-gray-600 mb-6 text-xl font-semibold">
                    Explore the cars our customers love the most.
                </p>

                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {cars.map((car) => (
                        <div
                            key={car._id}
                            className=" bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            {/* Car Image */}
                            <div className="relative">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-48 object-cover"
                                />

                                <span
                                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white font-semibold ${car.status === "available" ? "bg-green-600" : "bg-red-600"
                                        }`}
                                >
                                    {car.status === "available" ? "Available" : "Unavailable"}
                                </span>
                            </div>

                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                                <p className="text-gray-700 mb-2">{car.description}</p>
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
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TopRatedCars;
