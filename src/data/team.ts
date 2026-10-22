// Source: mockup/index.html `#page-humans` (L15724-15790). Copy is verbatim.
//
// Name <-> photo <-> hometown mapping: "mockup as-is", chosen by the user on 2026-10-21
// (AUDIT 8.3 / Q6). The mockup's card order is kept, and each card's visible first name
// and hometown are used (its `alt` text and class names disagree with the visible names,
// e.g. the 2nd card shows "Sangeeth" with alt "Janith portrait"; alts here follow the
// visible name). Changing the mapping is a data-only edit in this file.
//
// Photos are the real files under public/media/humans (docs/media-map.md); width/height
// are each file's natural size (next/image needs them for the aspect ratio).

export type TeamMember = {
  /** First name, as shown on the card */
  name: string;
  /** Hometown as shown on the card; it is also what the search matches */
  hometown: string;
  photo: { src: string; width: number; height: number; alt: string };
};

export const HUMANS_PAGE = {
  /** Two lines in the mockup (`<br>`); the second line has the gradient text */
  title: ["Humans", "behind BuildSense IT"],
  description:
    "We're a team of seven software developers from across Sri Lanka, working together to build thoughtful technology that makes sense.",
  addLabel: "Add yourself to the list",
  searchLabel: "Search team members",
  searchPlaceholder: "Search team members...",
  gridLabel: "BuildSense IT team members",
  emptyMessage: "No matching team members",
} as const;

export const TEAM: readonly TeamMember[] = [
  {
    name: "Uditha",
    hometown: "Badulla, Sri Lanka",
    photo: { src: "/media/humans/portrait-1-v1.jpg", width: 281, height: 281, alt: "Uditha portrait" },
  },
  {
    name: "Sangeeth",
    hometown: "Buttala, Sri Lanka",
    photo: { src: "/media/humans/portrait-2-v1.jpg", width: 552, height: 552, alt: "Sangeeth portrait" },
  },
  {
    name: "Lahiru",
    hometown: "Kurunagala, Sri Lanka",
    photo: { src: "/media/humans/portrait-3-v1.jpg", width: 655, height: 655, alt: "Lahiru portrait" },
  },
  {
    name: "Sahan",
    hometown: "Beliatte, Sri Lanka",
    photo: { src: "/media/humans/portrait-4-v1.jpg", width: 455, height: 455, alt: "Sahan portrait" },
  },
  {
    name: "Randima",
    hometown: "Walasmulla, Sri Lanka",
    photo: { src: "/media/humans/portrait-5-v1.jpg", width: 459, height: 459, alt: "Randima portrait" },
  },
  {
    name: "Athila",
    hometown: "Anuradapura, Sri Lanka",
    photo: { src: "/media/humans/portrait-6-v1.jpg", width: 642, height: 642, alt: "Athila portrait" },
  },
  {
    name: "Janith",
    hometown: "Embilipitiya, Sri Lanka",
    photo: { src: "/media/humans/portrait-7-v1.jpg", width: 605, height: 605, alt: "Janith portrait" },
  },
];
