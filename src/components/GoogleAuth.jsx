import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';

const GoogleAuth = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    console.log('Botão clicado - iniciando login');
    setIsLoading(true);
    
    // Simular um pequeno delay para mostrar o loading
    setTimeout(() => {
      const mockUser = {
        id: '123456789',
        name: 'Dr. Paulo Silva',
        email: 'paulo@clinica.com',
        picture: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
      };
      
      console.log('Chamando onLogin com:', mockUser);
      onLogin(mockUser);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat flex items-center justify-center" 
         style={{backgroundImage: 'url(/src/assets/bg.png)'}}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-teal-700/80 to-cyan-800/80"></div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <Card className="glass-card w-full max-w-md mx-4 border-white/20">
        <CardHeader className="text-center pb-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 mx-auto mb-4">
            <img 
              src="/assets/logo.png" 
              alt="Tio Paulo Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Tio Paulo</CardTitle>
          <p className="text-emerald-100">Sistema de Ficha de Anamnese</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Bem-vindo!</h2>
            <p className="text-emerald-100 text-sm mb-6">
              Faça login para acessar o sistema de fichas de anamnese
            </p>
          </div>

          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 py-3 text-white font-semibold flex items-center justify-center space-x-3 hover:bg-white/20 transition-all disabled:opacity-50 rounded-md"
            type="button"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Entrar com Google</span>
              </>
            )}
          </Button>

          {/* Botão alternativo para bypass */}
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600/80 backdrop-blur-sm border border-blue-500/30 hover:bg-blue-700/80 text-white py-3 font-semibold rounded-md transition-all disabled:opacity-50"
            type="button"
          >
            {isLoading ? 'Entrando...' : 'Entrar Diretamente (Bypass)'}
          </Button>

          <div className="text-center">
            <p className="text-emerald-100 text-xs">
              Ao fazer login, você concorda com nossos termos de uso
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAuth;

