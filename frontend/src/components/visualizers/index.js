// src/components/visualizers/index.js
import HeatExchangerVisualizer from "./HeatExchangerVisualizer";
import PressureDropVisualizer from "./PressureDropVisualizer";
// import BernoulliVisualizer from "./BernoulliVisualizer"; (For the future)

export const visualizerRegistry = {
  "heat-exchanger": HeatExchangerVisualizer,
  "pressure-drop": PressureDropVisualizer,
  // "bernoulli": BernoulliVisualizer,
};