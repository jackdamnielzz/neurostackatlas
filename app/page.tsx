import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ISO-certificering & informatiebeveiliging voor MKB | MaasISO",
  description:
    "MaasISO is dé ISO-consultant voor MKB-bedrijven in Nederland. Pragmatische begeleiding bij ISO 9001, ISO 27001, ISO 14001, AVG compliance en NIS2. Transparante kosten, bewezen resultaten.",
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MaasISO",
  description:
    "Onafhankelijk ISO-consultancybureau gespecialiseerd in ISO 9001, ISO 27001, ISO 14001, AVG compliance en NIS2 begeleiding voor MKB-bedrijven in Nederland en België.",
  url: "https://www.maasiso.nl",
  telephone: "+31-6-23578344",
  email: "info@maasiso.nl",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jol 11-41",
    addressLocality: "Lelystad",
    postalCode: "8243 EE",
    addressCountry: "NL",
  },
  areaServed: [
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "Belgium" },
  ],
  serviceType: [
    "ISO Certification Consulting",
    "Information Security Consulting",
    "GDPR Compliance Consulting",
  ],
  founder: {
    "@type": "Person",
    name: "Niels Maas",
    jobTitle: "Senior Consultant & Oprichter",
  },
  knowsAbout: [
    "ISO 9001",
    "ISO 27001",
    "ISO 14001",
    "ISO 45001",
    "ISO 16175",
    "GDPR",
    "AVG",
    "NIS2",
    "BIO",
  ],
  sameAs: [
    "https://linkedin.com/company/maasiso",
    "https://twitter.com/maasiso",
    "https://facebook.com/maasiso",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat doet een ISO-consultant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een ISO-consultant begeleidt organisaties bij het implementeren van een managementsysteem dat voldoet aan een ISO-norm. De consultant helpt bij de nulmeting, documentatie, implementatie en auditvoorbereiding. Een consultant geeft zelf geen certificaat af — dat doet de onafhankelijke certificerende instelling.",
      },
    },
    {
      "@type": "Question",
      name: "Wat kost ISO-certificering voor een klein bedrijf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voor MKB-bedrijven met 1–10 medewerkers liggen de kosten voor ISO 9001 certificering gemiddeld tussen €5.000 en €8.000. Voor ISO 27001 tussen €10.000 en €18.000. Deze bedragen zijn inclusief consultancy en certificatie-audit.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang duurt een ISO-certificeringstraject?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De gemiddelde doorlooptijd voor MKB-organisaties ligt tussen 3 en 9 maanden, afhankelijk van de norm, de organisatiegrootte en de mate waarin processen al zijn vastgelegd.",
      },
    },
    {
      "@type": "Question",
      name: "Is ISO-certificering verplicht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ISO-certificering is in Nederland niet wettelijk verplicht. Wel wordt certificering steeds vaker gevraagd door klanten, ketenpartners en in aanbestedingen. Met de invoering van de NIS2-richtlijn wordt aantoonbare informatiebeveiliging voor bepaalde sectoren wél een wettelijke verplichting.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is NIS2 en hoe verhoudt het zich tot ISO 27001?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NIS2 (de Cyberbeveiligingswet) stelt beveiligingseisen voor essentiële en belangrijke entiteiten in de EU. ISO 27001 gecertificeerde organisaties hebben circa 70–80% van de NIS2 Artikel 21-maatregelen al aantoonbaar geïmplementeerd.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4 rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <h1 className="text-3xl font-semibold leading-tight text-[var(--text-strong)] sm:text-4xl">
          ISO-consultant voor MKB: certificering, informatiebeveiliging en compliance
        </h1>
        <p className="max-w-4xl text-[var(--text-muted)]">
          MaasISO begeleidt MKB-bedrijven in Nederland en België bij ISO-certificering,
          informatiebeveiliging en AVG compliance. Als onafhankelijk consultant helpen wij
          organisaties van nulmeting tot succesvolle audit — pragmatisch, transparant en
          afgestemd op de dagelijkse praktijk. MaasISO is géén certificerende instelling:
          wij begeleiden, de certificerende instelling toetst.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Key Takeaways</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)]">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <tbody>
              <tr className="border-b border-[var(--border-muted)]">
                <th className="px-4 py-3 font-semibold">ISO 9001 certificering</th>
                <td className="px-4 py-3">
                  Gemiddeld 3–6 maanden doorlooptijd, investering vanaf €5.000 voor MKB
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <th className="px-4 py-3 font-semibold">ISO 27001 certificering</th>
                <td className="px-4 py-3">
                  93 beheersmaatregelen, 96.709 certificaten wereldwijd in 2024 (+99%
                  groei)
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <th className="px-4 py-3 font-semibold">AVG compliance</th>
                <td className="px-4 py-3">
                  Boetes tot €20 miljoen of 4% jaaromzet bij niet-naleving
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <th className="px-4 py-3 font-semibold">NIS2/Cyberbeveiligingswet</th>
                <td className="px-4 py-3">
                  ISO 27001 dekt circa 70–80% van de NIS2 Artikel 21-verplichtingen
                </td>
              </tr>
              <tr>
                <th className="px-4 py-3 font-semibold">Slagingspercentage MaasISO</th>
                <td className="px-4 py-3">100% succesgarantie op certificeringsaudits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Kernfeiten</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)]">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="border-b border-[var(--border-muted)] bg-[var(--surface-2)]">
              <tr>
                <th className="px-4 py-3">Kernfeit</th>
                <th className="px-4 py-3">Waarde</th>
                <th className="px-4 py-3">Bron</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">ISO 9001 certificaten wereldwijd</td>
                <td className="px-4 py-3">1,1+ miljoen</td>
                <td className="px-4 py-3">
                  ISO Survey 2023 – International Organization for Standardization
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">ISO 27001 certificaten wereldwijd (2024)</td>
                <td className="px-4 py-3">96.709 (+99% groei)</td>
                <td className="px-4 py-3">ISO Survey 2024 via IAF CertSearch</td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">ISO 27001 certificaten in Nederland</td>
                <td className="px-4 py-3">1.568 organisaties, 3.345 locaties</td>
                <td className="px-4 py-3">ISO Survey 2024</td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">Maximale AVG-boete</td>
                <td className="px-4 py-3">€20 miljoen of 4% wereldwijde jaaromzet</td>
                <td className="px-4 py-3">Autoriteit Persoonsgegevens, art. 83 GDPR</td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">NIS2 dekking door ISO 27001</td>
                <td className="px-4 py-3">70–80% van Artikel 21-maatregelen</td>
                <td className="px-4 py-3">
                  Mapping ISO 27001 Annex A op NIS2 Art. 21
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">Gemiddelde implementatietijd ISO 9001 (MKB)</td>
                <td className="px-4 py-3">3–6 maanden</td>
                <td className="px-4 py-3">MaasISO praktijkervaring</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Gemiddelde kosten ISO 9001 (MKB)</td>
                <td className="px-4 py-3">€5.000–€15.000</td>
                <td className="px-4 py-3">MaasISO marktanalyse 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Wat doet MaasISO?</h2>
        <p className="text-[var(--text-muted)]">
          MaasISO is een onafhankelijk ISO-consultancybureau gevestigd in Lelystad,
          gespecialiseerd in het begeleiden van MKB-bedrijven bij certificeringstrajecten,
          informatiebeveiliging en privacy compliance.
        </p>
        <p className="text-[var(--text-muted)]">
          Wij zijn géén certificerende instelling. Het verschil is belangrijk: een consultant
          begeleidt de implementatie van het managementsysteem; een certificerende instelling
          (zoals Kiwa, TÜV, DNV of LRQA) voert de onafhankelijke audit uit en kent het
          certificaat toe. Door deze scheiding garanderen wij objectief advies zonder
          belangenverstrengeling.
        </p>
        <p className="text-[var(--text-muted)]">
          Onze opdrachtgevers zijn MKB-bedrijven en (semi-)overheidsinstellingen in Nederland
          en België die certificering niet als doel op zich zien, maar als middel om processen
          structureel te verbeteren, risico&apos;s te beheersen en het vertrouwen van klanten en
          ketenpartners te vergroten.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Onze diensten</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">ISO-certificering</h3>
          <p className="text-[var(--text-muted)]">
            Begeleiding bij het implementeren en certificeren van managementsystemen volgens
            internationale ISO-normen. Van gap-analyse en documentatie tot interne audit en
            auditvoorbereiding.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)]">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <thead className="border-b border-[var(--border-muted)] bg-[var(--surface-2)]">
                <tr>
                  <th className="px-4 py-3">Norm</th>
                  <th className="px-4 py-3">Focus</th>
                  <th className="px-4 py-3">Gemiddelde doorlooptijd MKB</th>
                  <th className="px-4 py-3">Indicatie kosten</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border-muted)]">
                  <td className="px-4 py-3">ISO 9001</td>
                  <td className="px-4 py-3">Kwaliteitsmanagement</td>
                  <td className="px-4 py-3">3–6 maanden</td>
                  <td className="px-4 py-3">€5.000–€15.000</td>
                </tr>
                <tr className="border-b border-[var(--border-muted)]">
                  <td className="px-4 py-3">ISO 27001</td>
                  <td className="px-4 py-3">Informatiebeveiliging</td>
                  <td className="px-4 py-3">3–9 maanden</td>
                  <td className="px-4 py-3">€18.000–€25.000</td>
                </tr>
                <tr className="border-b border-[var(--border-muted)]">
                  <td className="px-4 py-3">ISO 14001</td>
                  <td className="px-4 py-3">Milieumanagement</td>
                  <td className="px-4 py-3">3–6 maanden</td>
                  <td className="px-4 py-3">€4.000–€10.000</td>
                </tr>
                <tr className="border-b border-[var(--border-muted)]">
                  <td className="px-4 py-3">ISO 45001</td>
                  <td className="px-4 py-3">Gezond &amp; veilig werken</td>
                  <td className="px-4 py-3">3–6 maanden</td>
                  <td className="px-4 py-3">Op aanvraag</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">ISO 16175</td>
                  <td className="px-4 py-3">Digitaal informatiebeheer</td>
                  <td className="px-4 py-3">Op aanvraag</td>
                  <td className="px-4 py-3">Op aanvraag</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link href="/iso-certificeringen" className="font-semibold text-[var(--accent-800)]">
            Bekijk alle ISO-certificeringen →
          </Link>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Informatiebeveiliging</h3>
          <p className="text-[var(--text-muted)]">
            Implementatie van informatiebeveiligingsmaatregelen op basis van ISO 27001 en de
            Baseline Informatiebeveiliging Overheid (BIO). Inclusief risicoanalyse, Statement
            of Applicability (SoA) en ISMS-inrichting.
          </p>
          <p className="text-[var(--text-muted)]">
            Het aantal ISO 27001 certificaten wereldwijd is in 2024 verdubbeld naar 96.709
            actieve certificaten (bron: ISO Survey 2024). In Nederland zijn inmiddels 1.568
            organisaties gecertificeerd. Met de invoering van de NIS2-richtlijn
            (Cyberbeveiligingswet) in 2025 stijgt de vraag naar aantoonbare
            informatiebeveiliging verder.
          </p>
          <Link href="/informatiebeveiliging" className="font-semibold text-[var(--accent-800)]">
            Bekijk informatiebeveiliging →
          </Link>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold">AVG &amp; privacy compliance</h3>
          <p className="text-[var(--text-muted)]">
            Praktische begeleiding bij het naleven van de Algemene Verordening
            Gegevensbescherming (AVG/GDPR). Van verwerkingsregister en privacybeleid tot
            DPIA&apos;s, verwerkersovereenkomsten en de rol van externe Functionaris
            Gegevensbescherming (FG).
          </p>
          <p className="text-[var(--text-muted)]">
            De AVG kent boetes tot €20 miljoen of 4% van de wereldwijde jaaromzet (art. 83
            GDPR). In de praktijk zien wij dat MKB-bedrijven niet struikelen over kennis van
            de wet, maar over de uitvoering: ontbrekende registers, onduidelijke rollen en
            geen vast proces voor datalekken.
          </p>
          <Link href="/avg-wetgeving" className="font-semibold text-[var(--accent-800)]">
            Bekijk AVG &amp; wetgeving →
          </Link>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold">NIS2 compliance (Cyberbeveiligingswet)</h3>
          <p className="text-[var(--text-muted)]">
            De NIS2-richtlijn stelt in Artikel 21 tien verplichte risicobeheersmaatregelen
            voor essentiële en belangrijke entiteiten. Organisaties die al ISO 27001
            gecertificeerd zijn, hebben circa 70–80% van deze maatregelen al aantoonbaar
            geïmplementeerd. MaasISO helpt bij het in kaart brengen van de resterende gaps en
            het aantoonbaar voldoen aan de Cyberbeveiligingswet.
          </p>
          <Link href="/nis2-iso27001" className="font-semibold text-[var(--accent-800)]">
            Lees meer over NIS2 en ISO 27001 →
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Waarom MaasISO?</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)]">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="border-b border-[var(--border-muted)] bg-[var(--surface-2)]">
              <tr>
                <th className="px-4 py-3">Kenmerk</th>
                <th className="px-4 py-3">Wat dit voor u betekent</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3 font-semibold">Pragmatische aanpak</td>
                <td className="px-4 py-3">
                  Geen dikke rapporten die stof verzamelen, maar direct toepasbare oplossingen
                  die werken in de dagelijkse praktijk
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3 font-semibold">MKB-focus</td>
                <td className="px-4 py-3">
                  Oplossingen afgestemd op de schaal, het budget en de cultuur van
                  MKB-organisaties
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3 font-semibold">Consultant, geen certificeerder</td>
                <td className="px-4 py-3">
                  Onafhankelijk advies zonder belangenverstrengeling — de certificerende
                  instelling toetst
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3 font-semibold">Integrale benadering</td>
                <td className="px-4 py-3">
                  Meerdere normen combineren in één traject bespaart tijd, geld en voorkomt
                  dubbel werk
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3 font-semibold">Transparante kosten</td>
                <td className="px-4 py-3">
                  Vooraf duidelijkheid over investering, doorlooptijd en deliverables
                </td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3 font-semibold">100% slagingspercentage</td>
                <td className="px-4 py-3">Bewezen track record op certificeringsaudits</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">15+ jaar ervaring</td>
                <td className="px-4 py-3">
                  Breed trackrecord in publieke en private sector: ISO 9001, ISO 27001, ISO
                  14001, BIO, AVG
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Onze aanpak in 5 stappen</h2>
        <p className="text-[var(--text-muted)]">
          Elk traject volgt een gestructureerde aanpak die is bewezen in tientallen
          MKB-implementaties:
        </p>
        <div className="space-y-4">
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Stap 1 — Kennismaking en nulmeting</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Wij starten met een vrijblijvend gesprek en een gap-analyse: waar staat de
              organisatie nu ten opzichte van de norm? In deze fase brengen wij de huidige
              processen, documentatie en risico&apos;s in kaart.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Stap 2 — Plan van aanpak</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Op basis van de nulmeting stellen wij een concreet plan op met scope, planning,
              deliverables en kostenindicatie. Geen verrassingen achteraf.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Stap 3 — Implementatie</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Wij begeleiden de organisatie bij het inrichten van het managementsysteem:
              beleid, procedures, rollen, risicoanalyse en beheersmaatregelen. Altijd
              afgestemd op wat al aanwezig is.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">
              Stap 4 — Interne audit en management review
            </h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Voordat de certificerende instelling langs komt, toetsen wij intern of het
              systeem werkt zoals bedoeld. Bevindingen worden opgelost vóór de externe audit.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Stap 5 — Externe audit en certificering</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              De certificerende instelling voert de audit uit. MaasISO ondersteunt bij de
              voorbereiding en is beschikbaar tijdens de auditdagen.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Expertquote</h2>
        <blockquote className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-6 text-lg leading-relaxed text-[var(--text-strong)]">
          &quot;De meeste MKB-bedrijven onderschatten hoeveel ze al op orde hebben. Een goede
          nulmeting laat vaak zien dat 40–60% van de eisen al informeel is ingeregeld. Het
          traject gaat dan over structureren en aantoonbaar maken — niet over alles opnieuw
          uitvinden.&quot;
          <footer className="mt-4 text-sm text-[var(--text-muted)]">
            — Niels Maas, Senior consultant &amp; oprichter, MaasISO
          </footer>
        </blockquote>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Wat kost ISO-certificering? (indicatie voor MKB)</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)]">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="border-b border-[var(--border-muted)] bg-[var(--surface-2)]">
              <tr>
                <th className="px-4 py-3">Traject</th>
                <th className="px-4 py-3">Bedrijfsgrootte</th>
                <th className="px-4 py-3">Indicatie totale investering</th>
                <th className="px-4 py-3">Gemiddelde doorlooptijd</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">ISO 9001</td>
                <td className="px-4 py-3">1–10 FTE</td>
                <td className="px-4 py-3">€5.000–€8.000</td>
                <td className="px-4 py-3">3–4 maanden</td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">ISO 9001</td>
                <td className="px-4 py-3">10–50 FTE</td>
                <td className="px-4 py-3">€8.000–€15.000</td>
                <td className="px-4 py-3">4–6 maanden</td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">ISO 27001</td>
                <td className="px-4 py-3">1–10 FTE</td>
                <td className="px-4 py-3">€10.000–€18.000</td>
                <td className="px-4 py-3">3–6 maanden</td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">ISO 27001</td>
                <td className="px-4 py-3">10–50 FTE</td>
                <td className="px-4 py-3">€18.000–€25.000</td>
                <td className="px-4 py-3">6–9 maanden</td>
              </tr>
              <tr className="border-b border-[var(--border-muted)]">
                <td className="px-4 py-3">ISO 14001</td>
                <td className="px-4 py-3">MKB</td>
                <td className="px-4 py-3">€4.000–€10.000</td>
                <td className="px-4 py-3">3–6 maanden</td>
              </tr>
              <tr>
                <td className="px-4 py-3">AVG compliance</td>
                <td className="px-4 py-3">MKB</td>
                <td className="px-4 py-3">€3.000–€10.000</td>
                <td className="px-4 py-3">4–12 weken</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          Alle bedragen zijn inclusief begeleiding. Kosten voor de certificerende instelling
          en eventuele tooling zijn apart vermeld op de betreffende normpagina&apos;s.
        </p>
        <Link href="/kostenoverzicht" className="font-semibold text-[var(--accent-800)]">
          Bekijk gedetailleerde kostenoverzichten per norm →
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">ISO Norm Selector</h2>
        <p className="text-[var(--text-muted)]">
          Weet u nog niet welke norm bij uw organisatie past? Gebruik onze gratis ISO Norm
          Selector. In enkele vragen krijgt u een onderbouwd advies over de normen die
          relevant zijn voor uw situatie, sector en doelstellingen.
        </p>
        <Link href="/iso-norm-selector" className="font-semibold text-[var(--accent-800)]">
          Start de ISO Norm Selector →
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Kennis &amp; resources</h2>
        <p className="text-[var(--text-muted)]">
          MaasISO publiceert regelmatig artikelen, praktische gidsen en whitepapers over
          ISO-certificering, informatiebeveiliging en AVG compliance. Onze kennis is vrij
          beschikbaar en bedoeld om MKB-organisaties te helpen onderbouwde keuzes te maken.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[var(--text-strong)]">
          <li>ISO 9001 certificering: kosten, proces &amp; voordelen [2026]</li>
          <li>ISO 27001 certificering: complete gids, kosten &amp; stappen (2026)</li>
          <li>AVG wetgeving: praktisch advies &amp; implementatie voor MKB</li>
        </ul>
        <Link href="/blog" className="font-semibold text-[var(--accent-800)]">
          Bekijk alle artikelen op ons blog →
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Veelgestelde vragen</h2>
        <div className="space-y-4">
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Wat doet een ISO-consultant?</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Een ISO-consultant begeleidt organisaties bij het implementeren van een
              managementsysteem dat voldoet aan een ISO-norm. De consultant helpt bij de
              nulmeting, documentatie, implementatie en auditvoorbereiding. Een consultant
              geeft zelf geen certificaat af — dat doet de onafhankelijke certificerende
              instelling.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">
              Wat kost ISO-certificering voor een klein bedrijf?
            </h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Voor MKB-bedrijven met 1–10 medewerkers liggen de kosten voor ISO 9001
              certificering gemiddeld tussen €5.000 en €8.000. Voor ISO 27001 tussen €10.000
              en €18.000. Deze bedragen zijn inclusief consultancy en certificatie-audit.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Hoe lang duurt een ISO-certificeringstraject?</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              De gemiddelde doorlooptijd voor MKB-organisaties ligt tussen 3 en 9 maanden,
              afhankelijk van de norm, de organisatiegrootte en de mate waarin processen al
              zijn vastgelegd.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">
              Wat is het verschil tussen een consultant en een certificeerder?
            </h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Een consultant begeleidt de implementatie van het managementsysteem. Een
              certificerende instelling (zoals Kiwa, TÜV, DNV of LRQA) voert de onafhankelijke
              audit uit en verleent het certificaat. MaasISO is een consultant — wij
              begeleiden, maar certificeren niet zelf.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Is ISO-certificering verplicht?</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              ISO-certificering is in Nederland niet wettelijk verplicht. Wel wordt
              certificering steeds vaker gevraagd door klanten, ketenpartners en in
              aanbestedingen. Met de invoering van de NIS2-richtlijn
              (Cyberbeveiligingswet) wordt aantoonbare informatiebeveiliging voor bepaalde
              sectoren wél een wettelijke verplichting.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Welke ISO-norm past bij mijn organisatie?</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Dat hangt af van uw sector, klanten en doelstellingen. ISO 9001 is de meest
              universele norm (kwaliteitsmanagement). ISO 27001 richt zich op
              informatiebeveiliging. ISO 14001 op milieumanagement. Gebruik onze gratis ISO
              Norm Selector voor een persoonlijk advies.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Kan ik meerdere ISO-normen combineren?</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Ja. ISO-normen zijn gebaseerd op dezelfde Harmonized Structure, waardoor ze goed
              integreerbaar zijn in één managementsysteem. Dit bespaart dubbel werk,
              vereenvoudigt audits en verlaagt kosten. MaasISO heeft ruime ervaring met
              integrale trajecten.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">
              Wat is NIS2 en hoe verhoudt het zich tot ISO 27001?
            </h3>
            <p className="mt-2 text-[var(--text-muted)]">
              NIS2 (de Cyberbeveiligingswet) stelt beveiligingseisen voor essentiële en
              belangrijke entiteiten in de EU. ISO 27001 gecertificeerde organisaties hebben
              circa 70–80% van de NIS2 Artikel 21-maatregelen al aantoonbaar geïmplementeerd.
              ISO 27001 is daarmee het meest directe pad naar NIS2 compliance.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Werkt MaasISO ook buiten Nederland?</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              MaasISO bedient organisaties in Nederland en België/Vlaanderen.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5">
            <h3 className="text-lg font-semibold">Hoe neem ik contact op?</h3>
            <p className="mt-2 text-[var(--text-muted)]">
              Neem contact op via{" "}
              <a href="mailto:info@maasiso.nl" className="font-semibold text-[var(--accent-800)]">
                info@maasiso.nl
              </a>{" "}
              of bel{" "}
              <a href="tel:+31623578344" className="font-semibold text-[var(--accent-800)]">
                +31 (0)6 2357 8344
              </a>{" "}
              voor een vrijblijvend kennismakingsgesprek. U kunt ook direct een afspraak
              inplannen via onze contactpagina.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border-muted)] bg-gradient-to-r from-[var(--surface-0)] to-[var(--surface-2)] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Klaar om te beginnen?</h2>
        <p className="mt-3 max-w-3xl text-[var(--text-muted)]">
          Neem vrijblijvend contact op voor een kennismakingsgesprek. Wij vertellen u graag
          wat MaasISO voor uw organisatie kan betekenen.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link href="/contact" className="font-semibold text-[var(--accent-800)]">
            Plan een kennismaking →
          </Link>
          <Link href="/iso-norm-selector" className="font-semibold text-[var(--accent-800)]">
            Doe de ISO Norm Selector →
          </Link>
        </div>
      </section>
    </div>
  );
}

