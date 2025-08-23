import React from 'react';
import { Shield, Mail, Phone, Clock } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">Elite Security Services</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
              Professional security solutions for individuals, events, and businesses. 
              Protecting what matters most with experienced, licensed professionals.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-3" />
                <a href="mailto:cins8288@gmail.com" className="text-slate-300 hover:text-blue-500 transition-colors">
                  cins8288@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-slate-300">24/7 Emergency Response</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-slate-300">Response Time: &lt;15 minutes</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  Personal Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  Event Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  Executive Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  Transport Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  Private Investigation
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-slate-300 hover:text-blue-500 transition-colors"
                >
                  Get Quote
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2025 CIN Security Services. All rights reserved. Licensed & Insured.
            </div>
            <div className="text-slate-400 text-sm">
              CIN Security by Antonio Sylvester
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;