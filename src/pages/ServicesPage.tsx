import React, { useState } from 'react';
import { 
  Truck, 
  Home,
  Building2,
  GraduationCap,
  MapPin,
  PackageCheck,
  Boxes,
  ClipboardCheck,
  Sparkles,
  Building,
  Search,
  Hammer,
  Piano,
  HeadphonesIcon,
  ArrowRight,
  Sparkle
} from 'lucide-react';
import LeadModal from '../components/LeadModal';
import ServiceDetails from '../components/ServiceDetails';
import SEO from '../components/SEO';

interface ServiceInfo {
  title: string;
  description: string;
  features: string[];
  process: string[];
  image: string;
}

const ServicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceInfo | null>(null);

  const openModal = (source: string) => {
    setLeadSource(source);
    setIsModalOpen(true);
  };

  const serviceDetails: Record<string, ServiceInfo> = {
    'private-moving': {
      title: 'Privatflytt',
      description: 'Vi erbjuder en komplett flyttservice för privatpersoner som vill ha en trygg och smidig flytt. Vår erfarna personal tar hand om hela processen från start till mål.',
      features: [
        'Kostnadsfri besiktning och offert',
        'Professionell flytthjälp med utbildad personal',
        'Alla nödvändiga flyttmaterial ingår',
        'Fullständig försäkring under hela flytten',
        'Demontering och montering av möbler',
        'Flyttstädning kan adderas',
      ],
      process: [
        'Kostnadsfri besiktning av bohaget',
        'Detaljerad offert inom 24 timmar',
        'Planering och tidsbokning',
        'Leverans av flyttmaterial',
        'Professionell packning (vid önskemål)',
        'Flyttdag med erfaren personal',
        'Uppackning och möbelmontering',
      ],
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800',
    },
    'office-moving': {
      title: 'Kontorsflytt',
      description: 'Specialanpassad flyttservice för företag med fokus på minimal verksamhetsstörning. Vi hjälper er att planera och genomföra flytten effektivt.',
      features: [
        'Projektledare som koordinerar hela flytten',
        'Flyttning utanför kontorstid om önskat',
        'Systematisk packning och märkning',
        'IT-utrustning hanteras säkert',
        'Fullständig försäkring',
        'Återvinning av emballage',
      ],
      process: [
        'Initial konsultation och planering',
        'Detaljerad tidsplan och logistik',
        'Förberedelse och packmaterial',
        'Systematisk nedpackning',
        'Transport med specialutrustning',
        'Installation på ny plats',
        'Kvalitetskontroll',
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    },
    'student-moving': {
      title: 'Studentflytt',
      description: 'Prisvärda flyttlösningar anpassade för studenter. Vi förstår studenters behov och erbjuder flexibla alternativ som passar din budget.',
      features: [
        'Studentrabatt på alla tjänster',
        'Flexibla flyttider',
        'Grundläggande flyttmaterial ingår',
        'Möjlighet till delad transport',
        'Försäkring ingår',
        'Betalning via Swish eller faktura',
      ],
      process: [
        'Gratis konsultation via telefon',
        'Enkel bokning online',
        'Leverans av flyttmaterial',
        'Flytthjälp på önskad tid',
        'Snabb och effektiv service',
      ],
      image: 'https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&q=80&w=800',
    },
    'long-distance-moving': {
      title: 'Långdistansflytt',
      description: 'Specialiserad service för längre flyttar med extra fokus på logistik och säkerhet. Vi har stor erfarenhet av långdistansflyttar både inom Sverige och internationellt.',
      features: [
        'Detaljerad flyttplan',
        'Specialemballering för långdistans',
        'GPS-spårning av transport',
        'Utökad försäkring',
        'Tullhantering vid behov',
        'Lagring under transport om önskat',
      ],
      process: [
        'Omfattande planering och ruttoptimering',
        'Specialanpassad packning',
        'Säker lastning och transport',
        'Kontinuerlig statusuppdatering',
        'Leverans enligt överenskommen tid',
        'Uppackning och installation',
      ],
      image: 'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?auto=format&fit=crop&q=80&w=800',
    },
    'move-out-cleaning': {
      title: 'Flyttstädning',
      description: 'Professionell flyttstädning med kvalitetsgaranti. Vi följer en detaljerad checklista och säkerställer att allt blir skinande rent.',
      features: [
        'Städning enligt branschstandard',
        'Fönsterputsning ingår',
        'Rengöring av vitvaror',
        'Städning av balkong/uteplats',
        'Kvalitetskontroll',
        'Nöjd-kund-garanti',
      ],
      process: [
        'Besiktning av utrymmen',
        'Tidsbokning',
        'Grundlig städning enligt checklista',
        'Kvalitetskontroll',
        'Besiktning med kund',
      ],
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
    },
    'home-cleaning': {
      title: 'Hemstädning',
      description: 'Professionell städservice för ditt hem, anpassad efter dina behov och önskemål. Vi erbjuder både regelbunden städning och engångsuppdrag.',
      features: [
        'Skräddarsydd städplan',
        'Miljövänliga rengöringsmedel',
        'Utbildad och erfaren personal',
        'Försäkring ingår',
        'Kvalitetsgaranti',
        'Flexibla bokningssystem',
      ],
      process: [
        'Kostnadsfri konsultation',
        'Skapa personlig städplan',
        'Städning enligt överenskommelse',
        'Kvalitetskontroll',
        'Uppföljning och feedback',
      ],
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800',
    },
    'office-cleaning': {
      title: 'Kontorsstädning',
      description: 'Professionell städservice för kontor och företagslokaler. Vi anpassar oss efter er verksamhet och säkerställer en ren och hälsosam arbetsmiljö.',
      features: [
        'Regelbunden eller punktinsats',
        'Städning utanför kontorstid',
        'Specialanpassade städrutiner',
        'Miljöcertifierade produkter',
        'Kvalitetssäkring',
        'Dokumenterad uppföljning',
      ],
      process: [
        'Behovsanalys och offert',
        'Städplanering',
        'Implementering av rutiner',
        'Regelbunden kvalitetskontroll',
        'Kontinuerlig uppföljning',
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    },
    'showing-cleaning': {
      title: 'Visningsstädning',
      description: 'Specialanpassad städservice för att få ditt hem i perfekt skick inför visning eller fotografering. Vi fokuserar på detaljer som gör skillnad.',
      features: [
        'Grundlig rengöring av alla ytor',
        'Extra fokus på detaljer',
        'Fönsterputsning',
        'Doftoptimering',
        'Snabb service',
        'Flexibla tider',
      ],
      process: [
        'Snabb bokning',
        'Genomgång av specifika önskemål',
        'Grundlig städning',
        'Detaljfokuserad finish',
        'Kvalitetskontroll före leverans',
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    },
  };

  const showServiceDetails = (serviceKey: string) => {
    setSelectedService(serviceDetails[serviceKey]);
  };

  return (
    <div className="pt-16">
      <SEO 
        title="Tjänster"
        description="Upptäck våra kompletta flytt- och städtjänster. Vi erbjuder flytthjälp, städning, packning och specialtransporter med fokus på kvalitet och kundnöjdhet."
        type="website"
        canonical="https://transist.se/tjanster"
      />

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        source={leadSource}
      />

      <ServiceDetails
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        service={selectedService!}
      />

      {/* Hero Section */}
      <section className="bg-background text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professionella Flytt- och Städtjänster
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Skräddarsydda lösningar för alla dina flytt- och städbehov. Med vår erfarenhet 
              och professionella team garanterar vi en smidig och trygg process.
            </p>
            <button 
              onClick={() => openModal('services-hero')}
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition flex items-center space-x-2 group"
            >
              <span>Få kostnadsfri offert</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Moving Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Flyttjänster</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="service-card bg-white p-6 rounded-xl">
              <Home className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Privatflytt</h3>
              <p className="text-gray-600 mb-4">
                Komplett flyttservice för ditt hem, anpassad efter dina specifika behov och önskemål.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=400"
                alt="Privatflytt"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button 
                onClick={() => showServiceDetails('private-moving')}
                className="text-primary font-semibold hover:text-primary-hover transition flex items-center space-x-2 group"
              >
                <span>Läs mer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Kontorsflytt</h3>
              <p className="text-gray-600 mb-4">
                Effektiv företagsflytt med minimal störning av er verksamhet.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=400"
                alt="Kontorsflytt"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button 
                onClick={() => showServiceDetails('office-moving')}
                className="text-primary font-semibold hover:text-primary-hover transition flex items-center space-x-2 group"
              >
                <span>Läs mer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Studentflytt</h3>
              <p className="text-gray-600 mb-4">
                Prisvärda flyttlösningar anpassade för studenter.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&q=80&w=400"
                alt="Studentflytt"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button 
                onClick={() => showServiceDetails('student-moving')}
                className="text-primary font-semibold hover:text-primary-hover transition flex items-center space-x-2 group"
              >
                <span>Läs mer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Långdistansflytt</h3>
              <p className="text-gray-600 mb-4">
                Omfattande service för längre sträckor med extra omsorg.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?auto=format&fit=crop&q=80&w=400"
                alt="Långdistansflytt"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button 
                onClick={() => showServiceDetails('long-distance-moving')}
                className="text-primary font-semibold hover:text-primary-hover transition flex items-center space-x-2 group"
              >
                <span>Läs mer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Packing Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Professionell Packning</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card bg-white p-6 rounded-xl">
              <PackageCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Fullständig Packservice</h3>
              <p className="text-gray-600">
                Vi packar alla dina tillhörigheter säkert och effektivt med högkvalitativt material.
              </p>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <Boxes className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Uppackning & Organisering</h3>
              <p className="text-gray-600">
                Låt oss packa upp och organisera ditt nya hem eller kontor.
              </p>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <ClipboardCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Packmaterial</h3>
              <p className="text-gray-600">
                Kvalitativt packmaterial till förmånliga priser för alla behov.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Städtjänster</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="service-card bg-white p-6 rounded-xl">
              <Sparkles className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Flyttstädning</h3>
              <p className="text-gray-600 mb-4">
                Grundlig flyttstädning med nöjd-kund-garanti.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400"
                alt="Flyttstädning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button 
                onClick={() => showServiceDetails('move-out-cleaning')}
                className="text-primary font-semibold hover:text-primary-hover transition flex items-center space-x-2 group"
              >
                <span>Läs mer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <Home className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Hemstädning</h3>
              <p className="text-gray-600 mb-4">
                Regelbunden eller engångsstädning för ditt hem.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=400"
                alt="Hemstädning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button 
                onClick={() => showServiceDetails('home-cleaning')}
                className="text-primary font-semibold hover:text-primary-hover transition flex items-center space-x-2 group"
              >
                <span>Läs mer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <Building className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Kontorsstädning</h3>
              <p className="text-gray-600 mb-4">
                Professionell städning för alla typer av kontor.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400"
                alt="Kontorsstädning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button 
                onClick={() => showServiceDetails('office-cleaning')}
                className="text-primary font-semibold hover:text-primary-hover transition flex items-center space-x-2 group"
              >
                <span>Läs mer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <Search className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Visningsstädning</h3>
              <p className="text-gray-600 mb-4">
                Få ditt hem i perfekt skick inför visning.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400"
                alt="Visningsstädning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button 
                onClick={() => showServiceDetails('showing-cleaning')}
                className="text-primary font-semibold hover:text-primary-hover transition flex items-center space-x-2 group"
              >
                <span>Läs mer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Specialtjänster</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="service-card bg-white p-6 rounded-xl">
              <Truck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Bärhjälp</h3>
              <p className="text-gray-600">
                Professionell hjälp med tunga lyft och transport.
              </p>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <Hammer className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Möbelmontering</h3>
              <p className="text-gray-600">
                Montering och demontering av alla typer av möbler.
              </p>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <Piano className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Pianoflytt</h3>
              <p className="text-gray-600">
                Specialiserad transport av piano och andra ömtåliga instrument.
              </p>
            </div>

            <div className="service-card bg-white p-6 rounded-xl">
              <HeadphonesIcon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Flyttrådgivning</h3>
              <p className="text-gray-600">
                Personlig rådgivning för en smidig flyttprocess.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Redo att börja?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontakta oss idag för en kostnadsfri offert anpassad efter dina behov. 
            Vi finns här för att göra din flytt så smidig som möjligt!
          </p>
          <button 
            onClick={() => openModal('services-final-cta')}
            className="group relative bg-white text-primary px-12 py-5 rounded-lg text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(86,206,203,0.5)] animate-bounce-slow"
          >
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full animate-ping delay-300" />
            <span className="relative flex items-center gap-3">
              <Sparkle className="w-6 h-6 animate-pulse" />
              Få kostnadsfri offert
              <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;