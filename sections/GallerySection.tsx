import Image from 'next/image';
import { GalleryContent } from '@/lib/schemas/sections';

export function GallerySection({ content }: { content: GalleryContent }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {content?.images?.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image.url}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-lg"
                width={500}
                height={500}
                unoptimized
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <p className="text-white text-center px-4">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
