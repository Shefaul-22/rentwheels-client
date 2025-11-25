import React, { use, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const MyListings = () => {
    const { user, loading } = use(AuthContext);
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const modalRef = useRef();

    // Fetch Cars
    useEffect(() => {
        if (!user) return;
        fetch(`https://rentwheels-api-server.vercel.app/myListing?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then((res) => res.json())
            .then((data) => setCars(data))
            .catch((err) => console.error(err));
    }, [user]);

    // DELETE Car
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
            const res = await fetch(`https://rentwheels-api-server.vercel.app/cars/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${user?.accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                Swal.fire("Deleted!", "Car removed successfully.", "success");

                const updatedCars = cars.filter((car) => car._id !== id);
                setCars(updatedCars);
            } else {
                Swal.fire("Error!", "Delete failed", "error");
            }
        } catch {
            Swal.fire("Error!", "Failed to delete car", "error");
        }
    };

    // OPEN MODAL
    const openModal = (car) => {
        setSelectedCar(car);
        modalRef.current.showModal();
    };

    // CLOSE MODAL
    const closeModal = () => {
        modalRef.current.close();
        setSelectedCar(null);
    };

    // PATCH Update
    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedFields = {
            name: e.target.name.value,
            description: e.target.description.value,
            category: e.target.category.value,
            rentPrice: parseFloat(e.target.rentPrice.value),
            location: e.target.location.value,
            image: e.target.image.value,
        };

        try {
            const res = await fetch(`https://rentwheels-api-server.vercel.app/cars/${selectedCar._id}`, {
                method: "PATCH",
                headers: { 
                    authorization: `Bearer ${user?.accessToken}`,
                    "content-type": "application/json" 
                },
                body: JSON.stringify(updatedFields),
            });

            if (res.ok) {
                Swal.fire("Success!", "Car updated successfully!", "success");

                const updatedList = cars.map((car) =>
                    car._id === selectedCar._id ? { ...car, ...updatedFields } : car
                );

                setCars(updatedList);
                closeModal();
            } else {
                Swal.fire("Error!", "Update failed", "error");
            }
        } catch {
            Swal.fire("Error!", "Update failed", "error");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto mt-10 md:mt-25 p-4 sm:p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl font-bold mb-5 md:mb-8 text-center text-blue-700">
                My Listings
            </h1>

            {cars.length === 0 ? (
                <p className="text-center text-gray-600">No cars added yet.</p>
            ) : (
                <>
                    {/* Mobile View */}
                    {/* Mobile View */}
                    <div className="sm:hidden space-y-4">
                        {cars.map((car) => (
                            <div key={car._id} className="p-4 border rounded-lg shadow-sm">
                                <h2 className="font-semibold text-lg">{car.name}</h2>
                                <p>Category: {car.category}</p>
                                <p>Rent: ${car.rentPrice}/day</p>

                                <p>
                                    Status:
                                    <span
                                        className={`ml-2 px-2 py-1 rounded-full text-white text-xs ${car.status === "available" ? "bg-green-600" : "bg-red-600"
                                            }`}
                                    >
                                        {car.status}
                                    </span>
                                </p>

                                {/* ⭐ Updated Button Layout ⭐ */}
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => openModal(car)}
                                        className="btn btn-sm w-full bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => handleCarDelete(car._id)}
                                        className="btn btn-sm w-full bg-red-600 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Desktop View */}
                    <div className="hidden sm:block overflow-x-auto rounded-xl border">
                        <table className="table w-full text-sm sm:text-base">
                            <thead className="bg-gray-100 text-gray-700 text-sm">
                                <tr>
                                    <th>Car Name</th>
                                    <th>Category</th>
                                    <th>Rent Price</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map((car) => (
                                    <tr key={car._id} className="border-b hover:bg-gray-50">
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
                                        <td className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => openModal(car)}
                                                className="btn btn-xs sm:btn-sm btn-info text-white"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleCarDelete(car._id)}
                                                className="btn btn-xs sm:btn-sm btn-error text-white"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* UPDATE MODAL */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box max-w-sm sm:max-w-lg relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost"
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-lg mb-4">Update Car</h3>

                    {selectedCar && (
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input
                                name="name"
                                defaultValue={selectedCar.name}
                                className="input input-bordered w-full"
                                required
                            />

                            <textarea
                                name="description"
                                defaultValue={selectedCar.description}
                                className="textarea textarea-bordered w-full"
                                required
                            />

                            <select
                                name="category"
                                defaultValue={selectedCar.category}
                                className="select select-bordered w-full"
                                required
                            >
                                <option>Sedan</option>
                                <option>SUV</option>
                                <option>Hatchback</option>
                                <option>Luxury</option>
                                <option>Electric</option>
                            </select>

                            <input
                                name="rentPrice"
                                type="number"
                                defaultValue={selectedCar.rentPrice}
                                className="input input-bordered w-full"
                                required
                            />

                            <input
                                name="location"
                                defaultValue={selectedCar.location}
                                className="input input-bordered w-full"
                                required
                            />

                            <input
                                name="image"
                                defaultValue={selectedCar.image}
                                className="input input-bordered w-full"
                                required
                            />

                            <input
                                readOnly
                                value={selectedCar.providerName}
                                className="input input-bordered w-full bg-gray-100"
                            />

                            <input
                                readOnly
                                value={selectedCar.providerEmail}
                                className="input input-bordered w-full bg-gray-100"
                            />

                            <button type="submit" className="btn btn-primary w-full">
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyListings;

