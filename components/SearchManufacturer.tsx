"use client";

import { Fragment, useState } from "react";

import Image from "next/image";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { SearchManufacturerProps } from "@/types";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const getPureValue = (value: string) => {
    return value.toLocaleLowerCase().replace(/\s+/g, "");
  };

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          getPureValue(item).includes(getPureValue(query))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <ComboboxButton className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="Car Logo"
            />
          </ComboboxButton>

          <ComboboxInput
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <ComboboxOption
                  value={query}
                  className="search-manufacturer__option"
                >
                  Create "{query}"
                </ComboboxOption>
              ) : (
                filteredManufacturers.map((item) => (
                  <ComboboxOption
                    key={item}
                    value={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option cursor-pointer ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ focus, selected }) => (
                      <div>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>
                        {selected && (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              focus ? "text-white" : "text-teal-600"
                            }`}
                          ></span>
                        )}
                      </div>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
