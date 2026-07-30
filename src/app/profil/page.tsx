import Image from "next/image";
import villageProfile from "@/data/village-profile.json";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Profil Desa",
  description: "Sejarah, Visi Misi, dan Struktur Organisasi Pemerintahan Desa.",
};

export default function ProfilPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Profil Desa
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Mengenal lebih dekat sejarah, visi, misi, dan struktur pemerintahan desa kami.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom">
        {/* Sambutan */}
        <section className="mb-24">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border flex flex-col md:flex-row gap-10 items-center">
            <FadeIn direction="right" className="w-full md:w-1/3">
              <div className="relative w-48 h-48 md:w-full md:h-80 mx-auto rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={villageProfile.structure[0].image}
                  alt={villageProfile.structure[0].name}
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn direction="left" className="w-full md:w-2/3">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Sambutan Kepala Desa</h2>
              <h3 className="text-primary font-medium mb-6">{villageProfile.structure[0].name}</h3>
              <div className="relative">
                <span className="absolute -top-4 -left-4 text-6xl text-primary/20 font-heading">"</span>
                <p className="text-muted text-lg leading-relaxed italic relative z-10 pl-6 border-l-4 border-primary">
                  {villageProfile.headGreeting}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Sejarah */}
        <section className="mb-24">
          <FadeIn>
            <SectionTitle title="Sejarah Desa" />
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <p className="text-muted leading-relaxed text-lg">
                {villageProfile.history}
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Visi Misi */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FadeIn direction="up">
              <div className="h-full bg-primary text-white p-10 rounded-3xl shadow-lg">
                <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">1</span>
                  Visi
                </h3>
                <p className="text-lg leading-relaxed font-medium">
                  "{villageProfile.vision}"
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <div className="h-full bg-section-bg p-10 rounded-3xl border border-border shadow-sm">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">2</span>
                  Misi
                </h3>
                <ul className="space-y-4">
                  {villageProfile.mission.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted">
                      <div className="min-w-6 h-6 mt-1 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Struktur Organisasi */}
        <section className="mb-12">
          <FadeIn>
            <SectionTitle title="Struktur Pemerintahan" centered />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {villageProfile.structure.map((person, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-border text-center shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-section-bg group-hover:border-primary/20 transition-colors">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-heading font-semibold text-lg text-foreground">{person.name}</h4>
                  <p className="text-primary text-sm font-medium mt-1">{person.position}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
