import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Activity, ArrowRight } from "lucide-react"; // Make sure to install: npm install lucide-react

const ExperimentCard = ({ title, description, link, status, icon: Icon }) => {
  const isActive = status === "Active";

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${isActive ? "border-blue-500/50 bg-slate-900 shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1" : "border-slate-800 bg-slate-950/50 opacity-75"}`}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        {isActive ? (
          <Badge className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/50">
            Available
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-slate-500 border-slate-700 bg-slate-900"
          >
            Coming Soon
          </Badge>
        )}
      </div>

      <CardHeader>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isActive ? "bg-blue-600/20 text-blue-400" : "bg-slate-800 text-slate-500"}`}
        >
          <Icon size={24} />
        </div>
        <CardTitle className="text-xl text-slate-100">{title}</CardTitle>
        <CardDescription className="text-slate-400 h-10">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>{/* Optional: Add mini-stats here later */}</CardContent>

      <CardFooter>
        {isActive ? (
          <Link to={link} className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold group">
              Launch Simulator
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        ) : (
          <Button
            disabled
            variant="secondary"
            className="w-full bg-slate-800 text-slate-500 border border-slate-700"
          >
            <Lock className="mr-2 h-4 w-4" /> Locked
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">
            Experiment Library
          </h1>
          <p className="text-slate-400">
            Select a module to begin your Sim-to-Real comparison.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Experiment */}
          <ExperimentCard
            title="Parallel Flow Heat Exchanger"
            description="Double-pipe setup. Compare NTU-Effectiveness results with Random Forest predictions."
            link="/experiment/heat-exchanger"
            status="Active"
            icon={Activity}
          />

          {/* Future Experiments (Placeholders) */}
          <ExperimentCard
            title="Tensile Stress Test"
            description="Predict yield strength and failure points for Aluminum 6061 samples."
            status="Locked"
            icon={Lock}
          />

          <ExperimentCard
            title="Bernoulli's Theorem"
            description="Fluid dynamics verification using variable cross-section venturi meters."
            status="Locked"
            icon={Lock}
          />

          <ExperimentCard
            title="Centrifugal Pump"
            description="Analyze characteristic curves: Head vs Discharge under variable RPM."
            status="Locked"
            icon={Lock}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
