import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎉</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                EventHub
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your premier destination for booking exceptional venues and creating unforgettable events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/venues" className="text-gray-400 hover:text-white transition">
                  Venues
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-gray-400 hover:text-white transition">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Wedding Planning</li>
              <li>Corporate Events</li>
              <li>Birthday Parties</li>
              <li>Catering Services</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>info@eventhub.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} EventHub. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition text-xs sm:text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-xs sm:text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
