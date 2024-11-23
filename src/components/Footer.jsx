import { assets } from "../assets/assets";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa"; // Importing social icons

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.abhusan} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            ABHUSHAN JEWELLERYCO.is committed to ethical business practices and
            sustainability. We partner with suppliers who adhere to fair labour
            practices and engage in environmentally responsible production
            methods. Additionally, we support community initiatives and
            charitable organizations through our corporate giving programs.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-8697887942</li>
            <li>pratipkayal1@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 py-4">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-pink-600"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-400"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://wa.me/918697887942"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="text-xl text-gray-600 hover:text-green-500" />
        </a>
      </div>

      {/* Copyright Section */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ Abhusan Jewellery - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
