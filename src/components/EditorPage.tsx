import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TextBlock {
  id: string;
  title: string;
  content: string;
}

export default function EditorPage() {
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([
    {
      id: '1',
      title: 'Добро пожаловать',
      content: 'Начните редактировать текст или создайте новый блок'
    }
  ]);
  
  const [selectedBlock, setSelectedBlock] = useState<string>('1');
  const [primaryColor, setPrimaryColor] = useState('#1E3A8A');
  const [fontSize, setFontSize] = useState('16');

  const currentBlock = textBlocks.find(b => b.id === selectedBlock);

  const addNewBlock = () => {
    const newBlock: TextBlock = {
      id: Date.now().toString(),
      title: 'Новый блок',
      content: ''
    };
    setTextBlocks([...textBlocks, newBlock]);
    setSelectedBlock(newBlock.id);
  };

  const updateBlock = (id: string, field: 'title' | 'content', value: string) => {
    setTextBlocks(textBlocks.map(block => 
      block.id === id ? { ...block, [field]: value } : block
    ));
  };

  const deleteBlock = (id: string) => {
    if (textBlocks.length === 1) return;
    setTextBlocks(textBlocks.filter(block => block.id !== id));
    if (selectedBlock === id) {
      setSelectedBlock(textBlocks.find(b => b.id !== id)?.id || '');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Редактор контента</h1>
          <p className="text-muted-foreground">Создавайте и форматируйте текстовый контент</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Текстовые блоки</h2>
                <Button onClick={addNewBlock} size="sm" className="gap-2">
                  <Icon name="Plus" size={16} />
                  Новый блок
                </Button>
              </div>

              <div className="space-y-4">
                {textBlocks.map((block) => (
                  <div
                    key={block.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedBlock === block.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedBlock(block.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-1 truncate">{block.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{block.content}</p>
                      </div>
                      {textBlocks.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBlock(block.id);
                          }}
                          className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {currentBlock && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Редактирование блока</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Заголовок</Label>
                    <Input
                      id="title"
                      value={currentBlock.title}
                      onChange={(e) => updateBlock(currentBlock.id, 'title', e.target.value)}
                      className="mt-2"
                      placeholder="Введите заголовок"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Содержание</Label>
                    <Textarea
                      id="content"
                      value={currentBlock.content}
                      onChange={(e) => updateBlock(currentBlock.id, 'content', e.target.value)}
                      className="mt-2 min-h-[200px]"
                      placeholder="Введите текст..."
                    />
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Настройки стиля</h2>
              
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="colors">Цвета</TabsTrigger>
                  <TabsTrigger value="typography">Текст</TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="primary-color">Основной цвет</Label>
                    <div className="flex gap-3 mt-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-20 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <p className="text-sm text-muted-foreground mb-3">Быстрый выбор:</p>
                    <div className="grid grid-cols-5 gap-2">
                      {['#1E3A8A', '#DC2626', '#059669', '#7C3AED', '#EA580C'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setPrimaryColor(color)}
                          className="w-10 h-10 rounded-md border-2 border-border hover:border-primary transition-colors"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="typography" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="font-size">Размер шрифта (px)</Label>
                    <Input
                      id="font-size"
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="mt-2"
                      min="12"
                      max="72"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-3">Предустановки:</p>
                    <div className="flex gap-2 flex-wrap">
                      {['14', '16', '18', '20', '24'].map((size) => (
                        <Button
                          key={size}
                          variant={fontSize === size ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFontSize(size)}
                        >
                          {size}px
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Eye" size={18} />
                Предпросмотр
              </h3>
              <div 
                className="p-4 border border-border rounded-lg bg-muted/30"
                style={{ 
                  color: primaryColor,
                  fontSize: `${fontSize}px`
                }}
              >
                {currentBlock ? (
                  <div>
                    <h4 className="font-bold mb-2">{currentBlock.title}</h4>
                    <p>{currentBlock.content}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Выберите блок для предпросмотра</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
