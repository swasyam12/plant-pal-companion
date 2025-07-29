export interface Plant {
  id: string;
  name: string;
  type: string;
  wateringFrequency: number; // days between watering
  lastWatered: Date;
  nextWateringDate: Date;
  emoji: string;
  addedDate: Date;
}

export interface PlantType {
  name: string;
  emoji: string;
  defaultFrequency: number;
}

export const PLANT_TYPES: PlantType[] = [
  { name: "Succulent", emoji: "🌵", defaultFrequency: 7 },
  { name: "Fern", emoji: "🌿", defaultFrequency: 3 },
  { name: "Flowering Plant", emoji: "🌸", defaultFrequency: 2 },
  { name: "Herb", emoji: "🌱", defaultFrequency: 2 },
  { name: "Tree", emoji: "🌳", defaultFrequency: 5 },
  { name: "Vine", emoji: "🍃", defaultFrequency: 3 },
  { name: "Cactus", emoji: "🌵", defaultFrequency: 14 },
  { name: "Orchid", emoji: "🌺", defaultFrequency: 4 },
];

export const getWateringStatus = (plant: Plant): 'healthy' | 'thirsty' | 'overdue' => {
  const now = new Date();
  const daysSinceWatering = Math.floor((now.getTime() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceWatering < plant.wateringFrequency) {
    return 'healthy';
  } else if (daysSinceWatering === plant.wateringFrequency) {
    return 'thirsty';
  } else {
    return 'overdue';
  }
};

export const getDaysUntilWatering = (plant: Plant): number => {
  const now = new Date();
  const timeDiff = plant.nextWateringDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};