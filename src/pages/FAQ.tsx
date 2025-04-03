import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      category: 'flyttjänster',
      question: 'Hur långt i förväg behöver jag boka?',
      answer: 'Vi rekommenderar att boka minst 2-3 veckor i förväg för att säkerställa önskat datum. Vid akuta behov kan vi ofta hjälpa till med kortare varsel - kontakta oss för tillgänglighet.',
    },
    {
      category: 'flyttjänster',
      question: 'Ingår flyttkartonger och material?',
      answer: 'Ja, vid fullservice-flytt ingår allt material som behövs. Vi kan även erbjuda flyttkartonger separat om du packar själv.',
    },
    {
      category: 'flyttjänster',
      question: 'Är era flyttare försäkrade?',
      answer: 'Ja, vi har fullständig ansvarsförsäkring som täcker både personal och gods under transport.',
    },
    {
      category: 'städning',
      question: 'Vad ingår i flyttstädningen?',
      answer: 'Vår flyttstädning är mycket grundlig och omfattar alla ytor, inklusive fönsterputsning, rengöring av vitvaror, ventiler och element. En detaljerad checklista finns tillgänglig på förfrågan.',
    },
    {
      category: 'städning',
      question: 'Erbjuder ni besiktningsgaranti?',
      answer: 'Ja, vi erbjuder besiktningsgaranti på all flyttstädning. Om något skulle anmärkas åtgärdar vi det kostnadsfritt.',
    },
    {
      category: 'priser',
      question: 'Hur beräknas priset för en flytt?',
      answer: 'Priset baseras på flera faktorer som bostadens storlek, antal våningar, tillgång till hiss, avstånd och eventuella tilläggstjänster. Vi gör gärna ett kostnadsfritt hembesök för exakt offert.',
    },
    {
      category: 'priser',
      question: 'Vilka betalningsmetoder accepterar ni?',
      answer: 'Vi accepterar banköverföring, Swish och faktura (efter godkänd kreditprövning).',
    },
    {
      category: 'bokning',
      question: 'Hur bokar jag era tjänster?',
      answer: 'Du kan boka genom att fylla i vårt bokningsformulär online, ringa oss på 073-551 88 45 eller maila till info@transist.se.',
    },
    {
      category: 'bokning',
      question: 'Kan jag ändra eller avboka min bokning?',
      answer: 'Ja, ändringar och avbokningar kan göras enligt våra villkor. Kontakta oss så hjälper vi dig.',
    },
  ];

  const categories = [
    { id: 'all', name: 'Alla kategorier' },
    { id: 'flyttjänster', name: 'Flyttjänster' },
    { id: 'städning', name: 'Städning' },
    { id: 'priser', name: 'Priser' },
    { id: 'bokning', name: 'Bokning' },
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-24 pb-16">
      <SEO 
        title="Vanliga frågor"
        description="Hitta svar på vanliga frågor om Transists flytt- och städtjänster."
      />
      
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Vanliga frågor</h1>
        
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenItem(openItem === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg">{item.question}</span>
                {openItem === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openItem === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-primary/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Hittade du inte svaret du sökte?</h2>
          <p className="text-gray-700 mb-6">
            Kontakta oss så hjälper vi dig med dina frågor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0735518845"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
            >
              Ring oss: 073-551 88 45
            </a>
            <a
              href="mailto:info@transist.se"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/5 transition"
            >
              Maila oss
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;