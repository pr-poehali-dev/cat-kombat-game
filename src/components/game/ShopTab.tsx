import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GameState, ShopItem } from '@/types/game';

interface ShopTabProps {
  gameState: GameState;
  shopItems: ShopItem[];
  onBuyUpgrade: (item: ShopItem) => void;
  formatNumber: (num: number) => string;
}

const ShopTab = ({ gameState, shopItems, onBuyUpgrade, formatNumber }: ShopTabProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">🛍️ Магазин улучшений</h2>
      {shopItems.map(item => (
        <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h3 className="font-semibold text-orange-700">{item.name}</h3>
              <p className="text-sm text-orange-600 mt-1">{item.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold text-orange-500">
                  {formatNumber(item.price)} 🪙
                </span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  +{item.clickBoost}
                </Badge>
              </div>
            </div>
            <Button 
              onClick={() => onBuyUpgrade(item)}
              disabled={gameState.coins < item.price}
              className="ml-4 bg-orange-500 hover:bg-orange-600"
            >
              Купить
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ShopTab;