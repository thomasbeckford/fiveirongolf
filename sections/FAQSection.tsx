import { IFaqSection } from "@/types/location";

export function FAQSection({ data }: { data: IFaqSection }) {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{data.title}</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {data.items.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
