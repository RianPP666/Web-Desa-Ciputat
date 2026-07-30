import { Calendar, Clock, MapPin } from "lucide-react";

interface ActivityCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: "Upcoming" | "Past" | string;
}

export default function ActivityCard({ title, date, time, location, description, status }: ActivityCardProps) {
  const isUpcoming = status === "Upcoming";

  // Format date
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isUpcoming 
        ? "bg-white border-primary/20 shadow-md hover:shadow-lg" 
        : "bg-gray-50 border-border opacity-80"
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2 pr-4">
          {title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
          isUpcoming ? "bg-primary/10 text-primary" : "bg-gray-200 text-gray-600"
        }`}>
          {isUpcoming ? "Akan Datang" : "Selesai"}
        </span>
      </div>

      <p className="text-muted text-sm mb-5 line-clamp-2">
        {description}
      </p>

      <div className="space-y-2 mt-auto">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Calendar size={16} className={isUpcoming ? "text-primary" : "text-gray-400"} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Clock size={16} className={isUpcoming ? "text-primary" : "text-gray-400"} />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MapPin size={16} className={isUpcoming ? "text-primary" : "text-gray-400"} />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
