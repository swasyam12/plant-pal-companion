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
    <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-card to-accent/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{plant.emoji}</span>
            <div>
              <h3 className="font-semibold text-lg text-card-foreground">{plant.name}</h3>
              <p className="text-sm text-muted-foreground">{plant.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={cn("text-xs font-medium", config.color, "text-white")}
            >
              {config.label}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(plant.id)}
              className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Watering every {plant.wateringFrequency} day{plant.wateringFrequency !== 1 ? 's' : ''}</span>
          </div>
          
          <p className={cn("text-sm font-medium", config.textColor)}>
            {config.message}
          </p>
          
          <p className="text-xs text-muted-foreground">
            Last watered {lastWateredDays} day{lastWateredDays !== 1 ? 's' : ''} ago
          </p>
        </div>

        <Button
          onClick={() => onWater(plant.id)}
          className="w-full bg-gradient-to-r from-plant-healthy to-primary hover:from-plant-healthy/90 hover:to-primary/90 text-white"
          disabled={status === 'healthy' && daysUntilWatering > 0}
        >
          <Droplets className="h-4 w-4 mr-2" />
          Water Plant
        </Button>
      </CardContent>
    </Card>
  );
};