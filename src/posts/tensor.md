---
title: "Tensors"
metaDesc: "They're scary (and everyone want to explain them their own way), so here's my own way."
date: "2023-02-22"
tags: 
 - tensors
 - math
 - physics
---

I think the issue with presenting tensors comes down to one fact: There are so many levels of mathematical fluency they can be represented in and, those who use them often, tend more towards a much higher level than those who are just getting acclimated with them. This creates the perception of mystery around them that just exacerbates the confusion already present in the new learner.

However, I (currently) think that tensors can be adequately explained as a consequence of the study of space (a nuance that is separated from the familiar study of *objects in space* we often take part in during our undergraduate courses). So, this is the path I wish to embark on today.

## Vectors (and their Nuance)
Often times, we are comfortable identifying vectors equivocally with their components. This idea, while somewhat true in a lot of cases, is not the truth of the situation. Vectors are *not* lists of numbers. A vector is a list of numbers *and* a list of bases to which each number corresponds. For example, if we have three basis vectors $\mathbf{e}_i$ (where $i\in\{1, 2, 3\}$), we can write any vector as 
$$ \tag{1}
  \mathbf{v} = v^1\mathbf{e}_1 + v^2\mathbf{e}_2 + v^3\mathbf{e}_3 = \sum_i^3 v^i\mathbf{e}_i.
$$
From now on the summation sign will be suppressed, this is called the Einstein summation convention. We can also represent this vector using the traditional linear algebra representation (a column vector)
$$
  \mathbf{v} = 
  \begin{pmatrix}
    v^1 \\\\ v^2 \\\\ v^3
  \end{pmatrix},
$$
where, here, the basis is *implicit*. It may not be shown, but it is certainly still there (much like the summation sign we choose now to neglect). The indicator that a basis has been chosen is the mere fact that we can write the vector as only a list of numbers. Components come after a basis.

### Coordinate Transformations
Now we can talk about changing to a different coordinate system. Intuitively, it's like having three meter-sticks and three yard-sticks oriented in different ways but fixed at the origin. Going from the meter-sticks to the yard-sticks is a linear transformation, so we can write 
$$
  \bar{\mathbf{e}}_i = \Lambda_i^j\mathbf{e}_j
$$
where the $\Lambda$ symbols are the descriptors of our transformation. We can write, now, the barred vector in the unbarred basis as 
$$
  \mathbf{v} = \bar{v}^i\bar{\mathbf{e}}_i = \Lambda_i^j\bar{v}^i\mathbf{e}_j.
$$
We also know from (1) above that $\mathbf{v} = v^j\mathbf{e}_j$. Equating the coefficients on the $\mathbf{e}_j$'s in the previous equations gives a relation between the sets of components
$$
  v^j = \Lambda_i^j\bar{v}^i.
$$
When we changed our basis above, we get a corresponding equation of how the components change. Before we had the barred system on the left, but now it's on the right, so we can postulate the existence of a set of coefficients (we shall label $\Lambda^{-1}$) such that 
$$
  (\Lambda^{-1})^i_j \Lambda^j_k = \delta^i_k
$$
which allows us to write 
$$ \tag{2}
\begin{split}
  (\Lambda^{-1})^i_k v^j &= (\Lambda^{-1})^i_k \Lambda_i^j \bar{v}^i \\\\
  (\Lambda^{-1})^i_k v^j &= \delta^j_k \bar{v}^i \\\\
  (\Lambda^{-1})^i_j v^j &= \bar{v}^i.
\end{split}
$$

### Contravariance vs. Covariance
We can now see where the concepts of contra- and covariance becomes so important. When we wrote our vector as 
$$
  \mathbf{v} = v^i\mathbf{e}_i,
$$
the raised-index components are called *contravariant* and the lower-index components *covariant*. They are called this because of *how they transform*. When we transform to a new coordinate system, the basis vectors get the $\Lambda$ symbols attached to them. In this transformation, the components get the inverse $\Lambda^{-1}$ symbols attached to them. You can think of it as if one grows the other must shrink in order to preserve the invariance of the vector. We can see this symbolically by writing
$$
\begin{split}
  \mathbf{v} &= \bar{v}^i\bar{\mathbf{e}}_i  \\\\
  &= [(\Lambda^{-1})_j^i v^j][\Lambda_i^k\mathbf{e}_k] \\\\
  &= (\Lambda^{-1})_j^i\Lambda_i^k v^j\mathbf{e}_k \\\\
  &= \delta^k_j v^j\mathbf{e}_k \\\\
  &= v^j\mathbf{e}_j
\end{split}
$$
which is the expression of the vector in the unbarred system. So! We have made it somewhere conceptually. The vector has an existence beyond the components we usually write them as. The way in which we probed this essence of the vector is by studying how it "changes" when we move to different coordinates. The vector doesn't really change, our representation does. We can even identify vectors by how their components change when we change coordinates. In this way, if an object transforms like (2), we can be sure it's a vector. Furthermore, thus far (we have certainly discussed different coordinate systems) we have not specified a particular coordinate systems, but have provided a scheme for going between them. In this way, if we write an equation with the components of a vector, we can be sure that the equation itself does not prefer a coordinate system (just like (2) doesn't prefer a particular coordinate system).

## To Be a Tensor
It seems, then, that is convenient to work only with tensors. Because they have these special transformation properties, if you work only with them, you are assuring your equations to also be invariant with respect to these special transformations. For example, the space-time interval in special relativity can be written as
$$
  ds^2 = c^2\,dt^2 - dx^2 - dy^2 - dz^2.
$$
We can write this in a more succinct and consequential way as 
$$
  ds^2 = \eta_{\mu\nu}dx^\mu dx^\nu
$$
where $dx^0 = dt$ and $\eta_{ij} = -\delta_{ij}$ and $\eta_{00} = c^2$ (a convention is used here where greek indices span all four dimensions and Latin indices span only the spatial dimensions). Transformations that we require are ones that leave this space-time interval invariant. We can write this as 
$$
  \eta_{\mu\nu} V^\mu V^\nu = \eta_{\mu\nu}\bar{V}^\mu \bar{V}^\nu.
$$
Using the transformation rules we know so far
$$
  \eta_{\mu\nu} V^\mu V^\nu = \eta_{\mu\nu}(\Lambda^\mu_\sigma V^\sigma) (\Lambda^\nu_\gamma V^\gamma).
$$
This implies 
$$
\begin{split}
  \eta_{\mu\nu} V^\mu V^\nu &= (\Lambda^\mu_\sigma\Lambda^\nu_\gamma\eta_{\mu\nu})V^\sigma V^\gamma \\\\
  \eta_{\mu\nu} V^\mu V^\nu &\overset{\text{rearrange indices}}{=} (\Lambda^\sigma_\mu\Lambda^\gamma_\nu\eta_{\sigma\gamma})V^\mu V^\nu \\\\
  \implies \eta_{\mu\nu} &= \Lambda^\sigma_\mu\Lambda^\gamma_\nu\eta_{\sigma\gamma}.
\end{split}
$$
We can use this condition to determine the form of the transformations $\Lambda$. This yields the Lorentz transformations.

## Transformation of the Derivative Operator
We can now extend our notion of transformation and vectors a little. Consider a path $x^\mu(t)$ through space (we'll use greek indices now since we're veering into geometry that's applicable to relativity). We can construct a vector by considering the derivative of this path with respect to its parameter
$$
  V^\mu = \frac{dx^\mu}{dt}.
$$
If we transform coordinates to a barred system, we do so with a function
$$
  \bar{x}^\mu = \bar{x}^\mu(x^\nu),
$$
where the argument is all the components of the unbarred position. Differentiating this with respect to time gives the vector in the unbarred coordinates. To do so on the right-hand side requires the chain rule. So, we get
$$
  \bar{V}^\mu = \frac{\partial\bar{x}^\mu}{\partial x^\nu}V^\nu.
$$
The differential operator itself seems to transform as a vector, since
$$
  \bar{\partial}\_\mu = \frac{\partial x^\nu}{\partial\bar{x}^\mu}\partial\_\nu
$$
which is given by the chain rule. This is exactly the same as our discussion above, but now we have 
$$ \tag{3}
  \Lambda^\mu_\nu = \frac{\partial\bar{x}^\mu}{\partial x^\nu}.
$$

### Rigid Transformations
We can do a quick exercise using the three-dimensional Euclidean metric, which is the Kronecker delta $\delta_{ij}$. The transformations that are allowed are the ones that keep the metric of the same form:
$$
  \delta_{ij} = \Lambda^n_i\Lambda^m_j\delta_{nm} = \frac{\partial \bar{x}^n}{\partial x^i}\frac{\partial \bar{x}^m}{\partial x^j}\delta_{nm}.
$$
Using the property of the Kronecker delta allows us to write 
$$
  \delta_{ij} = \frac{\partial \bar{x}^n}{\partial x^i}\frac{\partial \bar{x}^n}{\partial x^j}.
$$

