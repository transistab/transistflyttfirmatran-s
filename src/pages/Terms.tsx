import React from 'react';
import SEO from '../components/SEO';

const Terms = () => {
  return (
    <div className="pt-24 pb-16">
      <SEO 
        title="Villkor"
        description="Läs om Transists allmänna villkor för våra tjänster."
      />
      
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Allmänna Villkor</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Dessa allmänna villkor gäller för alla tjänster som tillhandahålls av Transist. 
            Genom att använda våra tjänster godkänner du dessa villkor.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Bokning och avtal</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Bokning är bindande när den bekräftats av båda parter</li>
            <li>Prisuppgifter är preliminära tills slutlig besiktning genomförts</li>
            <li>Vi förbehåller oss rätten att justera priset vid ändrade förutsättningar</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Betalning</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Betalning sker enligt överenskommelse</li>
            <li>Vi accepterar faktura (efter godkänd kreditprövning), banköverföring och Swish</li>
            <li>Betalningsvillkor: 10 dagar netto om inget annat avtalats</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Avbokning</h2>
          <p className="mb-6">
            Vid avbokning gäller följande villkor:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Mer än 7 dagar före: Ingen avgift</li>
            <li>3-7 dagar före: 50% av bokningsvärdet</li>
            <li>Mindre än 3 dagar före: 100% av bokningsvärdet</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Försäkring och ansvar</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Vi har fullständig ansvarsförsäkring för alla uppdrag</li>
            <li>Särskilt värdefulla föremål ska anmälas i förväg</li>
            <li>Vi ansvarar inte för skador som beror på felaktig information från kunden</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Kundens ansvar</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Att lämna korrekt information om uppdraget</li>
            <li>Att vara tillgänglig på överenskommen tid</li>
            <li>Att säkerställa tillgång till lokaler och parkeringsmöjligheter</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Force majeure</h2>
          <p className="mb-6">
            Vi ansvarar inte för förseningar eller brister i utförandet som beror på omständigheter 
            utanför vår kontroll, såsom extrema väderförhållanden, naturkatastrofer, strejk, etc.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Reklamation</h2>
          <p className="mb-6">
            Eventuella klagomål ska framföras snarast möjligt och senast inom 7 dagar efter utfört uppdrag. 
            Vi åtar oss att hantera alla reklamationer skyndsamt och professionellt.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Tvist</h2>
          <p className="mb-6">
            Vid eventuell tvist ska svensk lag tillämpas. Tvister ska i första hand lösas genom 
            förhandling mellan parterna.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mt-8">
            <h3 className="font-bold mb-4 text-xl">Kontaktinformation</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Transist</strong><br />
              Org.nr: 559396-6905<br />
              Storgatan 55a<br />
              573 32 Tranås<br />
              Tel: <a href="tel:0735518845" className="text-primary hover:text-primary-hover">073-551 88 45</a><br />
              Email: <a href="mailto:info@transist.se" className="text-primary hover:text-primary-hover">info@transist.se</a>
            </p>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            Senast uppdaterad: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;