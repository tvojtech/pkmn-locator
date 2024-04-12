import { useEffect, useState } from "react";

type LocatorApiItem = {
  name: string;
  type: string;
  game: string;
  when: string;
  address: {
    address: string;
    location: string;
  };
};

const fetchData = async (): Promise<LocatorApiItem[]> => {
  const datasetsResp = await fetch(
    `https://api.apify.com/v2/datasets?token=${process.env.APIFY_TOKEN}&unnamed=1`
  );

  if (!datasetsResp.ok) {
    throw new Error("Failed to fetch datasets");
  }

  const {
    data: { items },
  } = await datasetsResp.json();

  const datasetResp = await fetch(
    "https://api.apify.com/v2/datasets/" + items[items.length - 1].id + "/items"
  );

  if (!datasetResp.ok) {
    throw new Error("Failed to fetch dataset data");
  }

  const data = ((await datasetResp.json()) as LocatorApiItem[])
    .filter((d) => !!d.game && !!d.type)
    .reduce((acc, next) => ({ ...acc, [next.name]: next }), {});

  return Object.values(data);
};

const LocatorPage = async () => {
  const data = await fetchData();

  return (
    <div>
      <ol>
        {data.map((item) => (
          <li key={item.name}>
            <div>
              {item.type} - {item.name}
            </div>
            <div>{item.when}</div>
            <div>{item.address.address}</div>
            <div>{item.address.location}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LocatorPage;
