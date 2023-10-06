---
title: "Transforming the Laplacian"
metaDesc: "We can use tensors in a practical way to elucidate some formulas often stated without context."
date: "2023-07-29"
tags: 
 - tensors
 - math
 - physics
---

If you're undergraduate phsyics experience is anything like mine, you were more than likely presented some formulas relating the *Laplacian operator* in different coordinate systems. For example, the two-dimensional Laplacian in Cartesian coordinates can be written in polar coordinates as 
$$
    \nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} = \frac{\partial^2}{\partial r^2} + \frac{1}{r}\frac{\partial}{\partial r} + \frac{1}{r^2}\frac{\partial^2}{\partial\theta^2}.
$$
When I first saw this, all I could think is *where did that come from?!* There are several ways to derive this equation but here I want to purse the most *general*, that is, derive a formula and take the Cartesian to polar coordinates transformation as a special case. Then follow the math to the answer. This way we can flex/train our tensor manipulation muscles and explain a common formulaic phenomenon in the same motion.

## The General Formula
We begin by stating a general coordinate transformation. We start in a coordinate system $x^i$ and we wish to move to a different coordinate system $\bar{x}^i$. We can define the transformation itself as a map $f^i: x^i \longrightarrow \bar{x}^i$. Commonly in tensor analysis, the important mapping is actually the *inverse* mapping $(f^{-1})^i$. So, we can write
$$
    \bar{x}^i = \bar{x}^i(\\{x^i\\}).
$$
With these functions defined we can move on to the differential terms. We know from tensor analysis that the first derivative with respect to a coordinate transforms like a vector. This means we can write
$$
    \frac{\partial}{\partial x^i} = \frac{\partial \bar{x}^j}{\partial x^i}\frac{\partial}{\partial \bar{x}^j}.
$$
This is like a *transformation of basis*, where we are moving from the un-barred set of basis vectors to the barred set of basis vectors. Now, we write the Laplacian in the un-barred set (which will be our Cartesian coordinates) as 
$$
    \nabla^2 = \sum_i \frac{\partial^2}{\partial x^i \partial x^i}.
$$
Using the transformation equation, we can begin to deconstruct this. First, let's break down the more general partial derivative term:
$$
\begin{split}
    \frac{\partial^2}{\partial x^i \partial x^j} &= \frac{\partial}{\partial x^i}\left(\frac{\partial}{\partial x^j}\right) \\\\
    &= \frac{\partial}{\partial x^i}\left( \frac{\partial \bar{x}^n}{\partial x^j}\frac{\partial}{\partial \bar{x}^n} \right) \\\\
    &= \frac{\partial \bar{x}^m}{\partial x^i}\frac{\partial}{\partial \bar{x}^m}\left( \frac{\partial \bar{x}^n}{\partial x^j}\frac{\partial}{\partial \bar{x}^n} \right).
\end{split}
$$
Expanding the partial derivatives yields
$$
    \frac{\partial^2}{\partial x^i \partial x^j} = \frac{\partial \bar{x}^m}{\partial x^i}\frac{\partial^2 \bar{x}^n}{\partial \bar{x}^m\partial x^j}\frac{\partial}{\partial \bar{x}^n} + \frac{\partial \bar{x}^m}{\partial x^i} \frac{\partial \bar{x}^n}{\partial x^j}\frac{\partial^2}{\partial \bar{x}^m \partial \bar{x}^n}.
$$
The mixed barred and un-barred differentiations makes the computation not make much sense, but we can easily undo using the vector transformation rule which leaves us with
$$
    \frac{\partial^2}{\partial x^i \partial x^j} = \frac{\partial^2 \bar{x}^n}{\partial x^i\partial x^j}\frac{\partial}{\partial \bar{x}^n} + \frac{\partial \bar{x}^m}{\partial x^i} \frac{\partial \bar{x}^n}{\partial x^j}\frac{\partial^2}{\partial \bar{x}^m \partial \bar{x}^n}.
$$

## Polar Coordinates
We can characterize a transformation from Cartesian to polar coordinates with the equations 
$$
\begin{align}
    x &= r\cos(\theta), & y &= r\sin(\theta).
\end{align}
$$
The inverse transformations are easily found:
$$
\begin{align}
    r &= \sqrt{x^2 + y^2} & \theta &= \arctan(y / x).
\end{align}
$$
Now we need to find the various derivates of each of these terms
$$
\begin{align}
    \frac{\partial r}{\partial x} &= \frac{x}{r} & \frac{\partial r}{\partial y} &= \frac{y}{r} \\\\
    \frac{\partial^2 r}{\partial x^2} &= \frac{y^2}{r^3} & \frac{\partial^2 r}{\partial y^2} &= \frac{x^2}{r^3},
\end{align}
$$
now for $\theta$:
$$
\begin{align}
    \frac{\partial\theta}{\partial x} &= -\frac{y}{r^2} & \frac{\partial\theta}{\partial y} &= \frac{x}{r^2} \\\\
    \frac{\partial^2\theta}{\partial x^2} &= \frac{2xy}{r^4} & \frac{\partial^2\theta}{\partial y^2} &= -\frac{2xy}{r^4}.
\end{align}
$$

### Putting it all together
We can write the first part by picking $i = 1$ and $j = 1$, which gives
$$
\begin{split}
    \frac{\partial^2}{\partial x^2} &= \frac{\partial^2 r}{\partial x^2}\frac{\partial}{\partial r} + \frac{\partial^2 \theta}{\partial x^2}\frac{\partial}{\partial \theta} + \left(\frac{\partial r}{\partial x}\right)^2\frac{\partial^2}{\partial r^2} + \left(\frac{\partial \theta}{\partial x}\right)^2\frac{\partial^2}{\partial \theta^2} + 2\frac{\partial r}{\partial x}\frac{\partial \theta}{\partial x}\frac{\partial^2}{\partial r \partial \theta} \\\\
    &= \frac{y^2}{r^3}\frac{\partial}{\partial r} + \frac{2xy}{r^4}\frac{\partial}{\partial\theta} + \frac{x^2}{r^2}\frac{\partial^2}{\partial r^2} + \frac{y^2}{r^4}\frac{\partial^2}{\partial\theta^2} - \frac{2xy}{r^3}\frac{\partial^2}{\partial r \partial\theta}.
\end{split}
$$
Now we do the same for $i = 2$ and $j = 2$, which essential takes all the $\partial x$'s in the denominators and changes them to $\partial y$'s. This gives us
$$
    \frac{\partial^2}{\partial y^2} = \frac{x^2}{r^3}\frac{\partial}{\partial r} - \frac{2xy}{r^4}\frac{\partial}{\partial\theta} + \frac{y^2}{r^2}\frac{\partial^2}{\partial r^2} + \frac{x^2}{r^4}\frac{\partial^2}{\partial\theta^2} + \frac{2xy}{r^3}\frac{\partial^2}{\partial r \partial \theta}.
$$
Now, what we seek is the addition of these two equations. You'll notice some things might cancel! Adding them together removes the terms linear is $\partial\_\theta$ and the mixed partial derivative term at the end leaving us with 
$$
\begin{split}
    \nabla &= \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} \\\\
    &= \frac{x^2 + y^2}{r^3}\frac{\partial}{\partial r} + \frac{x^2 + y^2}{r^2}\frac{\partial^2}{\partial r^2} + \frac{x^2+y^2}{r^4}\frac{\partial^2}{\partial\theta^2} \\\\
    &= \frac{1}{r}\frac{\partial}{\partial r} + \frac{\partial^2}{\partial r^2} + \frac{1}{r^2}\frac{\partial^2}{\partial\theta^2}. 
\end{split}
$$
This is the equation for the Laplacian in polar coordinates that we saw at first! It was rather involved for only two dimensions, as tensor manipulations are when you expand the indicies, so perhaps there's a quicker way to arrive at this result. Now imagine deriving the equation for spherical coordinates!