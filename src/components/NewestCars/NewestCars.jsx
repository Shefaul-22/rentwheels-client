import React, { use } from 'react';
import { Link } from 'react-router';

const NewestCars = ({ carsPromise }) => {

    const cars = use(carsPromise);
    console.log(cars)
  
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Newest Cars</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <div
                        key={car._id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                    >
                        {/* 🖼️ Car Image */}
                        <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-48 object-cover"
                        />

                        {/* 🧾 Car Info */}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-1">{car.name}</h2>
                            <p className="text-gray-700">
                                💰 Rent: <span className="font-bold">${car.rentPrice}/day</span>
                            </p>
                            <p className="text-gray-700">🚗 Model: {car.category? car.category: `N/A`}</p>
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