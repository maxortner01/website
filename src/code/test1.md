```c++
#include <cpp2d/Graphics.h>

using namespace cpp2d;

int main()
{
    {
        DrawWindow window(1280, 720, "");
        ...
        // Create the vertex array, specify the buffers
        VertexArray vertexArray({ BufferType::Vertex });
        vertexArray.setBufferData(0, vertices, sizeof(vertices));
        ...
        // Push the attribute data
        vertexArray[0].pushAttributes({
            Buffers::Attribute {
                .binding = 0,
                .element_count = 2,
                .location = 0,
                .offset = offsetof(Vertex, pos)
            }, ... });

        // Create the pipeline with specified shaders and attribute data
        GraphicsPipeline pipeline(
            { ShaderType::Vertex, ShaderType::Fragment }, 
            window, 
            vertexArray.getAttributeFrame()
        );
        pipeline.getShader( ShaderType::Vertex ).fromFile( "vertex.glsl" );
        pipeline.getShader(ShaderType::Fragment).fromFile("fragment.glsl");
        pipeline.create();

        // Run the main loop
        while (window.isOpen())
        {
            window.pollEvents();

            auto frameData = window.beginFrame();
            pipeline.bind(frameData);
            pipeline.setPushConstantData(frameData, constants);
            vertexArray.draw(frameData);
            window.endFrame(frameData);
        }
    }
    
    // Destroy graphics instance
    Graphics::GDI::get().destroy();
    return 0;
}
```