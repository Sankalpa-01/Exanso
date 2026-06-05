export const heatExchangerData = {
  id: "heat-exchanger",
  module: "Mechanical Engineering • Module 01",
  title: "Parallel Flow Heat Exchanger",
  aim: "To determine the Logarithmic Mean Temperature Difference (LMTD), Effectiveness, Heat Transfer Rate, and Overall Heat Transfer Coefficient for a parallel flow heat exchanger.",
  
  theory: [
    "In a parallel flow heat exchanger, both the hot and cold fluids enter from the same end and flow in the same direction. This causes the temperature difference between them to be maximum at the inlet and gradually decrease along the length of the exchanger.",
    "As heat transfer occurs, the hot fluid cools while the cold fluid warms up. Their temperatures approach each other at the outlet without crossing. Due to the continuously reducing temperature difference, the rate of heat transfer is highest near the inlet and decreases downstream."
  ],

  apparatus: [
    "Parallel flow heat exchanger (double pipe type)",
    "Temperature sensors / thermocouples (4 points)",
    "Rotameters (for flow rate measurement)"
  ],

  specifications: [
    { label: "Specimen material", value: "Copper tube" },
    { label: "Specimen Size", value: "Dia 12.5mm x 1500 mm long" },
    { label: "Outer Shell material", value: "G.I" }
  ],

  procedure: [
    { title: "Initialize System", text: "Start water supply for both hot and cold streams ensuring no airlocks in the pipes." },
    { title: "Set Parameters", text: "Switch on heater for hot water and set desired flow rates using rotameters." },
    { title: "Achieve Steady State", text: "Allow the system to run uninterrupted until temperatures stabilize (Critical Step)." },
    { title: "Data Collection", text: "Record temperatures and exact flow rates. Repeat for different combinations." }
  ],

  // API and Input Configurations
  apiEndpoint: "/predict/heat-exchanger",
  
  inputs: [
    { id: "th_in", label: "Hot Inlet Temp", symbol: "Th_in", unit: "°C", min: 40, max: 80, step: 0.5, defaultValue: 60.0, color: "red" },
    { id: "tc_in", label: "Cold Inlet Temp", symbol: "Tc_in", unit: "°C", min: 15, max: 30, step: 0.5, defaultValue: 22.5, color: "blue" },
    { id: "m_h", label: "Hot Flow Rate", symbol: "m_h", unit: "kg/s", min: 0.01, max: 0.2, step: 0.005, defaultValue: 0.1, color: "red" },
    { id: "m_c", label: "Cold Flow Rate", symbol: "m_c", unit: "kg/s", min: 0.01, max: 0.25, step: 0.005, defaultValue: 0.13, color: "blue" }
  ],

  outputs: [
    { id: "th_out", label: "Hot Outlet", symbol: "Th_out", unit: "°C", color: "red" },
    { id: "tc_out", label: "Cold Outlet", symbol: "Tc_out", unit: "°C", color: "blue" }
  ]
};