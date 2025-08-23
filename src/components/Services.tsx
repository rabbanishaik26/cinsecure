import React from 'react';
import { Shield, Users, Eye, Car, Search, Building, Dog } from 'lucide-react';

// Import images
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';
import img5 from '../images/5.jpg';
import img7 from '../images/7.jpg';
import k9dog from '../images/k9dog.png'; // <-- Add an image for K9 service

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "Personal Security",
      description: "Comprehensive personal protection services for individuals and families, ensuring your safety in all environments.",
      features: ["24/7 Protection", "Risk Assessment", "Emergency Response", "Discrete Service"],
      image: img1
    },
    {
      icon: Users,
      title: "Event Security",
      description: "Professional security management for events of all sizes, from private parties to large corporate gatherings.",
      features: ["Crowd Control", "Access Management", "VIP Protection", "Emergency Planning"],
      image: img2
    },
    {
      icon: Building,
      title: "Executive Protection",
      description: "High-level security services for executives and high-profile individuals requiring specialized protection.",
      features: ["Threat Assessment", "Travel Security", "Residence Protection", "Corporate Security"],
      image: img3
    },
    {
      icon: Car,
      title: "Transport Protection",
      description: "Secure transportation services ensuring safe passage from point A to point B with professional escorts.",
      features: ["Armored Vehicles", "Route Planning", "Driver Protection", "Emergency Protocols"],
      image: img4
    },
    {
      icon: Search,
      title: "Private Investigation",
      description: "Comprehensive investigative services conducted by licensed professionals with extensive experience.",
      features: ["Background Checks", "Surveillance", "Evidence Collection", "Report Documentation"],
      image: img5
    },
    {
      icon: Eye,
      title: "Surveillance Services",
      description: "Advanced surveillance solutions using state-of-the-art equipment and professional techniques.",
      features: ["Video Monitoring", "Covert Operations", "Electronic Surveillance", "Evidence Analysis"],
      image: img7
    },
    {
      icon: Dog,
      title: "K9 Protection Service",
      description: "Specialized canine security teams trained for personal, event, and facility protection, ensuring maximum safety and deterrence.",
      features: ["Highly Trained Dogs", "Handler Expertise", "Patrol Services", "Rates: $45–$75/hr"],
      image: k9dog
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Security Services</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive security solutions tailored to meet your specific needs with the highest level of professionalism and discretion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/40"></div>
                  <div className="absolute top-4 left-4 bg-blue-500/20 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
