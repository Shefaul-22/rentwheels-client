
import { use, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";

const AddCar = () => {
    const { user } = use(AuthContext)
    const [provider, setProvider] = useState({ name: "", email: "" });


    useEffect(() => {
        if (user) {
            setProvider({
                name: user.displayName,
                email: user.email,
            });
        }
    }, [user]);

    // Handle add car
    const handleAddCar = async (e) => {
        e.preventDefault();


        const name = e.target.name.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const rentPrice = parseFloat(e.target.rentPrice.value);
        const location = e.target.location.value;
        const image = e.target.image.value;
        console.log(name, description, category, location, image, rentPrice);


        const newCar = {
            name,
            description,
            category,
            rentPrice,
            location,
            image,
            providerName: provider.name,
            providerEmail: provider.email,
            createdAt: new Date(),
            status: "available"
        };

        try {
            const res = await fetch("http://localhost:5000/cars", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${user?.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCar),
            });

            const data = await res.json();

            // console.log(data);

            if (data.insertedId || data.acknowledged) {
                Swal.fire({
                    title: "Success!",
                    text: "Car added successfully 🎉",
                    icon: "success",
                    confirmButtonColor: "#4CAF50",
                });
                e.target.reset();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add car. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong while adding the car.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">
                Add a New Car
            </h2>

            <form onSubmit={handleAddCar} className="space-y-4">
                {/* Car Name */}
                <div>
                    <label className="block font-medium">Car Name</label>
                    <input type="text" name="name" required className="input input-bordered w-full" />
                </div>

                {/* Car Description */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        required
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                {/* Car Category */}
                <div>
                    <label className="block font-medium">Category</label>
                    <select name="category" required className="select select-bordered w-full">
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Electric">Electric</option>
                    </select>
                </div>

                {/* Rent Price */}
                <div>
                    <label className="block font-medium">Rent Price (per day)</label>
                    <input
                        type="number"
                        name="rentPrice"

                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium">Location</label>
                    <input type="text" name="location" required className="input input-bordered w-full" />
                </div>

                {/* Photo URL*/}
                <div>
                    <label className="block font-medium">Image URL</label>
                    <input type="text" name="image" required className="input input-bordered w-full" />
                </div>

                {/* Provider Information  */}
                <div>
                    <label className="block font-medium">Provider Name</label>
                    <input
                        type="text"
                        value={provider.name}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block font-medium">Provider Email</label>
                    <input
                        type="email"
                        value={provider.email}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Add car Submit btn */}
                <button type="submit" className="btn btn-primary w-full mt-4">
                    Add Car
                </button>
            </form>
        </div>
    );
};

export default AddCar;
