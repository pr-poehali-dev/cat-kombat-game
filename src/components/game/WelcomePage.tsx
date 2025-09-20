import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WelcomePageProps {
  onStartGame: () => void;
  onShowAuth: () => void;
}

const WelcomePage = ({ onStartGame, onShowAuth }: WelcomePageProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero секция */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-pulse">
            <div className="text-9xl mb-4 animate-bounce">🐱⚔️</div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 animate-pulse">
            CAT KOMBAT
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Легендарная игра-кликер про боевых котов! <br/>
            Тренируй своего кота, собирай монеты и становись чемпионом!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={onStartGame}
            >
              🎮 ИГРАТЬ СЕЙЧАС
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 text-lg rounded-full backdrop-blur-sm"
              onClick={onShowAuth}
            >
              👤 ВОЙТИ / РЕГИСТРАЦИЯ
            </Button>
          </div>
        </div>
      </div>

      {/* Особенности игры */}
      <div className="py-20 px-4 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            🌟 Особенности игры
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="text-5xl mb-4">💪</div>
                <h3 className="text-xl font-bold text-white mb-3">Прокачка кота</h3>
                <p className="text-white/80">Улучшай силу удара, покупай снаряжение и становись сильнее с каждым кликом!</p>
              </div>
            </Card>
            
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-3">Система энергии</h3>
                <p className="text-white/80">Уникальная система восстановления энергии добавляет стратегии в игру!</p>
              </div>
            </Card>
            
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="text-5xl mb-4">🛍️</div>
                <h3 className="text-xl font-bold text-white mb-3">Магазин улучшений</h3>
                <p className="text-white/80">От острых когтей до автокормушек - выбирай снаряжение для своего бойца!</p>
              </div>
            </Card>
            
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-white mb-3">Достижения</h3>
                <p className="text-white/80">Разблокируй все достижения и докажи, что ты настоящий мастер Cat Kombat!</p>
              </div>
            </Card>
            
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-white mb-3">Автокликеры</h3>
                <p className="text-white/80">Покупай автокормушки и получай монеты даже когда не играешь!</p>
              </div>
            </Card>
            
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-white mb-3">Мобильная версия</h3>
                <p className="text-white/80">Играй где угодно! Игра отлично работает на всех устройствах!</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Призыв к действию */}
      <div className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Готов стать чемпионом? 🏆
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Присоединяйся к тысячам игроков уже сегодня и начни свой путь к вершине кошачьих боев!
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
            onClick={onStartGame}
          >
            🚀 НАЧАТЬ ИГРУ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;