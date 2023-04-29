```c++
#include <cpp2d/Graphics.h>
#include <cpp2d/Engine.h>
...
class DungeonScene : public cpp2d::Scene
{
    ...
public:
    DungeonScene(const cpp2d::Vec2u& size) : Scene(size),
    {
        client::TileSystem& tileSystem 
            = emplaceSystem<client::TileSystem>();
        cpp2d::Systems::SpriteRenderer& renderer 
            = emplaceSystem<cpp2d::Systems::SpriteRenderer>();

        renderer.addChild(&tileSystem);
        tileSystem.create(this, MAP, { 10, 10 });

        renderer.setTextureList(&spritesheet, 1);
    }
};

int main()
{
    Application app({ 1280, 720 }, "Application");
    app.pushScene<DungeonScene>(Vec2u(1280, 720));
    app.run();
}
```