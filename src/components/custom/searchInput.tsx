import { Popover } from "../ui/popover";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ICharacterFilter, ISpecies } from "@/lib/types";

interface SearchInputProps {
  setFilters: Dispatch<SetStateAction<ICharacterFilter>>;
  species?: ISpecies[];
}

interface FilterButtonProps {
  children: React.ReactNode;
  parameter: string
  value: string | boolean | number;
  setFilters: Dispatch<SetStateAction<ICharacterFilter>>;
}

const FilterButton = ({ children, parameter, value, setFilters }: FilterButtonProps) => {
  return (
    <Button className="" variant="outline" onClick={() => {
      setFilters((prev) => ({ ...prev, [parameter]: value }));
    }}>
      {children}
    </Button>
  );
};

const SearchInput = ({ setFilters, species }: SearchInputProps) => {
  const [auxFilters, setAuxFilters] = useState<ICharacterFilter>({});
  return (
    <div className="flex items-center w-full px-4 py-[9px] bg-gray-100 rounded-md">
      <i className="fa-solid fa-search text-gray-500"></i>
      <Input
        type="text"
        placeholder="Search or filter results"
        onChange={(e) => {
          if (setFilters) {
            setFilters((prev) => ({ ...prev, name: e.target.value }));
          }
        }}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="bg-transparent border-none p-0 h-auto"
            variant="outline"
          >
            <i className="fa-solid fa-sliders text-purple-700 rotate-90"></i>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[343px] p-6"
          side="bottom"
          sideOffset={25}
          align="end"
          alignOffset={-18}
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-gray-500 text-sm">Character</p>
              <div className="flex flex-row gap-2">
                <Button className="" variant="outline" onClick={() => {
                  if (setFilters) {
                    setFilters((prev) => ({ ...prev, favorites: true, others: true }));
                  }
                }
                }>
                  All
                </Button>
                
                <Button className="" variant="outline" onClick={() => {
                  if (setFilters) {
                    setFilters((prev) => ({ ...prev, favorites: !prev.favorites }));
                  }
                }}>
                  Favorites
                </Button>

                <Button className="" variant="outline" onClick={() => {
                  if (setFilters) {
                    setFilters((prev) => ({ ...prev, others: !prev.others }));
                  }
                }}>
                  Others
                </Button>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Specie</p>
              <div className="flex flex-row gap-2">
                <FilterButton parameter="speciesId" value="" setFilters={setFilters}>
                  All
                </FilterButton>
                {species?.map((specie) => (
                  <FilterButton
                    key={specie.id}
                    parameter="speciesId"
                    value={specie.id}
                    setFilters={setFilters}
                  >
                    {specie.name}
                  </FilterButton>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchInput;
