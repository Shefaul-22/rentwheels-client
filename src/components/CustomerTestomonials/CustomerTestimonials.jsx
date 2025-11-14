import React from "react";

const CustomerTestimonials = () => {
    return (
        <section className="py-16 bg-blue-50 mt-5">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className=" font-bold text-center mb-5 text-4xl">Customer Testimonials</h2>
                <p className="text-center text-gray-600 mb-6 text-xl">
                    See what our happy customers have to say about renting with us.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow text-center">
                        <p className="text-gray-700 mb-4">
                            “Amazing service! Booking was quick and the car was in perfect condition.”
                        </p>
                        <h4 className="font-semibold"> - Sarah J.</h4>
                    </div>

                    
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow text-center">
                        <p className="text-gray-700 mb-4">
                            “Affordable rates and very trustworthy providers. Highly recommend!”
                        </p>
                        <h4 className="font-semibold">- Michael B.</h4>
                    </div>

                    
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow text-center">
                        <p className="text-gray-700 mb-4">
                            “24/7 support was very helpful when I needed assistance during my trip.”
                        </p>
                        <h4 className="font-semibold">- Emily R.</h4>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerTestimonials;
