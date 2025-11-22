import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import Loading from '../Loading/Loading';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


const BrowseCars = () => {
    // const { loading } = use(AuthContext)
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)

    // fetch all cars from db
    useEffect(() => {


        fetch('http://localhost:3000/cars/browsecars')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                setCars(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="p-6 mt-5">
            <h1 className="text-4xl font-bold my-8 text-center">All Cars</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    cars.map((car) => (
                        <div
                            key={car._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"

                            data-tooltip-id={`price-tooltip-${car._id}`}
                            data-tooltip-content={`Price: $${car.rentPrice}/day`}


                        >
                            {/*  Car Image */}
                            <div className="relative ">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-48 object-cover"
                                />
                                <span
                                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white font-semibold ${car.status === "available" ? "bg-green-600" : "bg-red-600"
                                        }`}
                                >
                                    {car.status === "available" ? "Available" : "Unavailable"}
                                </span>
                            </div>

                            {/* Car Information */}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-1">{car.name}</h2>
                                <p className="text-gray-700">
                                    💰 Rent: <span className="font-bold">${car.rentPrice}/day</span>
                                </p>
                                <p className="text-gray-700">🚗 Model: {car.category ? car.category : `N/A`}</p>
                                <p className="text-gray-700">👤 Provider: {car.providerName}</p>

                                <Link
                                    to={`/carDetails/${car._id}`}
                                    className="btn btn-primary w-full hover:bg-amber-700"
                                >
                                    View Details
                                </Link>
                            </div>

                            <Tooltip
                                id={`price-tooltip-${car._id}`}
                                anchorSelect={`[data-tooltip-id='price-tooltip-${car._id}']`}
                                place="top"
                                className="!bg-slate-900 !text-white !px-4 !py-2 !rounded-lg !text-sm !shadow-lg !absolute !left-1/2 !top-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 font-semibold"
                               
                                
                            />



                        </div>
                    ))}
            </div>

            {/* <Tooltip
                id="price-tooltip"
                data-tooltip-place="center"
                className="!bg-slate-900 !text-white !px-4 !py-2 !rounded-lg !text-sm !shadow-lg"
            /> */}


        </div>
    );
};

export default BrowseCars;