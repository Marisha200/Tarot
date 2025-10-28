
export const MAJOR_ARCANA: string[] = [
  "El Loco",
  "El Mago",
  "La Sacerdotisa",
  "La Emperatriz",
  "El Emperador",
  "El Hierofante",
  "Los Enamorados",
  "El Carro",
  "La Fuerza",
  "El Ermitaño",
  "La Rueda de la Fortuna",
  "La Justicia",
  "El Colgado",
  "La Muerte",
  "La Templanza",
  "El Diablo",
  "La Torre",
  "La Estrella",
  "La Luna",
  "El Sol",
  "El Juicio",
  "El Mundo"
];

const createSuit = (suit: string): string[] => [
    `As de ${suit}`, `Dos de ${suit}`, `Tres de ${suit}`, `Cuatro de ${suit}`, `Cinco de ${suit}`, 
    `Seis de ${suit}`, `Siete de ${suit}`, `Ocho de ${suit}`, `Nueve de ${suit}`, `Diez de ${suit}`, 
    `Sota de ${suit}`, `Caballo de ${suit}`, `Reina de ${suit}`, `Rey de ${suit}`
];

export const MINOR_ARCANA_SUITS: Record<string, string[]> = {
    "Bastos": createSuit("Bastos"),
    "Copas": createSuit("Copas"),
    "Espadas": createSuit("Espadas"),
    "Oros": createSuit("Oros")
};
