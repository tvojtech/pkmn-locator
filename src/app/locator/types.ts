export type LocatorApiItem = {
  name: string;
  type: "league_cup" | "league_challenge" | undefined;
  game: string;
  when: string;
  address: {
    address: string;
    location: string;
  };
};
