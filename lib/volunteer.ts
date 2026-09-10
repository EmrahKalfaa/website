export type VolunteerMedia = {
  src: string;
  kind: "image" | "video";
  alt: {
    en: string;
    tr: string;
  };
  caption: {
    en: string;
    tr: string;
  };
};

export const volunteerMedia: VolunteerMedia[] = [
  {
    src: "/volunteer/anku-gamejam-oyun-sektorunde-girisimcilik.webp",
    kind: "image",
    alt: {
      en: "Event poster for Entrepreneurship in the Game Industry at ANKÜ GameJam on 18 March, featuring Emrah Kalfa.",
      tr: "18 Mart ANKÜ GameJam Oyun Sektöründe Girişimcilik etkinliği afişi, konuşmacı Emrah Kalfa.",
    },
    caption: {
      en: "ANKÜ GameJam — Entrepreneurship in the Game Industry",
      tr: "ANKÜ GameJam — Oyun Sektöründe Girişimcilik",
    },
  },
  {
    src: "/volunteer/adan-zye-oyun-gelistirme.mp4",
    kind: "video",
    alt: {
      en: "Guest talk on game development from A to Z.",
      tr: "A’dan Z’ye Oyun Geliştirme etkinliğinde konuk konuşma.",
    },
    caption: {
      en: "Game development talk — from A to Z",
      tr: "A’dan Z’ye Oyun Geliştirme",
    },
  },
  {
    src: "/volunteer/universite-etkinligi-odul.jpeg",
    kind: "image",
    alt: {
      en: "Emrah Kalfa receiving an award on stage at a university event.",
      tr: "Emrah Kalfa bir üniversite etkinliğinde sahnede ödül alırken.",
    },
    caption: {
      en: "Yeditepe University event",
      tr: "Yeditepe Üniversitesi etkinliği",
    },
  },
];
