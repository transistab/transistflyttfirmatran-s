import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, Loader2, MessageSquare, Users, Building2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import BookingForm from '../components/BookingForm';
import SEO from '../components/SEO';

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });

  const address = "Storgatan 55a, 573 32 Tranås";
  const googleMapsUrl = "https://www.google.com/maps/place/Storgatan+55A,+573+32+Tran%C3%A5s";
  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir//Storgatan+55A,+573+32+Tran%C3%A5s";

  const handleBooking = (source: string) => {
    if (source.includes('quick')) {
      setIsModalOpen(true);
    } else {
      navigate('/boka');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            service: formData.service,
            notes: formData.message,
            status: 'pending'
          },
        ]);

      if (error) throw error;

      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', message: '', service: '' });
      }, 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Det gick inte att skicka meddelandet. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <SEO 
        title="Kontakt"
        description="Kontakta Transist för frågor eller offert på flytt- och städtjänster. Vi finns tillgängliga via telefon, mail eller besök oss på vårt kontor i Tranås."
        type="website"
        canonical="https://transist.se/kontakt"
      />

      <BookingForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Hero Section */}
      <section 
        className="relative h-[50vh] min-h-[400px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Kontakta Oss</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Vi finns här för att hjälpa dig med din flytt. Kontakta oss idag för en 
            kostnadsfri konsultation.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 -mt-20 relative z-20">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Ring Oss</h3>
              <p className="text-gray-600 mb-4">Tillgängliga för att svara på dina frågor</p>
              <a 
                href="tel:0735518845"
                className="text-primary hover:text-primary-hover transition font-semibold"
              >
                073-551 88 45
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Maila Oss</h3>
              <p className="text-gray-600 mb-4">Svar inom 24 timmar</p>
              <a 
                href="mailto:info@transist.se"
                className="text-primary hover:text-primary-hover transition font-semibold"
              >
                info@transist.se
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Besök Oss</h3>
              <p className="text-gray-600 mb-4">Välkommen till vårt kontor</p>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover transition font-semibold"
              >
                {address}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Skicka ett meddelande</h2>
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Namn</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tjänst</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Välj tjänst</option>
                      <option value="flytthjälp">Flytthjälp</option>
                      <option value="städning">Städning</option>
                      <option value="packning">Packning</option>
                      <option value="montering">Montering</option>
                      <option value="magasering">Magasering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meddelande</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Skickar...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Skicka meddelande</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Tack!</h3>
                  <p className="text-gray-600">
                    Vi har tagit emot ditt meddelande och återkommer inom kort.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Kontaktinformation</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Besöksadress</p>
                      <a 
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-hover transition block"
                      >
                        {address}
                      </a>
                      <a 
                        href={googleMapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary-hover transition mt-1 inline-block"
                      >
                        Få vägbeskrivning →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Öppettider</p>
                      <div className="text-gray-600">
                        <p>Vardagar: 06:00-18:00</p>
                        <p>Lördag: 10:00-18:00</p>
                        <p>Söndag: Stängt</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[300px] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2089.7433397180877!2d14.973844776979817!3d58.03633897392413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465a5d1a0ebff4e3%3A0x7f1b79d24a530f71!2sStorgatan%2055A%2C%20573%2032%20Tran%C3%A5s!5e0!3m2!1ssv!2sse!4v1710272144943!5m2!1ssv!2sse"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12">Varför välja oss?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Erfaret team</h3>
              <p className="text-gray-600">
                Vårt professionella team har många års erfarenhet av flyttjänster
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Snabb service</h3>
              <p className="text-gray-600">
                Vi svarar på förfrågningar inom 24 timmar
              </p>
            </div>
            <div className="text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Lokalt företag</h3>
              <p className="text-gray-600">
                Vi känner vårt område och erbjuder personlig service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-16 bg-background text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Transist</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition"
                  >
                    Storgatan 55a
                    <br />
                    573 32 Tranås
                  </a>
                </li>
                <li>073-551 88 45</li>
                <li>info@transist.se</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Snabblänkar</h3>
              <ul className="space-y-2">
                <li><a href="/om-oss" className="hover:text-primary transition">Om oss</a></li>
                <li><a href="/tjanster" className="hover:text-primary transition">Tjänster</a></li>
                <li><a href="/kontakt" className="hover:text-primary transition">Kontakt</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Tjänster</h3>
              <ul className="space-y-2">
                <li><a href="/tjanster" className="hover:text-primary transition">Flytthjälp</a></li>
                <li><a href="/tjanster" className="hover:text-primary transition">Städservice</a></li>
                <li><a href="/tjanster" className="hover:text-primary transition">Företagsflytt</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm">
            <p>© {new Date().getFullYear()} Transist. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;