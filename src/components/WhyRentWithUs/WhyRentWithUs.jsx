import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const WhyRentWithUs = () => {
    return (
        <div className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-6">Why Rent With Us?</h2>
                <p className="text-center text-2xl text-gray-600 mb-5 font-medium">
                    This is a section that highlights why users should choose our service like other good websites do.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div data-tooltip-id="easyBooking" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center cursor-pointer">
                        <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
                        <p className="text-gray-600 font-medium">Book your car in just a few clicks with our user-friendly platform.</p>
                    </div>

                    <div data-tooltip-id="affordableRates" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center cursor-pointer">
                        <h3 className="text-xl font-bold mb-2">Affordable Rates</h3>
                        <p className="text-gray-600 font-medium">Competitive pricing to make your trips budget-friendly.</p>
                    </div>

                    <div data-tooltip-id="trustedProviders" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center cursor-pointer">
                        <h3 className="text-xl font-bold mb-2">Trusted Providers</h3>
                        <p className="text-gray-600 font-medium">All our car providers are verified and reliable.</p>
                    </div>


                    <div data-tooltip-id="support" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center cursor-pointer">
                        <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                        <p className="text-gray-600 font-medium">Our support team is available anytime to assist you.</p>
                    </div>
                </div>
            </div>

            
            <Tooltip id="easyBooking" content="Booking your car is fast and easy!" place="bottom" />

            <Tooltip id="affordableRates" content="Enjoy competitive prices for every trip!" place="top" />
            <Tooltip id="trustedProviders" content="All providers are verified and trustworthy." place="top" />

            <Tooltip id="support" content="Our support team is available 24/7 for your help." place="top" />
        </div>
    );
};

export default WhyRentWithUs;
