import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [title, setTitle] = useState('Hello, World!');
  const [name, setName] = useState('Андрей Кузнецов');
  const [email, setEmail] = useState('Email@mail.ru');
  const [social, setSocial] = useState('https://vk.com/');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop');
  const [isEditing, setIsEditing] = useState(false);

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPhotoUrl(url);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-cyan-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-100 p-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="bg-white p-8 flex items-center justify-center relative group">
              <img 
                src={photoUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <button
                  onClick={handlePhotoUpload}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                >
                  <Icon name="Upload" size={32} />
                  <span className="ml-2">Изменить фото</span>
                </button>
              )}
            </div>

            <div className="bg-cyan-200 p-8 flex flex-col justify-center">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Фамилия Имя</h3>
                  <p className="text-gray-700">{name}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Контакты</h3>
                  <p className="text-gray-700 mb-1">
                    Связаться по почте или через социальную сеть
                  </p>
                  <div className="space-y-2 mt-3">
                    <a 
                      href={`mailto:${email}`}
                      className="text-blue-600 hover:underline block"
                    >
                      {email}
                    </a>
                    <a 
                      href={social}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline block"
                    >
                      {social}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-4 text-center">
            <p className="text-sm text-gray-600">
              Связаться со <a href={`mailto:${email}`} className="text-blue-600 hover:underline">мной</a> или через{' '}
              <a href={social} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                социальную сеть
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'destructive' : 'default'}
            size="lg"
            className="gap-2"
          >
            <Icon name={isEditing ? 'X' : 'Edit'} size={20} />
            {isEditing ? 'Закрыть редактор' : 'Редактировать страницу'}
          </Button>
        </div>

        {isEditing && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6 space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Редактор страницы</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок</label>
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Hello, World!"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Фамилия Имя</label>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Андрей Кузнецов"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email@mail.ru"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Социальная сеть (ссылка)</label>
              <Input 
                value={social}
                onChange={(e) => setSocial(e.target.value)}
                placeholder="https://vk.com/"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Фото профиля</label>
              <Button onClick={handlePhotoUpload} variant="outline" className="w-full gap-2">
                <Icon name="Upload" size={18} />
                Загрузить новое фото
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;