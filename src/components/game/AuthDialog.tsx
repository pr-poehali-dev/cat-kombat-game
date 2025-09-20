import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface AuthDialogProps {
  showAuth: boolean;
  authMode: 'login' | 'register';
  username: string;
  password: string;
  onClose: () => void;
  onAuth: () => void;
  onModeChange: () => void;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

const AuthDialog = ({
  showAuth,
  authMode,
  username,
  password,
  onClose,
  onAuth,
  onModeChange,
  onUsernameChange,
  onPasswordChange
}: AuthDialogProps) => {
  return (
    <Dialog open={showAuth} onOpenChange={onClose}>
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
              onChange={(e) => onUsernameChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Button 
              onClick={onAuth} 
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={!username.trim() || !password.trim()}
            >
              {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            <div className="text-center">
              <Button
                variant="link"
                onClick={onModeChange}
                className="text-orange-600"
              >
                {authMode === 'login' ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;