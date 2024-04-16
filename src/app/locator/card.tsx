import { LocatorApiItem } from "@/app/locator/types";
import { format } from "date-fns";
import React from "react";

export const Card: React.FC<{ item: LocatorApiItem }> = ({ item }) => {
  return (
    <li
      style={{
        margin: 4,
        padding: 4,
        border: "1px solid lightgrey",
      }}
    >
      <div>
        {item.type} - {item.name}
      </div>
      <div>{format(item.when, "PPpp")}</div>
      <div>{item.address.address}</div>
      <div>{item.address.location}</div>
    </li>
  );
};
