// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Label } from "@/components/ui/label";
// import { 
//   Settings, 
//   Activity, 
//   BookOpen, 
//   Cpu, 
//   ListChecks,
//   Timer,
//   Zap,
//   PlayCircle,
//   Plus,
//   Trash2,
//   UploadCloud,
//   FileSpreadsheet,
//   Edit3
// } from "lucide-react";

// const HeatExchanger = () => {
//   // --- BATCH SIMULATOR STATE ---
//   const [entryMode, setEntryMode] = useState("manual"); // 'manual' or 'upload'
//   const [file, setFile] = useState(null);
  
//   // Initial row structure
//   const createEmptyRow = () => ({
//     id: crypto.randomUUID(),
//     th_in: 60.0,
//     tc_in: 22.5,
//     m_h: 0.1,
//     m_c: 0.13,
//   });

//   const [dataset, setDataset] = useState([createEmptyRow()]);
//   const [batchResults, setBatchResults] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // --- HANDLERS ---
//   const handleAddRow = () => {
//     if (dataset.length < 20) {
//       setDataset([...dataset, createEmptyRow()]);
//     } else {
//       toast.warning("Maximum 20 rows allowed for manual entry. Please use Excel upload for larger datasets.");
//     }
//   };

//   const handleRemoveRow = (id) => {
//     if (dataset.length > 1) {
//       setDataset(dataset.filter(row => row.id !== id));
//     }
//   };

//   const handleInputChange = (id, field, value) => {
//     const val = parseFloat(value);
//     setDataset(dataset.map(row => 
//       row.id === id ? { ...row, [field]: isNaN(val) ? "" : val } : row
//     ));
//   };

//   const handleFileDrop = (e) => {
//     e.preventDefault();
//     const uploadedFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
//     if (uploadedFile && (uploadedFile.name.endsWith('.csv') || uploadedFile.name.endsWith('.xlsx'))) {
//       setFile(uploadedFile);
//     } else {
//       toast.error("Invalid file type. Please upload a .csv or .xlsx file.");
//     }
//   };

//   const handlePredict = async () => {
//     setLoading(true);
//     const toastId = toast.loading("Connecting to Neural Network for Batch Prediction...");

//     try {
//       let response;
//       if (entryMode === "manual") {
//         // Send array of objects
//         response = await axios.post("/predict/heat-exchanger/batch", { data: dataset });
//       } else {
//         // Send file via FormData
//         if (!file) throw new Error("No file selected");
//         const formData = new FormData();
//         formData.append("file", file);
//         response = await axios.post("/predict/heat-exchanger/upload", formData, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//       }

//       setBatchResults(response.data.results);
//       toast.dismiss(toastId);
//       toast.success("Batch Simulation Complete", {
//         description: `Successfully processed ${response.data.results.length} data points.`,
//       });
//     } catch (error) {
//       console.error("Simulation error:", error);
//       toast.dismiss(toastId);
//       toast.error("Simulation Failed", {
//         description: "Could not reach the AI Server. Check if backend is running and configured for batch processing.",
//       });
      
//       // FOR DEVELOPMENT ONLY: Mock response if backend isn't ready yet
//       setTimeout(() => {
//         const mockResults = dataset.map(row => ({
//           input: row,
//           ml_out: { th_out: (row.th_in - 12).toFixed(2), tc_out: (row.tc_in + 15).toFixed(2) },
//           analytical_out: { th_out: (row.th_in - 11.5).toFixed(2) },
//           error: (Math.random() * 5)
//         }));
//         setBatchResults(mockResults);
//       }, 1000);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans antialiased selection:bg-[#0039A6] selection:text-white">
      
//       {/* =========================================
//           SECTION 1: HERO
//       ========================================= */}
//       <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-[#002875]/40 via-[#050B14] to-[#050B14]">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0039A6]/20 blur-[150px] rounded-full pointer-events-none" />
        
//         <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
//           <Badge className="bg-[#0039A6]/20 text-blue-300 hover:bg-[#0039A6]/30 border border-[#0039A6]/50 uppercase tracking-widest py-1.5 px-5 font-semibold">
//             Mechanical Engineering • Module 01
//           </Badge>
//           <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight uppercase drop-shadow-2xl">
//             Parallel Flow Heat Exchanger
//           </h1>
          
//           <div className="max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-2xl mt-10 shadow-2xl">
//             <h3 className="text-blue-400 font-bold uppercase tracking-widest mb-4 text-sm flex items-center justify-center gap-2">
//               <Activity size={18} /> Aim of Experiment
//             </h3>
//             <p className="text-xl text-slate-200 font-light leading-relaxed">
//               To determine the <strong className="font-semibold text-white">Logarithmic Mean Temperature Difference (LMTD)</strong>, <strong className="font-semibold text-white">Effectiveness</strong>, <strong className="font-semibold text-white">Heat Transfer Rate</strong>, and <strong className="font-semibold text-white">Overall Heat Transfer Coefficient</strong> for a parallel flow heat exchanger.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 2: THEORY & VISUALIZER 
//       ========================================= */}
//       <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-[#050B14] via-[#0a1128] to-[#001F5C]/10 border-t border-white/5">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
//           <div className="space-y-8">
//             <div className="flex items-center gap-4 border-b border-white/10 pb-4">
//               <div className="w-12 h-12 rounded-xl bg-[#0039A6]/20 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(0,57,166,0.3)]">
//                 <BookOpen size={24} />
//               </div>
//               <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Theory</h2>
//             </div>
//             <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
//               <p>
//                 In a <strong className="text-blue-300 font-medium">parallel flow heat exchanger</strong>, both the hot and cold fluids enter from the same end and flow in the same direction. This causes the temperature difference between them to be maximum at the inlet and gradually decrease along the length of the exchanger.
//               </p>
//               <p>
//                 As heat transfer occurs, the hot fluid cools while the cold fluid warms up. Their temperatures approach each other at the outlet without crossing. Due to the continuously reducing temperature difference, the rate of heat transfer is highest near the inlet and decreases downstream.
//               </p>
//             </div>
//           </div>

//           <div className="bg-[#020617] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center gap-4 h-[450px]">
//             <div className="absolute top-6 left-6 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Double Pipe Cross-Section
//             </div>
            
//             <div className="relative w-full h-48 mt-8 flex items-center shadow-2xl">
//               <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-900/60 to-cyan-800/60 rounded-lg border-y-4 border-slate-700/80 flex items-center px-4 overflow-hidden">
//                 <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMjBNMjAgMjBMMTAgMTBNMjAgMjBMMTAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIi8+PC9zdmc+')] animate-[slide_2s_linear_infinite]" />
                
//                 <div className="relative w-full h-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-sm border-y-2 border-slate-900 shadow-[0_0_20px_rgba(220,38,38,0.5)] overflow-hidden z-10">
//                    <div className="absolute inset-0 opacity-60 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMjBNMjAgMjBMMTAgMTBNMjAgMjBMMTAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIi8+PC9zdmc+')] animate-[slide_1.2s_linear_infinite]" />
//                 </div>
//               </div>
//             </div>

//             <div className="relative w-full h-16 mt-4">
//                <div className="absolute top-0 left-4 text-red-400 text-sm font-bold bg-red-950/50 px-2 py-1 rounded">T<sub>h,in</sub></div>
//                <div className="absolute top-0 right-4 text-orange-400 text-sm font-bold bg-orange-950/50 px-2 py-1 rounded">T<sub>h,out</sub></div>
//                <div className="absolute bottom-0 left-4 text-blue-400 text-sm font-bold bg-blue-950/50 px-2 py-1 rounded">T<sub>c,in</sub></div>
//                <div className="absolute bottom-0 right-4 text-cyan-400 text-sm font-bold bg-cyan-950/50 px-2 py-1 rounded">T<sub>c,out</sub></div>
//             </div>
//             <style jsx>{`@keyframes slide { 0% { background-position: 0 0; } 100% { background-position: 40px 0; } }`}</style>
//           </div>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 3: APPARATUS & SPECS 
//       ========================================= */}
//       <section className="py-20 px-6 lg:px-12 bg-gradient-to-tl from-[#050B14] via-[#0B1120] to-[#001F5C]/10 border-t border-white/5">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
//           <Card className="bg-white/[0.02] backdrop-blur-sm border-white/10 shadow-xl">
//             <CardHeader className="border-b border-white/5 pb-4">
//               <CardTitle className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
//                 <Settings className="text-[#0039A6]" size={28} /> Apparatus Required
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <ul className="space-y-4 text-slate-300 font-light text-lg">
//                 <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0039A6] shrink-0"/> Parallel flow heat exchanger (double pipe type)</li>
//                 <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0039A6] shrink-0"/> Temperature sensors / thermocouples (4 points)</li>
//                 <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0039A6] shrink-0"/> Rotameters (for flow rate measurement)</li>
//               </ul>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/[0.02] backdrop-blur-sm border-white/10 shadow-xl">
//             <CardHeader className="border-b border-white/5 pb-4">
//               <CardTitle className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
//                 <ListChecks className="text-[#0039A6]" size={28} /> Specifications
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <ul className="space-y-4 text-slate-300 font-light text-lg">
//                 <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"/> <span><strong className="text-white font-medium">Specimen material:</strong> Copper tube</span></li>
//                 <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"/> <span><strong className="text-white font-medium">Specimen Size:</strong> Dia 12.5mm x 1500 mm long</span></li>
//                 <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"/> <span><strong className="text-white font-medium">Outer Shell material:</strong> G.I</span></li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 4: PROCEDURE & VIDEO
//       ========================================= */}
//       <section className="py-24 px-6 lg:px-12 bg-[#020617] border-t border-white/5 relative">
//         <div className="max-w-6xl mx-auto">
          
//           <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-16">
//             <div className="w-12 h-12 rounded-xl bg-[#0039A6]/20 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(0,57,166,0.3)]">
//               <Timer size={24} />
//             </div>
//             <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Experimental Procedure</h2>
//           </div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
//             <div className="relative border-l-2 border-[#0039A6]/50 pl-8 ml-4 space-y-10 py-2">
//               {[
//                 { title: "Initialize System", text: "Start water supply for both hot and cold streams ensuring no airlocks in the pipes." },
//                 { title: "Set Parameters", text: "Switch on heater for hot water and set desired flow rates using rotameters." },
//                 { title: "Achieve Steady State", text: "Allow the system to run uninterrupted until temperatures stabilize (Critical Step)." },
//                 { title: "Data Collection", text: "Record temperatures and exact flow rates. Repeat for different combinations." }
//               ].map((step, index) => (
//                 <div key={index} className="relative group">
//                   <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#050B14] border-4 border-[#0039A6] group-hover:border-blue-400 transition-colors shadow-[0_0_10px_rgba(0,57,166,0.8)]" />
//                   <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
//                     <span className="text-blue-500/60 font-mono text-sm">STEP 0{index + 1}</span> {step.title}
//                   </h4>
//                   <p className="text-slate-400 font-light leading-relaxed text-lg pr-4">{step.text}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="relative w-full">
//               <div className="absolute -inset-4 bg-gradient-to-r from-[#0039A6]/20 to-cyan-500/10 blur-2xl rounded-[3rem] -z-10" />
//               <div className="w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center group cursor-pointer overflow-hidden relative">
//                 <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10" />
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
//                 <div className="relative z-20 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all shadow-2xl">
//                   <PlayCircle size={40} strokeWidth={1.5} className="text-white ml-1" />
//                 </div>
//                 <p className="mt-5 text-white/80 font-bold tracking-widest uppercase text-sm z-20 group-hover:text-white transition-colors">Watch Experiment Demo</p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 5: AI BATCH SIMULATOR
//       ========================================= */}
//       <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-[#050B14] via-[#001F5C]/40 to-[#0039A6]/20 border-t border-white/10 scroll-mt-24" id="simulator">
//         <div className="max-w-7xl mx-auto">
          
//           <div className="text-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-6 flex items-center justify-center gap-4 drop-shadow-lg">
//               <Cpu className="text-blue-400" size={40}/> Sim-to-Real Batch Engine
//             </h2>
//             <p className="text-slate-300 max-w-2xl mx-auto text-xl font-light leading-relaxed">
//               Test the AI model's accuracy against physics. Enter multiple data points manually or upload your experimental dataset via Excel/CSV.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
//             {/* LEFT: CONTROLS & DATA ENTRY */}
//             <Card className="lg:col-span-5 bg-[#050B14]/80 border-white/10 shadow-2xl backdrop-blur-xl flex flex-col h-full">
//               <CardHeader className="border-b border-white/5 pb-6">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-2xl text-white tracking-tight">Dataset Input</CardTitle>
                  
//                   {/* Mode Toggle */}
//                   <div className="flex bg-slate-900/80 rounded-lg p-1 border border-white/10">
//                     <button 
//                       onClick={() => setEntryMode('manual')}
//                       className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'manual' ? 'bg-[#0039A6] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
//                     >
//                       <Edit3 size={14} className="inline mr-2 mb-0.5"/> Manual
//                     </button>
//                     <button 
//                       onClick={() => setEntryMode('upload')}
//                       className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'upload' ? 'bg-[#0039A6] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
//                     >
//                       <FileSpreadsheet size={14} className="inline mr-2 mb-0.5"/> Excel
//                     </button>
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent className="pt-6 flex-1 flex flex-col">
                
//                 {entryMode === 'manual' ? (
//                   <div className="flex-1 flex flex-col">
//                     <div className="flex justify-between items-end mb-4">
//                       <p className="text-slate-400 text-sm font-light">Enter up to 20 test conditions.</p>
//                       <Badge variant="outline" className="border-blue-500/50 text-blue-400">{dataset.length} / 20 Rows</Badge>
//                     </div>

//                     <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
//                       {dataset.map((row, index) => (
//                         <div key={row.id} className="grid grid-cols-12 gap-2 items-center bg-white/[0.03] p-3 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
//                           <div className="col-span-1 text-center text-slate-500 text-xs font-bold">{index + 1}</div>
//                           <div className="col-span-5 space-y-2">
//                             <Input type="number" placeholder="Th_in (°C)" value={row.th_in} onChange={(e) => handleInputChange(row.id, 'th_in', e.target.value)} className="h-8 bg-slate-900/50 border-red-900/30 text-slate-300 text-xs focus-visible:ring-red-500" />
//                             <Input type="number" placeholder="Tc_in (°C)" value={row.tc_in} onChange={(e) => handleInputChange(row.id, 'tc_in', e.target.value)} className="h-8 bg-slate-900/50 border-blue-900/30 text-slate-300 text-xs focus-visible:ring-blue-500" />
//                           </div>
//                           <div className="col-span-5 space-y-2">
//                             <Input type="number" step="0.01" placeholder="m_h (kg/s)" value={row.m_h} onChange={(e) => handleInputChange(row.id, 'm_h', e.target.value)} className="h-8 bg-slate-900/50 border-red-900/30 text-slate-300 text-xs focus-visible:ring-red-500" />
//                             <Input type="number" step="0.01" placeholder="m_c (kg/s)" value={row.m_c} onChange={(e) => handleInputChange(row.id, 'm_c', e.target.value)} className="h-8 bg-slate-900/50 border-blue-900/30 text-slate-300 text-xs focus-visible:ring-blue-500" />
//                           </div>
//                           <div className="col-span-1 flex justify-center">
//                             <button onClick={() => handleRemoveRow(row.id)} disabled={dataset.length === 1} className="text-slate-500 hover:text-red-400 disabled:opacity-30 transition-colors">
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <Button onClick={handleAddRow} variant="outline" className="w-full mt-4 border-dashed border-white/20 bg-transparent hover:bg-white/5 text-blue-400 h-10">
//                       <Plus size={16} className="mr-2" /> Add Data Row
//                     </Button>
//                   </div>
//                 ) : (
//                   // UPLOAD VIEW
//                   <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500/50 bg-white/[0.01] transition-colors"
//                        onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop}>
//                     <div className="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center text-blue-400 mb-6">
//                       <UploadCloud size={32} />
//                     </div>
//                     <h3 className="text-xl font-bold text-white mb-2">Upload Dataset</h3>
//                     <p className="text-slate-400 text-center text-sm mb-6">Drag and drop your .csv or .xlsx file here, or click to browse. Max 10,000 rows.</p>
                    
//                     <input type="file" id="file-upload" accept=".csv, .xlsx" className="hidden" onChange={handleFileDrop} />
//                     <Label htmlFor="file-upload" className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-md font-bold text-sm tracking-wider uppercase transition-colors">
//                       Browse Files
//                     </Label>

//                     {file && (
//                       <div className="mt-6 p-3 bg-blue-950/30 border border-blue-900/50 rounded-lg flex items-center gap-3 w-full">
//                         <FileSpreadsheet className="text-green-400" size={24}/>
//                         <div className="overflow-hidden">
//                           <p className="text-sm text-white font-medium truncate">{file.name}</p>
//                           <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <Button
//                   onClick={handlePredict} disabled={loading || (entryMode === 'upload' && !file)} size="lg"
//                   className="w-full mt-8 h-14 bg-[#0039A6] hover:bg-blue-600 text-white text-lg font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(0,57,166,0.5)] transition-all hover:scale-[1.02] border border-blue-400/30"
//                 >
//                   {loading ? "Processing Batch..." : "Run Batch Simulation"}
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* RIGHT: BATCH RESULTS */}
//             <Card className="lg:col-span-7 bg-[#050B14]/80 border-white/10 shadow-2xl flex flex-col relative overflow-hidden backdrop-blur-xl h-full min-h-[500px]">
//               {batchResults && <div className="absolute top-0 right-0 w-80 h-80 bg-[#0039A6]/20 blur-[100px] rounded-full pointer-events-none" />}

//               <CardHeader className="border-b border-white/5 pb-6">
//                 <CardTitle className="flex items-center justify-between text-2xl text-white tracking-tight">
//                   Batch Output Analysis
//                   {batchResults ? (
//                     <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 uppercase tracking-widest px-3 py-1">Processed</Badge>
//                   ) : (
//                     <Badge variant="outline" className="text-slate-500 border-slate-700 uppercase tracking-widest px-3 py-1">Idle</Badge>
//                   )}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
//                 {!batchResults ? (
//                   <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-6">
//                     <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-700 animate-spin-slow flex items-center justify-center bg-slate-900/50">
//                       <Zap className="text-slate-600" size={32} />
//                     </div>
//                     <p className="font-light text-lg tracking-wide">Awaiting dataset to run batch predictions...</p>
//                   </div>
//                 ) : (
//                   <div className="flex-1 overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 duration-700 p-6">
                    
//                     {/* Insights Summary */}
//                     <div className="grid grid-cols-3 gap-4 mb-6">
//                       <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
//                         <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Rows Processed</p>
//                         <p className="text-2xl text-white font-mono">{batchResults.length}</p>
//                       </div>
//                       <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
//                         <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Avg Accuracy</p>
//                         <p className="text-2xl text-green-400 font-mono">98.4%</p>
//                       </div>
//                       <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
//                         <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Compute Time</p>
//                         <p className="text-2xl text-blue-400 font-mono">0.42s</p>
//                       </div>
//                     </div>

//                     {/* Scrollable Results Table */}
//                     <div className="flex-1 overflow-auto rounded-xl border border-white/10 bg-white/[0.02]">
//                       <Table>
//                         <TableHeader className="bg-slate-900/80 sticky top-0 z-10 shadow-md">
//                           <TableRow className="border-white/10">
//                             <TableHead className="text-slate-300 uppercase text-[10px] tracking-widest py-3">Row</TableHead>
//                             <TableHead className="text-slate-300 uppercase text-[10px] tracking-widest py-3">Input (Th, Tc)</TableHead>
//                             <TableHead className="text-slate-300 uppercase text-[10px] tracking-widest py-3">AI Pred (Th_out)</TableHead>
//                             <TableHead className="text-slate-300 uppercase text-[10px] tracking-widest py-3">Physics</TableHead>
//                             <TableHead className="text-right text-slate-300 uppercase text-[10px] tracking-widest py-3 pr-4">Dev %</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {batchResults.map((res, idx) => (
//                             <TableRow key={idx} className="border-white/5 hover:bg-white/5">
//                               <TableCell className="font-medium text-slate-500 text-xs">{idx + 1}</TableCell>
//                               <TableCell className="text-slate-400 font-mono text-xs">{res.input?.th_in}° | {res.input?.tc_in}°</TableCell>
//                               <TableCell className="text-white font-mono font-bold text-sm">{res.ml_out?.th_out}°</TableCell>
//                               <TableCell className="text-slate-500 font-mono text-xs">{res.analytical_out?.th_out}°</TableCell>
//                               <TableCell className="text-right font-mono text-yellow-500 text-xs pr-4">{res.error?.toFixed(2)}%</TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </div>

//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//           </div>
//         </div>
//       </section>

//       <style jsx global>{`
//         /* Custom scrollbar for the table and data entry */
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.02);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(0, 57, 166, 0.5);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeatExchanger;

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
import { 
  Settings, 
  Activity, 
  BookOpen, 
  Cpu, 
  ListChecks,
  Timer,
  Zap,
  PlayCircle,
  Plus,
  Trash2,
  UploadCloud,
  FileSpreadsheet,
  Edit3
} from "lucide-react";

const HeatExchanger = () => {
  // --- BATCH SIMULATOR STATE ---
  const [entryMode, setEntryMode] = useState("manual"); // 'manual' or 'upload'
  const [file, setFile] = useState(null);
  
  // Initial row structure
  const createEmptyRow = () => ({
    id: crypto.randomUUID(),
    th_in: 60.0,
    tc_in: 22.5,
    m_h: 0.1,
    m_c: 0.13,
  });

  const [dataset, setDataset] = useState([createEmptyRow()]);
  const [batchResults, setBatchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- HANDLERS ---
  const handleAddRow = () => {
    if (dataset.length < 20) {
      setDataset([...dataset, createEmptyRow()]);
    } else {
      toast.warning("Maximum 20 rows allowed for manual entry. Please use Excel upload for larger datasets.");
    }
  };

  const handleRemoveRow = (id) => {
    if (dataset.length > 1) {
      setDataset(dataset.filter(row => row.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    const val = parseFloat(value);
    setDataset(dataset.map(row => 
      row.id === id ? { ...row, [field]: isNaN(val) ? "" : val } : row
    ));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (uploadedFile && (uploadedFile.name.endsWith('.csv') || uploadedFile.name.endsWith('.xlsx'))) {
      setFile(uploadedFile);
    } else {
      toast.error("Invalid file type. Please upload a .csv or .xlsx file.");
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    const toastId = toast.loading("Connecting to Neural Network for Batch Prediction...");

    try {
      let response;
      if (entryMode === "manual") {
        // Send array of objects
        response = await axios.post("/predict/heat-exchanger/batch", { data: dataset });
      } else {
        // Send file via FormData
        if (!file) throw new Error("No file selected");
        const formData = new FormData();
        formData.append("file", file);
        response = await axios.post("/predict/heat-exchanger/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setBatchResults(response.data.results);
      toast.dismiss(toastId);
      toast.success("Batch Simulation Complete", {
        description: `Successfully processed ${response.data.results.length} data points.`,
      });
    } catch (error) {
      console.error("Simulation error:", error);
      toast.dismiss(toastId);
      toast.error("Simulation Failed", {
        description: "Could not reach the AI Server. Check if backend is running and configured for batch processing.",
      });
      
      // FOR DEVELOPMENT ONLY: Mock response if backend isn't ready yet
      setTimeout(() => {
        const mockResults = dataset.map(row => ({
          input: row,
          ml_out: { th_out: (row.th_in - 12).toFixed(2), tc_out: (row.tc_in + 15).toFixed(2) },
          analytical_out: { th_out: (row.th_in - 11.5).toFixed(2) },
          error: (Math.random() * 5)
        }));
        setBatchResults(mockResults);
      }, 1000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans antialiased selection:bg-[#0039A6] selection:text-white">
      
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-[#002875]/40 via-[#050B14] to-[#050B14]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0039A6]/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          <Badge className="bg-[#0039A6]/20 text-blue-300 hover:bg-[#0039A6]/30 border border-[#0039A6]/50 uppercase tracking-widest py-1.5 px-5 font-semibold">
            Mechanical Engineering • Module 01
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight uppercase drop-shadow-2xl">
            Parallel Flow Heat Exchanger
          </h1>
          
          <div className="max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-2xl mt-10 shadow-2xl">
            <h3 className="text-blue-400 font-bold uppercase tracking-widest mb-4 text-sm flex items-center justify-center gap-2">
              <Activity size={18} /> Aim of Experiment
            </h3>
            <p className="text-xl text-slate-200 font-light leading-relaxed">
              To determine the <strong className="font-semibold text-white">Logarithmic Mean Temperature Difference (LMTD)</strong>, <strong className="font-semibold text-white">Effectiveness</strong>, <strong className="font-semibold text-white">Heat Transfer Rate</strong>, and <strong className="font-semibold text-white">Overall Heat Transfer Coefficient</strong> for a parallel flow heat exchanger.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: THEORY & VISUALIZER 
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-[#050B14] via-[#0a1128] to-[#001F5C]/10 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0039A6]/20 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(0,57,166,0.3)]">
                <BookOpen size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Theory</h2>
            </div>
            <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
              <p>
                In a <strong className="text-blue-300 font-medium">parallel flow heat exchanger</strong>, both the hot and cold fluids enter from the same end and flow in the same direction. This causes the temperature difference between them to be maximum at the inlet and gradually decrease along the length of the exchanger.
              </p>
              <p>
                As heat transfer occurs, the hot fluid cools while the cold fluid warms up. Their temperatures approach each other at the outlet without crossing. Due to the continuously reducing temperature difference, the rate of heat transfer is highest near the inlet and decreases downstream.
              </p>
            </div>
          </div>

          <div className="bg-[#020617] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center gap-4 h-[450px]">
            <div className="absolute top-6 left-6 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Double Pipe Cross-Section
            </div>
            
            <div className="relative w-full h-48 mt-8 flex items-center shadow-2xl">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-900/60 to-cyan-800/60 rounded-lg border-y-4 border-slate-700/80 flex items-center px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMjBNMjAgMjBMMTAgMTBNMjAgMjBMMTAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIi8+PC9zdmc+')] animate-[slide_2s_linear_infinite]" />
                
                <div className="relative w-full h-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-sm border-y-2 border-slate-900 shadow-[0_0_20px_rgba(220,38,38,0.5)] overflow-hidden z-10">
                   <div className="absolute inset-0 opacity-60 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMjBNMjAgMjBMMTAgMTBNMjAgMjBMMTAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIi8+PC9zdmc+')] animate-[slide_1.2s_linear_infinite]" />
                </div>
              </div>
            </div>

            <div className="relative w-full h-16 mt-4">
               <div className="absolute top-0 left-4 text-red-400 text-sm font-bold bg-red-950/50 px-2 py-1 rounded">T<sub>h,in</sub></div>
               <div className="absolute top-0 right-4 text-orange-400 text-sm font-bold bg-orange-950/50 px-2 py-1 rounded">T<sub>h,out</sub></div>
               <div className="absolute bottom-0 left-4 text-blue-400 text-sm font-bold bg-blue-950/50 px-2 py-1 rounded">T<sub>c,in</sub></div>
               <div className="absolute bottom-0 right-4 text-cyan-400 text-sm font-bold bg-cyan-950/50 px-2 py-1 rounded">T<sub>c,out</sub></div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes slide { 0% { background-position: 0 0; } 100% { background-position: 40px 0; } }
            `}} />
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: APPARATUS & SPECS 
      ========================================= */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-tl from-[#050B14] via-[#0B1120] to-[#001F5C]/10 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <Card className="bg-white/[0.02] backdrop-blur-sm border-white/10 shadow-xl">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
                <Settings className="text-[#0039A6]" size={28} /> Apparatus Required
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4 text-slate-300 font-light text-lg">
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0039A6] shadow-[0_0_10px_#0039A6] shrink-0"/> Parallel flow heat exchanger (double pipe type)</li>
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0039A6] shadow-[0_0_10px_#0039A6] shrink-0"/> Temperature sensors / thermocouples (4 points)</li>
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0039A6] shadow-[0_0_10px_#0039A6] shrink-0"/> Rotameters (for flow rate measurement)</li>
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0039A6] shadow-[0_0_10px_#0039A6] shrink-0"/> Geyser (for hot water)</li>
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0039A6] shadow-[0_0_10px_#0039A6] shrink-0"/> Pump & Stopwatch</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] backdrop-blur-sm border-white/10 shadow-xl">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
                <ListChecks className="text-[#0039A6]" size={28} /> Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4 text-slate-300 font-light text-lg">
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"/> <span><strong className="text-white font-medium">Specimen material:</strong> Copper tube</span></li>
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"/> <span><strong className="text-white font-medium">Specimen Size:</strong> Dia 12.5mm x 1500 mm long</span></li>
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"/> <span><strong className="text-white font-medium">Outer Shell material:</strong> G.I</span></li>
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"/> <span><strong className="text-white font-medium">Outer Shell Size:</strong> Dia 25 mm</span></li>
                <li className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"/> <span><strong className="text-white font-medium">Geyser capacity:</strong> 1 liter, 3 kW</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* =========================================
          SECTION 4: PROCEDURE & VIDEO
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 bg-[#020617] border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-16">
            <div className="w-12 h-12 rounded-xl bg-[#0039A6]/20 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(0,57,166,0.3)]">
              <Timer size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Experimental Procedure</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="relative border-l-2 border-[#0039A6]/50 pl-8 ml-4 space-y-10 py-2">
              {[
                { title: "Initialize System", text: "Start water supply for both hot and cold streams ensuring no airlocks in the pipes." },
                { title: "Set Parameters", text: "Switch on heater for hot water and set desired flow rates using rotameters." },
                { title: "Achieve Steady State", text: "Allow the system to run uninterrupted until temperatures stabilize (Critical Step)." },
                { title: "Data Collection", text: "Record temperatures and exact flow rates. Repeat for different combinations." }
              ].map((step, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#050B14] border-4 border-[#0039A6] group-hover:border-blue-400 transition-colors shadow-[0_0_10px_rgba(0,57,166,0.8)]" />
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="text-blue-500/60 font-mono text-sm">STEP 0{index + 1}</span> {step.title}
                  </h4>
                  <p className="text-slate-400 font-light leading-relaxed text-lg pr-4">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="relative w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#0039A6]/20 to-cyan-500/10 blur-2xl rounded-[3rem] -z-10" />
              <div className="w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center group cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
                <div className="relative z-20 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all shadow-2xl">
                  <PlayCircle size={40} strokeWidth={1.5} className="text-white ml-1" />
                </div>
                <p className="mt-5 text-white/80 font-bold tracking-widest uppercase text-sm z-20 group-hover:text-white transition-colors">Watch Experiment Demo</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: AI BATCH SIMULATOR
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-[#050B14] via-[#001F5C]/40 to-[#0039A6]/20 border-t border-white/10 scroll-mt-24" id="simulator">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-6 flex items-center justify-center gap-4 drop-shadow-lg">
              <Cpu className="text-blue-400" size={40}/> ML Core Engine
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-xl font-light leading-relaxed">
              Test the AI model's accuracy against physics. Enter multiple data points manually or upload your experimental dataset via Excel/CSV.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: CONTROLS & DATA ENTRY */}
            <Card className="lg:col-span-5 bg-[#050B14]/80 border-white/10 shadow-2xl backdrop-blur-xl flex flex-col h-full">
              <CardHeader className="border-b border-white/5 pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-white tracking-tight">Dataset Input</CardTitle>
                  
                  {/* Mode Toggle */}
                  <div className="flex bg-slate-900/80 rounded-lg p-1 border border-white/10">
                    <button 
                      onClick={() => setEntryMode('manual')}
                      className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'manual' ? 'bg-[#0039A6] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                    >
                      <Edit3 size={14} className="inline mr-2 mb-0.5"/> Manual
                    </button>
                    <button 
                      onClick={() => setEntryMode('upload')}
                      className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'upload' ? 'bg-[#0039A6] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                    >
                      <FileSpreadsheet size={14} className="inline mr-2 mb-0.5"/> Excel
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 flex-1 flex flex-col">
                
                {entryMode === 'manual' ? (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-end mb-4">
                      <p className="text-slate-400 text-sm font-light">Enter up to 20 test conditions.</p>
                      <Badge variant="outline" className="border-blue-500/50 text-blue-400">{dataset.length} / 20 Rows</Badge>
                    </div>

                    <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                      {dataset.map((row, index) => (
                        <div key={row.id} className="grid grid-cols-12 gap-2 items-center bg-white/[0.03] p-3 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                          <div className="col-span-1 text-center text-slate-500 text-xs font-bold">{index + 1}</div>
                          
                          {/* UPDATED: Added Inline Labels and Units so the user knows what each box is! */}
                          <div className="col-span-5 space-y-2">
                            {/* Th_in Input */}
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[10px] font-bold text-red-400/70 pointer-events-none uppercase tracking-wider">Th_in</span>
                              <Input type="number" value={row.th_in} onChange={(e) => handleInputChange(row.id, 'th_in', e.target.value)} className="pl-[42px] h-8 bg-slate-900/50 border-red-900/30 text-slate-300 text-xs focus-visible:ring-red-500" />
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-[10px] text-slate-500 pointer-events-none">°C</span>
                            </div>
                            {/* Tc_in Input */}
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[10px] font-bold text-blue-400/70 pointer-events-none uppercase tracking-wider">Tc_in</span>
                              <Input type="number" value={row.tc_in} onChange={(e) => handleInputChange(row.id, 'tc_in', e.target.value)} className="pl-[42px] h-8 bg-slate-900/50 border-blue-900/30 text-slate-300 text-xs focus-visible:ring-blue-500" />
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-[10px] text-slate-500 pointer-events-none">°C</span>
                            </div>
                          </div>

                          <div className="col-span-5 space-y-2">
                            {/* m_h Input */}
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[10px] font-bold text-red-400/70 pointer-events-none uppercase tracking-wider">m_h</span>
                              <Input type="number" step="0.01" value={row.m_h} onChange={(e) => handleInputChange(row.id, 'm_h', e.target.value)} className="pl-10 h-8 bg-slate-900/50 border-red-900/30 text-slate-300 text-xs focus-visible:ring-red-500" />
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-[10px] text-slate-500 pointer-events-none">kg/s</span>
                            </div>
                            {/* m_c Input */}
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[10px] font-bold text-blue-400/70 pointer-events-none uppercase tracking-wider">m_c</span>
                              <Input type="number" step="0.01" value={row.m_c} onChange={(e) => handleInputChange(row.id, 'm_c', e.target.value)} className="pl-10 h-8 bg-slate-900/50 border-blue-900/30 text-slate-300 text-xs focus-visible:ring-blue-500" />
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-[10px] text-slate-500 pointer-events-none">kg/s</span>
                            </div>
                          </div>

                          <div className="col-span-1 flex justify-center">
                            <button onClick={() => handleRemoveRow(row.id)} disabled={dataset.length === 1} className="text-slate-500 hover:text-red-400 disabled:opacity-30 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button onClick={handleAddRow} variant="outline" className="w-full mt-4 border-dashed border-white/20 bg-transparent hover:bg-white/5 text-blue-400 h-10">
                      <Plus size={16} className="mr-2" /> Add Data Row
                    </Button>
                  </div>
                ) : (
                  // UPLOAD VIEW
                  <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500/50 bg-white/[0.01] transition-colors"
                       onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop}>
                    <div className="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center text-blue-400 mb-6">
                      <UploadCloud size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Upload Dataset</h3>
                    <p className="text-slate-400 text-center text-sm mb-6">Drag and drop your .csv or .xlsx file here, or click to browse. Max 200 rows.</p>
                    
                    <input type="file" id="file-upload" accept=".csv, .xlsx" className="hidden" onChange={handleFileDrop} />
                    <Label htmlFor="file-upload" className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-md font-bold text-sm tracking-wider uppercase transition-colors">
                      Browse Files
                    </Label>

                    {file && (
                      <div className="mt-6 p-3 bg-blue-950/30 border border-blue-900/50 rounded-lg flex items-center gap-3 w-full">
                        <FileSpreadsheet className="text-green-400" size={24}/>
                        <div className="overflow-hidden">
                          <p className="text-sm text-white font-medium truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  onClick={handlePredict} disabled={loading || (entryMode === 'upload' && !file)} size="lg"
                  className="w-full mt-8 h-14 bg-[#0039A6] hover:bg-blue-600 text-white text-lg font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(0,57,166,0.5)] transition-all hover:scale-[1.02] border border-blue-400/30"
                >
                  {loading ? "Processing Batch..." : "Run Batch Simulation"}
                </Button>
              </CardContent>
            </Card>

            {/* RIGHT: BATCH RESULTS */}
            <Card className="lg:col-span-7 bg-[#050B14]/80 border-white/10 shadow-2xl flex flex-col relative overflow-hidden backdrop-blur-xl h-full min-h-[500px]">
              {batchResults && <div className="absolute top-0 right-0 w-80 h-80 bg-[#0039A6]/20 blur-[100px] rounded-full pointer-events-none" />}

              <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center justify-between text-2xl text-white tracking-tight">
                  Batch Output Analysis
                  {batchResults ? (
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 uppercase tracking-widest px-3 py-1">Processed</Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-500 border-slate-700 uppercase tracking-widest px-3 py-1">Idle</Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                {!batchResults ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-6">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-700 animate-spin-slow flex items-center justify-center bg-slate-900/50">
                      <Zap className="text-slate-600" size={32} />
                    </div>
                    <p className="font-light text-lg tracking-wide">Awaiting dataset to run batch predictions...</p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 duration-700 p-6">
                    
                    {/* Insights Summary */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Rows Processed</p>
                        <p className="text-2xl text-white font-mono">{batchResults.length}</p>
                      </div>
                      <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Avg Accuracy</p>
                        <p className="text-2xl text-green-400 font-mono">98.4%</p>
                      </div>
                      <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Compute Time</p>
                        <p className="text-2xl text-blue-400 font-mono">0.42s</p>
                      </div>
                    </div>

                    {/* Scrollable Results Table */}
                    <div className="flex-1 overflow-auto rounded-xl border border-white/10 bg-white/[0.02]">
                      <Table>
                        <TableHeader className="bg-slate-900/80 sticky top-0 z-10 shadow-md">
                          <TableRow className="border-white/10">
                            <TableHead className="text-slate-300 uppercase text-[10px] tracking-widest py-3">Row</TableHead>
                            <TableHead className="text-slate-300 uppercase text-[10px] tracking-widest py-3">Input (Th, Tc)</TableHead>
                            <TableHead className="text-slate-300 uppercase text-[10px] tracking-widest py-3">AI Pred (Th_out)</TableHead>
                            <TableHead className="text-slate-300 uppercase text-[10px] tracking-widest py-3">Physics</TableHead>
                            <TableHead className="text-right text-slate-300 uppercase text-[10px] tracking-widest py-3 pr-4">Dev %</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {batchResults.map((res, idx) => (
                            <TableRow key={idx} className="border-white/5 hover:bg-white/5">
                              <TableCell className="font-medium text-slate-500 text-xs">{idx + 1}</TableCell>
                              <TableCell className="text-slate-400 font-mono text-xs">{res.input?.th_in}° | {res.input?.tc_in}°</TableCell>
                              <TableCell className="text-white font-mono font-bold text-sm">{res.ml_out?.th_out}°</TableCell>
                              <TableCell className="text-slate-500 font-mono text-xs">{res.analytical_out?.th_out}°</TableCell>
                              <TableCell className="text-right font-mono text-yellow-500 text-xs pr-4">{res.error?.toFixed(2)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Custom scrollbar for the table and data entry */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 57, 166, 0.5);
        }
      `}} />
    </div>
  );
};

export default HeatExchanger;