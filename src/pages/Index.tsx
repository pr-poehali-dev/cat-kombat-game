import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface GameState {
  coins: number;
  clickPower: number;
  totalClicks: number;
  level: number;
  experience: number;
  autoClickers: number;
  energy: number;
  maxEnergy: number;
  energyRegenTime: number | null;
}

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  clickBoost: number;
  owned: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    coins: 0,
    clickPower: 1,
    totalClicks: 0,
    level: 1,
    experience: 0,
    autoClickers: 0,
    energy: 100,
    maxEnergy: 100,
    energyRegenTime: null
  });

  const [clickAnimations, setClickAnimations] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [activeTab, setActiveTab] = useState('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const shopItems: ShopItem[] = [
    { id: 1, name: 'Острые когти', description: 'Увеличивает силу когтей на +1 клик', price: 15, clickBoost: 1, owned: 0 },
    { id: 2, name: 'Кошачья мята', description: 'Энергия кота повышается на +2 клика', price: 100, clickBoost: 2, owned: 0 },
    { id: 3, name: 'Боевые перчатки', description: 'Профессиональное снаряжение +5 кликов', price: 1100, clickBoost: 5, owned: 0 },
    { id: 4, name: 'Лазерная указка', description: 'Высокотехнологичная игрушка +25 кликов', price: 12000, clickBoost: 25, owned: 0 },
    { id: 5, name: 'Автокормушка', description: 'Автоматически кормит кота каждую секунду', price: 50000, clickBoost: 100, owned: 0 }
  ];

  const achievements = [
    { name: 'Первый клик', description: 'Сделай свой первый клик', requirement: 1, icon: '🐾' },
    { name: 'Новичок', description: 'Набери 100 кликов', requirement: 100, icon: '🥉' },
    { name: 'Боец', description: 'Набери 1000 кликов', requirement: 1000, icon: '🥈' },
    { name: 'Мастер', description: 'Набери 10000 кликов', requirement: 10000, icon: '🥇' }
  ];

  // Автокликер
  useEffect(() => {
    if (gameState.autoClickers > 0) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          coins: prev.coins + prev.autoClickers,
          totalClicks: prev.totalClicks + prev.autoClickers
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState.autoClickers]);

  // Система регенерации энергии
  useEffect(() => {
    if (gameState.energyRegenTime) {
      const interval = setInterval(() => {
        setGameState(prev => {
          const now = Date.now();
          const timeLeft = prev.energyRegenTime! - now;
          
          if (timeLeft <= 0) {
            return {
              ...prev,
              energy: prev.maxEnergy,
              energyRegenTime: null
            };
          }
          
          return prev;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [gameState.energyRegenTime]);

  // Уборка анимаций
  useEffect(() => {
    clickAnimations.forEach(animation => {
      setTimeout(() => {
        setClickAnimations(prev => prev.filter(a => a.id !== animation.id));
      }, 800);
    });
  }, [clickAnimations]);

  const handleCatClick = (event: React.MouseEvent) => {
    // Проверяем, есть ли энергия
    if (gameState.energy <= 0) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newAnimation = {
      id: Date.now(),
      x,
      y
    };
    
    setClickAnimations(prev => [...prev, newAnimation]);
    
    setGameState(prev => {
      const newCoins = prev.coins + prev.clickPower;
      const newClicks = prev.totalClicks + 1;
      const newExp = prev.experience + 1;
      const expForNext = prev.level * 100;
      const newEnergy = prev.energy - 1;
      
      // Если энергия закончилась, запускаем 3-часовой таймер
      let energyRegenTime = prev.energyRegenTime;
      if (newEnergy === 0 && !prev.energyRegenTime) {
        energyRegenTime = Date.now() + (3 * 60 * 60 * 1000); // 3 часа
      }
      
      return {
        ...prev,
        coins: newCoins,
        totalClicks: newClicks,
        experience: newExp >= expForNext ? newExp - expForNext : newExp,
        level: newExp >= expForNext ? prev.level + 1 : prev.level,
        energy: newEnergy,
        energyRegenTime
      };
    });
  };

  const buyUpgrade = (item: ShopItem) => {
    if (gameState.coins >= item.price) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - item.price,
        clickPower: prev.clickPower + item.clickBoost,
        autoClickers: item.name === 'Автокормушка' ? prev.autoClickers + 1 : prev.autoClickers
      }));
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTime = (timeInMs: number) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeInMs % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAuth = () => {
    // Простая проверка (в реальном проекте здесь был бы запрос к серверу)
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
      setShowAuth(false);
      setUsername('');
      setPassword('');
      setActiveTab('home');
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setActiveTab('profile');
    } else {
      setShowAuth(true);
    }
  };

  const startGame = () => {
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-quicksand">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-screen flex flex-col">
        
        {/* Главная страница с описанием игры */}
        <TabsContent value="welcome" className="h-full m-0 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {/* Hero секция */}
            <div className="relative min-h-screen flex items-center justify-center px-4">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
              
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
                    onClick={startGame}
                  >
                    🎮 ИГРАТЬ СЕЙЧАС
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 text-lg rounded-full backdrop-blur-sm"
                    onClick={() => setShowAuth(true)}
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
                  onClick={startGame}
                >
                  🚀 НАЧАТЬ ИГРУ
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Игровой контент (существующий код) */}
        <TabsContent value="home" className="h-full m-0">
          <div className="flex flex-col h-full">
            {/* Хедер с статистикой */}
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

            {/* Игровая зона с котом */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50">
              <div className="relative">
                <div 
                  className="relative cursor-pointer select-none transition-transform duration-200 hover:scale-105 animate-pulse-glow p-8 rounded-3xl bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100 border-4 border-gradient-to-r from-orange-300 to-pink-300 shadow-2xl backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,154,0,0.1) 0%, rgba(255,193,7,0.1) 50%, rgba(255,64,129,0.1) 100%)',
                    borderImage: 'linear-gradient(45deg, #FF6B35, #FFD23F, #FF4081) 1'
                  }}
                  onClick={handleCatClick}
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
          </div>
        </TabsContent>

        <TabsContent value="shop" className="h-full m-0 p-4 overflow-y-auto">
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
                    onClick={() => buyUpgrade(item)}
                    disabled={gameState.coins < item.price}
                    className="ml-4 bg-orange-500 hover:bg-orange-600"
                  >
                    Купить
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="h-full m-0 p-4 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">🏆 Достижения</h2>
            {achievements.map((achievement, index) => {
              const isCompleted = gameState.totalClicks >= achievement.requirement;
              return (
                <Card key={index} className={`p-4 ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                        {achievement.description}
                      </p>
                      <div className="mt-2">
                        <Progress 
                          value={Math.min((gameState.totalClicks / achievement.requirement) * 100, 100)}
                          className="h-2"
                        />
                      </div>
                    </div>
                    {isCompleted && (
                      <Badge className="bg-green-500 text-white">
                        Выполнено!
                      </Badge>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="h-full m-0 p-4">
          {isLoggedIn ? (
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
                      onClick={() => setIsLoggedIn(false)} 
                      variant="outline" 
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Выйти
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Требуется авторизация</h2>
              <p className="text-orange-500 mb-6">
                Войдите в свой аккаунт, чтобы просматривать профиль и сохранять прогресс
              </p>
              <Button 
                onClick={() => setShowAuth(true)}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Войти или зарегистрироваться
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Нижняя навигация - показывается только если не на главной странице */}
        {activeTab !== 'welcome' && (
          <TabsList className="grid w-full grid-cols-4 bg-white border-t border-orange-200 rounded-none h-16">
            <TabsTrigger value="home" className="flex flex-col gap-1 h-full data-[state=active]:bg-orange-100">
              <Icon name="Home" size={20} />
              <span className="text-xs">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex flex-col gap-1 h-full data-[state=active]:bg-orange-100">
              <Icon name="ShoppingBag" size={20} />
              <span className="text-xs">Магазин</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex flex-col gap-1 h-full data-[state=active]:bg-orange-100">
              <Icon name="Trophy" size={20} />
              <span className="text-xs">Достижения</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex flex-col gap-1 h-full data-[state=active]:bg-orange-100"
              onClick={handleProfileClick}
            >
              <Icon name="User" size={20} />
              <span className="text-xs">{isLoggedIn ? 'Профиль' : 'Войти'}</span>
            </TabsTrigger>
          </TabsList>
        )}
      </Tabs>

      {/* Диалог авторизации */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-orange-600">
              {authMode === 'login' ? '🔑 Вход в игру' : '📝 Регистрация'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <Button 
                onClick={handleAuth} 
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={!username.trim() || !password.trim()}
              >
                {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </Button>
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-orange-600"
                >
                  {authMode === 'login' ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;