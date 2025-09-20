import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameState } from '@/types/game';

interface ProfileTabProps {
  isLoggedIn: boolean;
  gameState: GameState;
  onLogout: () => void;
  onShowAuth: () => void;
  formatNumber: (num: number) => string;
}

const ProfileTab = ({ isLoggedIn, gameState, onLogout, onShowAuth, formatNumber }: ProfileTabProps) => {
  if (isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">👤 Профиль игрока</h2>
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🐱</div>
            <h3 className="text-xl font-semibold text-orange-700">Кот-Боец</h3>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{gameState.level}</div>
                <div className="text-sm text-orange-500">Уровень</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{formatNumber(gameState.totalClicks)}</div>
                <div className="text-sm text-orange-500">Всего кликов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{gameState.clickPower}</div>
                <div className="text-sm text-orange-500">Сила клика</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{formatNumber(gameState.coins)}</div>
                <div className="text-sm text-orange-500">Монеты</div>
              </div>
            </div>
            <div className="mt-6">
              <Button 
                onClick={onLogout} 
                variant="outline" 
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Выйти
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="text-6xl mb-4">🔐</div>
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Требуется авторизация</h2>
      <p className="text-orange-500 mb-6">
        Войдите в свой аккаунт, чтобы просматривать профиль и сохранять прогресс
      </p>
      <Button 
        onClick={onShowAuth}
        className="bg-orange-500 hover:bg-orange-600"
      >
        Войти или зарегистрироваться
      </Button>
    </div>
  );
};

export default ProfileTab;