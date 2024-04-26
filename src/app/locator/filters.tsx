"use client";
import { Tag } from "@/app/locator/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const Checkbox: React.FC<{
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => {
  return (
    <label>
      <input
        style={{ marginRight: 8 }}
        type="checkbox"
        checked={checked}
        onChange={(evt) => {
          onChange?.(evt.target.checked);
        }}
      />
      {label}
    </label>
  );
};

export const Filters: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const eventTypes = (searchParams.get("event-type") ?? "").split(",");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div style={{ marginBottom: 10, marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 14,
        }}
      >
        {Object.values(Tag).map((tag) => (
          <Checkbox
            key={tag}
            label={tag}
            checked={eventTypes.includes(tag)}
            onChange={(checked) => {
              let newFilter;
              if (checked) {
                newFilter = eventTypes.concat(tag);
              } else {
                newFilter = eventTypes.filter((et) => et !== tag);
              }
              router.push(
                pathname +
                  "?" +
                  createQueryString("event-type", newFilter.join(","))
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};
