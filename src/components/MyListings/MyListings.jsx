import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const MyListings = () => {
    const { user, loading } = use(AuthContext);
    const [cars, setCars] = useState([]);

    // 🔹 Fetch provider cars
    useEffect(() => {
        if (!user) return;

        fetch(`http://localhost:3000/myListing?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => setCars(data))
            .catch((err) => console.error(err));
    }, [user]);

    // handleCardelete btn
    const handleCarDelete = async (id) => {
        const confirmed = await Swal.fire({
            title: "Are you sure?",
            text: "This car will be deleted permanently",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (!confirmed.isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:3000/cars/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Car removed successfully.",
                    icon: "success",
                    confirmButtonColor: "#4CAF50",
                });

               
                const updatedCars = cars.filter((car) => car._id !== id);
                setCars(updatedCars);

            } else {
                const errMessage = await res.json();
                Swal.fire({
                    title: "Error!",
                    text: errMessage.message || "Delete failed",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });

            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to delete car", "error");
        }
    };

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">

            <h1 className="text-3xl font-bold mb-6 text-center">My Listings</h1>

            {cars.length === 0 ? (
                <p className="text-center text-gray-600">No cars added yet.</p>
            ) : (
                <div className="overflow-x-auto">

                    {/* Table here */}
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th>Car Name</th>
                                <th>Category</th>
                                <th>Rent Price</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car) => (
                                <tr key={car._id} className="border-b">
                                    <td className="font-medium">{car.name}</td>
                                    <td>{car.category}</td>
                                    <td>${car.rentPrice}/day</td>

                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-white ${car.status === "available"
                                                ? "bg-green-600"
                                                : "bg-red-600"
                                                }`}
                                        >
                                            {car.status}
                                        </span>
                                    </td>

                                    <td className="flex gap-3 justify-center">

                                        {/*Update car code here */}
                                        <Link
                                            to={`/updateCar/${car._id}`}
                                            className="btn btn-sm btn-info text-white"
                                        >
                                            Update
                                        </Link>

                                        {/*delete btn */}
                                        <button
                                            onClick={() => handleCarDelete(car._id)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default MyListings;
