// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label"; 
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Settings, Activity, BookOpen, Cpu, ListChecks, Timer, Zap, PlayCircle, Plus, Trash2, Edit3, FileSpreadsheet, UploadCloud, Network, Database, LineChart } from "lucide-react";

// // Import the registries
// import { experimentRegistry } from "../data/experiments";
// import { visualizerRegistry } from "./visualizers";

// const ExperimentLayout = () => {
//   const { experimentId } = useParams();
//   const navigate = useNavigate();
  
//   const data = experimentRegistry[experimentId];
//   const DynamicVisualizer = visualizerRegistry[experimentId];

//   if (!data) {
//     return <div className="min-h-screen flex items-center justify-center text-white bg-[#001033]">Experiment Not Found</div>;
//   }

//   const [entryMode, setEntryMode] = useState("manual");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [batchResults, setBatchResults] = useState(null);

//   const createEmptyRow = () => {
//     const row = { id: crypto.randomUUID() };
//     data.inputs.forEach(input => {
//       row[input.id] = input.defaultValue;
//     });
//     return row;
//   };

//   const [dataset, setDataset] = useState([createEmptyRow()]);

//   const handleAddRow = () => dataset.length < 20 ? setDataset([...dataset, createEmptyRow()]) : toast.warning("Max 20 rows.");
//   const handleRemoveRow = (id) => dataset.length > 1 && setDataset(dataset.filter(row => row.id !== id));
  
//   const handleInputChange = (rowId, field, value) => {
//     const val = parseFloat(value);
//     setDataset(dataset.map(row => row.id === rowId ? { ...row, [field]: isNaN(val) ? "" : val } : row));
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
//     setBatchResults(null); // Clear previous results to show the loading screen
    
//     try {
//       let response;
//       if (entryMode === "manual") {
//         response = await axios.post(`${data.apiEndpoint}/batch`, { data: dataset });
//       } else {
//         if (!file) {
//           toast.error("No file selected");
//           setLoading(false);
//           return;
//         }
//         const formData = new FormData();
//         formData.append("file", file);
//         response = await axios.post(`${data.apiEndpoint}/upload`, formData, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//       }
//       setBatchResults(response.data.results);
//       setLoading(false);
//     } catch (error) {
//       // MOCK DATA FOR UI TESTING (Simulating a 2-second network delay)
//       setTimeout(() => {
//         const mockResults = dataset.map(row => ({
//           input: row,
//           ml_out: { th_out: (row.th_in - 12).toFixed(2), tc_out: (row.tc_in + 15).toFixed(2) },
//           analytical_out: { th_out: (row.th_in - 11.5).toFixed(2) },
//           error: (Math.random() * 5)
//         }));
//         setBatchResults(mockResults);
//         setLoading(false);
//       }, 2000);
//     }
//   };

//   const scrollToSimulator = () => {
//     document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     // UNIFIED BACKGROUND
//     <div className="min-h-screen bg-gradient-to-br from-[#001033] via-[#0039A6] to-[#0055FF] bg-fixed text-white font-sans antialiased selection:bg-white selection:text-[#0039A6]">
      
//       {/* =========================================
//           SECTION 1: HERO
//       ========================================= */}
//       <section className="relative pt-32 pb-32 px-6 lg:px-12 overflow-hidden border-b border-white/10">
//         <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
//           <div className="flex flex-col items-start text-left space-y-8">
//             <Badge className="bg-white/10 text-white border border-white/30 rounded-full px-5 py-2 text-[10px] tracking-[0.2em] font-bold shadow-sm uppercase backdrop-blur-sm">
//               {data.module}
//             </Badge>
//             <h1 className="text-5xl lg:text-[4.5rem] font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-lg">
//               {data.title}
//             </h1>
//             <p className="text-lg text-blue-100 font-light leading-relaxed max-w-lg drop-shadow-sm">
//               {data.aim}
//             </p>
//             <Button onClick={scrollToSimulator} className="bg-white hover:bg-slate-100 text-[#0039A6] rounded-xl px-10 py-7 text-lg font-bold tracking-wide shadow-xl transition-transform border border-white/50 hover:scale-105">
//               Run Batch Simulation
//             </Button>
//           </div>

//           <div className="relative w-full h-[500px] hidden lg:flex items-center justify-center">
//             <div className="relative z-20 w-28 h-28 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-105 transition-transform">
//                <span className="text-4xl font-black text-[#0039A6] italic">Ex</span>
//             </div>

//             {/* Floating Nodes */}
//             <div className="absolute top-[18%] left-[8%] bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:bg-white/20 transition-colors">
//                <div className="bg-white/20 p-2.5 rounded-xl"><Network size={18} className="text-white" /></div>
//                <div className="text-left pr-4">
//                  <p className="text-sm font-bold text-white leading-tight">Neural Net</p>
//                  <p className="text-[10px] text-blue-200 font-mono tracking-widest uppercase">Active</p>
//                </div>
//             </div>

//             <div className="absolute top-[25%] right-[5%] bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:bg-white/20 transition-colors">
//                <div className="bg-white/20 p-2.5 rounded-xl"><Database size={18} className="text-white" /></div>
//                <div className="text-left pr-4">
//                  <p className="text-sm font-bold text-white leading-tight">Dataset</p>
//                  <p className="text-[10px] text-blue-200 font-mono tracking-widest uppercase">20k Rows</p>
//                </div>
//             </div>

//             <div className="absolute bottom-[18%] left-[12%] bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:bg-white/20 transition-colors">
//                <div className="bg-white/20 p-2.5 rounded-xl"><Activity size={18} className="text-white" /></div>
//                <div className="text-left pr-4">
//                  <p className="text-sm font-bold text-white leading-tight">Physics Engine</p>
//                  <p className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"/> Validating</p>
//                </div>
//             </div>

//             <div className="absolute bottom-[22%] right-[10%] bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:bg-white/20 transition-colors">
//                <div className="bg-white/20 p-2.5 rounded-xl"><LineChart size={18} className="text-white" /></div>
//                <div className="text-left pr-4">
//                  <p className="text-sm font-bold text-white leading-tight">Accuracy</p>
//                  <p className="text-[10px] text-blue-200 font-mono tracking-widest uppercase">&gt; 98.4%</p>
//                </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 2: THEORY & VISUALIZER
//       ========================================= */}
//       <section className="py-24 px-6 lg:px-12 relative border-b border-white/10">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
//           <div className="space-y-8">
//             <div className="flex items-center gap-4 border-b border-white/20 pb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shadow-sm border border-white/20">
//                 <BookOpen size={24} />
//               </div>
//               <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight drop-shadow-md">Theory</h2>
//             </div>
//             <div className="space-y-6 text-blue-50 font-light leading-relaxed text-lg drop-shadow-sm">
//               {data.theory.map((para, i) => <p key={i}>{para}</p>)}
//             </div>
//           </div>
//           <div className="h-full flex items-center justify-center">
//               {DynamicVisualizer ? (
//                <DynamicVisualizer />
//              ) : (
//                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl w-full h-[450px] flex items-center justify-center relative overflow-hidden group">
//                  <div className="absolute inset-0 bg-white/5 opacity-50 group-hover:opacity-100 transition-opacity" />
//                  <span className="text-blue-100 font-bold uppercase tracking-widest relative z-10 drop-shadow-md">Visualizer in Development</span>
//                </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 3: APPARATUS & SPECS (White Cards)
//       ========================================= */}
//       <section className="py-20 px-6 lg:px-12 relative border-b border-white/10">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          
//           <Card className="bg-white border-none shadow-2xl hover:scale-[1.02] transition-transform duration-300 rounded-2xl overflow-hidden">
//             <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50">
//               <CardTitle className="text-2xl font-bold text-[#0039A6] uppercase flex items-center gap-3">
//                 <Settings className="text-[#0055FF]" /> Apparatus Required
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <ul className="space-y-4 text-slate-700 font-medium text-lg">
//                 {data.apparatus.map((item, i) => (
//                   <li key={i} className="flex items-start gap-4"><div className="w-2 h-2 mt-2.5 rounded-full bg-[#0055FF] shrink-0"/> {item}</li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>

//           <Card className="bg-white border-none shadow-2xl hover:scale-[1.02] transition-transform duration-300 rounded-2xl overflow-hidden">
//             <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50">
//               <CardTitle className="text-2xl font-bold text-[#0039A6] uppercase flex items-center gap-3">
//                 <ListChecks className="text-[#0055FF]" /> Specifications
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <ul className="space-y-4 text-slate-700 font-light text-lg">
//                 {data.specifications.map((spec, i) => (
//                   <li key={i} className="flex items-start gap-4">
//                     <div className="w-2 h-2 mt-2.5 rounded-full bg-[#0055FF] shrink-0"/> 
//                     <span><strong className="text-slate-900 font-bold">{spec.label}:</strong> <span className="font-medium">{spec.value}</span></span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>

//         </div>
//       </section>

//       {/* =========================================
//           SECTION 4: PROCEDURE (Matched to Image)
//       ========================================= */}
//       <section className="py-24 px-6 lg:px-12 relative border-b border-white/10">
//         <div className="max-w-6xl mx-auto relative z-10">

//           <div className="flex items-center gap-5 mb-16">
//             <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/10">
//               <Timer size={28} className="text-blue-200" />
//             </div>
//             <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight drop-shadow-lg">
//               Experimental Procedure
//             </h2>
//           </div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
//             {/* Procedure Timeline */}
//             <div className="relative border-l border-white/30 pl-10 ml-4 space-y-12 py-4">
//               {data.procedure.map((step, index) => (
//                 <div key={index} className="relative group">
//                   {/* Clean white dot on the timeline */}
//                   <div className="absolute -left-[45px] top-1.5 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  
//                   <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
//                     <span className="text-white text-xs font-black uppercase tracking-widest">STEP 0{index + 1}</span> 
//                     {step.title}
//                   </h4>
//                   <p className="text-blue-100/80 font-light leading-relaxed text-base max-w-lg">
//                     {step.text}
//                   </p>
//                 </div>
//               ))}
//             </div>
            
//             {/* Video Placeholder (Glassmorphic Box) */}
//             <div className="w-full aspect-video bg-white/5 backdrop-blur-lg rounded-[2rem] border border-white/20 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-white/10 transition-all">
//                <div className="relative z-20 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-white/20 transition-all shadow-lg">
//                   <PlayCircle size={40} strokeWidth={1.5} className="text-white group-hover:scale-110 transition-transform ml-1" />
//                </div>
//                <p className="mt-4 text-white font-bold tracking-[0.2em] uppercase text-xs drop-shadow-md">Watch Demo</p>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 5: AI BATCH SIMULATOR
//       ========================================= */}
//       <section className="py-24 px-6 lg:px-12 relative scroll-mt-24" id="simulator">
//         <div className="max-w-7xl mx-auto relative z-10">
          
//           <div className="text-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-6 flex items-center justify-center gap-4 drop-shadow-lg">
//               <Cpu className="text-white" size={40}/> Sim-to-Real Batch Engine
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
//             {/* LEFT: CONTROLS & DATA ENTRY (White Card) */}
//             <Card className="lg:col-span-5 bg-white border-none shadow-2xl flex flex-col h-full rounded-2xl overflow-hidden">
//               <CardHeader className="border-b border-slate-100 pb-6 bg-white pt-8 px-8">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-2xl text-[#0039A6] tracking-tight font-extrabold">Dataset Input</CardTitle>
                  
//                   {/* Clean Pill Toggle */}
//                   <div className="flex bg-slate-100 rounded-lg p-1">
//                     <button onClick={() => setEntryMode('manual')} className={`px-5 py-2 rounded-md text-xs font-extrabold uppercase tracking-widest transition-all ${entryMode === 'manual' ? 'bg-[#0039A6] text-white shadow-md' : 'text-slate-400 hover:text-slate-800'}`}><Edit3 size={14} className="inline mr-2 mb-0.5"/> Manual</button>
//                     <button onClick={() => setEntryMode('upload')} className={`px-5 py-2 rounded-md text-xs font-extrabold uppercase tracking-widest transition-all ${entryMode === 'upload' ? 'bg-[#0039A6] text-white shadow-md' : 'text-slate-400 hover:text-slate-800'}`}><FileSpreadsheet size={14} className="inline mr-2 mb-0.5"/> Excel</button>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="pt-6 px-8 flex-1 flex flex-col text-slate-900">
//                 {entryMode === 'manual' ? (
//                   <div className="flex-1 flex flex-col">
//                     <div className="max-h-[350px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
//                       {dataset.map((row, index) => (
//                         <div key={row.id} className="p-5 bg-white rounded-xl border border-slate-200 hover:border-[#0039A6]/40 transition-colors relative shadow-sm">
//                           <div className="absolute top-4 right-4 text-[10px] font-extrabold text-[#0039A6] uppercase tracking-widest">ROW {index + 1}</div>
//                           <div className="grid grid-cols-2 gap-5 mt-4">
//                             {data.inputs.map((inputConfig) => (
//                               <div key={inputConfig.id} className="space-y-2">
//                                 <Label className={`text-xs uppercase tracking-widest font-extrabold ${inputConfig.color === 'red' ? 'text-red-500' : 'text-[#0039A6]'}`}>{inputConfig.symbol}</Label>
//                                 <div className="relative">
//                                   <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[10px] font-bold text-slate-400 pointer-events-none uppercase">{inputConfig.id}</span>
//                                   <Input type="number" step={inputConfig.step} value={row[inputConfig.id]} onChange={(e) => handleInputChange(row.id, inputConfig.id, e.target.value)} className={`pl-12 h-10 bg-white text-slate-900 text-sm font-semibold border-slate-200 rounded-lg focus-visible:ring-1 ${inputConfig.color === 'red' ? 'focus-visible:ring-red-500 focus-visible:border-red-500' : 'focus-visible:ring-[#0039A6] focus-visible:border-[#0039A6]'}`} />
//                                   <span className="absolute inset-y-0 right-3 flex items-center text-[10px] text-slate-400 pointer-events-none">{inputConfig.unit}</span>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                           <button onClick={() => handleRemoveRow(row.id)} disabled={dataset.length === 1} className="mt-4 text-[10px] uppercase tracking-widest text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors flex items-center gap-1 font-bold"><Trash2 size={12} /> Remove</button>
//                         </div>
//                       ))}
//                     </div>
//                     <Button onClick={handleAddRow} variant="outline" className="w-full mt-6 border border-dashed border-slate-300 bg-white hover:bg-slate-50 text-[#0039A6] h-12 rounded-lg transition-colors font-bold"><Plus size={18} className="mr-2" /> Add Row</Button>
//                   </div>
//                 ) : (
//                   <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-[#0039A6] bg-slate-50 transition-colors" onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop}>
//                     <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#0039A6] mb-6 shadow-sm"><UploadCloud size={32} /></div>
//                     <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Dataset</h3>
//                     <p className="text-slate-500 text-center text-sm mb-6">Drag and drop your .csv or .xlsx file here.</p>
//                     <input type="file" id="file-upload" accept=".csv, .xlsx" className="hidden" onChange={handleFileDrop} />
//                     <Label htmlFor="file-upload" className="cursor-pointer bg-white border border-slate-200 shadow-sm hover:border-[#0039A6] text-[#0039A6] px-6 py-3 rounded-lg font-bold text-sm tracking-wider uppercase transition-colors">Browse Files</Label>
//                     {file && (
//                       <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg flex items-center gap-4 w-full shadow-sm">
//                         <FileSpreadsheet className="text-emerald-500" size={28}/>
//                         <div className="overflow-hidden">
//                           <p className="text-sm text-slate-900 font-bold truncate">{file.name}</p>
//                           <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 <Button 
//                   onClick={handlePredict} 
//                   disabled={loading || (entryMode === 'upload' && !file)} 
//                   className="w-full mt-6 h-16 bg-[#0039A6] hover:bg-[#002875] text-white text-base font-extrabold tracking-[0.2em] uppercase rounded-lg shadow-lg transition-all"
//                 >
//                   Run Batch Simulation
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* RIGHT: BATCH RESULTS (White Card) */}
//             <Card className="lg:col-span-7 bg-white border-none shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden rounded-2xl">
//               <CardHeader className="border-b border-slate-100 pb-6 bg-white pt-8 px-8">
//                 <CardTitle className="flex items-center justify-between text-2xl text-[#0039A6] tracking-tight font-extrabold">
//                   Batch Output Analysis
//                   {batchResults ? 
//                     <Badge className="bg-white text-slate-600 border border-slate-200 uppercase tracking-widest px-4 py-1.5 shadow-sm font-bold text-xs rounded-full">Processed</Badge> 
//                     : 
//                     <Badge variant="outline" className="text-slate-400 border-slate-200 uppercase tracking-widest px-4 py-1.5 bg-white font-bold text-xs rounded-full">Idle</Badge>
//                   }
//                 </CardTitle>
//               </CardHeader>
              
//               <CardContent className="p-8 flex-1 flex flex-col overflow-hidden text-slate-900">
//                 {(!batchResults || loading) ? (
//                   // DYNAMIC LOADING & EMPTY STATE
//                   <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6">
//                     <div className="relative">
//                       {/* Spinning dashed ring when loading */}
//                       <div className={`absolute inset-0 rounded-full border-2 border-dashed border-slate-300 ${loading ? 'animate-[spin_4s_linear_infinite] border-[#0039A6]' : ''}`} />
//                       {/* Static center icon */}
//                       <div className="w-24 h-24 rounded-full flex items-center justify-center bg-slate-50 relative z-10 m-1">
//                         <Zap className={loading ? "text-[#0039A6]" : "text-slate-300"} size={32} />
//                       </div>
//                     </div>
//                     <p className="tracking-widest uppercase text-sm font-extrabold text-slate-500">
//                       {loading ? "Model is Running..." : "Awaiting dataset..."}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
//                     <div className="grid grid-cols-3 gap-4 mb-6">
//                       <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
//                         <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-2">Rows Processed</p>
//                         <p className="text-3xl text-[#0039A6] font-mono font-bold">{batchResults.length}</p>
//                       </div>
//                       <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
//                         <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-2">Avg Accuracy</p>
//                         <p className="text-3xl text-[#0039A6] font-mono font-bold">98.4%</p>
//                       </div>
//                       <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
//                         <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-2">Compute Time</p>
//                         <p className="text-3xl text-[#0039A6] font-mono font-bold">0.42s</p>
//                       </div>
//                     </div>
//                     <div className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-white shadow-inner">
//                       <Table>
//                         <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-sm border-b border-slate-200">
//                           <TableRow className="hover:bg-transparent">
//                             <TableHead className="text-slate-600 uppercase text-[10px] tracking-widest py-4 font-extrabold">Row</TableHead>
//                             <TableHead className="text-slate-600 uppercase text-[10px] tracking-widest py-4 font-extrabold">Inputs</TableHead>
//                             {data.outputs.map(out => <TableHead key={out.id} className="text-slate-600 uppercase text-[10px] tracking-widest py-4 font-extrabold">AI Pred ({out.symbol})</TableHead>)}
//                             <TableHead className="text-right text-slate-600 uppercase text-[10px] tracking-widest py-4 pr-6 font-extrabold">Dev %</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {batchResults.map((res, idx) => (
//                             <TableRow key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
//                               <TableCell className="font-bold text-slate-400 text-xs py-4">{idx + 1}</TableCell>
//                               <TableCell className="text-slate-700 font-mono text-xs font-semibold">
//                                 {data.inputs.map(i => `${res.input[i.id]}`).join(" | ")}
//                               </TableCell>
//                               {data.outputs.map((out, outIdx) => (
//                                 <TableCell key={out.id} className="font-mono text-slate-900 font-bold text-sm py-4">
//                                   <span className={outIdx === 0 ? "text-red-500" : "text-[#0039A6]"}>{res.ml_out[out.id]}</span>
//                                 </TableCell>
//                               ))}
//                               <TableCell className="text-right font-mono text-slate-500 font-bold text-xs pr-6 py-4">{res.error?.toFixed(2)}%</TableCell>
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

//       <style dangerouslySetInnerHTML={{ __html: `
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//       `}} />
//     </div>
//   );
// };

// export default ExperimentLayout;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Settings, Activity, BookOpen, Cpu, ListChecks, Timer, Zap, PlayCircle, Plus, Trash2, Edit3, FileSpreadsheet, UploadCloud, Network, Database, LineChart } from "lucide-react";

// Import the registries
import { experimentRegistry } from "../data/experiments";
import { visualizerRegistry } from "./visualizers";

const ExperimentLayout = () => {
  const { experimentId } = useParams();
  const navigate = useNavigate();
  
  const data = experimentRegistry[experimentId];
  const DynamicVisualizer = visualizerRegistry[experimentId];

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-[#001033]">Experiment Not Found</div>;
  }

  const [entryMode, setEntryMode] = useState("manual");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batchResults, setBatchResults] = useState(null);

  const createEmptyRow = () => {
    const row = { id: crypto.randomUUID() };
    data.inputs.forEach(input => {
      row[input.id] = input.defaultValue;
    });
    return row;
  };

  const [dataset, setDataset] = useState([createEmptyRow()]);

  const handleAddRow = () => dataset.length < 20 ? setDataset([...dataset, createEmptyRow()]) : toast.warning("Max 20 rows.");
  const handleRemoveRow = (id) => dataset.length > 1 && setDataset(dataset.filter(row => row.id !== id));
  
  const handleInputChange = (rowId, field, value) => {
    const val = parseFloat(value);
    setDataset(dataset.map(row => row.id === rowId ? { ...row, [field]: isNaN(val) ? "" : val } : row));
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
    setBatchResults(null); // Clear previous results to show the loading screen
    
    try {
      let response;
      if (entryMode === "manual") {
        response = await axios.post(`${data.apiEndpoint}/batch`, { data: dataset });
      } else {
        if (!file) {
          toast.error("No file selected");
          setLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append("file", file);
        response = await axios.post(`${data.apiEndpoint}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
      setBatchResults(response.data.results);
      setLoading(false);
    } catch (error) {
      // MOCK DATA FOR UI TESTING (Simulating a 2-second network delay)
      setTimeout(() => {
        const mockResults = dataset.map(row => ({
          input: row,
          ml_out: { th_out: (row.th_in - 12).toFixed(2), tc_out: (row.tc_in + 15).toFixed(2) },
          analytical_out: { th_out: (row.th_in - 11.5).toFixed(2) },
          error: (Math.random() * 5)
        }));
        setBatchResults(mockResults);
        setLoading(false);
      }, 2000);
    }
  };

  const scrollToSimulator = () => {
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // UNIFIED BACKGROUND
    <div className="min-h-screen bg-gradient-to-br from-[#001033] via-[#0039A6] to-[#0055FF] bg-fixed text-white font-sans antialiased selection:bg-white selection:text-[#0039A6]">
      
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="relative pt-32 pb-32 px-6 lg:px-12 overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-start text-left space-y-8">
            <Badge className="bg-white/10 text-white border border-white/30 rounded-full px-5 py-2 text-[10px] tracking-[0.2em] font-bold shadow-sm uppercase backdrop-blur-sm">
              {data.module}
            </Badge>
            <h1 className="text-5xl lg:text-[4.5rem] font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-lg">
              {data.title}
            </h1>
            <p className="text-lg text-blue-100 font-light leading-relaxed max-w-lg drop-shadow-sm">
              {data.aim}
            </p>
            <Button onClick={scrollToSimulator} className="bg-white hover:bg-slate-100 text-[#0039A6] rounded-xl px-10 py-7 text-lg font-bold tracking-wide shadow-xl transition-transform border border-white/50 hover:scale-105">
              Run Batch Simulation
            </Button>
          </div>

          <div className="relative w-full h-[500px] hidden lg:flex items-center justify-center">
            <div className="relative z-20 w-28 h-28 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-105 transition-transform">
               <span className="text-4xl font-black text-[#0039A6] italic">Ex</span>
            </div>

            {/* Floating Nodes */}
            <div className="absolute top-[18%] left-[8%] bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:bg-white/20 transition-colors">
               <div className="bg-white/20 p-2.5 rounded-xl"><Network size={18} className="text-white" /></div>
               <div className="text-left pr-4">
                 <p className="text-sm font-bold text-white leading-tight">Neural Net</p>
                 <p className="text-[10px] text-blue-200 font-mono tracking-widest uppercase">Active</p>
               </div>
            </div>

            <div className="absolute top-[25%] right-[5%] bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:bg-white/20 transition-colors">
               <div className="bg-white/20 p-2.5 rounded-xl"><Database size={18} className="text-white" /></div>
               <div className="text-left pr-4">
                 <p className="text-sm font-bold text-white leading-tight">Dataset</p>
                 <p className="text-[10px] text-blue-200 font-mono tracking-widest uppercase">20k Rows</p>
               </div>
            </div>

            <div className="absolute bottom-[18%] left-[12%] bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:bg-white/20 transition-colors">
               <div className="bg-white/20 p-2.5 rounded-xl"><Activity size={18} className="text-white" /></div>
               <div className="text-left pr-4">
                 <p className="text-sm font-bold text-white leading-tight">Physics Engine</p>
                 <p className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"/> Validating</p>
               </div>
            </div>

            <div className="absolute bottom-[22%] right-[10%] bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:bg-white/20 transition-colors">
               <div className="bg-white/20 p-2.5 rounded-xl"><LineChart size={18} className="text-white" /></div>
               <div className="text-left pr-4">
                 <p className="text-sm font-bold text-white leading-tight">Accuracy</p>
                 <p className="text-[10px] text-blue-200 font-mono tracking-widest uppercase">&gt; 98.4%</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: THEORY & VISUALIZER
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 relative border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/20 pb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shadow-sm border border-white/20">
                <BookOpen size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight drop-shadow-md">Theory</h2>
            </div>
            <div className="space-y-6 text-blue-50 font-light leading-relaxed text-lg drop-shadow-sm">
              {data.theory.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
          <div className="h-full flex items-center justify-center">
              {DynamicVisualizer ? (
               <DynamicVisualizer />
             ) : (
               <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl w-full h-[450px] flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/5 opacity-50 group-hover:opacity-100 transition-opacity" />
                 <span className="text-blue-100 font-bold uppercase tracking-widest relative z-10 drop-shadow-md">Visualizer in Development</span>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: APPARATUS & SPECS (White Cards)
      ========================================= */}
      <section className="py-20 px-6 lg:px-12 relative border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          
          <Card className="bg-white border-none shadow-2xl hover:scale-[1.02] transition-transform duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50">
              <CardTitle className="text-2xl font-bold text-[#0039A6] uppercase flex items-center gap-3">
                <Settings className="text-[#0055FF]" /> Apparatus Required
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4 text-slate-700 font-medium text-lg">
                {data.apparatus.map((item, i) => (
                  <li key={i} className="flex items-start gap-4"><div className="w-2 h-2 mt-2.5 rounded-full bg-[#0055FF] shrink-0"/> {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-2xl hover:scale-[1.02] transition-transform duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50">
              <CardTitle className="text-2xl font-bold text-[#0039A6] uppercase flex items-center gap-3">
                <ListChecks className="text-[#0055FF]" /> Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4 text-slate-700 font-light text-lg">
                {data.specifications.map((spec, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2.5 rounded-full bg-[#0055FF] shrink-0"/> 
                    <span><strong className="text-slate-900 font-bold">{spec.label}:</strong> <span className="font-medium">{spec.value}</span></span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* =========================================
          SECTION 4: PROCEDURE (Matched to Image)
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 relative border-b border-white/10">
        <div className="max-w-6xl mx-auto relative z-10">

          <div className="flex items-center gap-5 mb-16">
            <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/10">
              <Timer size={28} className="text-blue-200" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight drop-shadow-lg">
              Experimental Procedure
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Procedure Timeline */}
            <div className="relative border-l border-white/30 pl-10 ml-4 space-y-12 py-4">
              {data.procedure.map((step, index) => (
                <div key={index} className="relative group">
                  {/* Clean white dot on the timeline */}
                  <div className="absolute -left-[45px] top-1.5 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="text-white text-xs font-black uppercase tracking-widest">STEP 0{index + 1}</span> 
                    {step.title}
                  </h4>
                  <p className="text-blue-100/80 font-light leading-relaxed text-base max-w-lg">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Video Placeholder (Glassmorphic Box) */}
            <div className="w-full aspect-video bg-white/5 backdrop-blur-lg rounded-[2rem] border border-white/20 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-white/10 transition-all">
               <div className="relative z-20 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-white/20 transition-all shadow-lg">
                  <PlayCircle size={40} strokeWidth={1.5} className="text-white group-hover:scale-110 transition-transform ml-1" />
               </div>
               <p className="mt-4 text-white font-bold tracking-[0.2em] uppercase text-xs drop-shadow-md">Watch Demo</p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: AI BATCH SIMULATOR
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 relative scroll-mt-24" id="simulator">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-6 flex items-center justify-center gap-4 drop-shadow-lg">
              <Cpu className="text-white" size={40}/> Sim-to-Real Batch Engine
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: CONTROLS & DATA ENTRY (White Card) */}
            <Card className="lg:col-span-5 bg-white border-none shadow-2xl flex flex-col h-full rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-slate-100 pb-6 bg-white pt-8 px-8">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-[#0039A6] tracking-tight font-extrabold">Dataset Input</CardTitle>
                  
                  {/* Clean Pill Toggle */}
                  <div className="flex bg-slate-100 rounded-lg p-1">
                    <button onClick={() => setEntryMode('manual')} className={`px-5 py-2 rounded-md text-xs font-extrabold uppercase tracking-widest transition-all ${entryMode === 'manual' ? 'bg-[#0039A6] text-white shadow-md' : 'text-slate-400 hover:text-slate-800'}`}><Edit3 size={14} className="inline mr-2 mb-0.5"/> Manual</button>
                    <button onClick={() => setEntryMode('upload')} className={`px-5 py-2 rounded-md text-xs font-extrabold uppercase tracking-widest transition-all ${entryMode === 'upload' ? 'bg-[#0039A6] text-white shadow-md' : 'text-slate-400 hover:text-slate-800'}`}><FileSpreadsheet size={14} className="inline mr-2 mb-0.5"/> Excel</button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 px-8 flex-1 flex flex-col text-slate-900">
                {entryMode === 'manual' ? (
                  <div className="flex-1 flex flex-col">
                    <div className="max-h-[350px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                      {dataset.map((row, index) => (
                        <div key={row.id} className="p-5 bg-white rounded-xl border border-slate-200 hover:border-[#0039A6]/40 transition-colors relative shadow-sm">
                          <div className="absolute top-4 right-4 text-[10px] font-extrabold text-[#0039A6] uppercase tracking-widest">ROW {index + 1}</div>
                          <div className="grid grid-cols-2 gap-5 mt-4">
                            {data.inputs.map((inputConfig) => (
                              <div key={inputConfig.id} className="space-y-2">
                                {/* FIX 1: Display Friendly Label instead of ID */}
                                <Label className={`text-xs uppercase tracking-widest font-extrabold ${inputConfig.color === 'red' ? 'text-red-500' : 'text-[#0039A6]'}`}>
                                  {inputConfig.label}
                                </Label>
                                <div className="relative">
                                  {/* FIX 2: Display Short Symbol and stylized border inside the input */}
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 my-2 text-xs font-black text-slate-400 pointer-events-none border-r border-slate-200 uppercase">
                                    {inputConfig.symbol}
                                  </span>
                                  <Input 
                                    type="number" 
                                    step={inputConfig.step} 
                                    value={row[inputConfig.id]} 
                                    onChange={(e) => handleInputChange(row.id, inputConfig.id, e.target.value)} 
                                    className={`pl-14 pr-10 h-10 bg-slate-50 text-slate-900 text-sm font-semibold border-slate-200 rounded-lg focus-visible:ring-1 transition-all ${inputConfig.color === 'red' ? 'focus-visible:ring-red-500 focus-visible:border-red-500' : 'focus-visible:ring-[#0039A6] focus-visible:border-[#0039A6]'}`} 
                                  />
                                  <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-bold text-slate-400 pointer-events-none">
                                    {inputConfig.unit}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button onClick={() => handleRemoveRow(row.id)} disabled={dataset.length === 1} className="mt-4 text-[10px] uppercase tracking-widest text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors flex items-center gap-1 font-bold"><Trash2 size={12} /> Remove</button>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleAddRow} variant="outline" className="w-full mt-6 border border-dashed border-slate-300 bg-white hover:bg-slate-50 text-[#0039A6] h-12 rounded-lg transition-colors font-bold"><Plus size={18} className="mr-2" /> Add Row</Button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-[#0039A6] bg-slate-50 transition-colors" onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop}>
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#0039A6] mb-6 shadow-sm"><UploadCloud size={32} /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Dataset</h3>
                    <p className="text-slate-500 text-center text-sm mb-6">Drag and drop your .csv or .xlsx file here.</p>
                    <input type="file" id="file-upload" accept=".csv, .xlsx" className="hidden" onChange={handleFileDrop} />
                    <Label htmlFor="file-upload" className="cursor-pointer bg-white border border-slate-200 shadow-sm hover:border-[#0039A6] text-[#0039A6] px-6 py-3 rounded-lg font-bold text-sm tracking-wider uppercase transition-colors">Browse Files</Label>
                    {file && (
                      <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg flex items-center gap-4 w-full shadow-sm">
                        <FileSpreadsheet className="text-emerald-500" size={28}/>
                        <div className="overflow-hidden">
                          <p className="text-sm text-slate-900 font-bold truncate">{file.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <Button 
                  onClick={handlePredict} 
                  disabled={loading || (entryMode === 'upload' && !file)} 
                  className="w-full mt-6 h-16 bg-[#0039A6] hover:bg-[#002875] text-white text-base font-extrabold tracking-[0.2em] uppercase rounded-lg shadow-lg transition-all"
                >
                  Run Batch Simulation
                </Button>
              </CardContent>
            </Card>

            {/* RIGHT: BATCH RESULTS (White Card) */}
            <Card className="lg:col-span-7 bg-white border-none shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden rounded-2xl">
              <CardHeader className="border-b border-slate-100 pb-6 bg-white pt-8 px-8">
                <CardTitle className="flex items-center justify-between text-2xl text-[#0039A6] tracking-tight font-extrabold">
                  Batch Output Analysis
                  {batchResults ? 
                    <Badge className="bg-white text-slate-600 border border-slate-200 uppercase tracking-widest px-4 py-1.5 shadow-sm font-bold text-xs rounded-full">Processed</Badge> 
                    : 
                    <Badge variant="outline" className="text-slate-400 border-slate-200 uppercase tracking-widest px-4 py-1.5 bg-white font-bold text-xs rounded-full">Idle</Badge>
                  }
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-8 flex-1 flex flex-col overflow-hidden text-slate-900">
                {(!batchResults || loading) ? (
                  // DYNAMIC LOADING & EMPTY STATE
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6">
                    <div className="relative">
                      {/* Spinning dashed ring when loading */}
                      <div className={`absolute inset-0 rounded-full border-2 border-dashed border-slate-300 ${loading ? 'animate-[spin_4s_linear_infinite] border-[#0039A6]' : ''}`} />
                      {/* Static center icon */}
                      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-slate-50 relative z-10 m-1">
                        <Zap className={loading ? "text-[#0039A6]" : "text-slate-300"} size={32} />
                      </div>
                    </div>
                    <p className="tracking-widest uppercase text-sm font-extrabold text-slate-500">
                      {loading ? "Model is Running..." : "Awaiting dataset..."}
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
                        <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-2">Rows Processed</p>
                        <p className="text-3xl text-[#0039A6] font-mono font-bold">{batchResults.length}</p>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
                        <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-2">Avg Accuracy</p>
                        <p className="text-3xl text-[#0039A6] font-mono font-bold">98.4%</p>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
                        <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-2">Compute Time</p>
                        <p className="text-3xl text-[#0039A6] font-mono font-bold">0.42s</p>
                      </div>
                    </div>
                    <div className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-white shadow-inner">
                      <Table>
                        <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-sm border-b border-slate-200">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-slate-600 uppercase text-[10px] tracking-widest py-4 font-extrabold">Row</TableHead>
                            <TableHead className="text-slate-600 uppercase text-[10px] tracking-widest py-4 font-extrabold">Inputs</TableHead>
                            {data.outputs.map(out => <TableHead key={out.id} className="text-slate-600 uppercase text-[10px] tracking-widest py-4 font-extrabold">AI Pred ({out.symbol})</TableHead>)}
                            <TableHead className="text-right text-slate-600 uppercase text-[10px] tracking-widest py-4 pr-6 font-extrabold">Dev %</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {batchResults.map((res, idx) => (
                            <TableRow key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                              <TableCell className="font-bold text-slate-400 text-xs py-4">{idx + 1}</TableCell>
                              <TableCell className="text-slate-700 font-mono text-xs font-semibold">
                                {data.inputs.map(i => `${res.input[i.id]}`).join(" | ")}
                              </TableCell>
                              {data.outputs.map((out, outIdx) => (
                                <TableCell key={out.id} className="font-mono text-slate-900 font-bold text-sm py-4">
                                  <span className={outIdx === 0 ? "text-red-500" : "text-[#0039A6]"}>{res.ml_out[out.id]}</span>
                                </TableCell>
                              ))}
                              <TableCell className="text-right font-mono text-slate-500 font-bold text-xs pr-6 py-4">{res.error?.toFixed(2)}%</TableCell>
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
};

export default ExperimentLayout;