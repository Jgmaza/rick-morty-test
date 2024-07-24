import dotenv from "dotenv";

// Especifica el archivo .env.local
dotenv.config({ path: ".env.local" });
import axios from "axios";
import { Sequelize } from "sequelize";
import Species from "../../lib/db/models/species";
import Character from "../../lib/db/models/character";


// Configura la conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_URL!, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This is to avoid issues with self-signed SSL certificates
    },
  },
});

// Función para hacer la consulta a la API GraphQL
const fetchGraphQLData = async (query: string) => {
  try {
    const response = await axios.post("https://rickandmortyapi.com/graphql/", {
      query,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data from GraphQL API:", error);
    throw error;
  }
};

// Función para crear una especie si no existe
const findOrCreateSpecies = async (speciesData: { id: any; name: any }) => {
  let [species] = await Species.findOrCreate({
    where: { name: speciesData.name },
    defaults: { name: speciesData.name },
  });
  return species;
};

// Función principal para poblar la base de datos
const populateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Consulta para obtener los primeros 15 personajes
    const charactersQuery = `
      {
        characters(page: 1) {
          results {
            id
            name
            status
            gender
            species 
            image
          }
        }
      }
    `;
    const charactersData = await fetchGraphQLData(charactersQuery);
    const charactersList = charactersData.characters.results;

    // Inserta los personajes en la base de datos
    for (const character of charactersList) {
      // Encuentra o crea la especie
      const species = await findOrCreateSpecies({ id: null, name: character.species });

      // Crea el personaje
      await Character.create({
        id: character.id,
        name: character.name,
        status: character.status,
        gender: character.gender,
        speciesId: species.id, // Usar el ID de la especie encontrada o creada
        image: character.image,
      });
    }

    console.log("Database populated with characters successfully.");
  } catch (error) {
    console.error("Error populating the database:", error);
  } finally {
    await sequelize.close();
  }
};

// Ejecutar el script
populateDatabase();
