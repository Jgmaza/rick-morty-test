export interface ISpecies {
  name: string;
  id : string;
}


export interface ICharacter {
  id: string;
  name: string;
  species: ISpecies;
  gender: string;
  status: string;
  image: string;
  isFavorite: boolean;
}