---
title: "cpp2d Devlog 1: Handling destruction"
metaDesc: "An incredibly important process in graphics systems is handling the order of the creation and destruction of objects."
date: "2023-05-02"
tags: 
 - cpp2d
 - graphics
 - vulkan
 - computer science
---

I have been playing around with developing another graphics framework the past few days called [cpp2d](https://www.github.com/maxortner01/cpp2d). I had a few ideas that I was able to express with a basic OpenGL rendering backend, but I really have been wanting to dive into a well-fleshed-out Vulkan backend. So, this is what I've been doing.

## How Vulkan Initializes
Vulkan is infamous for it's long-winded initialization process (often quoted is the fact it takes over 700 lines of C++ code to get a triangle on the screen). This raw exposure of the deep rendering back-end means that there is a lot of room for error and, more specifically, that things *must* transpire in a certain way. Luckily, for debugging purposes, Vulkan has the validation layer functionality which provides a ton of awesome support for debugging. What I want to talk about here, though, is the specific process of creation and destruction in Vulkan.

### OpenGL vs. Vulkan
Both OpenGL and Vulkan operate by passing handles from the rendering back-end to your API. A creation function call sets the handle's value and a destroy function call requires that you pass in the handle. In OpenGL handles are `GLuint`, for the most part. In Vulkan, however, every object has its own handle type. For the most part these handle types are reduced to `void*`, which means if we wish to abstract the rendering API out, we can keep track of handles using this type.

In order to create a Vulkan object, we first must create a `Vk...CreateInfo create_info` struct which houses all of the information needed by the creation process. Then the handle `Vk... handle` is passed into the function `VkCreate...(&create_info, &handle)` and we check for success and all of that. This example is very generalized, and oftentimes in order to create an object, you might need to also pass in a prerequisite object. For example, many objects require a `VkInstance` to be passed in alongside it. 

## Destroying in Vulkan
Because of this, the destroy methods all have varying arguments from case to case, so immediately we are faced with the issue of "how do we handle creating, storing, and destroying objects?"

I certainly don't think there is a universal way to store *every* Vulkan object created, nor do I think this is a good idea. However, when it comes to things that need to explicitly be destroying, I think a good argument can be made for letting a render API take full control of the process. This way, you can initialize and create the objects in any order you might need, as many as you might need, and the render API will control their destruction.

## The Plan of Action
So what is the order, exactly? It's a good rule of thumb that, in general, systems and objects that have a sequence of creation typically require the order of destruction to be *opposite*. This fact lends nicely to the data structure that is the stack. If we could somehow push each Vulkan object to a stack upon creation then, upon destruction, we simply burn through the stack calling the corresponding destroy function on the object. This way destruction is always the opposite order and we also ensure every object *gets destroyed*. 

### The Issue
However, every Vulkan destroy method, as we talked about earlier, does not have homogenous arguments and often times objects depend upon other objects. So, in order to handle this, we will need some way of storing an arbitrary amount of arguments for retrieval at the end, when the objects are to be destroyed.

## ArgumentList
Any Vulkan object that requires destruction can be abstracted away into a data structure that looks something like ([GDI.h](https://github.com/maxortner01/cpp2d/blob/vulkan/include/cpp2d/Graphics/GDI.h))
```C++
struct GDIObjectInstance
{
    GDIObject type;
    void*     handle;
    Utility::ArgumentList arguments;
};

std::stack<GDIObjectInstance> _objects;
```
where `GDIObject` is an `enum class` that has elements like `GDIObject::Instance`, `GDIObject::Surface`, and `GDIObject::Device`. This is needed so that, down the line, we can figure out which Vulkan destroy function we need to use. The key for the issue at hand lies in the [`Utility::ArgumentList`](https://github.com/maxortner01/cpp2d/blob/vulkan/include/cpp2d/Utility/ArgumentList.h). This class does one essential thing: It allocates enough memory to store the arguments and contains an iterator that steps every time `arguments.set<Type>(object)` is called and every time `arguments.get<Type>()` is called.

### An Example
Say we want to store away two numbers 
```C++
U16 num1 = 8;
U32 num2 = 900;
```
We can store these numbers away in an argument list with
```C++
Utility::ArgumentList arguments;
arguments.set(num1, num2);
```
It's important that set is only called once. Only one allocation is made and the size of that allocation is based off the objects passed into the first set. Any attempts to write passed the allocated amount with trigger an assert.

> One crucial detail here is that deallocation is **manual** (at least for now). You must call `arguments.free()` when the object's lifetime is over, not doing this will cause memory leakage. For now, this is done so that the object can be shallow copied as much as you want without worrying about also copying around the data to new locations. I might ammend this and change `_ptr` to a shared pointer, so that when the final object is destroyed the pointer is freed. There's a few avenues to go down, for now I'm more focused on this functionality.

We can read back the numbers with the calls
```C++
U16 _num1 = arguments.get<U16>();
U32 _num2 = arguments.get<U32>();
assert(num1 == _num1 && num2 == _num2);
```

### In Practice
Our objects are stored with the `GDIObjectInstance` struct which means when we create a Vulkan object, we get its handle and we collect together its dependencies needed for destruction. For example, a swapchain needs the handle to the swapchain and the device with which the swapchain was created. Right after creating the swapchain, we do (casting from the `void*` handles to Vulkan handles)
```C++
Utility::Arguments arguments;
arguments.set(
    (VkDevice)device,
    (VkSwapchainKHR)swapchain
);

_objects.push(GDIObjectInstance{
    .type      = GDIObject::Swapchain,
    .handle    = swapchain,
    .arguments = arguments 
});
```
Each object that requires destruction is created in this way. This also gives reason to locate the creation code of an object *inside* the render API class.

Upon destruction of the render API, we simply
```C++
while (!_objects.empty())
{
    GDIObjectInstance& object = _objects.top();

    switch (object.type)
    {
        ...
    };

    object.arguments.free();
    _objects.pop();
}
```
Inside of the switch statement, we simply use the `.get<>()` method to retrieve the arguments. For example, the swapchain case is 
```C++
case GDIObject::Swapchain:
{
    INFO("Destroying swapchain.");
    VkDevice          device = object.arguments.get<VkDevice>();
    VkSwapchainKHR swapchain = object.arguments.get<VkSwapchainKHR>();

    vkDestroySwapchainKHR(device, swapchain, nullptr);
    break;
}
```
It's as simple as that.

## Moving Forward
The `Utility::ArgumentList` class is, in its infancy, as dangerous as a raw-allocated pointer (doesn't really utilize that RAII scheme) which is okay, since `GDI` is totally responsible for handling its destruction, not the user. But perhaps there's a better way to go about writing it.

The simplicity of allocation inside of the `Utility::ArgumentList` class also means that a custom allocator can easily be plugged in.

You do still end up writing a long switch statement, breaking out all the cases, but, as we said in the beginning, *total* abstraction is not the goal here, but instead giving the developer (namely, me) the assurance that the destruction of the object will be handled in the correct order. This should be handled by the API, not solely the developer. At least, it's nicer that way.