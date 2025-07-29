import { useState, useEffect } from 'react';
import { Plant } from '@/types/plant';

const STORAGE_KEY = 'plantpal-plants';

export const usePlants = () => {
  const [plants, setPlantsState] = useState<Plant[]>([]);

  // Load plants from localStorage on mount
  useEffect(() => {
    const savedPlants = localStorage.getItem(STORAGE_KEY);
    if (savedPlants) {
      try {
        const parsed = JSON.parse(savedPlants);
        // Convert date strings back to Date objects
        const plantsWithDates = parsed.map((plant: any) => ({
          ...plant,
          lastWatered: new Date(plant.lastWatered),
          nextWateringDate: new Date(plant.nextWateringDate),
          addedDate: new Date(plant.addedDate),
        }));
        setPlantsState(plantsWithDates);
      } catch (error) {
        console.error('Error loading plants from localStorage:', error);
      }
    }
  }, []);

  // Save plants to localStorage whenever plants change
  const setPlants = (newPlants: Plant[]) => {
    setPlantsState(newPlants);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlants));
  };

  const addPlant = (plant: Omit<Plant, 'id' | 'addedDate' | 'nextWateringDate'>) => {
    const newPlant: Plant = {
      ...plant,
      id: crypto.randomUUID(),
      addedDate: new Date(),
      nextWateringDate: new Date(plant.lastWatered.getTime() + plant.wateringFrequency * 24 * 60 * 60 * 1000),
    };
    setPlants([...plants, newPlant]);
  };

  const waterPlant = (plantId: string) => {
    const now = new Date();
    setPlants(plants.map(plant => 
      plant.id === plantId 
        ? {
            ...plant,
            lastWatered: now,
            nextWateringDate: new Date(now.getTime() + plant.wateringFrequency * 24 * 60 * 60 * 1000),
          }
        : plant
    ));
  };

  const deletePlant = (plantId: string) => {
    setPlants(plants.filter(plant => plant.id !== plantId));
  };

  return {
    plants,
    addPlant,
    waterPlant,
    deletePlant,
  };
};