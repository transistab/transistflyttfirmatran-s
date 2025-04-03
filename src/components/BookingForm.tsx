import React, { useState } from 'react';
import { X, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  moveDate?: string;
  moveFrom?: string;
  moveTo?: string;
  service?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
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
    additionalServices: [] as string[],
    specialItems: [] as string[],
    notes: '',
    company: '',
    service: '',
    included_services: [] as string[],
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Namn är obligatoriskt';
      isValid = false;
    }

    // Email validation
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'E-post är obligatoriskt';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Ogiltig e-postadress';
      isValid = false;
    }

    // Phone validation
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Telefon är obligatoriskt';
      isValid = false;
    } else if (!/^[0-9+\-\s()]{6,}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Ogiltigt telefonnummer';
      isValid = false;
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Välj en tjänst';
      isValid = false;
    }

    // Move date validation (if provided)
    if (formData.moveDate) {
      const selectedDate = new Date(formData.moveDate);
      const today = new Date();
      if (selectedDate < today) {
        newErrors.moveDate = 'Datum kan inte vara i det förflutna';
        isValid = false;
      }
    }

    // Address validation
    if (!formData.moveFrom.trim()) {
      newErrors.moveFrom = 'Från-adress är obligatoriskt';
      isValid = false;
    }
    if (!formData.moveTo.trim()) {
      newErrors.moveTo = 'Till-adress är obligatoriskt';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const moveDate = formData.moveDate ? formData.moveDate : null;

      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            customer_name: formData.customerName,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone,
            move_date: moveDate,
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
            company: formData.company || null,
            service: formData.service,
            included_services: formData.included_services,
            status: 'pending'
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
          company: '',
          service: '',
          included_services: [],
        });
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setErrors({
        ...errors,
        submit: 'Ett fel uppstod. Kontrollera din inmatning och försök igen.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const renderError = (error?: string) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
        <AlertCircle className="h-3 w-3" />
        <span>{error}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-sm mx-4 rounded-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-4">
          {!isSuccess ? (
            <>
              <h2 className="text-lg font-bold mb-1">Boka Transist</h2>
              <p className="text-gray-600 mb-3 text-sm">
                Vi återkommer inom 24 timmar med ett personligt erbjudande.
              </p>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Namn *
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className={`w-full px-2 py-1.5 border text-sm rounded ${
                      errors.customerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ditt namn"
                  />
                  {renderError(errors.customerName)}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    E-post *
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className={`w-full px-2 py-1.5 border text-sm rounded ${
                      errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="din@email.se"
                  />
                  {renderError(errors.customerEmail)}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className={`w-full px-2 py-1.5 border text-sm rounded ${
                      errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ditt telefonnummer"
                  />
                  {renderError(errors.customerPhone)}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Företag (valfritt)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-2 py-1.5 border border-gray-300 text-sm rounded"
                    placeholder="Företagsnamn"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tjänst *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-2 py-1.5 border text-sm rounded ${
                      errors.service ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Välj tjänst</option>
                    <option value="flytthjälp">Flytthjälp</option>
                    <option value="städning">Städning</option>
                    <option value="packning">Packning</option>
                    <option value="montering">Montering</option>
                    <option value="magasering">Magasering</option>
                  </select>
                  {renderError(errors.service)}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Önskat datum
                  </label>
                  <input
                    type="date"
                    value={formData.moveDate}
                    onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                    className={`w-full px-2 py-1.5 border text-sm rounded ${
                      errors.moveDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {renderError(errors.moveDate)}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Från adress *
                  </label>
                  <input
                    type="text"
                    value={formData.moveFrom}
                    onChange={(e) => setFormData({ ...formData, moveFrom: e.target.value })}
                    className={`w-full px-2 py-1.5 border text-sm rounded ${
                      errors.moveFrom ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Gatuadress, postnummer och ort"
                  />
                  {renderError(errors.moveFrom)}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Till adress *
                  </label>
                  <input
                    type="text"
                    value={formData.moveTo}
                    onChange={(e) => setFormData({ ...formData, moveTo: e.target.value })}
                    className={`w-full px-2 py-1.5 border text-sm rounded ${
                      errors.moveTo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Gatuadress, postnummer och ort"
                  />
                  {renderError(errors.moveTo)}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Meddelande
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-2 py-1.5 border border-gray-300 text-sm rounded"
                    placeholder="Beskriv dina behov och önskemål..."
                  ></textarea>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-600">
                    {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-3 py-2 text-sm font-medium hover:bg-primary-hover transition flex items-center justify-center space-x-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Skickar...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Skicka förfrågan</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  * Obligatoriska fält
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-green-600 mb-1">Tack!</h3>
              <p className="text-gray-600 text-sm">
                Vi har tagit emot din förfrågan och återkommer inom kort.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;