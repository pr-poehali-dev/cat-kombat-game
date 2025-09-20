import { useState, useEffect } from 'react';
import { GameState, ShopItem, Achievement, ClickAnimation } from '@/types/game';

export const useGameLogic = () => {
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

  const [clickAnimations, setClickAnimations] = useState<ClickAnimation[]>([]);

  const shopItems: ShopItem[] = [
    { id: 1, name: 'Острые когти', description: 'Увеличивает силу когтей на +1 клик', price: 15, clickBoost: 1, owned: 0 },
    { id: 2, name: 'Кошачья мята', description: 'Энергия кота повышается на +2 клика', price: 100, clickBoost: 2, owned: 0 },
    { id: 3, name: 'Боевые перчатки', description: 'Профессиональное снаряжение +5 кликов', price: 1100, clickBoost: 5, owned: 0 },
    { id: 4, name: 'Лазерная указка', description: 'Высокотехнологичная игрушка +25 кликов', price: 12000, clickBoost: 25, owned: 0 },
    { id: 5, name: 'Автокормушка', description: 'Автоматически кормит кота каждую секунду', price: 50000, clickBoost: 100, owned: 0 }
  ];

  const achievements: Achievement[] = [
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

  return {
    gameState,
    clickAnimations,
    shopItems,
    achievements,
    handleCatClick,
    buyUpgrade,
    formatNumber,
    formatTime
  };
};