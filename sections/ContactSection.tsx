import { IContactSection } from "@/types/location";

export function ContactSection({ data }: { data: IContactSection }) {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{data.title}</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4 mb-8">
              <div>
                <strong>Address:</strong>
                <br />
                {data.address.street}
                <br />
                {data.address.city}, {data.address.state} {data.address.zip}
              </div>
              <div>
                <strong>Phone:</strong> {data.phone}
              </div>
              <div>
                <strong>Email:</strong> {data.email}
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              {data.socialMedia?.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-white hover:text-green-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">
              {data.newsletter?.title}
            </h3>
            <p className="mb-6">{data.newsletter?.description}</p>
            <div className="flex">
              <input
                type="email"
                placeholder={data.newsletter?.placeholder}
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
              />
              <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-r-lg font-semibold">
                {data.newsletter?.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
