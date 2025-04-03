import React from 'react';
import { Users, Target, Heart, LineChart, HandCoins, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const AboutUs = () => {
  const owners = [
    {
      name: 'Azeez Wali',
      role: 'Delägare',
      description: 'Ansvarar för företagets ekonomiska styrning och marknadsföring.',
      icon: LineChart,
    },
    {
      name: 'George Amsou',
      role: 'Delägare',
      description: 'Leder försäljningen med fokus på kundrelationer och affärsutveckling.',
      icon: HandCoins,
    },
    {
      name: 'Hussein Semsemieh',
      role: 'Delägare',
      description: 'Ansvarar för den operativa verksamheten och kvalitetssäkring.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="pt-16">
      <SEO 
        title="Om oss"
        description="Lär känna Transist - din pålitliga partner för flytt och städning. Med rikstäckande service och fokus på kvalitet har vi hjälpt hundratals nöjda kunder."
        type="website"
        canonical="https://transist.se/om-oss"
      />
      
      {/* Hero Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Om Transist</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Vi är ett team av dedikerade proffs som brinner för att göra din flytt 
              och städning så smidig som möjligt. Med vår rikstäckande service och ett starkt 
              fokus på kvalitet är vi din pålitliga partner.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Kundservice</h3>
              <p className="text-gray-600">
                Vi sätter alltid kunden först och strävar efter att överträffa 
                förväntningar i varje projekt.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Kvalitet</h3>
              <p className="text-gray-600">
                Högsta kvalitet i varje detalj är vår standard, från första kontakt 
                till slutfört uppdrag.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Passion</h3>
              <p className="text-gray-600">
                Vi älskar det vi gör och det syns i vårt engagemang och 
                noggrannhet i varje uppdrag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Våra Grundare</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {owners.map((owner) => (
              <div key={owner.name} className="bg-white rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <owner.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{owner.name}</h3>
                <p className="text-primary mb-4">{owner.role}</p>
                <p className="text-gray-600">{owner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Vår Historia</h2>
            <p className="text-gray-600 mb-12">
              Vi har funnits i flera år och har under denna tid utvecklats från ett lokalt företag i Tranås 
              till att bli ett rikstäckande företag med verksamhet i hela Sverige. Med ett nätverk av anställda, 
              flyttbilar och städare strategiskt placerade över hela landet, kan vi erbjuda högkvalitativ service 
              var du än befinner dig. Vi fortsätter att växa och utvecklas varje dag med fokus på 
              kundnöjdhet och professionalism.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-background p-6 rounded-xl">
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-white">Nöjda kunder</p>
              </div>
              <div className="bg-background p-6 rounded-xl">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-white">Städer</p>
              </div>
              <div className="bg-background p-6 rounded-xl">
                <p className="text-3xl font-bold text-primary">20+</p>
                <p className="text-white">Anställda</p>
              </div>
              <div className="bg-background p-6 rounded-xl">
                <p className="text-3xl font-bold text-primary">4.9/5</p>
                <p className="text-white">Kundbetyg</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;