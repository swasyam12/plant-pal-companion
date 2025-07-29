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
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
            <span className="text-5xl animate-float">🌿</span>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-success to-plant-healthy bg-clip-text text-transparent">
              PlantPal
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto font-medium">
            Track, care for, and nurture your green companions 🌱
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-success mx-auto rounded-full"></div>
        </div>

        {/* Stats */}
        {plants.length > 0 && (
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center space-y-3 bg-gradient-to-br from-white to-accent/20 p-4 rounded-2xl shadow-cute">
              <div className="flex items-center justify-center">
                <Badge className="bg-plant-healthy text-white px-4 py-2 rounded-full shadow-sm">
                  <Leaf className="h-4 w-4 mr-2" />
                  {healthyPlants}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Healthy</p>
            </div>
            
            <div className="text-center space-y-3 bg-gradient-to-br from-white to-accent/20 p-4 rounded-2xl shadow-cute">
              <div className="flex items-center justify-center">
                <Badge className="bg-plant-thirsty text-white px-4 py-2 rounded-full shadow-sm">
                  <Droplets className="h-4 w-4 mr-2 animate-bounce-gentle" />
                  {thirstyPlants}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Thirsty</p>
            </div>
            
            <div className="text-center space-y-3 bg-gradient-to-br from-white to-accent/20 p-4 rounded-2xl shadow-cute">
              <div className="flex items-center justify-center">
                <Badge className="bg-plant-overdue text-white px-4 py-2 rounded-full shadow-sm">
                  <AlertTriangle className="h-4 w-4 mr-2 animate-pulse" />
                  {overduePlants}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Overdue</p>
            </div>
          </div>
        )}

        {/* Plants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Add Plant Form */}
          <AddPlantForm onAddPlant={addPlant} />
          
          {/* Plant Cards */}
          {plants.map((plant, index) => (
            <div 
              key={plant.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PlantCard
                plant={plant}
                onWater={handleWaterPlant}
                onDelete={handleDeletePlant}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {plants.length === 0 && (
          <div className="text-center py-16 space-y-6 bg-gradient-to-br from-white via-accent/20 to-secondary/30 rounded-3xl shadow-cute mx-4">
            <div className="text-8xl mb-6 animate-float">🌱</div>
            <h2 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">Start Your Plant Journey</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg font-medium">
              Add your first plant to begin tracking watering schedules and keeping your green friends healthy! 🌿
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;