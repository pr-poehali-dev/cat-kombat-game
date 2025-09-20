export interface GameState {
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

export interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  clickBoost: number;
  owned: number;
}

export interface Achievement {
  name: string;
  description: string;
  requirement: number;
  icon: string;
}

export interface ClickAnimation {
  id: number;
  x: number;
  y: number;
}