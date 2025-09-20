import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { GameState, ClickAnimation } from '@/types/game';

interface CatClickerProps {
  gameState: GameState;
  clickAnimations: ClickAnimation[];
  onCatClick: (event: React.MouseEvent) => void;
  formatNumber: (num: number) => string;
}

const CatClicker = ({ gameState, clickAnimations, onCatClick, formatNumber }: CatClickerProps) => {
  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="relative">
        <div 
          className="relative cursor-pointer select-none transition-transform duration-200 hover:scale-105 animate-pulse-glow p-8 rounded-3xl bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100 border-4 border-gradient-to-r from-orange-300 to-pink-300 shadow-2xl backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(255,154,0,0.1) 0%, rgba(255,193,7,0.1) 50%, rgba(255,64,129,0.1) 100%)',
            borderImage: 'linear-gradient(45deg, #FF6B35, #FFD23F, #FF4081) 1'
          }}
          onClick={onCatClick}
        >
          <img 
            src="/img/d41b586a-951d-405d-b789-be2b1c5a94b2.jpg"
            alt="Cat Kombat"
            className="w-64 h-64 object-contain animate-bounce-click rounded-full shadow-2xl"
            draggable={false}
          />
        </div>
        
        {/* Анимации кликов */}
        {clickAnimations.map(animation => (
          <div
            key={animation.id}
            className="absolute pointer-events-none text-2xl font-bold text-orange-500 animate-coin-pop"
            style={{
              left: animation.x - 20,
              top: animation.y - 20,
            }}
          >
            +{gameState.clickPower}
          </div>
        ))}
      </div>

      {/* Статистика сбоку */}
      <div className="absolute top-4 right-4 space-y-2">
        <Card className="p-3 bg-white/90 backdrop-blur-sm">
          <div className="text-sm text-orange-600">
            <Icon name="MousePointer" size={16} className="inline mr-2" />
            Всего кликов: {formatNumber(gameState.totalClicks)}
          </div>
        </Card>
        {gameState.autoClickers > 0 && (
          <Card className="p-3 bg-white/90 backdrop-blur-sm">
            <div className="text-sm text-green-600">
              <Icon name="Zap" size={16} className="inline mr-2" />
              Автокликеры: {gameState.autoClickers}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CatClicker;