import { useState } from 'react';
import HomePage from '@/components/HomePage';
import GalleryPage from '@/components/GalleryPage';
import EditorPage from '@/components/EditorPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery' | 'editor'>('home');

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-primary">Business Editor</h1>
            <div className="flex gap-1 bg-muted p-1 rounded-md">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  currentPage === 'home'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setCurrentPage('gallery')}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  currentPage === 'gallery'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Галерея
              </button>
              <button
                onClick={() => setCurrentPage('editor')}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  currentPage === 'editor'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Редактор
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="animate-fade-in">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'editor' && <EditorPage />}
      </main>
    </div>
  );
};

export default Index;