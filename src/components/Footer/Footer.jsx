import { CiMail } from "react-icons/ci";
import { FaClock, FaFacebook, FaInstagram, FaLinkedin, FaRegCopyright, FaTwitter, } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { Link } from "react-router";


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Grid Layout */}
                <div className="grid gap-10 md:gap-6 sm:grid-cols-2 md:grid-cols-4">

                    {/*Logo */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <img className='w-12 h-12 rounded-full' src="https://i.ibb.co.com/HTKvwr6c/rentcarlogoimage.jpg" alt="Rentwheels Logo" />
                            <h2 className="text-xl font-bold text-white">RentWheels </h2>
                        </div>
                        <p className="text-sm font-medium">
                            Reliable, Affordable and Premium car rental services at your fingertips.
                        </p>
                    </div>

                    {/* Contact Info  */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex  gap-2 items-center"><CiMail className="text-[#fff022] text-xl" /> support@carrental.com</li>
                            
                            <li className="flex  gap-2 items-center"><MdCall className="text-[#fff022] text-xl"/> +880 1234-567890</li>

                            <li className="flex items-center gap-2"><FaLocationDot className="text-[#fff022] text-xl" /> House 12, Road 5, Gulshan 1, Dhaka, Bangladesh</li>

                            <li className="flex  gap-2 items-center"><FaClock  className="text-[#fff022] text-xl"/> Mon - Sat: 9AM - 9PM</li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white duration-200">Home</Link></li>
                            <li><Link to="/browseCars" className="hover:text-white duration-200">Cars</Link></li>
                            <li><Link to="/myBookings" className="hover:text-white duration-200">My Bookings</Link></li>

                        </ul>
                    </div>

                    {/* Terms & Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/terms" className="hover:text-white duration-200">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-white duration-200">Privacy Policy</Link></li>
                        </ul>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-4 text-xl">
                            <a href="#" className="hover:text-white"><FaFacebook /></a>
                            <a href="#" className="hover:text-white"><FaInstagram /></a>
                            <a href="#" className="hover:text-white"><FaTwitter /></a>
                            <a href="#" className="hover:text-white"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>

                {/* copyright */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm flex justify-center items-center gap-1">
                    <span>{new Date().getFullYear()}</span>
                    <FaRegCopyright />
                    <span>RentWheels Car — All Rights Reserved.</span>
                </div>


            </div>
        </footer>
    );
};

export default Footer;
