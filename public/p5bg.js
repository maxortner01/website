var n = 150;
var xs = [];
var ys = [];
var vx = [];
var vy = [];
var m = [];

var X = 600
var Y = 600

function setup() {
  createCanvas(X, Y);
  
  for (let i = 0; i < n; i++)
  {
    m.push(Math.floor(Math.random() * 10) / 5.0);
    
    xs.push(Math.floor(Math.random() * X));
    ys.push(Math.floor(Math.random() * Y));
    
    vx.push(Math.floor(Math.random() * 500) - 250);
    vy.push(Math.floor(Math.random() * 500) - 250);
  }
}

function draw() {
  background(220);
  
  var COMx = 0;
  var COMy = 0;
  
  for (let i = 0; i < n; i++)
  {
    xs[i] += vx[i] * 0.001;
    ys[i] += vy[i] * 0.001;
    
    for (let j = 0; j < n; j++)
    {
      if (i == j) continue;
      
      var vec_x = xs[j] - xs[i];
      var vec_y = ys[j] - ys[i];
      var r = sqrt(vec_x**2 + vec_y**2);
      
      vx[i] += m[i] * m[j] / r * vec_x * 0.25;
      vy[i] += m[i] * m[j] / r * vec_y * 0.25;
    
      stroke(0, 0, 0, (15 / r)**2 * 200);
      strokeWeight(0.1); 
      line(xs[i], ys[i], xs[j], ys[j]);
    }
    
    var vec_x = X / 2.0 - xs[i];
    var vec_y = Y / 2.0 - ys[i];
    var r = sqrt(vec_x**2 + vec_y**2);
    
    vx[i] += 1.0 / r * vec_x * 0.25;
    vy[i] += 1.0 / r * vec_y * 0.25;
    
    fill(0, 0, 0, 255);
    circle(xs[i], ys[i], m[i] * 1.5 + 0.5);
  }
}