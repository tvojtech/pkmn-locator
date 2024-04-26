import { Card } from "@/app/locator/card";
import { locations } from "@/app/locator/locations";
import { Activity, ActivityData } from "@/app/locator/types";

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
        .reduce((acc, next) => [...acc, ...next], [])
        .filter(
          (activity) =>
            activity.tags.includes("league_cup") ||
            activity.tags.includes("league_challenge")
        );
    });
};

const LocatorPage = async () => {
  const data = await fetchData();

  return (
    <div>
      <ol>
        {data
          .sort(
            (a, b) => new Date(a.when).getTime() - new Date(b.when).getTime()
          )
          .map((item) => (
            <Card key={item.name} item={item} />
          ))}
      </ol>
    </div>
  );
};

export default LocatorPage;
