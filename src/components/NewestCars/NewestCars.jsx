import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import Loading from '../Loading/Loading';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaCar, FaUserShield } from 'react-icons/fa';
import { FaSackDollar } from 'react-icons/fa6';

const NewestCars = ({ carsPromise }) => {


    const cars = use(carsPromise);
    // console.log(cars)

    const [search, setSearch] = useState("");

    const [allCars, setAllCars] = useState([]);

    useEffect(() => {
        setAllCars(cars);  
    }, [cars]);



    const { loading } = use(AuthContext)

    if (loading) {
        return <Loading></Loading>
    }


    const filteredCars = allCars.filter(car =>
        car.name.toLowerCase().includes(search.toLowerCase())
    );


    const displayCars = search.trim()
        ? filteredCars
        : allCars.slice(0, 6);

    return (
        <div className=" max-w-7xl mx-auto p-6 bg-[#bdd7e7] mt-5 ">
            <h1 className="text-4xl font-bold mb-6 text-center">Newest Cars</h1>

            {/* search car */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search Car By Name...."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full max-w-md rounded-full px-4 py-2"
                />
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    displayCars.length > 0 ? displayCars.map((car) => (
                        <div
                            key={car._id}
                            className="bg-[#eff3ff] rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"


                            data-tooltip-id={`price-tooltip-${car._id}`}
                            data-tooltip-content={`Price: $${car.rentPrice}/day`}
                        >
                            {/*  Car Image */}
                            <div className="relative ">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-56 object-cover rounded-md p-5"


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
                                <p className="text-gray-700 mb-1 flex  gap-2 items-center">
                                    <FaSackDollar className="text-[#ff22ff] text-xl" /> Rent: <span className="font-bold">${car.rentPrice}/day</span>
                                </p>
                                <p className="text-gray-700 mb-1 flex  gap-2 items-center"><FaCar className="text-[#ff22ff] text-xl" /> Model: {car.category ? car.category : `N/A`}</p>

                                <p className="text-gray-700 mb-2 flex  gap-2 items-center"><FaUserShield className="text-[#ff22ff] text-xl" /> Provider : {car.providerName}</p>

                                <Link
                                    to={`/carDetails/${car._id}`}
                                    className="btn btn-primary w-full"
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
                    ))
                        : <p className="col-span-3 text-center text-lg font-semibold text-red-500">No Cars Found</p>

                }
            </div>
        </div>
    );
};

export default NewestCars;