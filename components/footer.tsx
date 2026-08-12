import Link from 'next/link'
import { Mail, Phone, MapPin, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center font-bold text-lg">
                🚌
              </div>
              <span className="font-bold text-lg">Punjab EV Bus</span>
            </div>
            <p className="text-gray-300 text-sm">
              Government electric public transportation service for Punjab, Pakistan.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary-light transition">
                <span className="text-lg">f</span>
              </a>
              <a href="#" className="hover:text-primary-light transition">
                <span className="text-lg">𝕏</span>
              </a>
              <a href="#" className="hover:text-primary-light transition">
                <Share2 size={20} />
              </a>
              <a href="#" className="hover:text-primary-light transition">
                <span className="text-lg">▶</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-primary-light transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/routes" className="hover:text-primary-light transition">
                  Routes
                </Link>
              </li>
              <li>
                <Link href="/live-tracking" className="hover:text-primary-light transition">
                  Live Tracking
                </Link>
              </li>
              <li>
                <Link href="/timetable" className="hover:text-primary-light transition">
                  Timetable
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/fare" className="hover:text-primary-light transition">
                  Fare Calculator
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary-light transition">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary-light transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-light transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <Phone size={18} className="mt-0.5 flex-shrink-0 text-primary-light" />
                <div>
                  <p>+92 42 1234 5678</p>
                  <p>+92 42 8765 4321</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail size={18} className="mt-0.5 flex-shrink-0 text-primary-light" />
                <a href="mailto:info@punjabevbus.pk" className="hover:text-primary-light transition">
                  info@punjabevbus.pk
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary-light" />
                <p>Lahore, Punjab, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-300 mb-3">Subscribe for updates and service alerts.</p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary-light transition"
              />
              <button className="px-3 py-2 bg-primary-light text-foreground font-medium rounded-md hover:bg-primary transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 Punjab EV Bus. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary-light transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary-light transition">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary-light transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
