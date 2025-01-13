import { Network } from "../types";

export const NETWORKS: Network[] = [
  {
    name: "Malt",
    icon: "SiMalt",
    url: "https://www.malt.fr/profile/bernardrogier1",
  },
  {
    name: "UpWork",
    icon: "SiUpwork",
    url: "https://www.upwork.com/freelancers/~018164397633072b01?mp_source=share",
  },
  {
    name: "Fiverr",
    icon: "SiFiverr",
    url: "https://fr.fiverr.com/bernard_rogier",
  },
  {
    name: "ComeUp",
    icon: "MdWorkspaces",
    url: "https://comeup.com/fr/@bernardrogier",
  },
];

export const PROFILE_DATA = {
  avatar: "/me.jpg",
  initials: "RB",
  name: "Rogier Bernard",
  job: "Développeur Full Stack",
  availability:
    process.env.NEXT_PUBLIC_IS_AVAILABLE === "true"
      ? "Disponible"
      : "Indisponible",
};
