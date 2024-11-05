import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, UserPlus2, Users2, Trophy, Swords, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

interface PlayersFormProps {
  players: string[];
  onPlayersChange: (players: string[]) => void;
  maxPlayers?: number;
  onValidationChange?: (isValid: boolean) => void;
}

export function PlayersForm({ 
  players, 
  onPlayersChange, 
  maxPlayers = 4,
  onValidationChange 
}: PlayersFormProps) {
  const [newPlayer, setNewPlayer] = useState('');
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [hoveredTeam, setHoveredTeam] = useState<1 | 2 | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    validatePlayers();
  }, [players]);

  const validatePlayers = () => {
    const newErrors: string[] = [];
    
    if (players.length < maxPlayers) {
      newErrors.push(`Se requieren ${maxPlayers} jugadores para realizar la reserva`);
    }

    const uniquePlayers = new Set(players);
    if (uniquePlayers.size !== players.length) {
      newErrors.push('No puede haber nombres de jugadores duplicados');
    }

    players.forEach((player, index) => {
      if (player && player.length < 3) {
        newErrors.push(`El nombre del jugador ${index + 1} debe tener al menos 3 caracteres`);
      }
    });

    setErrors(newErrors);
    if (onValidationChange) {
      onValidationChange(newErrors.length === 0 && players.length === maxPlayers);
    }
  };

  const handleAddPlayer = (index: number, name: string) => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "El nombre del jugador no puede estar vacío",
        variant: "destructive",
      });
      return;
    }

    if (name.trim().length < 3) {
      toast({
        title: "Error",
        description: "El nombre debe tener al menos 3 caracteres",
        variant: "destructive",
      });
      return;
    }

    if (players.includes(name.trim())) {
      toast({
        title: "Error",
        description: "Este jugador ya ha sido agregado",
        variant: "destructive",
      });
      return;
    }

    const newPlayers = [...players];
    newPlayers[index] = name.trim();
    onPlayersChange(newPlayers);
  };

  const handleRemovePlayer = (index: number) => {
    const newPlayers = players.filter((_, i) => i !== index);
    onPlayersChange(newPlayers);
  };

  const getPlayerSlot = (index: number, teamNumber: 1 | 2) => {
    const isOccupied = players[index];
    const isTeamHovered = hoveredTeam === teamNumber;
    
    return (
      <motion.div
        className="relative"
        initial={false}
        animate={{ scale: isTeamHovered ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {isOccupied ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm"
          >
            <Users2 className="h-5 w-5 text-green-600" />
            <span className="flex-1 font-medium text-green-800">{players[index]}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemovePlayer(index)}
              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative border-2 ${
              activeInput === index 
                ? 'border-green-500 shadow-lg shadow-green-100' 
                : 'border-gray-100'
            } rounded-xl transition-all duration-300`}
          >
            <Input
              placeholder="Agregar jugador..."
              value={activeInput === index ? newPlayer : ''}
              onChange={(e) => setNewPlayer(e.target.value)}
              onFocus={() => setActiveInput(index)}
              onBlur={() => {
                handleAddPlayer(index, newPlayer);
                setNewPlayer('');
                setActiveInput(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddPlayer(index, newPlayer);
                  setNewPlayer('');
                  setActiveInput(null);
                }
              }}
              className="border-0 focus:ring-0 focus:ring-offset-0 pr-10"
            />
            <UserPlus2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Mostrar errores solo si showErrors es true y hay errores */}
      <AnimatePresence>
        {showErrors && errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 text-red-800 mb-2">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Por favor, corrige los siguientes errores:</span>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-red-600"
                >
                  {error}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="text-center space-y-4"
        onHoverStart={() => setHoveredTeam(1)}
        onHoverEnd={() => setHoveredTeam(null)}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-blue-500" />
          <h4 className="text-xl font-bold text-blue-900">Equipo 1</h4>
        </div>
        <div className="grid gap-3">
          {getPlayerSlot(0, 1)}
          {getPlayerSlot(1, 1)}
        </div>
      </motion.div>

      <div className="relative flex items-center justify-center py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-dashed border-gray-200" />
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white px-6 py-2 rounded-full shadow-md"
        >
          <Swords className="h-8 w-8 text-orange-500" />
        </motion.div>
      </div>

      <motion.div 
        className="text-center space-y-4"
        onHoverStart={() => setHoveredTeam(2)}
        onHoverEnd={() => setHoveredTeam(null)}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-red-500" />
          <h4 className="text-xl font-bold text-red-900">Equipo 2</h4>
        </div>
        <div className="grid gap-3">
          {getPlayerSlot(2, 2)}
          {getPlayerSlot(3, 2)}
        </div>
      </motion.div>

      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
          <Users2 className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {players.length} de {maxPlayers} jugadores agregados
          </span>
        </div>
      </motion.div>
    </div>
  );
} 