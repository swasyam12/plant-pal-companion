import { usePlants } from '@/hooks/usePlants';
import { PlantCard } from '@/components/PlantCard';
import { AddPlantForm } from '@/components/AddPlantForm';
import { getWateringStatus } from '@/types/plant';
import { Badge } from '@/components/ui/badge';
import { Droplets, Leaf, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { plants, addPlant, waterPlant, deletePlant } = usePlants();
  const { toast } = useToast();

  const handleWaterPlant = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      waterPlant(plantId);
      toast({
        title: "Plant Watered! 💧",
        description: `${plant.name} has been watered successfully.`,
      });
    }
  };

  const handleDeletePlant = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      deletePlant(plantId);
      toast({
        title: "Plant Removed",
        description: `${plant.name} has been removed from your garden.`,
        variant: "destructive",
      });
    }
  };

  // Calculate stats
  const healthyPlants = plants.filter(plant => getWateringStatus(plant) === 'healthy').length;
  const thirstyPlants = plants.filter(plant => getWateringStatus(plant) === 'thirsty').length;
  const overduePlants = plants.filter(plant => getWateringStatus(plant) === 'overdue').length;

  return (
    <div className="min-h-screen bg-[var(--gradient-background)] p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">🌿</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-plant-healthy bg-clip-text text-transparent">
              PlantPal
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Track, care for, and nurture your green companions
          </p>
        </div>

        {/* Stats */}
        {plants.length > 0 && (
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Badge className="bg-plant-healthy text-white">
                  <Leaf className="h-3 w-3 mr-1" />
                  {healthyPlants}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Healthy</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Badge className="bg-plant-thirsty text-white">
                  <Droplets className="h-3 w-3 mr-1" />
                  {thirstyPlants}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Thirsty</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Badge className="bg-plant-overdue text-white">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {overduePlants}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Overdue</p>
            </div>
          </div>
        )}

        {/* Plants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Plant Form */}
          <AddPlantForm onAddPlant={addPlant} />
          
          {/* Plant Cards */}
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onWater={handleWaterPlant}
              onDelete={handleDeletePlant}
            />
          ))}
        </div>

        {/* Empty State */}
        {plants.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-2xl font-semibold text-foreground">Start Your Plant Journey</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Add your first plant to begin tracking watering schedules and keeping your green friends healthy!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;