import { Card } from "@/app/locator/card";
import { LocatorApiItem } from "@/app/locator/types";
import { parse } from "date-fns";

const fetchData = async (): Promise<LocatorApiItem[]> => {
  const datasetsResp = await fetch(
    `https://api.apify.com/v2/datasets?token=${process.env.APIFY_TOKEN}&unnamed=1`,
    { next: { revalidate: 1440 } }
  );

  if (!datasetsResp.ok) {
    throw new Error("Failed to fetch datasets");
  }

  const {
    data: { items },
  } = await datasetsResp.json();

  const datasetResp = await fetch(
    "https://api.apify.com/v2/datasets/" +
      items[items.length - 1].id +
      "/items",
    { next: { revalidate: 1440 } }
  );

  if (!datasetResp.ok) {
    throw new Error("Failed to fetch dataset data");
  }

  const data = ((await datasetResp.json()) as LocatorApiItem[])
    .filter((d) => !!d.game && !!d.type)
    .filter((d) => d.type === "league_cup")
    .map((d) => ({
      ...d,
      when: parse(d.when, "MMMM d, yyyy h:mma", new Date()),
    }))
    .sort((a, b) => a.when.getTime() - b.when.getTime())
    .reduce(
      (acc, next) => ({
        ...acc,
        [next.name]: next,
      }),
      {}
    );

  return Object.values(data);
};

const LocatorPage = async () => {
  const data = await fetchData();

  return (
    <div>
      <ol>
        {data.map((item) => (
          <Card key={item.name} item={item} />
        ))}
      </ol>
    </div>
  );
};

export default LocatorPage;
