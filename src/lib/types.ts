export interface ISpecies {
  name: string;
  id: string;
}

export interface IComment {
  id: string;
  comment: string;
  characterId: string;
}

export type IGenders = "Male" | "Female" | "Genderless" | "Unknown";

export type IStatus = "Alive" | "Dead" | "Unknown";

export interface ICharacter {
  id: string;
  name: string;
  species: ISpecies;
  gender: IGenders;
  status: IStatus;
  image: string;
  isFavorite: boolean;
}
