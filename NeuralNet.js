function NeuralNet(layerWidths){

  function get_initial_weights(inLength, outLength){
    w = Array(inLength);
    for (i = 0; i < inLength; i++){
      w[i] = randn(outLength).map(n => n * Math.sqrt(2/inLength))
    }
    return w
  }

  //   initialize weights
  weights = Array(layerWidths.length - 1)

  for (i = 0; i < weights.length; i++){
    weights[i] = get_initial_weights(layerWidths[i]+1, layerWidths[i+1]) // Don't forget +1 for bias!
  }

  return{
    weights: weights,

    predict: function(X){
      //  Predict a value y for an input X
      out = X
      for(l = 0; l < this.weights.length; l++){
        out = vecMul([...out,1],weights[l]).map(x=>Math.max(0,x))
      }
      return out
    },

    train: function(X,y){
      //  Perform a stochastic weight update for a given X,y pair


      forward = [...X,1]
      activations = [forward]
      for(l = 0; l < this.weights.length; l++){
        forward = [...vecMul(forward,weights[l]).map(x=>Math.max(0,x)),1]
        

        //  Keep track of the activations of each layer
        activations.push(forward)
      }
      out = forward.slice(0,forward.length - 1)
      //  forward is now the model output
      //  Using L2 loss function
      loss = 0
      for (i = 0; i < out.length; i++){
        loss += (out[i] - y[i])**2
      }


      deltas = [ activations[activations.length - 1].map(x => x > 0 ? loss : 0) ]

      //  Work backwards per layer to find delta values
      for (l = activations.length - 2; l > 0; l--){
        // d_l = sum(d_k * w_lk)*activation_l
        d = []
        for (n = 0; n < activations[l].length; n++){
          dl = activations[l][n] > 0 ? dotprod(W[l],deltas[0]) : 0
          d.push(d1)
        }
        deltas.unshift(d)
      }

      //  Update each weight
      for (l = 0; l < self.weights.length; l++){
        for(i = 0; i < self.weights[l].length; i++){
          for(j = 0; j < self.weights[l][i].length; j++){
            // Learning Rate = 1e-4
            dw = 1e-3 * activations[l][i] * deltas[l][j]
            this.weights[l][i][j] -= dw
          }
        }
      }
    },

  }
}
