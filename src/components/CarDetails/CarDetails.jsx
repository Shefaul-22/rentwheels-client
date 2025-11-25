import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { FaCar, FaClock, FaUserShield } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";



const CarDetails = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    // console.log(user)
    const [car, setCar] = useState(null);

    // fetch data from mongodb
    useEffect(() => {
        fetch(`http://localhost:5000/cars/${id}`)
            .then((res) => res.json())
            .then(data => {
                console.log(data)
                setCar(data)
            })

    }, [id]);


    const handleBooking = async () => {
        if (!user) {
            Swal.fire("Error", "Please login first to book the car", "error");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/bookings", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    carId: car._id,
                    userName: user.displayName,
                    userEmail: user.email,
                    location: car.location
                }),
            });

            const data = await res.json();

            // console.log(data)

            if (data.success) {
                Swal.fire({
                    title: "Car booked successfully!",
                    icon: "success",
                    draggable: true,
                    confirmButtonColor: "#4CAF50",
                });


                setCar((prev) => ({ ...prev, status: "unavailable" }));
            } else {
                Swal.fire({
                    title: "Booking failed!",
                    icon: "error",
                    draggable: true,

                });

            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Booking failed!",
                icon: "error",
                draggable: true,

            });
        }
    };

    if (!car) return <div className="text-center mt-10"><Loading></Loading></div>;

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6 pt-10 bg-white rounded-2xl shadow-md">
            <h2 className="text-4xl text-blue-600 text-center p-4 my-4 font-bold">Car details</h2>
            <div className="flex flex-col md:flex-row gap-6">

                {/* car image */}
                <div className="relative md:w-1/2 p-4">
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-96 object-cover rounded-xl"
                    />

                    {/* Available/unavailable badge */}
                    <span
                        className={`absolute top-6 right-6 px-3 py-1 rounded-full text-white font-semibold ${car.status === "available" ? "bg-green-600" : "bg-red-600"
                            }`}
                    >
                        {car.status === "available" ? "Available" : "Unavailable"}
                    </span>
                </div>

                {/* car details , provider details */}
                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
                        <div>
                            <p className="text-gray-700 mb-2">{car.description}</p>
                        </div>

                        <p className="text-gray-700 mb-1 flex  gap-2 items-center"><FaCar className="text-[#ff22ff] text-xl" /> Model: {car.category ? car.category : `N/A`}</p>

                        <p className="text-gray-700 mb-1 flex  gap-2 items-center">
                            <FaSackDollar className="text-[#ff22ff] text-xl" /> Rent: <span className="font-bold">${car.rentPrice}/day</span>
                        </p>

                        <p className="text-gray-700 mb-1 flex  gap-2 items-center">
                            <FaClock className="text-[#ff22ff] text-xl" /> <strong>Booked At:</strong>{" "}
                            {new Date(car.createdAt).toLocaleString()}
                        </p>


                        <h3 className="text-lg font-semibold mt-4">Provider Info</h3>

                        <p className="text-gray-700 mb-1 flex  gap-2 items-center"><FaUserShield className="text-[#ff22ff] text-xl" /> Provider : {car.providerName}</p>

                        <p className="text-gray-700 mb-1 flex  gap-2 items-center"><CiMail className="text-[#ff22ff] text-xl" /> Email: {car.providerEmail}</p>
                    </div>

                    {/* Book Now btn */}
                    <button
                        onClick={handleBooking}
                        disabled={car.status !== "available"}
                        className={`mt-5 py-3 rounded-lg text-white text-xl cursor-pointer font-semibold w-full transition ${car.status === "available"
                            ? "bg-blue-600 hover:bg-blue-800"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Book Now
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CarDetails;
