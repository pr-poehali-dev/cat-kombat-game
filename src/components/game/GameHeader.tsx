import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { GameState } from '@/types/game';

interface GameHeaderProps {
  gameState: GameState;
  formatNumber: (num: number) => string;
  formatTime: (timeInMs: number) => string;
}

const GameHeader = ({ gameState, formatNumber, formatTime }: GameHeaderProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🪙</span>
          <span className="text-2xl font-bold text-orange-600">{formatNumber(gameState.coins)}</span>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Уровень {gameState.level}
          </Badge>
          <div className="text-sm text-orange-600">
            <Icon name="Zap" size={16} className="inline mr-1" />
            {gameState.clickPower}/клик
          </div>
        </div>
      </div>
      
      {/* Прогресс-бар энергии */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-orange-600 mb-1">
          <span>⚡ Энергия</span>
          <span>
            {gameState.energyRegenTime ? (
              <span className="text-red-500">
                Восстановление: {formatTime(gameState.energyRegenTime - Date.now())}
              </span>
            ) : (
              `${gameState.energy}/${gameState.maxEnergy}`
            )}
          </span>
        </div>
        <Progress 
          value={(gameState.energy / gameState.maxEnergy) * 100} 
          className={`h-3 ${gameState.energy === 0 ? 'bg-red-100' : 'bg-blue-100'}`}
        />
      </div>
      
      {/* Прогресс-бар опыта */}
      <div className="mt-2">
        <div className="flex justify-between text-xs text-orange-600 mb-1">
          <span>Опыт</span>
          <span>{gameState.experience}/{gameState.level * 100}</span>
        </div>
        <Progress 
          value={(gameState.experience / (gameState.level * 100)) * 100} 
          className="h-2 bg-orange-100"
        />
      </div>
    </div>
  );
};

export default GameHeader;