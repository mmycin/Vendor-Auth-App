import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-purple-500/20">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[50%] -left-[10%] w-[50%] h-[100%] bg-purple-500/5 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[50%] -right-[10%] w-[50%] h-[100%] bg-pink-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              VendorPortal
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting customers with the best local vendors. Seamless, secure, and simple.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social Icons */}
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center transition-all group"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-gray-400 group-hover:bg-purple-300 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {['Browse Vendors', 'How it Works', 'Pricing', 'Success Stories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-purple-300 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {['Help Center', 'Safety Center', 'Community Guidelines', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-purple-300 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-purple-300 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} VendorPortal. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <span className="text-red-500">❤</span>
            <span>for better connections</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
