import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — RunCheck",
  description:
    "Read the RunCheck Terms of Service, including our platform role, limitation of liability, and assumption of risk for pickup basketball runs.",
};

const LAST_UPDATED = "April 30, 2026";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: `By downloading, accessing, or using the RunCheck mobile application or website (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service. These Terms apply to all users, including visitors, registered users, and run hosts.`,
  },
  {
    id: "description",
    title: "Description of Service",
    content: `RunCheck is a peer-to-peer platform that allows users to discover, organize, and join pickup basketball runs at gyms and courts near them. RunCheck provides technology to connect players — we are not a gym operator, sports facility manager, venue owner, or event organizer. We do not host, manage, or facilitate runs ourselves; all runs are created and organized by individual users.`,
  },
  {
    id: "accounts",
    title: "User Accounts",
    items: [
      "You must be at least 13 years old to create an account.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You are responsible for all activity that occurs under your account.",
      "You agree to provide accurate and complete information when creating your account.",
      "We reserve the right to suspend or terminate accounts that violate these Terms.",
    ],
  },
  {
    id: "conduct",
    title: "User Conduct",
    content: "By using the Service, you agree not to:",
    items: [
      "Post false, misleading, or fraudulent run information.",
      "Harass, threaten, or abuse other users.",
      "Use the Service for any unlawful purpose.",
      "Attempt to gain unauthorized access to any part of the Service.",
      "Impersonate any person or entity.",
      "Repeatedly create runs you do not intend to attend.",
      "Circumvent or manipulate the reliability score system.",
    ],
  },
  {
    id: "platform-role",
    title: "Platform Role & No Guarantee of Availability",
    content: `RunCheck is a technology platform — not a gym, court operator, or athletic facility. This distinction is important and affects your rights and our responsibilities under these Terms.`,
    subsections: [
      {
        title: "We Do Not Control Venues",
        items: [
          "RunCheck does not own, operate, manage, or control any gym, basketball court, athletic facility, or other venue listed or referenced on the Service.",
          "We do not have any contractual relationship with third-party venues unless explicitly stated.",
          "Venues listed on RunCheck are provided for informational and coordination purposes only.",
        ],
      },
      {
        title: "No Guarantee of Court or Gym Availability",
        items: [
          "RunCheck makes no representations, warranties, or guarantees that any gym, court, or facility will be open, accessible, or available at the time of a scheduled run.",
          "Court availability is subject to change at any time without notice, including due to: facility closures, maintenance, private events, league play, volleyball, other scheduled activities, weather, or any other reason determined by the venue.",
          "RunCheck is not responsible for and shall not be liable for any gym being closed, occupied, unavailable, or inaccessible when you arrive.",
          "It is your responsibility to verify gym hours, court availability, and any reservation requirements directly with the venue before attending a run.",
          "The existence of a run on RunCheck does not mean that court time has been reserved, guaranteed, or confirmed with the venue in any way.",
        ],
      },
      {
        title: "Limitation of Liability",
        items: [
          "To the maximum extent permitted by applicable law, RunCheck, its founders, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the Service.",
          "This includes, without limitation: wasted travel time or transportation costs incurred when a court is unavailable, disputes between players at a run, injuries sustained during a run, equipment damage, loss of personal property, or any other harm arising from attending or hosting a run.",
          'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.',
          "In no event shall RunCheck's total liability to you for all claims exceed the amount you have paid to RunCheck in the twelve (12) months preceding the claim, or $100, whichever is greater.",
        ],
      },
    ],
  },
  {
    id: "assumption-of-risk",
    title: "Assumption of Risk",
    content:
      "Basketball and other physical activities involve inherent risks, including but not limited to sprains, fractures, concussions, cardiovascular events, and other serious injury. By using RunCheck to participate in runs:",
    items: [
      "You voluntarily assume all risks associated with physical activity, including injury, illness, or death.",
      "You represent that you are physically capable of participating in the activities you join.",
      "You agree that RunCheck is not responsible for any injury, illness, or harm you sustain during or in connection with a run organized through the Service.",
      "You agree to consult a qualified healthcare professional before engaging in strenuous physical activity if you have any medical conditions or concerns.",
    ],
  },
  {
    id: "third-party-venues",
    title: "Third-Party Venues & Gym Policies",
    items: [
      "When you attend a run at a gym or court, you are subject to that venue's rules, policies, membership requirements, and fees.",
      "RunCheck is not responsible for ensuring that you meet the venue's requirements to enter or use the facility.",
      "Some venues may require a membership, day pass, or other credentials. It is your responsibility to understand and comply with those requirements.",
      "Disputes with a gym or facility are between you and that venue — RunCheck is not a party to and has no responsibility in that relationship.",
    ],
  },
  {
    id: "run-hosts",
    title: "Run Hosts",
    content:
      "If you create a run on RunCheck, you agree to the following additional responsibilities:",
    items: [
      "You will make reasonable efforts to ensure the run occurs as scheduled, or notify participants promptly if it must be cancelled.",
      "You will not repeatedly cancel runs without good reason. Patterns of cancellation may result in warnings or account suspension.",
      "You will not create runs at venues where you know access is not available.",
      "You acknowledge that repeated cancellations harm the community and undermine trust in the platform.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    items: [
      "RunCheck and its logo, design, and original content are owned by RunCheck and protected by applicable intellectual property laws.",
      "You retain ownership of any content you post (profile photos, run descriptions, etc.), but you grant RunCheck a non-exclusive, royalty-free license to display that content within the Service.",
      "You may not use RunCheck's name, logo, or branding without our prior written consent.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    content:
      "We reserve the right to suspend or terminate your account at any time, with or without notice, for any violation of these Terms or for any conduct we determine to be harmful to the community or the Service. You may delete your account at any time by contacting us at hello@theruncheck.app.",
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: `These Terms are governed by the laws of the State of Texas, without regard to its conflict of law provisions. Any dispute arising out of or relating to these Terms or the Service shall be resolved exclusively in the state or federal courts located in Travis County, Texas, and you consent to personal jurisdiction in those courts.`,
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content: `We may update these Terms from time to time. When we do, we will revise the "Last Updated" date at the top of this page. If we make material changes, we will notify you through the app or via email. Your continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "If you have questions or concerns about these Terms of Service, please contact us:",
    contact: {
      email: "hello@theruncheck.app",
      address: "RunCheck · Austin, TX",
    },
  },
];

export default function Terms() {
  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Nav activePath="/terms" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse,rgba(249,115,22,.5) 0%,transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-4">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-zinc-400 text-base">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="w-full border-t border-zinc-800/60" />

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 w-full">

        {/* Table of contents */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-4">
            Contents
          </p>
          <ol className="flex flex-col gap-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-zinc-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-zinc-700 text-[11px] w-4 flex-shrink-0">
                    {i + 1}.
                  </span>
                  <span className="group-hover:underline underline-offset-2">
                    {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map((section, i) => (
            <div key={section.id} id={section.id} className="scroll-mt-28">
              <div className="flex items-start gap-4 mb-5">
                <span className="text-[11px] font-bold text-orange-500 mt-1.5 flex-shrink-0 w-5">
                  {i + 1}.
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {section.title}
                </h2>
              </div>

              <div className="pl-9 flex flex-col gap-5">
                {section.content && (
                  <p className="text-zinc-300 text-sm leading-7">
                    {section.content}
                  </p>
                )}

                {section.items && (
                  <ul className="flex flex-col gap-2.5">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-zinc-300 leading-7"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections &&
                  section.subsections.map((sub, si) => (
                    <div key={si} className="flex flex-col gap-3">
                      <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest text-[11px]">
                        {sub.title}
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {sub.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-sm text-zinc-300 leading-7"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0 mt-2.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                {section.contact && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-2">
                    <a
                      href={`mailto:${section.contact.email}`}
                      className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors"
                    >
                      {section.contact.email}
                    </a>
                    <p className="text-zinc-500 text-sm">
                      {section.contact.address}
                    </p>
                  </div>
                )}
              </div>

              {i < sections.length - 1 && (
                <div className="mt-12 border-t border-zinc-800/60" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
