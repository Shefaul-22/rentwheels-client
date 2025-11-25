import React, { useEffect, useState } from 'react';
import {  Link } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import Loading from '../Loading/Loading';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaSackDollar } from 'react-icons/fa6';
import { FaCar, FaUserShield } from 'react-icons/fa';


const BrowseCars = () => {
    // const { loading } = use(AuthContext)
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)


    const [search, setSearch] = useState("")
    // fetch all cars from db
    useEffect(() => {

        setLoading(true);

        fetch('https://rentwheels-api-server.vercel.app/cars/browsecars')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setCars(data);
                setLoading(false);
            })
            .catch((error) => {

                console.error(error)
                // console.log(error);
                setLoading(false)
            });
    }, []);


    const filteredCars = cars.filter(car =>
        car.name.toLowerCase().includes(search.toLowerCase())
    );


    if (loading) {
        return <Loading></Loading>
    }


    // if (!cars.length) return <p>No cars found.</p>;

    return (
        <div className="p-6 mt-5">
            <h1 className="text-4xl font-bold my-8 text-center">All Cars</h1>

            {/* search  */}

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
                    filteredCars.map((car) => (
                        <div
                            key={car._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"

                            data-tooltip-id={`price-tooltip-${car._id}`}
                            data-tooltip-content={`Price: $${car.rentPrice}/day`}


                        >
                            {/*  Car Image */}
                            <div className="relative p-4">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-60 object-cover rounded-xl"
                                />
                                <span
                                    className={`absolute top-5 right-5 px-3 py-1 rounded-full text-white font-semibold ${car.status === "available" ? "bg-green-600" : "bg-red-600"
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

            {
                cars.length === 0 && <p className='text-3xl font-bold text-red-400 text-center'> No cars added yet</p>
            }

            {/* <Tooltip
                id="price-tooltip"
                data-tooltip-place="center"
                className="!bg-slate-900 !text-white !px-4 !py-2 !rounded-lg !text-sm !shadow-lg"
            /> */}


        </div>
    );
};

export default BrowseCars;