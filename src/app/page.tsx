"use client";

import CustomCard from "@/components/custom/card";
import Detail from "@/components/custom/detail";
import SearchInput from "@/components/custom/searchInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { ICharacter, ICharacterFilter } from "@/lib/types";
import { GET_CHARACTERS } from "@/lib/apollo/queries";

export default function Home() {
  const [filters, setFilters] = useState<ICharacterFilter>({});
  const { loading, error, data } = useQuery<{
    characters: ICharacter[];
  }>(GET_CHARACTERS, {
    variables: {
      filter: filters
    },
  });

  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter>();
  return (
    <main className="h-screen bg-white">
      <div className="flex flex-row h-full">
        {/* SideBar */}
        <div className="flex flex-col px-[16px] w-[500px] h-full">
          {/* Title and Search */}
          <div className="px-[8px] pt-8 mb-8">
            <h1 className="text-2xl text-[#1F2937] font-bold">
              Rick and Morty List
            </h1>
          </div>
          <SearchInput setFilters={setFilters} />
          {/* Character list */}
          <div className="h-full overflow-y-auto mt-8">
            <div className="pl-5 pb-4 text-sm text-gray-500">
              <p>
                STARRED CHARACTERS (
                {
                  data?.characters?.filter(
                    (character: ICharacter) => character.isFavorite
                  ).length
                }
                )
              </p>
            </div>
            {data?.characters
              ?.filter((character: ICharacter) => character.isFavorite)
              .map((character: ICharacter) => (
                <CustomCard
                  key={character.id}
                  character={character}
                  onClick={() => setSelectedCharacter(character)}
                  selectedCharacter={selectedCharacter}
                />
              ))}
            <div className="mt-8 pl-5 pb-4 text-sm text-gray-500">
              <p>
                CHARACTERS (
                {
                  data?.characters?.filter(
                    (character: ICharacter) => !character.isFavorite
                  ).length
                }
                )
              </p>
            </div>
            {data?.characters
              ?.filter((character: ICharacter) => !character.isFavorite)
              .map((character: ICharacter) => (
                <CustomCard
                  key={character.id}
                  character={character}
                  onClick={() => setSelectedCharacter(character)}
                  selectedCharacter={selectedCharacter}
                />
              ))}
          </div>
        </div>
        {/* Character details */}
        <div
          className="w-full h-full"
          style={{ boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.05)" }}
        >
          {!selectedCharacter ? (
            /* No selected Character */
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No character selected</p>
            </div>
          ) : (
            /* Selected Character */
            <div className="flex flex-col h-full w-full px-24 pt-10">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  className="relative"
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                />
                <div className="flex items-center bg-white rounded-full p-2 absolute bottom-0 right-0 shadow-sm">
                  <i
                    className={`fa-${
                      selectedCharacter.isFavorite ? "solid" : "regular"
                    }  fa-heart text-${
                      selectedCharacter.isFavorite ? "green" : "gray-500"
                    }`}
                  ></i>
                </div>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-xl text-[#1F2937] font-bold my-4">
                {selectedCharacter.name}
              </p>
              <Detail label="Gender" value={selectedCharacter.gender} />
              <Detail label="Species" value={selectedCharacter.species?.name} />
              <Detail label="Status" value={selectedCharacter.status} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
