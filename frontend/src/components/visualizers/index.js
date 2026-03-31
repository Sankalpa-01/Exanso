// src/components/visualizers/index.js
import HeatExchangerVisualizer from "./HeatExchangerVisualizer";
// import BernoulliVisualizer from "./BernoulliVisualizer"; (For the future)

export const visualizerRegistry = {
  "heat-exchanger": HeatExchangerVisualizer,
  // "bernoulli": BernoulliVisualizer,
};