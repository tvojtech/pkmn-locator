import { Activity } from "@/app/locator/types";
import { format } from "date-fns";
import React from "react";

export const Card: React.FC<{ item: Activity }> = ({ item }) => {
  return (
    <li
      style={{
        margin: 4,
        padding: 4,
        border: "1px solid lightgrey",
      }}
    >
      <div>{item.name}</div>
      <div>{format(item.when, "PPpp")}</div>
      <div>{item.address.full_address}</div>
    </li>
  );
};
