import { Plant, getWateringStatus, getDaysUntilWatering } from '@/types/plant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets, Trash2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlantCardProps {
  plant: Plant;
  onWater: (plantId: string) => void;
  onDelete: (plantId: string) => void;
}

export const PlantCard = ({ plant, onWater, onDelete }: PlantCardProps) => {
  const status = getWateringStatus(plant);
  const daysUntilWatering = getDaysUntilWatering(plant);
  
  const statusConfig = {
    healthy: {
      color: 'bg-plant-healthy',
      textColor: 'text-plant-healthy',
      label: 'Healthy',
      message: `Water in ${Math.max(0, daysUntilWatering)} day${Math.max(0, daysUntilWatering) !== 1 ? 's' : ''}`,
    },
    thirsty: {
      color: 'bg-plant-thirsty',
      textColor: 'text-plant-thirsty',
      label: 'Thirsty',
      message: 'Needs water today!',
    },
    overdue: {
      color: 'bg-plant-overdue',
      textColor: 'text-plant-overdue',
      label: 'Overdue',
      message: `${Math.abs(daysUntilWatering)} day${Math.abs(daysUntilWatering) !== 1 ? 's' : ''} overdue!`,
    },
  };

  const config = statusConfig[status];
  const lastWateredDays = Math.floor((Date.now() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] bg-gradient-to-br from-white via-accent/20 to-secondary/30 border-0 shadow-cute hover:shadow-hover rounded-2xl overflow-hidden group">
      <CardHeader className="pb-3 bg-gradient-to-r from-accent/30 to-secondary/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl animate-float group-hover:animate-pulse-cute transition-all duration-300">
              {plant.emoji}
            </div>
            <div>
              <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">{plant.name}</h3>
              <p className="text-sm text-muted-foreground font-medium">{plant.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={cn("text-xs font-bold px-3 py-1 rounded-full shadow-sm", config.color, "text-white border-0")}
            >
              {config.label}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(plant.id)}
              className="text-muted-foreground hover:text-destructive h-9 w-9 p-0 rounded-full hover:bg-destructive/10 transition-all duration-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5 p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-accent/20 rounded-xl p-3">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">Watering every {plant.wateringFrequency} day{plant.wateringFrequency !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="bg-gradient-to-r from-accent/30 to-secondary/30 rounded-xl p-4">
            <p className={cn("text-base font-bold", config.textColor)}>
              {config.message}
            </p>
            
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              Last watered {lastWateredDays} day{lastWateredDays !== 1 ? 's' : ''} ago
            </p>
          </div>
        </div>

        <Button
          onClick={() => onWater(plant.id)}
          className="w-full bg-gradient-to-r from-plant-healthy via-primary to-success hover:from-plant-healthy/90 hover:via-primary/90 hover:to-success/90 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0"
          disabled={status === 'healthy' && daysUntilWatering > 0}
        >
          <Droplets className="h-5 w-5 mr-2 animate-bounce-gentle" />
          💧 Water Plant
        </Button>
      </CardContent>
    </Card>
  );
};