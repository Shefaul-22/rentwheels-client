import React, { use, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const MyListings = () => {
    const { user, loading } = use(AuthContext);
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const modalRef = useRef();

    // Fetch  cars using email
    useEffect(() => {
        if (!user) return;
        fetch(`http://localhost:3000/myListing?email=${user.email}`)
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(err => console.error(err));
    }, [user]);

    // Delete car
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
                method: "DELETE"
            });
            if (res.ok) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Car removed successfully.",
                    icon: "success",
                    confirmButtonColor: "#4CAF50",
                });

                setCars(cars.filter(car => car._id !== id));
            } else {
                const errMessage = await res.json();
                Swal.fire("Error!", errMessage.message || "Delete failed", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Failed to delete car", "error");
        }
    };

    // modal 
    const openModal = (car) => {
        setSelectedCar(car);
        modalRef.current.showModal();
    };

    const closeModal = () => {
        modalRef.current.close();
        setSelectedCar(null);
    };

    // Handle update car
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
            const res = await fetch(`http://localhost:3000/cars/${selectedCar._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFields),
            });

            const data = await res.json();
            if (res.ok) {
                Swal.fire({
                    title: "Success!",
                    text: data.message,
                    icon: "success",
                    confirmButtonColor: "#4CAF50",
                });
                const newCars = cars.map(car =>
                    car._id === selectedCar._id ? { ...car, ...updatedFields } : car
                );
                setCars(newCars);
                closeModal();
            } else {
                Swal.fire("Error!", data.message || "Update failed", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Update failed", "error");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">My Listings</h1>

            {cars.length === 0 ? (
                <p className="text-center text-gray-600">No cars added yet.</p>
            ) : (
                <div className="overflow-x-auto">
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
                            {cars.map(car => (
                                <tr key={car._id} className="border-b">
                                    <td className="font-medium">{car.name}</td>
                                    <td>{car.category}</td>
                                    <td>${car.rentPrice}/day</td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-white ${car.status === "available" ? "bg-green-600" : "bg-red-600"}`}>
                                            {car.status}
                                        </span>
                                    </td>
                                    <td className="flex gap-3 justify-center">
                                        <button onClick={() => openModal(car)} className="btn btn-sm btn-info text-white">
                                            Update
                                        </button>
                                        <button onClick={() => handleCarDelete(car._id)} className="btn btn-sm btn-error text-white">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal code  */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box max-w-lg relative">
                    {/* Close btn*/ }
                    <button
                        onClick={closeModal}
                        className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost"
                        title="Close"
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-xl mb-4">Update Car</h3>

                    {selectedCar && (
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block font-medium">Car Name</label>
                                <input name="name" defaultValue={selectedCar.name} className="input input-bordered w-full" required />
                            </div>

                            <div>
                                <label className="block font-medium">Description</label>
                                <textarea name="description" defaultValue={selectedCar.description} className="textarea textarea-bordered w-full" required />
                            </div>

                            <div>
                                <label className="block font-medium">Category</label>
                                <select name="category" defaultValue={selectedCar.category} className="select select-bordered w-full" required>
                                    <option>Sedan</option>
                                    <option>SUV</option>
                                    <option>Hatchback</option>
                                    <option>Luxury</option>
                                    <option>Electric</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium">Rent Price</label>
                                <input name="rentPrice" type="number" defaultValue={selectedCar.rentPrice} className="input input-bordered w-full" required />
                            </div>

                            <div>
                                <label className="block font-medium">Location</label>
                                <input name="location" defaultValue={selectedCar.location} className="input input-bordered w-full" required />
                            </div>

                            <div>
                                <label className="block font-medium">Image URL</label>
                                <input name="image" defaultValue={selectedCar.image} className="input input-bordered w-full" required />
                            </div>

                            <div>
                                <label className="block font-medium">Provider Name</label>
                                <input name="providerName" value={selectedCar.providerName} readOnly className="input input-bordered w-full bg-gray-100" />
                            </div>

                            <div>
                                <label className="block font-medium">Provider Email</label>
                                <input name="providerEmail" value={selectedCar.providerEmail} readOnly className="input input-bordered w-full bg-gray-100" />
                            </div>

                            <div className="flex gap-2">
                                <button type="submit" className="btn btn-primary w-full">Save Changes</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyListings;
