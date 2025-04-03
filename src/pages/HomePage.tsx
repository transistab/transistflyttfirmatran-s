import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Truck, 
  Sparkles, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Shield, 
  Clock3, 
  Package, 
  Star,
  ArrowRight,
  Users,
  Building2,
  Award,
  Facebook,
  Instagram,
  Loader2,
  Send
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import BookingForm from '../components/BookingForm';
import SEO from '../components/SEO';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    service: '',
    notes: '',
  });

  const handleBooking = (source: string) => {
    if (source.includes('cta')) {
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
            customer_name: formData.customerName,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone,
            service: formData.service,
            notes: formData.notes,
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
          service: '',
          notes: '',
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Det gick inte att skicka förfrågan. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Hem"
        description="Transist erbjuder professionell flytt- och städservice i Tranås med rikstäckande verksamhet. Vi garanterar en smidig och trygg flytt med erfaren personal och full försäkring."
        type="website"
        canonical="https://transist.se"
      />
      
      <BookingForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Hero Section */}
      <header className="relative h-[90vh] min-h-[600px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center pt-16">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-8">
              <Star className="h-6 w-6 text-yellow-400" />
              <span className="text-white/90">100% nöjda kunder med 4.9/5 i betyg</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Professionell flytt- och städservice i Tranås med rikstäckande verksamhet
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Vi tar hand om hela processen så du kan fokusera på det viktiga. 
              Certifierad personal, försäkrat gods och 100% nöjd-kund-garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handleBooking('hero-cta')}
                className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-hover transition text-center flex items-center justify-center space-x-2 group animate-cta-pulse"
              >
                <span>Få prisförslag</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="tel:0735518845" 
                className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition text-center"
              >
                Ring oss: 073-551 88 45
              </a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-white" />
                <span className="text-white">Försäkrat gods</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock3 className="h-6 w-6 text-white" />
                <span className="text-white">Snabb service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-white" />
                <span className="text-white">Allt ingår</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Vi löser dina utmaningar</h2>
            <p className="text-gray-600">
              Flytt och städning kan vara stressigt och tidskrävande. Vi har lösningen 
              som gör processen smidig och problemfri.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tidsbrist?</h3>
              <p className="text-gray-600">
                Vi tar hand om hela processen så du kan fokusera på annat. 
                Från packning till slutstädning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Ömtåliga saker?</h3>
              <p className="text-gray-600">
                Vårt team är utbildat i hantering av värdefulla och ömtåliga föremål. 
                Allt är försäkrat.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Orolig för kvaliteten?</h3>
              <p className="text-gray-600">
                Vi erbjuder 100% nöjd-kund-garanti och har bara nöjda kunder 
                med toppbetyg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Våra Tjänster</h2>
            <p className="text-white/90">
              Vi erbjuder kompletta lösningar för både privatpersoner och företag. 
              Alla tjänster kan skräddarsys efter dina behov.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <Truck className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Flyttjänster</h3>
              <p className="text-gray-600 mb-6">
                Professionell flytthjälp med full service från start till mål.
              </p>
              <ul className="space-y-3">
                {[
                  'Kostnadsfri besiktning',
                  'Packning och uppackning',
                  'Demontering och montering av möbler',
                  'Flyttstädning ingår',
                  'Flyttkartonger och material ingår',
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleBooking('moving-service')}
                className="mt-8 inline-block text-primary font-semibold hover:text-primary-hover transition"
              >
                Se priser →
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <Sparkles className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Städtjänster</h3>
              <p className="text-gray-600 mb-6">
                Grundlig och miljövänlig städning för hem och kontor.
              </p>
              <ul className="space-y-3">
                {[
                  'Miljövänliga rengöringsmedel',
                  'Regelbunden eller engångsstädning',
                  'Fönsterputsning',
                  'Flyttstädning med besiktning',
                  'Kvalitetsgaranti',
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleBooking('cleaning-service')}
                className="mt-8 inline-block text-primary font-semibold hover:text-primary-hover transition"
              >
                Se priser →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Vad våra kunder säger</h2>
            <p className="text-gray-600">
              Vi är stolta över att ha hjälpt hundratals nöjda kunder. Här är några av deras historier.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-white/90 mb-4">
                "Professionellt team som gjorde ett fantastiskt jobb med vår flytt. 
                Allt gick smidigt och enligt plan. Rekommenderas varmt!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-white">Anna Andersson</p>
                  <p className="text-sm text-white/70">Privatperson, Tranås</p>
                </div>
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-white/90 mb-4">
                "Vi anlitar Transist regelbundet för vår kontorsstädning. 
                Alltid pålitliga och gör ett utmärkt jobb. Toppen service!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-white">Tech Solutions AB</p>
                  <p className="text-sm text-white/70">Företagskund</p>
                </div>
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-white/90 mb-4">
                "Mycket nöjd med flyttstädningen. Noggranna och professionella. 
                Besiktningen gick utan anmärkning!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-white">Erik Eriksson</p>
                  <p className="text-sm text-white/70">Privatperson, Tranås</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-12">
            <Award className="h-12 w-12 text-primary/30" />
            <Building2 className="h-12 w-12 text-primary/30" />
            <Shield className="h-12 w-12 text-primary/30" />
            <Package className="h-12 w-12 text-primary/30" />
          </div>
        </div>
      </section>

      {/* Anpassade Flyttlösningar Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Anpassade Flyttlösningar</h2>
            <p className="text-white/90">
              Vi skräddarsyr varje flytt efter dina unika behov och förutsättningar.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">Oavsett om du:</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <span>Har en stram budget</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <span>Behöver hjälp med specifika möbler eller föremål</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <span>Önskar full service från packning till uppackning</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <span>Har särskilda tidskrav eller deadlines</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <span>Är student med speciella behov</span>
              </li>
            </ul>
            <p className="text-gray-600 mb-8">
              Vårt erfarna team anpassar sig efter dina önskemål och skapar en flyttlösning som passar just dig. 
              Vi erbjuder flexibla alternativ för både små och stora flyttuppdrag.
            </p>
            <button 
              onClick={() => handleBooking('final-cta')}
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition animate-bounce-slow"
            >
              Boka kostnadsfri konsultation
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Kontakta oss</h2>
              <p className="text-white/90 mb-8">
                Vi återkommer inom 24 timmar med ett personligt erbjudande.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-white">Ring oss</p>
                    <p className="text-white/90">073-551 88 45</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-white">Maila oss</p>
                    <p className="text-white/90">info@transist.se</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-white">Öppettider</p>
                    <p className="text-white/90">Vardagar: 06:00-18:00</p>
                    <p className="text-white/90">Lördag: 10:00-18:00</p>
                    <p className="text-white/90">Söndag: Stängt</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-white">Besök oss</p>
                    <p className="text-white/90">Storgatan 55a, 573 32 Tranås</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Namn</label>
                    <input 
                      type="text" 
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tjänst</label>
                    <select 
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meddelande</label>
                    <textarea 
                      rows={4} 
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                        <span>Skicka förfrågan</span>
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    Vi respekterar din integritet och delar aldrig dina uppgifter med tredje part.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Tack!</h3>
                  <p className="text-gray-600">
                    Vi har tagit emot din förfrågan och återkommer inom kort.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Truck className="h-8 w-8" />
                <span className="text-2xl font-bold">Transist</span>
              </div>
              <p className="text-white/70">
                Professionell flytt- och städservice i Tranås med rikstäckande verksamhet.
              </p>
              <div className="flex space-x-4 mt-6">
                <a 
                  href="https://www.facebook.com/transistab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/transistab/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Tjänster</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/tjanster" className="hover:text-white transition">Flyttjänster</Link></li>
                <li><Link to="/tjanster" className="hover:text-white transition">Städtjänster</Link></li>
                <li><Link to="/tjanster" className="hover:text-white transition">Företagsflytt</Link></li>
                <li><Link to="/tjanster" className="hover:text-white transition">Kontorsstädning</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Information</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/om-oss" className="hover:text-white transition">Om oss</Link></li>
                <li><Link to="/blogg" className="hover:text-white transition">Blogg</Link></li>
                <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link to="/kontakt" className="hover:text-white transition">Kontakt</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-white/70">
                <li>073-551 88 45</li>
                <li>info@transist.se</li>
                <li>Storgatan 55a</li>
                <li>573 32 Tranås</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70">
              © {new Date().getFullYear()} Transist. Alla rättigheter förbehållna.
            </p>
            <div className="mt-4 md:mt-0">
              <Link to="/integritetspolicy" className="text-white/70 hover:text-white transition mx-2">Integritetspolicy</Link>
              <Link to="/villkor" className="text-white/70 hover:text-white transition mx-2">Villkor</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;