import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { InboxIcon } from "lucide-react";

const SahayogAboutContact = () => {
  return (
    <div className="flex flex-col min-h-screen w-fit">
      <main className="flex-grow">
        <section className="py-16 px-4 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Sahayog</h2>
          <p className="text-gray-600 mb-16">
            Sahayog is a cutting-edge platform designed to revolutionize
            disaster management. By leveraging the power of real-time data and
            advanced analytics, we aim to enhance the speed and effectiveness of
            disaster response efforts, ultimately saving lives and minimizing
            the impact of catastrophic events.
          </p>

          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions or need support? Our team is here to help.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center mx-auto hover:bg-blue-700 transition duration-300">
            <InboxIcon className="mr-2" size={20} />
            Contact Us
          </button>
        </section>
      </main>

      <footer className="bg-black text-white p-8 flex justify-evenly">
        <div className="w-fit">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pl-20">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-300">
                We provide real-time weather alerts and forecasts to keep you
                informed and safe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Alerts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Forecast
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">
                  <Facebook />
                </a>
                <a href="#" className="hover:text-blue-400">
                  <Twitter />
                </a>
                <a href="#" className="hover:text-blue-400">
                  <Instagram />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 Disaster Alert System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SahayogAboutContact;
