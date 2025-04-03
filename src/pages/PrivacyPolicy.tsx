import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="pt-24 pb-16">
      <SEO 
        title="Integritetspolicy"
        description="Läs om hur Transist hanterar och skyddar dina personuppgifter."
      />
      
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Integritetspolicy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Denna integritetspolicy förklarar hur Transist samlar in och använder dina personuppgifter. 
            Den beskriver också dina rättigheter och hur du kan göra dem gällande.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Insamling av information</h2>
          <p className="mb-4">
            Vi samlar in information när du:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Bokar våra tjänster</li>
            <li>Registrerar dig för vårt nyhetsbrev</li>
            <li>Fyller i våra kontaktformulär</li>
            <li>Använder vår webbplats</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Användning av information</h2>
          <p className="mb-4">
            Den information vi samlar in används för att:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Tillhandahålla och förbättra våra tjänster</li>
            <li>Kommunicera med dig om bokningar och tjänster</li>
            <li>Skicka marknadsföring och nyhetsbrev (om du samtyckt till detta)</li>
            <li>Förbättra vår webbplats och kundupplevelse</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Delning av information</h2>
          <p className="mb-6">
            Vi säljer aldrig din information till tredje part. Vi kan dela din information med:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Våra underleverantörer som hjälper oss att leverera tjänster</li>
            <li>Myndigheter när lagen kräver det</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Lagring och säkerhet</h2>
          <p className="mb-6">
            Vi lagrar din information säkert och behåller den endast så länge som är nödvändigt för 
            de ändamål som anges i denna policy eller som krävs enligt lag.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Dina rättigheter</h2>
          <p className="mb-4">
            Du har rätt att:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Begära tillgång till dina personuppgifter</li>
            <li>Begära rättelse av felaktiga uppgifter</li>
            <li>Begära radering av dina uppgifter</li>
            <li>Återkalla ditt samtycke till marknadsföring</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies</h2>
          <p className="mb-6">
            Vi använder cookies för att förbättra din upplevelse på vår webbplats. Du kan ställa in 
            din webbläsare att vägra cookies, men detta kan begränsa funktionaliteten på vår webbplats.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Kontakta oss</h2>
          <p className="mb-6">
            Om du har frågor om vår integritetspolicy eller hur vi hanterar dina personuppgifter, 
            vänligen kontakta oss på:
          </p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p>Email: info@transist.se</p>
            <p>Telefon: 073-551 88 45</p>
            <p>Adress: Storgatan 55a, 573 32 Tranås</p>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            Senast uppdaterad: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;