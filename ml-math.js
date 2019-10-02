function boxMuller(){
  //  Use Box-Muller method to pull a pair of numbers from standard normal distribution
  u1 = Math.random()
  u2 = Math.random()
  r = Math.sqrt(-2*Math.log(u1))
  z1 = r * Math.cos(2 * Math.PI * u2)
  z2 = r * Math.sin(2 * Math.PI * u2)
  return [z1,z2]
}

function randn(size){
  //  Build an array of size (size) with draws from Standard Normal distribution a la Box-Muller
  out = []
  for(var i = 0; i < size/2; i++){
    out.push(...boxMuller())
  }
  return out.slice(0,size)
}

function nestElements(x){
  vec = []
  while(x.length) vec.push(x.splice(0,1))
  return vec
}

function matmul(X,Y){
  //  X is an m x n matrix, Y is n x l

  m = X.length
  n = Y.length
  l = Y[0].length


  Z = Array(m).fill(Array(l))
  for(i = 0; i < m; i++){
    for(j = 0; j < l; j++){
      t = 0
      for(k = 0; k < n; k++){
        t += X[i][k] * Y[k][j]
      }
      Z[i][j] = t
    }
  }
  return Z
}

function vecMul(x,Y){
  m = x.length
  l = Y[0].length
  out = []
  for (j = 0; j < l; j++){
    t = 0
    for (i = 0; i < m; i++){
      t += x[i] * Y[i][j]
    }
    out.push(t)
  }
  return out
}

function dotprod(x,y){
  s = 0
  for(i = 0; i < x.length;i++){
    s += x[i] * y[i]
  }
}
