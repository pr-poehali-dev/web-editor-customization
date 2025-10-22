import Icon from '@/components/ui/icon';

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-16">
        <section className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground tracking-tight">
            Профессиональный редактор контента
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Управляйте вашим контентом с помощью интуитивного интерфейса. 
            Добавляйте медиафайлы, редактируйте текст и настраивайте внешний вид.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Icon name="Image" className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-3">Галерея медиа</h3>
            <p className="text-muted-foreground leading-relaxed">
              Загружайте и организуйте фото и видео в удобной галерее с предпросмотром
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Icon name="PenTool" className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-3">Редактор текста</h3>
            <p className="text-muted-foreground leading-relaxed">
              Создавайте и форматируйте текстовый контент с помощью мощных инструментов
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Icon name="Palette" className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-3">Настройка стиля</h3>
            <p className="text-muted-foreground leading-relaxed">
              Изменяйте цвета, шрифты и визуальное оформление под ваш бренд
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-xl p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold">Начните работу прямо сейчас</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Переходите в галерею для управления медиафайлами или в редактор для создания контента
          </p>
        </section>
      </div>
    </div>
  );
}
