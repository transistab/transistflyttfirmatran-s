import React, { useState } from 'react';
import { Calendar, MapPin, Home, Package, Truck, Plus, Minus, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  moveDate: string;
  moveFrom: string;
  moveTo: string;
  propertySize: string;
  floorFrom: number;
  floorTo: number;
  elevatorFrom: boolean;
  elevatorTo: boolean;
  additionalServices: string[];
  specialItems: string[];
  notes: string;
}

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    moveDate: '',
    moveFrom: '',
    moveTo: '',
    propertySize: '',
    floorFrom: 0,
    floorTo: 0,
    elevatorFrom: false,
    elevatorTo: false,
    additionalServices: [],
    specialItems: [],
    notes: '',
  });

  const propertySizes = [
    { value: '1rum', label: '1 rum & kök' },
    { value: '2rum', label: '2 rum & kök' },
    { value: '3rum', label: '3 rum & kök' },
    { value: '4rum', label: '4 rum & kök' },
    { value: '5rum', label: '5 rum & kök' },
    { value: 'villa', label: 'Villa' },
  ];

  const additionalServices = [
    { id: 'packing', label: 'Packning' },
    { id: 'unpacking', label: 'Uppackning' },
    { id: 'cleaning', label: 'Flyttstädning' },
    { id: 'storage', label: 'Magasinering' },
    { id: 'insurance', label: 'Extra försäkring' },
  ];

  const specialItems = [
    { id: 'piano', label: 'Piano' },
    { id: 'safe', label: 'Kassaskåp' },
    { id: 'art', label: 'Konst/Antikviteter' },
    { id: 'gym', label: 'Gymutrustning' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            customer_name: formData.customerName,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone,
            move_date: formData.moveDate,
            move_from: formData.moveFrom,
            move_to: formData.moveTo,
            property_size: formData.propertySize,
            floor_from: formData.floorFrom,
            floor_to: formData.floorTo,
            elevator_from: formData.elevatorFrom,
            elevator_to: formData.elevatorTo,
            additional_services: formData.additionalServices,
            special_items: formData.specialItems,
            notes: formData.notes,
          },
        ]);

      if (error) throw error;

      setIsSuccess(true);
      
      setTimeout(() => {
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          moveDate: '',
          moveFrom: '',
          moveTo: '',
          propertySize: '',
          floorFrom: 0,
          floorTo: 0,
          elevatorFrom: false,
          elevatorTo: false,
          additionalServices: [],
          specialItems: [],
          notes: '',
        });
        setStep(1);
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Det gick inte att skicka bokningen. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Flyttinformation</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flyttdatum
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  required
                  value={formData.moveDate}
                  onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Från adress
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.moveFrom}
                  onChange={(e) => setFormData({ ...formData, moveFrom: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Gatuadress, postnummer och ort"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Våning
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, floorFrom: Math.max(0, formData.floorFrom - 1) })}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{formData.floorFrom}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, floorFrom: formData.floorFrom + 1 })}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hiss
                </label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, elevatorFrom: !formData.elevatorFrom })}
                  className={`px-4 py-2 border rounded-lg w-full ${
                    formData.elevatorFrom 
                      ? 'bg-primary text-white border-primary' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {formData.elevatorFrom ? 'Ja' : 'Nej'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Till adress
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.moveTo}
                  onChange={(e) => setFormData({ ...formData, moveTo: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Gatuadress, postnummer och ort"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Våning
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, floorTo: Math.max(0, formData.floorTo - 1) })}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{formData.floorTo}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, floorTo: formData.floorTo + 1 })}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hiss
                </label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, elevatorTo: !formData.elevatorTo })}
                  className={`px-4 py-2 border rounded-lg w-full ${
                    formData.elevatorTo 
                      ? 'bg-primary text-white border-primary' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {formData.elevatorTo ? 'Ja' : 'Nej'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bostadens storlek
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {propertySizes.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, propertySize: size.value })}
                    className={`px-4 py-2 border rounded-lg ${
                      formData.propertySize === size.value
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition"
              >
                Nästa steg
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Tilläggstjänster</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Välj tilläggstjänster
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      const services = formData.additionalServices.includes(service.id)
                        ? formData.additionalServices.filter(s => s !== service.id)
                        : [...formData.additionalServices, service.id];
                      setFormData({ ...formData, additionalServices: services });
                    }}
                    className={`px-4 py-3 border rounded-lg flex items-center justify-between ${
                      formData.additionalServices.includes(service.id)
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{service.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Specialföremål
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const items = formData.specialItems.includes(item.id)
                        ? formData.specialItems.filter(i => i !== item.id)
                        : [...formData.specialItems, item.id];
                      setFormData({ ...formData, specialItems: items });
                    }}
                    className={`px-4 py-3 border rounded-lg flex items-center justify-between ${
                      formData.specialItems.includes(item.id)
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Övrig information
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Beskriv eventuella särskilda önskemål eller information som kan vara relevant..."
              ></textarea>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-600 hover:text-gray-800 transition"
              >
                Tillbaka
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition"
              >
                Nästa steg
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Dina uppgifter</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Namn
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-post
              </label>
              <input
                type="email"
                required
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                required
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-gray-600 hover:text-gray-800 transition"
              >
                Tillbaka
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Skickar...</span>
                  </>
                ) : (
                  <span>Skicka förfrågan</span>
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Tack för din förfrågan!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Vi har mottagit din bokningsförfrågan och återkommer inom kort med en 
                detaljerad offert och förslag på upplägg.
              </p>
              <a
                href="/"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition"
              >
                Tillbaka till startsidan
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <SEO 
        title="Boka"
        description="Boka flytthjälp eller städning med Transist. Få en kostnadsfri offert och låt oss hjälpa dig med en smidig och professionell flytt."
        type="website"
        canonical="https://transist.se/boka"
      />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Boka Flytthjälp</h1>
            <p className="text-gray-600">
              Fyll i formuläret nedan för att få en kostnadsfri offert på din flytt.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((number) => (
                <div
                  key={number}
                  className={`flex items-center ${
                    number !== 3 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= number
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {number}
                  </div>
                  {number !== 3 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        step > number ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {renderStep()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;