import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import {
  Lock,
  Activity,
  ArrowRight,
  ArrowLeft,
  Settings,
  Building,
  Zap,
  HardHat,
  Layers,
  Flame,
} from "lucide-react";

// --- DATA STRUCTURE ---
// In a real app, you would export these from a central data.js file
// but for now, we include them here so the page works immediately.
const departments = [
  { id: "mech", name: "Mechanical Engineering", icon: Settings },
  { id: "ceramic", name: "Ceramic Engineering", icon: Layers },
  { id: "elec", name: "Electrical Engineering", icon: Zap },
  { id: "civil", name: "Civil Engineering", icon: Building },
  { id: "mining", name: "Mining Engineering", icon: HardHat },
  { id: "metallurgy", name: "Metallurgy", icon: Flame },
];

const experimentsData = {
  mech: [
    {
      id: "heat-exchanger",
      title: "Parallel Flow Heat Exchanger",
      description: "Double-pipe setup. Compare NTU-Effectiveness results with Random Forest predictions.",
      link: "/experiment/heat-exchanger",
      status: "Active",
      icon: Activity,
    },
    {
      id: "tensile-test",
      title: "Tensile Stress Test",
      description: "Predict yield strength and failure points for Aluminum 6061 samples.",
      link: "#",
      status: "Locked",
      icon: Lock,
    },
    {
      id: "bernoulli",
      title: "Bernoulli's Theorem",
      description: "Fluid dynamics verification using variable cross-section venturi meters.",
      link: "#",
      status: "Locked",
      icon: Lock,
    },
    {
      id: "centrifugal-pump",
      title: "Centrifugal Pump",
      description: "Analyze characteristic curves: Head vs Discharge under variable RPM.",
      link: "#",
      status: "Locked",
      icon: Lock,
    },
  ],
  civil: [
    {
      id: "compressive-strength",
      title: "Concrete Compressive Strength",
      description: "Analyze the 28-day compressive strength of various concrete mix designs.",
      link: "#",
      status: "Locked",
      icon: Lock,
    },
  ],
  ceramic: [],
  elec: [],
  mining: [],
  metallurgy: [],
};

// --- EXPERIMENT CARD COMPONENT ---
const ExperimentCard = ({ title, description, link, status, icon: Icon }) => {
  const isActive = status === "Active";

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${
        isActive
          ? "border-slate-200 bg-white shadow-xl hover:shadow-[#0039A6]/15 hover:-translate-y-1 hover:border-[#0039A6]/50"
          : "border-slate-200 bg-slate-50 opacity-80"
      }`}
    >
      {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-[#0039A6]" />}
      <div className="absolute top-4 right-4">
        {isActive ? (
          <Badge className="bg-blue-50 text-[#0039A6] hover:bg-blue-100 border border-blue-200 shadow-none font-bold tracking-wider uppercase text-[10px]">
            Available
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-slate-400 border-slate-200 bg-white shadow-none font-bold tracking-wider uppercase text-[10px]"
          >
            Coming Soon
          </Badge>
        )}
      </div>

      <CardHeader>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            isActive ? "bg-[#0039A6]/10 text-[#0039A6]" : "bg-slate-200 text-slate-400"
          }`}
        >
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <CardTitle className="text-xl text-slate-900 font-extrabold">{title}</CardTitle>
        <CardDescription className="text-slate-500 font-light h-10 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter>
        {isActive ? (
          <Link to={link} className="w-full">
            <Button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold tracking-widest uppercase rounded-none group transition-all">
              Launch Simulator
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        ) : (
          <Button
            disabled
            variant="secondary"
            className="w-full bg-slate-100 text-slate-400 border-none rounded-none font-bold tracking-widest uppercase"
          >
            <Lock className="mr-2 h-4 w-4" /> Locked
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};


// --- MAIN DEPARTMENT VIEW PAGE ---
const DepartmentView = () => {
  // 1. Grab the department ID from the URL (e.g., "mech" from "/department/mech")
  const { deptId } = useParams();
  const navigate = useNavigate();

  // 2. Find the corresponding department data
  const currentDept = departments.find((d) => d.id === deptId);
  const deptExperiments = experimentsData[deptId] || [];

  // Fallback if someone types an invalid URL manually
  if (!currentDept) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 pt-32">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Department Not Found</h1>
        <Button onClick={() => navigate("/dashboard")} className="bg-[#0039A6] text-white">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const DeptIcon = currentDept.icon;

  return (
    // Clean, technical slate-50 background so the white experiment cards pop
    <div className="min-h-screen bg-slate-50 p-6 pt-32 font-sans">
      <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-sm font-bold text-[#0039A6] hover:text-[#002875] uppercase tracking-widest mb-10 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="mb-12 flex items-center gap-6 border-b-2 border-slate-200 pb-8">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg border-4 border-[#0039A6]/10 flex items-center justify-center text-[#0039A6]">
            <DeptIcon size={36} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
              {currentDept.name}
            </h1>
            <p className="text-slate-500 text-lg font-light mt-2">
              Select a module below to begin your Sim-to-Real comparison.
            </p>
          </div>
        </div>

        {/* Experiments Grid */}
        {deptExperiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {deptExperiments.map((exp) => (
              <ExperimentCard key={exp.id} {...exp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white border border-slate-200 shadow-sm rounded-xl">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Modules in Development</h3>
            <p className="text-slate-400 font-light max-w-md mx-auto">
              We are currently preparing the simulation and validation models for this department. Check back soon.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default DepartmentView;