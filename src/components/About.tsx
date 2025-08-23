import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Shield, label: "Years Experience", value: "15+" },
    { icon: Users, label: "Clients Protected", value: "500+" },
    { icon: Award, label: "Success Rate", value: "99.9%" },
    { icon: Clock, label: "Response Time", value: "<15min" }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              About CIN Security Services
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Led by Antonio Sylvester, Elite Security Services has been providing professional 
              security solutions for over a decade. Our team of licensed and experienced security 
              professionals is dedicated to protecting what matters most to you.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We specialize in comprehensive security services ranging from personal protection 
              to event security, executive protection, and private investigation services. Our 
              commitment to excellence and attention to detail sets us apart in the security industry.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <span className="text-slate-700">Licensed & Fully Insured</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <span className="text-slate-700">24/7 Emergency Response</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <span className="text-slate-700">Experienced Professional Team</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <span className="text-slate-700">Comprehensive Service Portfolio</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Professional Security Team"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/20 rounded-lg"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-500 rounded-lg p-6 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Antonio Sylvester</div>
                <div className="text-blue-100 font-semibold">Founder & Lead Security Specialist</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-lg border border-slate-200 mb-4">
                    <IconComponent className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-slate-600 text-sm">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;