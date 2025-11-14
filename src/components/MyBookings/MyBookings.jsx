import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";


const MyBookings = () => {
    const { user } = use(AuthContext)
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch data from db using user email
    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/bookings?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                setBookings(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user]);

    if (loading) return (
        <div className="mt-10 flex justify-center">
            <Loading></Loading>
        </div>
    );

    const handleBookingCancel = async (bookingId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
                        method: "DELETE",
                    });

                    const data = await res.json();

                    if (data) {
                       
                        const updatedBookings = bookings.filter((booking) => booking._id !== bookingId);
                        setBookings(updatedBookings)


                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your booking has been removed.",
                            icon: "success",
                            confirmButtonColor: "#4CAF50",
                        });

                    } else {
                        Swal.fire("Error!", data.message, "error");
                    }
                } catch (error) {
                    console.error(error)
                    Swal.fire("Error!", "Something went wrong.", "error");
                }
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">
                My Bookings
            </h1>

            {bookings.length === 0 ? (
                <p className="text-center text-gray-500">No bookings found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-xl font-semibold mb-2">Car ID: {booking.carId}</h2>

                            <p className="text-gray-700 mb-1">
                                👤 <strong>Name:</strong> {booking.userName}
                            </p>

                            <p className="text-gray-700 mb-1">
                                📧 <strong>Email:</strong> {booking.userEmail}
                            </p>

                            <p className="text-gray-700 mb-1">
                                🕒 <strong>Booked At:</strong>{" "}
                                {new Date(booking.bookedAt).toLocaleString()}
                            </p>

                            <p className="text-gray-700 mb-1">
                                📍 <strong>Location:</strong> {booking.location}
                            </p>

                            <button onClick={() => handleBookingCancel(booking._id)}
                                className="mt-4 w-full py-2 rounded-lg bg-red-600 cursor-pointer text-white font-semibold hover:bg-red-700 transition"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
