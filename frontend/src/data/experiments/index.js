// src/data/experiments/index.js
import { heatExchangerData } from "./heat-exchanger";
// import { bernoulliData } from "./bernoulli"; (Future example)

export const experimentRegistry = {
  "heat-exchanger": heatExchangerData,
  // "bernoulli": bernoulliData,
};