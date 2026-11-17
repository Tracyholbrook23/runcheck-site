import gyms from "./gyms.json";

/* Gyms and courts RunCheck tracks, grouped into city pages for people searching Google. */

export type Gym = { name: string; address: string; city: string; type: "indoor" | "outdoor" | string };

export type City = {
  slug: string;
  name: string;
  intro: string;
  extra?: { text: string; href: string; label: string };
};

export const CITIES: City[] = [
  {
    slug: "austin",
    name: "Austin",
    intro: "From rec centers on the East Side to the YMCAs up north, Austin has more places to hoop than most people know about. The hard part is knowing which gym actually has a run tonight. RunCheck shows how many players are checked in at each one right now.",
  },
  {
    slug: "round-rock",
    name: "Round Rock",
    intro: "Round Rock has indoor gyms, outdoor parks and some of the best organized runs in the area. Check who's playing before you drive over, or join a run that's already forming.",
    extra: { text: "Open Run Elite runs at Round Rock Sports Center, booked and paid in RunCheck.", href: "/updates/open-run-elite", label: "See the run" },
  },
  {
    slug: "cedar-park",
    name: "Cedar Park",
    intro: "Cedar Park has rec centers, YMCAs and outdoor parks with courts. RunCheck shows which ones are active before you leave the house.",
  },
  {
    slug: "pflugerville",
    name: "Pflugerville",
    intro: "Pflugerville has indoor gyms and outdoor courts all over town. See where people are playing right now and who's pulling up later.",
  },
];

export const ALL_GYMS = gyms as Gym[];

export function gymsIn(cityName: string) {
  return ALL_GYMS.filter((g) => g.city === cityName).sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === "indoor" ? -1 : 1));
}

export const mapsLink = (g: Gym) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${g.name}, ${g.address}`)}`;
