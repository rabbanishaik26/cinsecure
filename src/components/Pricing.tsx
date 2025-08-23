import React from 'react';
import { Check, Star, Shield } from 'lucide-react';

// Helper: smooth scroll to any section by id
const scrollToSection = (id: string, offset = 0) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset; // adjust offset if you have a fixed header
  window.scrollTo({ top: y, behavior: 'smooth' });
};

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Unarmed Event Security",
      price: "$150",
      period: "per 4 hours",
      description: "Professional unarmed security for events and venues",
      features: [
        "Licensed Security Personnel",
        "Event Crowd Management",
        "Access Control",
        "Emergency Response",
        "Professional Appearance",
        "Incident Reporting"
      ],
      popular: false
    },
    {
      title: "Armed Event Security",
      price: "$175",
      period: "per 4 hours",
      description: "Enhanced armed security for high-risk events",
      features: [
        "Licensed Armed Personnel",
        "Advanced Threat Assessment",
        "High-Risk Event Management",
        "Emergency Response",
        "Tactical Support",
        "Comprehensive Reporting"
      ],
      popular: true
    },
    {
      title: "Bodyguard Services",
      price: "$200+",
      period: "per 4 hours",
      description: "Personal protection and executive security",
      features: [
        "Personal Protection Officer",
        "Risk Assessment",
        "Travel Security",
        "VIP Protection",
        "Discrete Service",
        "24/7 Availability"
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      service: "Vehicle Escort Services",
      pricing: "Contact for Details",
      description: "Secure transportation and escort services"
    },
    {
      service: "Surveillance Equipment",
      pricing: "Various Forms Available",
      description: "Professional surveillance equipment and installation"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Transparent Pricing</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            CIN security services with clear, competitive pricing. All rates are for 4-hour minimum engagements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-blue-500 text-white shadow-2xl transform scale-105'
                  : 'bg-slate-800 text-white border border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-slate-900 text-blue-500 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold">{plan.price}</span>{' '}
                  <span className={`text-lg ${plan.popular ? 'text-blue-100' : 'text-slate-400'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`${plan.popular ? 'text-blue-100' : 'text-slate-400'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`h-5 w-5 mr-3 ${plan.popular ? 'text-white' : 'text-blue-500'}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection('contact', 80)} // adjust offset if you have a fixed header
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-slate-900 text-blue-500 hover:bg-slate-800'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Additional Services</h3>
            <p className="text-slate-300">
              Specialized security services with custom pricing based on requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-slate-700 rounded-lg p-6 border border-slate-600"
              >
                <h4 className="text-xl font-semibold text-white mb-2">{service.service}</h4>
                <p className="text-slate-300 mb-4 text-sm">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 font-semibold">{service.pricing}</span>
                  <button
                    className="text-blue-500 hover:text-blue-400 font-semibold text-sm"
                    onClick={() => scrollToSection('contact', 80)}
                  >
                    Contact Us →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
