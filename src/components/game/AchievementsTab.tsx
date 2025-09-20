import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GameState, Achievement } from '@/types/game';

interface AchievementsTabProps {
  gameState: GameState;
  achievements: Achievement[];
}

const AchievementsTab = ({ gameState, achievements }: AchievementsTabProps) => {
  return (
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
  );
};

export default AchievementsTab;