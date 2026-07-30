import eventsData from "@/data/events.json";
import SectionTitle from "@/components/ui/SectionTitle";
import ActivityCard from "@/components/cards/ActivityCard";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Kegiatan",
  description: "Jadwal kegiatan dan agenda desa.",
};

export default function KegiatanPage() {
  const upcomingEvents = eventsData.filter((e) => e.status === "Upcoming");
  const pastEvents = eventsData.filter((e) => e.status === "Past");

  return (
    <div className="pt-24 pb-20">
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Jadwal Kegiatan
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Informasi lengkap mengenai agenda, rapat, dan kegiatan sosial yang akan dan telah dilaksanakan.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom">
        <section className="mb-20">
          <SectionTitle title="Kegiatan Mendatang" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <FadeIn key={event.id} delay={index * 0.1}>
                  <ActivityCard {...event} />
                </FadeIn>
              ))
            ) : (
              <p className="text-muted">Belum ada kegiatan mendatang.</p>
            )}
          </div>
        </section>

        <section>
          <SectionTitle title="Kegiatan Selesai" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.length > 0 ? (
              pastEvents.map((event, index) => (
                <FadeIn key={event.id} delay={index * 0.1}>
                  <ActivityCard {...event} />
                </FadeIn>
              ))
            ) : (
              <p className="text-muted">Belum ada data kegiatan selesai.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
