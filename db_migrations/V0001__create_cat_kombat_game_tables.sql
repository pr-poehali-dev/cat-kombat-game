-- Создание таблицы игроков Cat Kombat
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(100) NOT NULL DEFAULT 'Игрок',
    coins BIGINT NOT NULL DEFAULT 0,
    clicks_per_second INTEGER NOT NULL DEFAULT 1,
    total_clicks BIGINT NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    experience BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы улучшений в магазине
CREATE TABLE IF NOT EXISTS shop_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price BIGINT NOT NULL,
    price_multiplier DECIMAL(3,2) NOT NULL DEFAULT 1.15,
    clicks_boost INTEGER NOT NULL DEFAULT 1,
    item_type VARCHAR(50) NOT NULL DEFAULT 'upgrade',
    max_level INTEGER DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы покупок игроков
CREATE TABLE IF NOT EXISTS player_purchases (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    shop_item_id INTEGER REFERENCES shop_items(id),
    level INTEGER NOT NULL DEFAULT 1,
    total_spent BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, shop_item_id)
);

-- Создание таблицы достижений
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    requirement_type VARCHAR(50) NOT NULL,
    requirement_value BIGINT NOT NULL,
    reward_coins BIGINT NOT NULL DEFAULT 0,
    icon VARCHAR(50) DEFAULT '🏆',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы полученных достижений
CREATE TABLE IF NOT EXISTS player_achievements (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    achievement_id INTEGER REFERENCES achievements(id),
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, achievement_id)
);

-- Добавление начальных улучшений в магазин
INSERT INTO shop_items (name, description, base_price, clicks_boost, item_type) VALUES
('Острые когти', 'Увеличивает силу когтей на +1 клик', 15, 1, 'upgrade'),
('Кошачья мята', 'Энергия кота повышается на +2 клика', 100, 2, 'upgrade'),
('Боевые перчатки', 'Профессиональное снаряжение +5 кликов', 1100, 5, 'upgrade'),
('Лазерная указка', 'Высокотехнологичная игрушка +25 кликов', 12000, 25, 'upgrade'),
('Автокормушка', 'Автоматически кормит кота каждую секунду', 50000, 100, 'auto');

-- Добавление достижений
INSERT INTO achievements (name, description, requirement_type, requirement_value, reward_coins, icon) VALUES
('Первый клик', 'Сделай свой первый клик', 'total_clicks', 1, 10, '🐾'),
('Новичок', 'Набери 100 кликов', 'total_clicks', 100, 50, '🥉'),
('Боец', 'Набери 1000 кликов', 'total_clicks', 1000, 200, '🥈'),
('Мастер', 'Набери 10000 кликов', 'total_clicks', 10000, 1000, '🥇'),
('Богач', 'Накопи 1000 монет', 'coins', 1000, 100, '💰'),
('Миллионер', 'Накопи 1000000 монет', 'coins', 1000000, 10000, '💎');