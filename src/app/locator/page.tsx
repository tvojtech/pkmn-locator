import { Card } from "@/app/locator/card";
import { Filters } from "@/app/locator/filters";
import { locations } from "@/app/locator/locations";
import { Activity, ActivityData, Tag } from "@/app/locator/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const fetchData = async (): Promise<Activity[]> => {
  return await Promise.all(
    locations
      .map(
        (location) =>
          `https://op-core.pokemon.com/api/v2/event_locator/search/?latitude=${location.latitude}&longitude=${location.longitude}&distance=10`
      )
      .map((url) => fetch(url, { next: { revalidate: 1440 } }))
  )
    .then((responses) => Promise.all(responses.map((resp) => resp.json())))
    .then((activityData: ActivityData[]) => {
      return activityData
        .map((data) => data.activities)
        .reduce((acc, next) => [...acc, ...next], []);
      // .filter(
      //   (activity) =>
      //     activity.tags.includes(Tag.league_cup) ||
      //     activity.tags.includes(Tag.league_challenge)
      // );
    });
};

const LocatorPage: React.FC<{
  searchParams: { "event-type": string | undefined };
}> = async ({ searchParams }) => {
  const data = await fetchData();
  const eventTypes = (searchParams["event-type"] ?? "")
    .split(",")
    .filter(Boolean);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        margin: 4,
      }}
    >
      <Filters />
      {data
        .filter(
          (item) =>
            eventTypes.length === 0 ||
            item.tags.some((tag) => eventTypes.includes(tag))
        )
        .sort((a, b) => new Date(a.when).getTime() - new Date(b.when).getTime())
        .map((item) => (
          <Card key={item.guid} item={item} />
        ))}
    </div>
  );
};

export default LocatorPage;
