import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const HeatExchanger = () => {
  // 1. State for Inputs (Defaults set to Mean of your Dataset)
  const [inputs, setInputs] = useState({
    th_in: 60.0, // Mean from dataset
    tc_in: 22.5, // Mean from dataset
    m_h: 0.1, // Mean from dataset
    m_c: 0.13, // Mean from dataset
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. Handlers
  const handleSliderChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleInputChange = (e) => {
    const val = parseFloat(e.target.value);
    setInputs({ ...inputs, [e.target.name]: isNaN(val) ? 0 : val });
  };

  // 3. API Call
  const handlePredict = async () => {
    setLoading(true);
    const toastId = toast.loading("Connecting to Neural Network...");

    try {
      // Sending data to backend
      const response = await axios.post("/predict/heat-exchanger", inputs);

      setResult(response.data);

      toast.dismiss(toastId);
      toast.success("Simulation Complete", {
        description: `Model predicted with ${response.data.error.toFixed(2)}% deviation from physics.`,
      });
    } catch (error) {
      console.error("Simulation error:", error);
      toast.dismiss(toastId);
      toast.error("Simulation Failed", {
        description: "Could not reach the AI Server. Is the Backend running?",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 font-sans text-slate-100 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-10 text-center space-y-4">
        <Badge
          variant="outline"
          className="border-blue-500 text-blue-400 uppercase tracking-widest"
        >
          Experiment ID: HX-01
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
          Parallel Flow Heat Exchanger
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Calibrated on 20,000 data points. Adjust the mass flow rates and inlet
          temperatures to predict thermal performance.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Controls */}
        <Card className="bg-slate-900 border-slate-800 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Input Parameters</CardTitle>
            <CardDescription>
              Configure inlet conditions (Ranges constrained by dataset).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Hot Fluid Control */}
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <Label className="text-red-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Hot Inlet Temp (Th_in)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    name="th_in"
                    value={inputs.th_in}
                    onChange={handleInputChange}
                    className="w-20 h-8 bg-red-950/30 border-red-900/50 text-red-400 text-right font-mono"
                  />
                  <span className="text-red-400 font-bold">°C</span>
                </div>
              </div>
              <Slider
                value={[inputs.th_in]}
                min={40}
                max={80}
                step={0.5}
                onValueChange={(val) => handleSliderChange("th_in", val)}
                className="py-2"
              />

              {/* Hot Mass Flow */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-400 text-sm">
                    Hot Flow Rate (kg/s)
                  </Label>
                  <span className="font-mono text-xs text-slate-500">
                    {inputs.m_h.toFixed(3)} kg/s
                  </span>
                </div>
                <Slider
                  value={[inputs.m_h]}
                  min={0.01}
                  max={0.2}
                  step={0.005}
                  onValueChange={(val) => handleSliderChange("m_h", val)}
                  className="py-2"
                />
              </div>
            </div>

            <Separator className="bg-slate-800" />

            {/* Cold Fluid Control */}
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <Label className="text-blue-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Cold Inlet Temp (Tc_in)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    name="tc_in"
                    value={inputs.tc_in}
                    onChange={handleInputChange}
                    className="w-20 h-8 bg-blue-950/30 border-blue-900/50 text-blue-400 text-right font-mono"
                  />
                  <span className="text-blue-400 font-bold">°C</span>
                </div>
              </div>
              <Slider
                value={[inputs.tc_in]}
                min={15}
                max={30}
                step={0.5}
                onValueChange={(val) => handleSliderChange("tc_in", val)}
                className="py-2"
              />

              {/* Cold Mass Flow */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-400 text-sm">
                    Cold Flow Rate (kg/s)
                  </Label>
                  <span className="font-mono text-xs text-slate-500">
                    {inputs.m_c.toFixed(3)} kg/s
                  </span>
                </div>
                <Slider
                  value={[inputs.m_c]}
                  min={0.01}
                  max={0.25}
                  step={0.005}
                  onValueChange={(val) => handleSliderChange("m_c", val)}
                  className="py-2"
                />
              </div>
            </div>

            <Button
              onClick={handlePredict}
              disabled={loading}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-500 text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-[1.02]"
            >
              {loading ? "Processing Physics..." : "Run Simulation"}
            </Button>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: Results */}
        <Card className="bg-slate-900 border-slate-800 shadow-2xl flex flex-col relative overflow-hidden">
          {/* Subtle background glow for effect */}
          {result && (
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          )}

          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              Experimental Output
              {result ? (
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50">
                  Simulated
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-slate-500 border-slate-700"
                >
                  Idle
                </Badge>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 space-y-4 min-h-75">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 animate-spin-slow flex items-center justify-center">
                  <span className="text-2xl">⚛️</span>
                </div>
                <p>Waiting for simulation data...</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                {/* Big Number Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">
                      Hot Outlet (Th_out)
                    </p>
                    <p className="text-4xl font-mono text-red-400 font-bold">
                      {result.ml_out.th_out}°C
                    </p>
                  </div>
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">
                      Cold Outlet (Tc_out)
                    </p>
                    <p className="text-4xl font-mono text-blue-400 font-bold">
                      {result.ml_out.tc_out}°C
                    </p>
                  </div>
                </div>

                {/* Detailed Table */}
                <div className="rounded-xl border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-950">
                      <TableRow className="border-slate-800 hover:bg-slate-950">
                        <TableHead className="text-slate-400">
                          Parameter
                        </TableHead>
                        <TableHead className="text-right text-slate-400">
                          AI Model
                        </TableHead>
                        <TableHead className="text-right text-slate-400">
                          Physics Formula
                        </TableHead>
                        <TableHead className="text-right text-slate-400">
                          Dev
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-slate-800 hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-300">
                          Hot Temp Out
                        </TableCell>
                        <TableCell className="text-right font-mono text-white">
                          {result.ml_out.th_out}
                        </TableCell>
                        <TableCell className="text-right font-mono text-slate-500">
                          {result.analytical_out.th_out}
                        </TableCell>
                        <TableCell className="text-right font-mono text-yellow-500">
                          {result.error.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      {/* Add more rows here if backend sends more data */}
                    </TableBody>
                  </Table>
                </div>

                {/* Insight Box */}
                <div className="bg-yellow-900/10 border border-yellow-700/30 p-4 rounded-lg flex gap-3 items-start">
                  <span className="text-yellow-500 text-xl">💡</span>
                  <div>
                    <h4 className="text-yellow-500 font-bold text-sm">
                      Sim-to-Real Insight
                    </h4>
                    <p className="text-yellow-200/70 text-xs mt-1">
                      The AI prediction accounts for real-world factors (like
                      variable U and ambient loss) that the standard constant-U
                      NTU formula ignores.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeatExchanger;
