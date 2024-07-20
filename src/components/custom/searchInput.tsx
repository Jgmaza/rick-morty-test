import { Popover } from "@radix-ui/react-popover";
import React from "react";
import { Input } from "../ui/input";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

const SearchInput = () => {
  return (
    <div className="flex items-center w-full px-4 py-[9px] bg-gray-100 rounded-md">
      <i className="fa-solid fa-search text-purple-700"></i>
      <Input
        type="text"
        placeholder="Search or filter results"
      />
      <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-transparent border-none p-0 h-auto" variant="outline"><i className="fa-solid fa-sliders text-purple-700 rotate-90"></i></Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
    </div>
  );
};

export default SearchInput;
