import { useState } from 'react';
import { Plant, PLANT_TYPES } from '@/types/plant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddPlantFormProps {
  onAddPlant: (plant: Omit<Plant, 'id' | 'addedDate' | 'nextWateringDate'>) => void;
}

export const AddPlantForm = ({ onAddPlant }: AddPlantFormProps) => {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [frequency, setFrequency] = useState<number>(3);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !selectedType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const plantType = PLANT_TYPES.find(type => type.name === selectedType);
    if (!plantType) return;

    const now = new Date();
    onAddPlant({
      name: name.trim(),
      type: selectedType,
      emoji: plantType.emoji,
      wateringFrequency: frequency,
      lastWatered: now,
    });

    // Reset form
    setName('');
    setSelectedType('');
    setFrequency(3);
    setIsOpen(false);
    
    toast({
      title: "Plant Added! 🌱",
      description: `${name} has been added to your garden.`,
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full h-32 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-300"
      >
        <div className="text-center">
          <Plus className="h-8 w-8 mx-auto mb-2" />
          <span className="text-lg font-medium">Add New Plant</span>
        </div>
      </Button>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card to-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          Add New Plant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Plant Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., My Rubber Plant"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Plant Type *</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Choose a plant type" />
              </SelectTrigger>
              <SelectContent>
                {PLANT_TYPES.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    <div className="flex items-center gap-2">
                      <span>{type.emoji}</span>
                      <span>{type.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Watering Frequency (days)</Label>
            <Input
              id="frequency"
              type="number"
              min="1"
              max="30"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            <p className="text-xs text-muted-foreground">
              Water every {frequency} day{frequency !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-plant-healthy to-primary hover:from-plant-healthy/90 hover:to-primary/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Plant
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                setName('');
                setSelectedType('');
                setFrequency(3);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};