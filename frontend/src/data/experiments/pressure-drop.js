export const pressureDropData = {
  id: "pressure-drop",
  module: "Fluid Mechanics • Module 02",
  title: "Fluid Pressure Drop in Pipes",
  aim: "To determine the fluid pressure drop as a function of Reynolds Number, pipe geometry, and temperature, and compare theoretical Darcy-Weisbach calculations against experimental telemetry.",
  
  theory: [
    "When an incompressible fluid flows through a closed pipe, it experiences resistance due to internal fluid friction and shear stresses at the pipe wall. This results in a static pressure drop along the length of the pipe.",
    "The flow regime is predicted by the Reynolds Number (Re). Laminar flow (Re < 2300) features smooth, parallel layers, while turbulent flow (Re > 4000) is characterized by chaotic eddies that significantly increase pressure loss.",
    "Our analytical baseline uses the Darcy-Weisbach equation. For turbulent regimes, the Haaland approximation provides a precise friction factor based on relative pipe roughness."
  ],

  apparatus: [
    "Closed-loop water circulation network",
    "Test pipelines (Small Dh = 15mm, Large Dh = 25mm)",
    "Digital differential pressure transducer",
    "Inline water heater and digital thermocouple"
  ],

  specifications: [
    { label: "Test Length (L)", value: "1.5 m" },
    { label: "Small Pipe Diameter", value: "15 mm" },
    { label: "Large Pipe Diameter", value: "25 mm" },
    { label: "Fluid", value: "Water" }
  ],

  procedure: [
    { title: "Initialization", text: "Purge air bubbles from the pressure transducer lines and select the active test pipe." },
    { title: "Baseline Readings", text: "Record initial unheated water temperature and establish maximum flow velocity." },
    { title: "Velocity Variation", text: "Gradually close the control valve in steps, logging velocity and pressure drop." },
    { title: "Parameter Shifts", text: "Repeat trials across different pipe diameters and elevated fluid temperatures." }
  ],

  // Maps to your new FastAPI router!
  apiEndpoint: "/predict/pressure-drop",
  
  inputs: [
    { id: "Temperature_C", label: "Fluid Temp", symbol: "T", unit: "°C", min: 10, max: 80, step: 0.1, defaultValue: 25.0, color: "red" },
    { id: "Hydraulic_Diameter_m", label: "Diameter", symbol: "Dh", unit: "m", min: 0.001, max: 0.1, step: 0.001, defaultValue: 0.015, color: "blue" },
    { id: "Velocity_m_s", label: "Velocity", symbol: "v", unit: "m/s", min: 0.1, max: 10.0, step: 0.1, defaultValue: 2.0, color: "green" },
    { id: "Reynolds_Number", label: "Reynolds No.", symbol: "Re", unit: "-", min: 1000, max: 3000000, step: 100, defaultValue: 25000, color: "purple" }
  ],
  
  outputs: [
    { id: "pressure_drop", label: "Pressure Drop", symbol: "ΔP", unit: "Pa/m" }
  ]
};