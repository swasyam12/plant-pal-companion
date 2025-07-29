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
        className="w-full h-36 bg-gradient-to-br from-primary via-success to-plant-healthy hover:from-primary/90 hover:via-success/90 hover:to-plant-healthy/90 text-white border-3 border-dashed border-primary/40 hover:border-primary/60 transition-all duration-500 rounded-2xl shadow-cute hover:shadow-hover hover:scale-[1.02] group"
      >
        <div className="text-center">
          <div className="text-5xl mb-2 animate-float group-hover:animate-pulse-cute">🌱</div>
          <Plus className="h-6 w-6 mx-auto mb-2 animate-bounce-gentle" />
          <span className="text-xl font-bold">Add New Plant</span>
        </div>
      </Button>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white via-accent/30 to-secondary/40 border-0 shadow-cute rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-success/10">
        <CardTitle className="flex items-center gap-3 text-xl">
          <span className="text-3xl animate-float">🌱</span>
          <span className="font-bold text-primary">Add New Plant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-semibold text-primary">Plant Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., My Rubber Plant 🌿"
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 border-2 border-accent/50 hover:border-primary/50 rounded-xl h-12 text-base font-medium shadow-soft"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="type" className="text-base font-semibold text-primary">Plant Type *</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 border-2 border-accent/50 hover:border-primary/50 rounded-xl h-12 text-base font-medium shadow-soft">
                <SelectValue placeholder="🌸 Choose a plant type" />
              </SelectTrigger>
              <SelectContent>
                {PLANT_TYPES.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    <div className="flex items-center gap-3 py-1">
                      <span className="text-lg">{type.emoji}</span>
                      <span className="font-medium">{type.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="frequency" className="text-base font-semibold text-primary">💧 Watering Frequency (days)</Label>
            <Input
              id="frequency"
              type="number"
              min="1"
              max="30"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 border-2 border-accent/50 hover:border-primary/50 rounded-xl h-12 text-base font-medium shadow-soft"
            />
            <div className="bg-gradient-to-r from-accent/30 to-secondary/30 rounded-xl p-3">
              <p className="text-sm text-muted-foreground font-medium">
                💧 Water every {frequency} day{frequency !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-plant-healthy via-primary to-success hover:from-plant-healthy/90 hover:via-primary/90 hover:to-success/90 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Plus className="h-5 w-5 mr-2 animate-bounce-gentle" />
              🌱 Add Plant
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
              className="px-6 py-3 rounded-xl border-2 border-accent/50 hover:border-primary/50 font-medium transition-all duration-300 hover:bg-accent/20"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};