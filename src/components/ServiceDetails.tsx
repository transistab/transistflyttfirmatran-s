import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface ServiceDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    features: string[];
    process: string[];
    image: string;
  };
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 animate-modal overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <h3 className="font-bold mb-3">Detta ingår:</h3>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-bold mb-3">Så går det till:</h3>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                {service.process.map((step, index) => (
                  <li key={index} className="text-gray-600">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;