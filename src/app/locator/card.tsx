import { Activity, Tag } from "@/app/locator/types";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

export const Card: React.FC<{ item: Activity }> = ({ item }) => {
  return (
    <div
      style={{
        padding: 4,
        border: "1px solid lightgrey",
        width: "100%",
        maxWidth: 600,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <a href={item.pokemon_url} target="_blank">
            {item.address.name} - {item.name}
          </a>
        </div>
        <div>{format(item.when, "PPpp")}</div>
        <div>{item.address.full_address}</div>
      </div>
      <div>
        <EventType activity={item} />
      </div>
    </div>
  );
};

const EventType: React.FC<{ activity: Activity }> = ({ activity }) => {
  let imageUrl;

  if (activity.tags.includes(Tag.league_challenge)) {
    imageUrl =
      "https://events.pokemon.com/OPPlayerApp/img/OPPlayerApp.LeaguechallengeBadge.png";
  } else if (activity.tags.includes(Tag.league_cup)) {
    imageUrl =
      "https://events.pokemon.com/OPPlayerApp/img/OPPlayerApp.LeagueCupBadge.png";
  } else if (activity.tags.includes(Tag.prerelease)) {
    imageUrl =
      "https://events.pokemon.com/OPPlayerApp/img/OPPlayerApp.PrereleaseBadge.png";
  } else {
    return null;
  }
  const altText = imageUrl
    .replace("https://events.pokemon.com/OPPlayerApp/img/OPPlayerApp.", "")
    .replace("Badge.png", "");
  return <Image width={75} height={75} src={imageUrl} alt={altText} />;
};
