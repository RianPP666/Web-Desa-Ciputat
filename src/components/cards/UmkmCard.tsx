import { MapPin, Phone, Store } from "lucide-react";

interface UmkmCardProps {
  name: string;
  product: string;
  category: string;
  image?: string;
  price?: string;
  location: string;
  phone?: string;
  description?: string;
}

export default function UmkmCard({ name, product, category, image, price, location, phone, description }: UmkmCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border flex flex-col h-full">
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
            <Store size={48} />
          </div>
        )}
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading font-semibold text-xl text-gray-900 mb-1">{name}</h3>
        <p className="text-primary font-medium text-sm mb-3">{product}</p>
        {description && (
          <p className="text-muted text-sm mb-4 line-clamp-3">{description}</p>
        )}

        {price && (
          <p className="text-lg font-bold text-foreground mb-4">{price}</p>
        )}

        <div className="space-y-2 mt-auto pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-primary shrink-0" />
            <span>{location}</span>
          </div>
          {phone && (
            <a
              href={`https://wa.me/${phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <Phone size={16} className="text-primary shrink-0" />
              <span>{phone}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}