export type Location = {
  name: string;
  latitude: number;
  longitude: number;
};

export const Prague: Location = {
  name: "Prague",
  latitude: 50.0755381,
  longitude: 14.4378005,
};
export const CeskeBudejovice: Location = {
  name: "Ceske Budejovice",
  latitude: 48.9756578,
  longitude: 14.480255,
};
export const Ostrava: Location = {
  name: "Ostrava",
  latitude: 49.8209226,
  longitude: 18.2625243,
};
export const Olomouc: Location = {
  name: "Olomouc",
  latitude: 49.593778,
  longitude: 17.250878,
};
export const Brno: Location = {
  name: "Brno",
  latitude: 49.1950602,
  longitude: 16.6068371,
};
export const Slany: Location = {
  name: "Slany",
  latitude: 50.23046220000001,
  longitude: 14.0869438,
};
export const HradecKralove: Location = {
  name: "Hradec Kralove",
  latitude: 50.2103605,
  longitude: 15.825211,
};
export const Pardubice: Location = {
  name: "Pardubice",
  latitude: 50.0343092,
  longitude: 15.7811994,
};
export const Kolin: Location = {
  name: "Kolin",
  latitude: 50.02732899999999,
  longitude: 15.2027277,
};
export const Jihlava: Location = {
  name: "Jihlava",
  latitude: 49.3983782,
  longitude: 15.5870415,
};
export const Liberec: Location = {
  name: "Liberec",
  latitude: 50.76627999999999,
  longitude: 15.0543387,
};

export const locations: Location[] = [
  Prague,
  Slany,
  CeskeBudejovice,
  Liberec,

  HradecKralove,
  Pardubice,
  Kolin,

  Jihlava,

  Ostrava,
  Olomouc,
  Brno,
];
