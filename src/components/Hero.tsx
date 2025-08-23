import React from 'react';
import { Phone, Mail } from 'lucide-react';
import logo from '../images/logo.png'; // <-- import your logo

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/30687133/pexels-photo-30687133.jpeg')"
        }}
      ></div>
      <div className="absolute inset-0 bg-slate-900/80"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo instead of Shield */}
        <div className="flex justify-center mb-8">
          <div className="bg-blue-500/20 p-4 rounded-full">
            <img 
              src={logo} 
              alt="CIN Security Logo" 
              className="h-50 w-40 object-contain rounded-full" 
            />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          CIN Security
          <span className="block text-blue-500">Services</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Professional security solutions for individuals, events, and businesses. 
          Protecting what matters most with experienced, licensed professionals.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => scrollToSection('services')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            View Services
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
          >
            Get Quote
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-slate-300">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-500" />
            <span>24/7 Emergency Response</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" />
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="CIN Icon" className="h-5 w-5 object-contain rounded-full" />
            <span>Professional Team</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
