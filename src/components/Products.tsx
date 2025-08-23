import React from 'react';
import { Package, Shield, Shirt, Camera } from 'lucide-react';

const Products = () => {
  const products = [
    {
      icon: Package,
      title: "Medical Supplies",
      description: "Professional-grade medical supplies for emergency response and first aid situations.",
      items: ["First Aid Kits", "Emergency Medical Equipment", "Trauma Supplies", "Safety Equipment"],
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    },
    {
      icon: Shield,
      title: "Security Supplies",
      description: "High-quality security equipment and tools for professional security operations.",
      items: ["Communication Devices", "Protective Gear", "Security Tools", "Safety Equipment"],
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    },
    {
      icon: Shirt,
      title: "Security Uniforms",
      description: "Professional security uniforms designed for comfort, durability, and professional appearance.",
      items: ["Security Shirts", "Tactical Pants", "Duty Belts", "Professional Accessories"],
      image: "https://images.pexels.com/photos/17725267/pexels-photo-17725267.jpeg"
    },
    {
      icon: Camera,
      title: "Surveillance Equipment",
      description: "State-of-the-art surveillance equipment for comprehensive security monitoring solutions.",
      items: ["Security Cameras", "Recording Systems", "Monitoring Equipment", "Access Control Systems"],
      image: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Security Products</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Professional-grade security products and supplies to support your security needs and operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <div
                key={index}
                className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/40"></div>
                  <div className="absolute top-4 left-4 bg-blue-500/20 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{product.title}</h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">{product.description}</p>
                  
                  <ul className="space-y-2">
                    {product.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center text-slate-700 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            Need specific equipment or supplies? Contact us for custom quotes and availability.
          </p>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            Request Product Catalog
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;