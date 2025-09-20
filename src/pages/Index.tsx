import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useGameLogic } from '@/hooks/useGameLogic';
import WelcomePage from '@/components/game/WelcomePage';
import GameHeader from '@/components/game/GameHeader';
import CatClicker from '@/components/game/CatClicker';
import ShopTab from '@/components/game/ShopTab';
import AchievementsTab from '@/components/game/AchievementsTab';
import ProfileTab from '@/components/game/ProfileTab';
import AuthDialog from '@/components/game/AuthDialog';

const Index = () => {
  const {
    gameState,
    clickAnimations,
    shopItems,
    achievements,
    handleCatClick,
    buyUpgrade,
    formatNumber,
    formatTime
  } = useGameLogic();

  const [activeTab, setActiveTab] = useState(() => {
    const isAuth = localStorage.getItem('catKombatAuth') === 'true';
    return isAuth ? (localStorage.getItem('catKombatTab') || 'home') : 'welcome';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('catKombatAuth') === 'true';
  });
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('catKombatAuth', 'true');
    } else {
      localStorage.removeItem('catKombatAuth');
      localStorage.removeItem('catKombatTab');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && activeTab !== 'welcome') {
      localStorage.setItem('catKombatTab', activeTab);
    }
  }, [activeTab, isLoggedIn]);

  const handleAuth = () => {
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

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleAuthModeChange = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-quicksand">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-screen flex flex-col">
        
        {/* Главная страница с описанием игры */}
        <TabsContent value="welcome" className="h-full m-0">
          <WelcomePage onStartGame={startGame} onShowAuth={handleShowAuth} />
        </TabsContent>

        {/* Игровой контент */}
        <TabsContent value="home" className="h-full m-0">
          <div className="flex flex-col h-full">
            <GameHeader 
              gameState={gameState} 
              formatNumber={formatNumber} 
              formatTime={formatTime} 
            />
            <CatClicker 
              gameState={gameState}
              clickAnimations={clickAnimations}
              onCatClick={handleCatClick}
              formatNumber={formatNumber}
            />
          </div>
        </TabsContent>

        <TabsContent value="shop" className="h-full m-0 p-4 overflow-y-auto">
          <ShopTab 
            gameState={gameState}
            shopItems={shopItems}
            onBuyUpgrade={buyUpgrade}
            formatNumber={formatNumber}
          />
        </TabsContent>

        <TabsContent value="achievements" className="h-full m-0 p-4 overflow-y-auto">
          <AchievementsTab 
            gameState={gameState}
            achievements={achievements}
          />
        </TabsContent>

        <TabsContent value="profile" className="h-full m-0 p-4">
          <ProfileTab 
            isLoggedIn={isLoggedIn}
            gameState={gameState}
            onLogout={handleLogout}
            onShowAuth={handleShowAuth}
            formatNumber={formatNumber}
          />
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
      <AuthDialog 
        showAuth={showAuth}
        authMode={authMode}
        username={username}
        password={password}
        onClose={handleCloseAuth}
        onAuth={handleAuth}
        onModeChange={handleAuthModeChange}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
      />
    </div>
  );
};

export default Index;