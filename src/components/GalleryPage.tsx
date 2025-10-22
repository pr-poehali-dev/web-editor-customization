import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
}

export default function GalleryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      type: 'image',
      url: 'https://v3b.fal.media/files/b/panda/3eSmINeUicbNHUNyojDSm_output.png',
      title: 'Образец изображения'
    }
  ]);

  const handleFileUpload = (type: 'image' | 'video') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image' ? 'image/*' : 'video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        const newItem: MediaItem = {
          id: Date.now().toString(),
          type,
          url,
          title: file.name
        };
        setMediaItems([...mediaItems, newItem]);
      }
    };
    input.click();
  };

  const deleteItem = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  const images = mediaItems.filter(item => item.type === 'image');
  const videos = mediaItems.filter(item => item.type === 'video');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Галерея</h1>
            <p className="text-muted-foreground">Управление фото и видео материалами</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => handleFileUpload('image')} className="gap-2">
              <Icon name="ImagePlus" size={18} />
              Добавить фото
            </Button>
            <Button onClick={() => handleFileUpload('video')} variant="outline" className="gap-2">
              <Icon name="VideoIcon" size={18} />
              Добавить видео
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">
              Все ({mediaItems.length})
            </TabsTrigger>
            <TabsTrigger value="images">
              Фото ({images.length})
            </TabsTrigger>
            <TabsTrigger value="videos">
              Видео ({videos.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            {mediaItems.length === 0 ? (
              <Card className="p-16 text-center">
                <Icon name="FolderOpen" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">Галерея пуста. Добавьте медиафайлы</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all">
                    <div className="aspect-video bg-muted relative">
                      {item.type === 'image' ? (
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <video src={item.url} className="w-full h-full object-cover" controls />
                      )}
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground capitalize">{item.type === 'image' ? 'Изображение' : 'Видео'}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="images" className="mt-8">
            {images.length === 0 ? (
              <Card className="p-16 text-center">
                <Icon name="ImageOff" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">Нет изображений</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((item) => (
                  <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all">
                    <div className="aspect-video bg-muted relative">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="font-medium truncate">{item.title}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="mt-8">
            {videos.length === 0 ? (
              <Card className="p-16 text-center">
                <Icon name="VideoOff" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">Нет видео</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((item) => (
                  <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all">
                    <div className="aspect-video bg-muted relative">
                      <video src={item.url} className="w-full h-full object-cover" controls />
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="font-medium truncate">{item.title}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
