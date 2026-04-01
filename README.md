# Exanso: Sim-to-Real Virtual Laboratory

**Exanso** is a next-generation, data-driven virtual laboratory platform designed to bridge the gap between theoretical engineering physics and real-world AI predictions. Built with a premium "Cyber Blue" Web3-inspired aesthetic, the platform allows engineering students and professionals to run complex Sim-to-Real comparisons using trained Machine Learning models.

## Key Features

* **Data-Driven Architecture:** Easily scale from 1 to 100+ experiments without altering core UI code. Experiments are managed via simple configuration files and a central registry pattern.
* **Sim-to-Real AI Engine:** Compares theoretical physics formulas against real-world trained AI models (e.g., Random Forest) for advanced error analysis.
* **Batch Processing:** Users can input data manually or upload `.csv` and `.xlsx` datasets to process up to 10,000 rows of experimental conditions instantly.
* **Dynamic Visualizers:** Features animated, CSS-driven cross-sectional visualizers (like the concentric double-pipe flow) tailored to specific experiments.
* **Premium UI/UX:** Built with a deep blue-to-black gradient theme, glassmorphism, custom scrollbars, and fluid animations for an immersive, modern experience.

---

## Tech Stack

**Frontend**
* **Framework:** React.js (via Vite)
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Cards, Sliders, Tables, Badges, Inputs)
* **Icons:** Lucide React
* **API Client:** Axios
* **Notifications:** Sonner

---

## Project Structure

The project is divided into two distinct environments: the React frontend and the FastAPI backend.

```text
Exanso/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Shadcn UI Components
│   │   │   ├── visualizers/         # Dynamic animated visualizer components
│   │   │   └── ExperimentLayout.jsx # The Master Template for all experiments
│   │   ├── data/
│   │   │   └── experiments/         # JSON/JS config files for each lab
│   │   ├── App.jsx                  # Main Router
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js

```

## Installation & Setup

### 1. Frontend Setup
``` bash
cd frontend

# Install Node modules
npm install

# Start the Vite development server
npm run dev

```

## License
This project is proprietary and built for Exanso. All rights reserved.
