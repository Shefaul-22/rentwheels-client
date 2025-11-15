import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import Loading from '../Loading/Loading';

const NewestCars = ({ carsPromise }) => {

    const cars = use(carsPromise);
    // console.log(cars)

    const {loading} = use(AuthContext)

    if (loading){
       return <Loading></Loading> 
    } 

    return (
        <div className=" max-w-7xl mx-auto p-6 bg-[#bdd7e7] mt-5 ">
            <h1 className="text-4xl font-bold mb-6 text-center">Newest Cars</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    cars.map((car) => (
                        <div
                            key={car._id}
                            className="bg-[#eff3ff] rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
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
                                <p className="text-gray-700">
                                    💰 Rent: <span className="font-bold">${car.rentPrice}/day</span>
                                </p>
                                <p className="text-gray-700">🚗 Model: {car.category ? car.category : `N/A`}</p>
                                <p className="text-gray-700">👤 Provider: {car.providerName}</p>

                                <Link
                                    to={`/carDetails/${car._id}`}
                                    className="btn btn-primary w-full"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default NewestCars;