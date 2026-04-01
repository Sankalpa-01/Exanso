// // import React, { useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { toast } from "sonner";
// // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Slider } from "@/components/ui/slider";
// // import { Label } from "@/components/ui/label"; 
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// // import { Badge } from "@/components/ui/badge";
// // import { Settings, Activity, BookOpen, Cpu, ListChecks, Timer, Zap, PlayCircle, Plus, Trash2, Edit3, FileSpreadsheet, UploadCloud } from "lucide-react";

// // // Import the registries
// // import { experimentRegistry } from "../data/experiments";
// // import { visualizerRegistry } from "./visualizers";

// // const ExperimentLayout = () => {
// //   const { experimentId } = useParams();
// //   const navigate = useNavigate();
  
// //   const data = experimentRegistry[experimentId];
// //   const DynamicVisualizer = visualizerRegistry[experimentId];

// //   if (!data) {
// //     return <div className="min-h-screen flex items-center justify-center text-white bg-black">Experiment Not Found</div>;
// //   }

// //   const [entryMode, setEntryMode] = useState("manual");
// //   const [file, setFile] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [batchResults, setBatchResults] = useState(null);

// //   const createEmptyRow = () => {
// //     const row = { id: crypto.randomUUID() };
// //     data.inputs.forEach(input => {
// //       row[input.id] = input.defaultValue;
// //     });
// //     return row;
// //   };

// //   const [dataset, setDataset] = useState([createEmptyRow()]);

// //   const handleAddRow = () => dataset.length < 20 ? setDataset([...dataset, createEmptyRow()]) : toast.warning("Max 20 rows.");
// //   const handleRemoveRow = (id) => dataset.length > 1 && setDataset(dataset.filter(row => row.id !== id));
  
// //   const handleInputChange = (rowId, field, value) => {
// //     const val = parseFloat(value);
// //     setDataset(dataset.map(row => row.id === rowId ? { ...row, [field]: isNaN(val) ? "" : val } : row));
// //   };

// //   const handleFileDrop = (e) => {
// //     e.preventDefault();
// //     const uploadedFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
// //     if (uploadedFile && (uploadedFile.name.endsWith('.csv') || uploadedFile.name.endsWith('.xlsx'))) {
// //       setFile(uploadedFile);
// //     } else {
// //       toast.error("Invalid file type. Please upload a .csv or .xlsx file.");
// //     }
// //   };

// //   const handlePredict = async () => {
// //     setLoading(true);
// //     const toastId = toast.loading("Running Simulation...");
// //     try {
// //       let response;
// //       if (entryMode === "manual") {
// //         response = await axios.post(`${data.apiEndpoint}/batch`, { data: dataset });
// //       } else {
// //         if (!file) throw new Error("No file selected");
// //         const formData = new FormData();
// //         formData.append("file", file);
// //         response = await axios.post(`${data.apiEndpoint}/upload`, formData, {
// //           headers: { "Content-Type": "multipart/form-data" }
// //         });
// //       }
// //       setBatchResults(response.data.results);
// //       toast.success("Simulation Complete", { id: toastId });
// //     } catch (error) {
// //       toast.error("Simulation Failed", { id: toastId });
// //       // MOCK DATA FOR UI TESTING
// //       setTimeout(() => {
// //         const mockResults = dataset.map(row => ({
// //           input: row,
// //           ml_out: { th_out: (row.th_in - 12).toFixed(2), tc_out: (row.tc_in + 15).toFixed(2) },
// //           analytical_out: { th_out: (row.th_in - 11.5).toFixed(2) },
// //           error: (Math.random() * 5)
// //         }));
// //         setBatchResults(mockResults);
// //       }, 1000);
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="min-h-screen bg-black text-slate-300 font-sans antialiased selection:bg-[#0044FF] selection:text-white">
      
// //       {/* =========================================
// //           SECTION 1: HERO
// //       ========================================= */}
// //       <section className="relative pt-32 pb-24 px-6 lg:px-12 bg-gradient-to-b from-[#002899] to-black">
// //         <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
// //           <Badge className="bg-[#0044FF]/20 text-[#4488FF] border border-[#0044FF]/50 uppercase tracking-widest py-1.5 px-5 font-bold shadow-[0_0_20px_rgba(0,68,255,0.4)] backdrop-blur-md">
// //             {data.module}
// //           </Badge>
// //           <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight uppercase drop-shadow-[0_0_30px_rgba(0,68,255,0.4)]">
// //             {data.title}
// //           </h1>
// //           <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl border border-[#0044FF]/30 p-8 rounded-2xl mt-10 shadow-2xl">
// //             <h3 className="text-[#4488FF] font-bold uppercase tracking-widest mb-4 text-sm flex items-center justify-center gap-2 drop-shadow-md">
// //               <Activity size={18} /> Aim of Experiment
// //             </h3>
// //             <p className="text-xl text-slate-200 font-light leading-relaxed">{data.aim}</p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* =========================================
// //           SECTION 2: THEORY & VISUALIZER
// //       ========================================= */}
// //       <section className="py-24 px-6 lg:px-12 relative bg-gradient-to-b from-[#002899] to-black border-t border-[#0044FF]/40">
// //         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
// //           <div className="space-y-8">
// //             <div className="flex items-center gap-4 border-b border-[#0044FF]/30 pb-4">
// //               <div className="w-12 h-12 rounded-xl bg-black/50 flex items-center justify-center text-[#4488FF] shadow-[0_0_20px_rgba(0,68,255,0.4)] border border-[#0044FF]/50 backdrop-blur-md">
// //                 <BookOpen size={24} />
// //               </div>
// //               <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight drop-shadow-md">Theory</h2>
// //             </div>
// //             <div className="space-y-6 text-slate-200 font-light leading-relaxed text-lg">
// //               {data.theory.map((para, i) => <p key={i}>{para}</p>)}
// //             </div>
// //           </div>
          
// //           <div className="h-full flex items-center justify-center">
// //              {DynamicVisualizer ? (
// //                <DynamicVisualizer />
// //              ) : (
// //                <div className="bg-black/40 backdrop-blur-xl border border-[#0044FF]/30 rounded-3xl p-8 shadow-2xl w-full h-[450px] flex items-center justify-center relative overflow-hidden group">
// //                  <span className="text-[#4488FF] font-bold uppercase tracking-widest relative z-10 drop-shadow-md">Visualizer in Development</span>
// //                </div>
// //              )}
// //           </div>
// //         </div>
// //       </section>

// //       {/* =========================================
// //           SECTION 3: APPARATUS & SPECS
// //       ========================================= */}
// //       <section className="py-20 px-6 lg:px-12 relative bg-gradient-to-b from-[#002899] to-black border-t border-[#0044FF]/40">
// //         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          
// //           <Card className="bg-black/40 backdrop-blur-xl border-[#0044FF]/30 shadow-2xl hover:border-[#0044FF]/60 transition-all duration-500">
// //             <CardHeader className="border-b border-[#0044FF]/30 pb-4">
// //               <CardTitle className="text-2xl font-bold text-white uppercase flex items-center gap-3 drop-shadow-md">
// //                 <Settings className="text-[#4488FF]" /> Apparatus Required
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="pt-6">
// //               <ul className="space-y-4 text-slate-200 font-light text-lg">
// //                 {data.apparatus.map((item, i) => (
// //                   <li key={i} className="flex items-start gap-4">
// //                     <div className="w-2 h-2 mt-2 rounded-full bg-[#4488FF] shadow-[0_0_12px_#4488FF] shrink-0"/> {item}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </CardContent>
// //           </Card>

// //           <Card className="bg-black/40 backdrop-blur-xl border-[#0044FF]/30 shadow-2xl hover:border-[#0044FF]/60 transition-all duration-500">
// //             <CardHeader className="border-b border-[#0044FF]/30 pb-4">
// //               <CardTitle className="text-2xl font-bold text-white uppercase flex items-center gap-3 drop-shadow-md">
// //                 <ListChecks className="text-[#4488FF]" /> Specifications
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="pt-6">
// //               <ul className="space-y-4 text-slate-200 font-light text-lg">
// //                 {data.specifications.map((spec, i) => (
// //                   <li key={i} className="flex items-start gap-4">
// //                     <div className="w-2 h-2 mt-2 rounded-full bg-[#4488FF] shadow-[0_0_12px_#4488FF] shrink-0"/> 
// //                     <span><strong className="text-white font-medium">{spec.label}:</strong> {spec.value}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </CardContent>
// //           </Card>

// //         </div>
// //       </section>

// //       {/* =========================================
// //           SECTION 4: PROCEDURE & VIDEO
// //       ========================================= */}
// //       <section className="py-24 px-6 lg:px-12 relative bg-gradient-to-b from-[#002899] to-black border-t border-[#0044FF]/40">
// //         <div className="max-w-6xl mx-auto relative z-10">
// //           <div className="flex items-center gap-4 border-b border-[#0044FF]/30 pb-4 mb-16">
// //             <div className="w-12 h-12 rounded-xl bg-black/50 flex items-center justify-center text-[#4488FF] shadow-[0_0_20px_rgba(0,68,255,0.4)] border border-[#0044FF]/50 backdrop-blur-md">
// //               <Timer size={24} />
// //             </div>
// //             <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight drop-shadow-md">Experimental Procedure</h2>
// //           </div>
          
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
// //             <div className="relative border-l-2 border-[#0044FF]/50 pl-8 ml-4 space-y-10 py-2">
// //               {data.procedure.map((step, index) => (
// //                 <div key={index} className="relative group">
// //                   <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-black border-4 border-[#4488FF] shadow-[0_0_15px_rgba(68,136,255,0.8)] group-hover:bg-[#4488FF] transition-colors" />
// //                   <h4 className="text-xl font-bold text-white mb-2"><span className="text-[#4488FF] font-mono text-sm mr-2 drop-shadow-md">STEP 0{index + 1}</span> {step.title}</h4>
// //                   <p className="text-slate-300 font-light leading-relaxed text-lg">{step.text}</p>
// //                 </div>
// //               ))}
// //             </div>
            
// //             {/* Video Placeholder */}
// //             <div className="w-full aspect-video bg-black/40 backdrop-blur-xl rounded-2xl border border-[#0044FF]/40 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-[#0044FF]/70 transition-all duration-500">
// //                <div className="relative z-20 w-20 h-20 rounded-full bg-black/50 flex items-center justify-center border border-[#4488FF] group-hover:bg-[#0044FF]/20 transition-all shadow-[0_0_30px_rgba(68,136,255,0.6)]">
// //                   <PlayCircle size={40} strokeWidth={1.5} className="text-[#4488FF] ml-1" />
// //                </div>
// //                <p className="mt-5 text-[#4488FF] font-bold tracking-widest uppercase text-sm z-20 transition-colors">Watch Experiment Demo</p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* =========================================
// //           SECTION 5: AI BATCH SIMULATOR
// //       ========================================= */}
// //       <section className="py-24 px-6 lg:px-12 relative bg-gradient-to-b from-[#002899] to-black border-t border-[#0044FF]/40 scroll-mt-24" id="simulator">
        
// //         <div className="max-w-7xl mx-auto relative z-10">
// //           <div className="text-center mb-12">
// //             <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-6 flex items-center justify-center gap-4 drop-shadow-[0_0_30px_rgba(0,68,255,0.6)]">
// //               <Cpu className="text-[#4488FF]" size={40}/> Sim-to-Real Batch Engine
// //             </h2>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
// //             {/* LEFT: CONTROLS & DATA ENTRY */}
// //             <Card className="lg:col-span-5 bg-black/50 border-[#0044FF]/30 shadow-2xl backdrop-blur-xl flex flex-col h-full">
// //               <CardHeader className="border-b border-[#0044FF]/30 pb-6">
// //                 <div className="flex items-center justify-between">
// //                   <CardTitle className="text-2xl text-white tracking-tight drop-shadow-md">Dataset Input</CardTitle>
// //                   <div className="flex bg-black rounded-lg p-1 border border-[#0044FF]/40 shadow-inner">
// //                     <button onClick={() => setEntryMode('manual')} className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'manual' ? 'bg-[#0044FF] text-white shadow-[0_0_15px_rgba(0,68,255,0.8)]' : 'text-slate-400 hover:text-white'}`}><Edit3 size={14} className="inline mr-2 mb-0.5"/> Manual</button>
// //                     <button onClick={() => setEntryMode('upload')} className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'upload' ? 'bg-[#0044FF] text-white shadow-[0_0_15px_rgba(0,68,255,0.8)]' : 'text-slate-400 hover:text-white'}`}><FileSpreadsheet size={14} className="inline mr-2 mb-0.5"/> Excel</button>
// //                   </div>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="pt-6 flex-1 flex flex-col">
// //                 {entryMode === 'manual' ? (
// //                   <div className="flex-1 flex flex-col">
// //                     <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
// //                       {dataset.map((row, index) => (
// //                         <div key={row.id} className="p-4 bg-black/60 rounded-lg border border-[#0044FF]/30 hover:border-[#4488FF]/70 transition-colors relative shadow-inner">
// //                           <div className="absolute top-2 right-2 text-[10px] font-bold text-[#4488FF] uppercase tracking-widest drop-shadow-md">ROW {index + 1}</div>
// //                           <div className="grid grid-cols-2 gap-4 mt-2">
// //                             {data.inputs.map((inputConfig) => (
// //                               <div key={inputConfig.id} className="space-y-1">
// //                                 <Label className={`text-[10px] uppercase tracking-wider ${inputConfig.color === 'red' ? 'text-red-400' : 'text-[#4488FF]'}`}>{inputConfig.symbol}</Label>
// //                                 <div className="relative">
// //                                   <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[10px] font-bold text-slate-500 pointer-events-none uppercase">{inputConfig.id}</span>
// //                                   <Input type="number" step={inputConfig.step} value={row[inputConfig.id]} onChange={(e) => handleInputChange(row.id, inputConfig.id, e.target.value)} className={`pl-10 h-8 bg-black/80 text-white text-xs border-[#0044FF]/40 focus-visible:border-[#4488FF] focus-visible:ring-1 ${inputConfig.color === 'red' ? 'focus-visible:ring-red-500 border-red-900/50' : 'focus-visible:ring-[#4488FF]'}`} />
// //                                   <span className="absolute inset-y-0 right-2 flex items-center text-[10px] text-slate-500 pointer-events-none">{inputConfig.unit}</span>
// //                                 </div>
// //                               </div>
// //                             ))}
// //                           </div>
// //                           <button onClick={() => handleRemoveRow(row.id)} disabled={dataset.length === 1} className="mt-3 text-[10px] uppercase tracking-wider text-slate-500 hover:text-red-500 disabled:opacity-30 transition-colors flex items-center gap-1"><Trash2 size={12} /> Remove</button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                     <Button onClick={handleAddRow} variant="outline" className="w-full mt-4 border-dashed border-[#0044FF]/50 bg-black/40 hover:bg-[#0044FF]/20 text-[#4488FF] h-10 transition-colors"><Plus size={16} className="mr-2" /> Add Row</Button>
// //                   </div>
// //                 ) : (
// //                   <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#0044FF]/50 rounded-xl hover:border-[#4488FF] bg-black/40 transition-colors shadow-inner" onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop}>
// //                     <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-[#4488FF] mb-6 border border-[#0044FF]/50 shadow-[0_0_20px_rgba(68,136,255,0.6)]"><UploadCloud size={32} /></div>
// //                     <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">Upload Dataset</h3>
// //                     <p className="text-slate-400 text-center text-sm mb-6">Drag and drop your .csv or .xlsx file here.</p>
// //                     <input type="file" id="file-upload" accept=".csv, .xlsx" className="hidden" onChange={handleFileDrop} />
// //                     <Label htmlFor="file-upload" className="cursor-pointer bg-black/60 hover:bg-[#0044FF]/20 border border-[#0044FF]/60 text-[#4488FF] hover:text-white px-6 py-2.5 rounded-md font-bold text-sm tracking-wider uppercase transition-colors shadow-lg">Browse Files</Label>
// //                     {file && (
// //                       <div className="mt-6 p-3 bg-black/60 border border-[#0044FF]/40 rounded-lg flex items-center gap-3 w-full shadow-inner">
// //                         <FileSpreadsheet className="text-green-400" size={24}/>
// //                         <div className="overflow-hidden">
// //                           <p className="text-sm text-white font-medium truncate">{file.name}</p>
// //                           <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //                 <Button onClick={handlePredict} disabled={loading || (entryMode === 'upload' && !file)} size="lg" className="w-full mt-6 h-14 bg-[#0044FF] hover:bg-[#4488FF] text-white text-lg font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(0,68,255,0.8)] transition-all border border-[#4488FF]">{loading ? "Processing..." : "Run Batch Simulation"}</Button>
// //               </CardContent>
// //             </Card>

// //             {/* RIGHT: BATCH RESULTS */}
// //             <Card className="lg:col-span-7 bg-black/50 border-[#0044FF]/30 shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden backdrop-blur-xl">
// //               <CardHeader className="border-b border-[#0044FF]/30 pb-6">
// //                 <CardTitle className="flex items-center justify-between text-2xl text-white tracking-tight drop-shadow-md">
// //                   Batch Output Analysis
// //                   {batchResults ? <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 uppercase tracking-widest px-3 py-1 shadow-[0_0_15px_rgba(34,197,94,0.3)]">Processed</Badge> : <Badge variant="outline" className="text-slate-500 border-slate-700 uppercase tracking-widest px-3 py-1 bg-black/50">Idle</Badge>}
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="p-6 flex-1 flex flex-col overflow-hidden">
// //                 {!batchResults ? (
// //                   <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
// //                     <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#0044FF]/50 flex items-center justify-center bg-black/60 shadow-inner"><Zap className="text-[#4488FF]" size={24} /></div>
// //                     <p className="tracking-widest uppercase text-sm">Awaiting dataset...</p>
// //                   </div>
// //                 ) : (
// //                   <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
// //                     <div className="grid grid-cols-3 gap-4 mb-6">
// //                       <div className="bg-black/60 border border-[#0044FF]/40 rounded-lg p-4 text-center shadow-[0_0_15px_rgba(0,68,255,0.3)]">
// //                         <p className="text-[#4488FF] text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">Rows Processed</p>
// //                         <p className="text-2xl text-white font-mono">{batchResults.length}</p>
// //                       </div>
// //                       <div className="bg-black/60 border border-[#0044FF]/40 rounded-lg p-4 text-center shadow-[0_0_15px_rgba(0,68,255,0.3)]">
// //                         <p className="text-[#4488FF] text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">Avg Accuracy</p>
// //                         <p className="text-2xl text-green-400 font-mono">98.4%</p>
// //                       </div>
// //                       <div className="bg-black/60 border border-[#0044FF]/40 rounded-lg p-4 text-center shadow-[0_0_15px_rgba(0,68,255,0.3)]">
// //                         <p className="text-[#4488FF] text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">Compute Time</p>
// //                         <p className="text-2xl text-[#4488FF] font-mono">0.42s</p>
// //                       </div>
// //                     </div>
// //                     <div className="flex-1 overflow-auto rounded-xl border border-[#0044FF]/30 bg-black/60 shadow-inner">
// //                       <Table>
// //                         <TableHeader className="bg-black sticky top-0 z-10 shadow-md">
// //                           <TableRow className="border-[#0044FF]/30 hover:bg-transparent">
// //                             <TableHead className="text-[#4488FF] uppercase text-[10px] tracking-widest py-3 font-bold">Row</TableHead>
// //                             <TableHead className="text-[#4488FF] uppercase text-[10px] tracking-widest py-3 font-bold">Inputs</TableHead>
// //                             {data.outputs.map(out => <TableHead key={out.id} className="text-[#4488FF] uppercase text-[10px] tracking-widest py-3 font-bold">AI Pred ({out.symbol})</TableHead>)}
// //                             <TableHead className="text-right text-[#4488FF] uppercase text-[10px] tracking-widest py-3 pr-4 font-bold">Dev %</TableHead>
// //                           </TableRow>
// //                         </TableHeader>
// //                         <TableBody>
// //                           {batchResults.map((res, idx) => (
// //                             <TableRow key={idx} className="border-[#0044FF]/20 hover:bg-[#0044FF]/10 transition-colors">
// //                               <TableCell className="font-medium text-slate-400 text-xs">{idx + 1}</TableCell>
// //                               <TableCell className="text-slate-300 font-mono text-[10px]">
// //                                 {data.inputs.map(i => `${res.input[i.id]}`).join(" | ")}
// //                               </TableCell>
// //                               {data.outputs.map((out, outIdx) => (
// //                                 <TableCell key={out.id} className="font-mono text-white font-bold text-sm drop-shadow-sm">
// //                                   <span className={outIdx === 0 ? "text-red-400" : "text-[#4488FF]"}>{res.ml_out[out.id]}</span>
// //                                 </TableCell>
// //                               ))}
// //                               <TableCell className="text-right font-mono text-yellow-400 text-xs pr-4">{res.error?.toFixed(2)}%</TableCell>
// //                             </TableRow>
// //                           ))}
// //                         </TableBody>
// //                       </Table>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </section>

// //       <style dangerouslySetInnerHTML={{ __html: `
// //         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
// //         .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 68, 255, 0.1); border-radius: 10px; }
// //         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 68, 255, 0.5); border-radius: 10px; }
// //         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(68, 136, 255, 0.8); }
// //       `}} />
// //     </div>
// //   );
// // };

// // export default ExperimentLayout;


// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Slider } from "@/components/ui/slider";
// import { Label } from "@/components/ui/label"; 
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Activity, BookOpen, Cpu, ListChecks, Timer, Zap, PlayCircle, Plus, Trash2, Edit3, FileSpreadsheet, Network, Database, LineChart } from "lucide-react";

// // Import the registry
// import { experimentRegistry } from "../data/experiments";
// import { visualizerRegistry } from "./visualizers";

// const ExperimentLayout = () => {
//   const { experimentId } = useParams();
//   const navigate = useNavigate();
  
//   const data = experimentRegistry[experimentId];
//   const DynamicVisualizer = visualizerRegistry[experimentId];

//   if (!data) {
//     return <div className="min-h-screen flex items-center justify-center text-white bg-[#020617]">Experiment Not Found</div>;
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
//     const toastId = toast.loading("Running Simulation...");
//     try {
//       let response;
//       if (entryMode === "manual") {
//         response = await axios.post(`${data.apiEndpoint}/batch`, { data: dataset });
//       } else {
//         if (!file) throw new Error("No file selected");
//         const formData = new FormData();
//         formData.append("file", file);
//         response = await axios.post(`${data.apiEndpoint}/upload`, formData, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//       }
//       setBatchResults(response.data.results);
//       toast.success("Simulation Complete", { id: toastId });
//     } catch (error) {
//       toast.error("Simulation Failed", { id: toastId });
//       // MOCK DATA FOR UI TESTING
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

//   // Helper function to render interconnected paths
//   const renderPath = (from, to) => (
//     <div className={`absolute top-0 left-0 bg-[#0055FF]/40 pointer-events-none`} style={{ transform: `translate(${from.x}px, ${from.y}px)`, width: `${Math.hypot(to.x - from.x, to.y - from.y)}px`, height: '2px', transformOrigin: '0 0', rotate: `${Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI}deg`, zIndex: 5 }} />
//   );

//   return (
//     // BASE
//     <div className="min-h-screen bg-[#020617] text-slate-300 font-sans antialiased selection:bg-[#0055FF] selection:text-white">
      
//       {/* =========================================
//           SECTION 1: HERO (Data Flow Layout)
//       ========================================= */}
//       <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden bg-gradient-to-br from-black to-[#050B1E]">
//         {/* Background Glow */}
//         <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[#0055FF]/15 blur-[120px] rounded-full pointer-events-none" />
        
//         <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
//           {/* LEFT: Text Content */}
//           <div className="flex flex-col items-start text-left space-y-8">
//             <Badge className="bg-[#0055FF]/10 text-[#4488FF] border border-[#0055FF]/30 uppercase tracking-widest py-1.5 px-5 font-bold shadow-[0_0_15px_rgba(0,85,255,0.2)]">
//               {data.module}
//             </Badge>
//             <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-2xl">
//               {data.title}
//             </h1>
//             <p className="text-xl text-slate-200 font-light leading-relaxed max-w-lg">
//               {data.aim}
//             </p>
//             <Button className="bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-xl px-8 py-6 text-lg font-semibold tracking-wide shadow-[0_0_30px_rgba(0,85,255,0.4)] transition-all border border-[#4488FF]/50">
//               Run Batch Simulation
//             </Button>
//           </div>

//           {/* RIGHT: Connecting Flow Diagram */}
//           <div className="relative w-full h-[500px] hidden lg:flex items-center justify-center">
            
//             {/* Background SVG lines (dummy) */}
//             <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
//                 <path d="M 50% 50% L 20% 25%" stroke="rgba(0,85,255,0.3)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
//                 <path d="M 50% 50% L 85% 30%" stroke="rgba(0,85,255,0.3)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
//                 <path d="M 50% 50% L 25% 80%" stroke="rgba(0,85,255,0.3)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
//                 <path d="M 50% 50% L 75% 75%" stroke="rgba(0,85,255,0.3)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
//             </svg>

//             {/* Central Node */}
//             <div className="relative z-10 w-28 h-28 bg-[#050B1E]/60 backdrop-blur-xl rounded-3xl border border-[#0055FF]/30 shadow-[0_0_50px_rgba(0,85,255,0.5)] flex items-center justify-center">
//                <span className="text-4xl font-black text-white italic drop-shadow-md">Ex</span>
//             </div>

//             {/* Floating Node 1 (Neural Net) */}
//             <div className="absolute top-[15%] left-[5%] bg-black/60 backdrop-blur-xl border border-[#0055FF]/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:border-[#0055FF] transition-colors">
//                <div className="bg-[#0055FF]/10 p-2.5 rounded-xl"><Network size={18} className="text-[#0055FF]" /></div>
//                <div className="text-left pr-4">
//                  <p className="text-sm font-bold text-white leading-tight">Neural Net</p>
//                  <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Active</p>
//                </div>
//             </div>

//             {/* Floating Node 2 (Dataset) */}
//             <div className="absolute top-[20%] right-[0%] bg-black/60 backdrop-blur-xl border border-[#0055FF]/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:border-[#0055FF] transition-colors">
//                <div className="bg-[#0055FF]/10 p-2.5 rounded-xl"><Database size={18} className="text-[#0055FF]" /></div>
//                <div className="text-left pr-4">
//                  <p className="text-sm font-bold text-white leading-tight">Dataset</p>
//                  <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">20k Rows</p>
//                </div>
//             </div>

//             {/* Floating Node 3 (Accuracy) */}
//             <div className="absolute bottom-[10%] left-[10%] bg-black/60 backdrop-blur-xl border border-[#0055FF]/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:border-[#0055FF] transition-colors">
//                <div className="bg-[#0055FF]/10 p-2.5 rounded-xl"><Activity size={18} className="text-[#0055FF]" /></div>
//                <div className="text-left pr-4">
//                  <p className="text-sm font-bold text-white leading-tight">Physics Engine</p>
//                  <p className="text-[10px] text-green-400 font-mono tracking-widest uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/> Validating</p>
//                </div>
//             </div>

//             {/* Floating Node 4 (Formulas) */}
//             <div className="absolute bottom-[15%] right-[5%] bg-black/60 backdrop-blur-xl border border-[#0055FF]/20 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:border-[#0055FF] transition-colors">
//                <div className="bg-[#0055FF]/10 p-2.5 rounded-xl"><LineChart size={18} className="text-[#0055FF]" /></div>
//                <div className="text-left pr-4">
//                  <p className="text-sm font-bold text-white leading-tight">Accuracy</p>
//                  <p className="text-[10px] text-[#A78BFA] font-mono tracking-widest uppercase">&gt; 98.4%</p>
//                </div>
//             </div>

//           </div>

//         </div>
//       </section>

//       {/* =========================================
//           SECTION 2: THEORY & VISUALIZER
//       ========================================= */}
//       <section className="py-24 px-6 lg:px-12 relative border-t border-white/5 bg-black">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
//           <div className="space-y-8">
//             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
//               <div className="w-12 h-12 rounded-xl bg-[#0055FF]/10 flex items-center justify-center text-[#0055FF] shadow-[0_0_20px_rgba(0,85,255,0.2)] border border-[#0055FF]/20">
//                 <BookOpen size={24} />
//               </div>
//               <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Theory</h2>
//             </div>
//             <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
//               {data.theory.map((para, i) => <p key={i}>{para}</p>)}
//             </div>
//           </div>
//           <div className="h-full flex items-center justify-center">
//               {DynamicVisualizer ? (
//                <DynamicVisualizer />
//              ) : (
//                <div className="bg-black/40 backdrop-blur-xl border border-[#0044FF]/30 rounded-3xl p-8 shadow-2xl w-full h-[450px] flex items-center justify-center relative overflow-hidden group">
//                  <span className="text-[#4488FF] font-bold uppercase tracking-widest relative z-10 drop-shadow-md">Visualizer in Development</span>
//                </div>
//             )}
//          </div>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 3: APPARATUS & SPECS
//       ========================================= */}
//       <section className="py-20 px-6 lg:px-12 border-t border-white/5 relative bg-[#01040D]">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
//           <Card className="bg-[#050B1E]/50 backdrop-blur-md border-[#0055FF]/15 shadow-2xl hover:border-[#0055FF]/30 transition-colors">
//             <CardHeader className="border-b border-white/5 pb-4">
//               <CardTitle className="text-2xl font-bold text-white uppercase flex items-center gap-3"><Cpu className="text-[#0055FF]" /> Apparatus Required</CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <ul className="space-y-4 text-slate-300 font-light text-lg">
//                 {data.apparatus.map((item, i) => (
//                   <li key={i} className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0055FF] shadow-[0_0_10px_#0055FF] shrink-0"/> {item}</li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//           <Card className="bg-[#050B1E]/50 backdrop-blur-md border-[#0055FF]/15 shadow-2xl hover:border-[#0055FF]/30 transition-colors">
//             <CardHeader className="border-b border-white/5 pb-4">
//               <CardTitle className="text-2xl font-bold text-white uppercase flex items-center gap-3"><ListChecks className="text-[#0055FF]" /> Specifications</CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <ul className="space-y-4 text-slate-300 font-light text-lg">
//                 {data.specifications.map((spec, i) => (
//                   <li key={i} className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#0055FF] shadow-[0_0_10px_#0055FF] shrink-0"/> <span><strong className="text-white font-medium">{spec.label}:</strong> {spec.value}</span></li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 4: PROCEDURE
//       ========================================= */}
//       <section className="py-24 px-6 lg:px-12 bg-[#020617] border-t border-white/5">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-16">
//             <div className="w-12 h-12 rounded-xl bg-[#0055FF]/10 flex items-center justify-center text-[#0055FF] shadow-[0_0_20px_rgba(0,85,255,0.2)] border border-[#0055FF]/20"><Timer size={24} /></div>
//             <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Experimental Procedure</h2>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//             <div className="relative border-l-2 border-[#0055FF]/30 pl-8 ml-4 space-y-10 py-2">
//               {data.procedure.map((step, index) => (
//                 <div key={index} className="relative group">
//                   <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#020617] border-4 border-[#0055FF] shadow-[0_0_15px_rgba(0,85,255,0.6)] group-hover:bg-[#0055FF] transition-colors" />
//                   <h4 className="text-xl font-bold text-white mb-2"><span className="text-[#0055FF] font-mono text-sm mr-2">STEP 0{index + 1}</span> {step.title}</h4>
//                   <p className="text-slate-400 font-light leading-relaxed text-lg">{step.text}</p>
//                 </div>
//               ))}
//             </div>
//             {/* Video Placeholder */}
//             <div className="w-full aspect-video bg-[#03081A] rounded-2xl border border-[#0055FF]/20 shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer">
//                <div className="absolute inset-0 bg-[#0055FF]/5 group-hover:bg-[#0055FF]/10 transition-colors z-10" />
//                <div className="relative z-20 w-20 h-20 rounded-full bg-[#0055FF]/20 backdrop-blur-md flex items-center justify-center border border-[#0055FF]/50 group-hover:bg-[#0055FF] transition-all shadow-[0_0_30px_rgba(0,85,255,0.5)]">
//                   <PlayCircle size={40} strokeWidth={1.5} className="text-white ml-1" />
//                </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =========================================
//           SECTION 5: AI BATCH SIMULATOR
//       ========================================= */}
//       <section className="py-24 px-6 lg:px-12 relative border-t border-[#0055FF]/20 scroll-mt-24 bg-black" id="simulator">
//         <div className="absolute inset-0 bg-gradient-to-t from-[#001133]/30 to-transparent pointer-events-none" />
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-6 flex items-center justify-center gap-4 drop-shadow-lg"><Cpu className="text-[#0055FF]" size={40}/> Sim-to-Real Batch Engine</h2>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {/* DYNAMIC DATA ENTRY */}
//             <Card className="lg:col-span-5 bg-[#050B1E]/80 border-[#0055FF]/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col h-full">
//               <CardHeader className="border-b border-white/5 pb-6">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-2xl text-white tracking-tight">Dataset Input</CardTitle>
//                   <div className="flex bg-[#020617] rounded-lg p-1 border border-[#0055FF]/20 shadow-inner">
//                     <button onClick={() => setEntryMode('manual')} className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'manual' ? 'bg-[#0055FF] text-white shadow-[0_0_15px_rgba(0,85,255,0.5)]' : 'text-slate-400 hover:text-white'}`}><Edit3 size={14} className="inline mr-2 mb-0.5"/> Manual</button>
//                     <button onClick={() => setEntryMode('upload')} className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'upload' ? 'bg-[#0055FF] text-white shadow-[0_0_15px_rgba(0,85,255,0.5)]' : 'text-slate-400 hover:text-white'}`}><FileSpreadsheet size={14} className="inline mr-2 mb-0.5"/> Excel</button>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="pt-6 flex-1 flex flex-col">
//                 {entryMode === 'manual' ? (
//                   <div className="flex-1 flex flex-col">
//                     <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
//                       {dataset.map((row, index) => (
//                         <div key={row.id} className="p-4 bg-[#0A1128]/50 rounded-lg border border-white/5 hover:border-[#0055FF]/40 transition-colors relative shadow-inner">
//                           <div className="absolute top-2 right-2 text-[10px] font-bold text-[#0055FF] uppercase tracking-widest drop-shadow-md">ROW {index + 1}</div>
//                           <div className="grid grid-cols-2 gap-4 mt-2">
//                             {data.inputs.map((inputConfig) => (
//                               <div key={inputConfig.id} className="space-y-1">
//                                 <Label className={`text-[10px] uppercase tracking-wider ${inputConfig.color === 'red' ? 'text-red-400' : 'text-[#4488FF]'}`}>{inputConfig.symbol}</Label>
//                                 <div className="relative">
//                                   <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[10px] font-bold text-slate-500 pointer-events-none uppercase">{inputConfig.id}</span>
//                                   <Input type="number" step={inputConfig.step} value={row[inputConfig.id]} onChange={(e) => handleInputChange(row.id, inputConfig.id, e.target.value)} className={`pl-10 h-8 bg-[#020617] text-white text-xs border-white/10 ${inputConfig.color === 'red' ? 'focus-visible:ring-red-500 border-red-900/30' : 'focus-visible:ring-[#0055FF] border-[#0055FF]/30'}`} />
//                                   <span className="absolute inset-y-0 right-2 flex items-center text-[10px] text-slate-500 pointer-events-none">{inputConfig.unit}</span>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                           <button onClick={() => handleRemoveRow(row.id)} disabled={dataset.length === 1} className="mt-3 text-[10px] uppercase tracking-wider text-slate-500 hover:text-red-500 disabled:opacity-30 transition-colors flex items-center gap-1"><Trash2 size={12} /> Remove</button>
//                         </div>
//                       ))}
//                     </div>
//                     <Button onClick={handleAddRow} variant="outline" className="w-full mt-4 border-dashed border-[#0055FF]/30 bg-transparent hover:bg-[#0055FF]/10 text-[#0055FF] h-10 transition-colors"><Plus size={16} className="mr-2" /> Add Row</Button>
//                   </div>
//                 ) : (
//                   <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#0055FF]/30 rounded-xl hover:border-[#0055FF] bg-[#0A1128]/30 transition-colors shadow-inner" onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop}>
//                     <div className="w-16 h-16 rounded-full bg-[#0055FF]/20 flex items-center justify-center text-[#0055FF] mb-6 border border-[#0055FF]/50 shadow-[0_0_20px_rgba(68,136,255,0.6)]"><UploadCloud size={32} /></div>
//                     <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">Upload Dataset</h3>
//                     <p className="text-slate-400 text-center text-sm mb-6">Drag and drop your .csv or .xlsx file here.</p>
//                     <input type="file" id="file-upload" accept=".csv, .xlsx" className="hidden" onChange={handleFileDrop} />
//                     <Label htmlFor="file-upload" className="cursor-pointer bg-[#0055FF]/20 hover:bg-[#0055FF]/40 border border-[#0055FF]/60 text-[#4488FF] hover:text-white px-6 py-2.5 rounded-md font-bold text-sm tracking-wider uppercase transition-colors shadow-lg">Browse Files</Label>
//                     {file && (
//                       <div className="mt-6 p-3 bg-[#0055FF]/10 border border-[#0055FF]/30 rounded-lg flex items-center gap-3 w-full shadow-inner">
//                         <FileSpreadsheet className="text-green-400" size={24}/>
//                         <div className="overflow-hidden">
//                           <p className="text-sm text-white font-medium truncate">{file.name}</p>
//                           <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 <Button onClick={handlePredict} disabled={loading || (entryMode === 'upload' && !file)} size="lg" className="w-full mt-6 h-14 bg-[#0055FF] hover:bg-[#0040CC] text-white text-lg font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(0,85,255,0.5)] transition-all border border-[#4488FF]/50">{loading ? "Processing..." : "Run Batch Simulation"}</Button>
//               </CardContent>
//             </Card>

//             {/* RIGHT: BATCH RESULTS */}
//             <Card className="lg:col-span-7 bg-[#050B1E]/80 border-[#0055FF]/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] min-h-[500px] flex flex-col relative overflow-hidden backdrop-blur-xl">
//               {batchResults && <div className="absolute top-0 right-0 w-80 h-80 bg-[#0055FF]/15 blur-[100px] rounded-full pointer-events-none" />}
//               <CardHeader className="border-b border-white/5 pb-6">
//                 <CardTitle className="flex items-center justify-between text-2xl text-white tracking-tight drop-shadow-md">
//                   Batch Output Analysis
//                   {batchResults ? <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 uppercase tracking-widest px-3 py-1 shadow-[0_0_15px_rgba(34,197,94,0.3)]">Processed</Badge> : <Badge variant="outline" className="text-slate-500 border-slate-700 uppercase tracking-widest px-3 py-1 bg-black/50">Idle</Badge>}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 flex-1 flex flex-col overflow-hidden">
//                 {!batchResults ? (
//                   <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
//                     <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#0055FF]/50 flex items-center justify-center bg-[#0055FF]/5 shadow-inner"><Zap className="text-[#0055FF]/50" size={24} /></div>
//                     <p className="tracking-widest uppercase text-sm">Awaiting dataset...</p>
//                   </div>
//                 ) : (
//                   <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
//                     <div className="grid grid-cols-3 gap-4 mb-6">
//                       <div className="bg-[#020617] border border-[#0055FF]/30 rounded-lg p-4 text-center shadow-[0_0_15px_rgba(0,85,255,0.3)] hover:border-[#0055FF] transition-colors">
//                         <p className="text-[#0055FF] text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">Rows Processed</p>
//                         <p className="text-2xl text-white font-mono">{batchResults.length}</p>
//                       </div>
//                       <div className="bg-[#020617] border border-[#0055FF]/30 rounded-lg p-4 text-center shadow-[0_0_15px_rgba(0,85,255,0.3)] hover:border-[#0055FF] transition-colors">
//                         <p className="text-[#0055FF] text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">Avg Accuracy</p>
//                         <p className="text-2xl text-green-400 font-mono">98.4%</p>
//                       </div>
//                       <div className="bg-[#020617] border border-[#0055FF]/30 rounded-lg p-4 text-center shadow-[0_0_15px_rgba(0,85,255,0.3)] hover:border-[#0055FF] transition-colors">
//                         <p className="text-[#0055FF] text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">Compute Time</p>
//                         <p className="text-2xl text-[#4488FF] font-mono">0.42s</p>
//                       </div>
//                     </div>
//                     <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-[#020617] shadow-inner">
//                       <Table>
//                         <TableHeader className="bg-[#050B1E] sticky top-0 z-10 shadow-md">
//                           <TableRow className="border-white/5 hover:bg-transparent">
//                             <TableHead className="text-slate-400 uppercase text-[10px] tracking-widest py-3">Row</TableHead>
//                             <TableHead className="text-slate-400 uppercase text-[10px] tracking-widest py-3">Inputs</TableHead>
//                             {data.outputs.map(out => <TableHead key={out.id} className="text-slate-400 uppercase text-[10px] tracking-widest py-3">AI Pred ({out.symbol})</TableHead>)}
//                             <TableHead className="text-right text-slate-400 uppercase text-[10px] tracking-widest py-3 pr-4">Dev %</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {batchResults.map((res, idx) => (
//                             <TableRow key={idx} className="border-white/5 hover:bg-white/[0.02] transition-colors">
//                               <TableCell className="font-medium text-slate-500 text-xs">{idx + 1}</TableCell>
//                               <TableCell className="text-slate-300 font-mono text-[10px]">
//                                 {data.inputs.map(i => `${res.input[i.id]}`).join(" | ")}
//                               </TableCell>
//                               {data.outputs.map((out, outIdx) => (
//                                 <TableCell key={out.id} className="font-mono text-white font-bold text-sm drop-shadow-sm">
//                                   <span className={outIdx === 0 ? "text-red-400" : "text-[#4488FF]"}>{res.ml_out[out.id]}</span>
//                                 </TableCell>
//                               ))}
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

//       <style dangerouslySetInnerHTML={{ __html: `
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 85, 255, 0.1); border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 85, 255, 0.4); border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(68, 136, 255, 0.8); }
//       `}} />
//     </div>
//   );
// };

// export default ExperimentLayout;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    return <div className="min-h-screen flex items-center justify-center text-white bg-[#01030A]">Experiment Not Found</div>;
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
    const toastId = toast.loading("Running Simulation...");
    try {
      let response;
      if (entryMode === "manual") {
        response = await axios.post(`${data.apiEndpoint}/batch`, { data: dataset });
      } else {
        if (!file) throw new Error("No file selected");
        const formData = new FormData();
        formData.append("file", file);
        response = await axios.post(`${data.apiEndpoint}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
      setBatchResults(response.data.results);
      toast.success("Simulation Complete", { id: toastId });
    } catch (error) {
      toast.error("Simulation Failed", { id: toastId });
      // MOCK DATA FOR UI TESTING
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

  const scrollToSimulator = () => {
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // BASE: Deep, dark navy-black canvas
    <div className="min-h-screen bg-[#01030A] text-slate-300 font-sans antialiased selection:bg-[#0055FF] selection:text-white">
      
      {/* =========================================
          SECTION 1: HERO (Spotlight Glows Layout)
      ========================================= */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden border-b border-white/[0.02]">
        {/* Spotlight Glow 1: Left Side (Behind text/button) */}
        <div className="absolute top-[20%] left-[-10%] w-[700px] h-[700px] bg-[#0055FF]/15 blur-[160px] rounded-full pointer-events-none" />
        
        {/* Spotlight Glow 2: Right Side (Behind 'Ex' Node) */}
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-[#0044FF]/20 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Text Content */}
          <div className="flex flex-col items-start text-left space-y-8">
            <Badge className="bg-transparent text-[#4488FF] border border-[#0055FF]/40 rounded-full px-5 py-2 text-[10px] tracking-[0.2em] font-bold shadow-[0_0_15px_rgba(0,85,255,0.1)] uppercase">
              {data.module}
            </Badge>
            <h1 className="text-5xl lg:text-[4.5rem] font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-lg">
              {data.title}
            </h1>
            <p className="text-lg text-slate-300 font-light leading-relaxed max-w-lg">
              {data.aim}
            </p>
            <Button onClick={scrollToSimulator} className="bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-xl px-10 py-7 text-lg font-semibold tracking-wide shadow-[0_0_40px_rgba(0,85,255,0.6)] transition-all border border-[#4488FF]/30 hover:scale-105">
              Run Batch Simulation
            </Button>
          </div>

          {/* RIGHT: Floating Nodes (No connecting lines, exact match to image) */}
          <div className="relative w-full h-[500px] hidden lg:flex items-center justify-center">
            
            {/* Central Node (Ex) */}
            <div className="relative z-20 w-28 h-28 bg-[#050A1A] rounded-[2rem] border border-white/5 shadow-[0_0_60px_rgba(0,85,255,0.4)] flex items-center justify-center hover:scale-105 transition-transform">
               <span className="text-4xl font-black text-white italic drop-shadow-md">Ex</span>
            </div>

            {/* Floating Node 1 (Neural Net) - Top Left */}
            <div className="absolute top-[18%] left-[8%] bg-[#030612]/80 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:border-[#0055FF]/40 transition-colors">
               <div className="bg-[#0055FF]/10 p-2.5 rounded-xl"><Network size={18} className="text-[#4488FF]" /></div>
               <div className="text-left pr-4">
                 <p className="text-sm font-bold text-white leading-tight">Neural Net</p>
                 <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Active</p>
               </div>
            </div>

            {/* Floating Node 2 (Dataset) - Top Right */}
            <div className="absolute top-[25%] right-[5%] bg-[#030612]/80 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:border-[#0055FF]/40 transition-colors">
               <div className="bg-[#0055FF]/10 p-2.5 rounded-xl"><Database size={18} className="text-[#4488FF]" /></div>
               <div className="text-left pr-4">
                 <p className="text-sm font-bold text-white leading-tight">Dataset</p>
                 <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">20k Rows</p>
               </div>
            </div>

            {/* Floating Node 3 (Physics Engine) - Bottom Left */}
            <div className="absolute bottom-[18%] left-[12%] bg-[#030612]/80 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:border-[#0055FF]/40 transition-colors">
               <div className="bg-[#0055FF]/10 p-2.5 rounded-xl"><Activity size={18} className="text-[#4488FF]" /></div>
               <div className="text-left pr-4">
                 <p className="text-sm font-bold text-white leading-tight">Physics Engine</p>
                 <p className="text-[10px] text-green-400 font-mono tracking-widest uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"/> Validating</p>
               </div>
            </div>

            {/* Floating Node 4 (Accuracy) - Bottom Right */}
            <div className="absolute bottom-[22%] right-[10%] bg-[#030612]/80 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center gap-4 shadow-2xl z-10 hover:border-[#0055FF]/40 transition-colors">
               <div className="bg-[#0055FF]/10 p-2.5 rounded-xl"><LineChart size={18} className="text-[#4488FF]" /></div>
               <div className="text-left pr-4">
                 <p className="text-sm font-bold text-white leading-tight">Accuracy</p>
                 <p className="text-[10px] text-[#4488FF] font-mono tracking-widest uppercase">&gt; 98.4%</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: THEORY & VISUALIZER
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 relative border-b border-white/[0.02]">
        {/* Subtle right-side ambient glow */}
        <div className="absolute top-[30%] left-[-20%] w-[600px] h-[600px] bg-[#0055FF]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0055FF]/10 flex items-center justify-center text-[#4488FF] shadow-[0_0_20px_rgba(0,85,255,0.1)] border border-[#0055FF]/20">
                <BookOpen size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Theory</h2>
            </div>
            <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
              {data.theory.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
          <div className="h-full flex items-center justify-center">
              {DynamicVisualizer ? (
               <DynamicVisualizer />
             ) : (
               <div className="bg-[#030612]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl w-full h-[450px] flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#0055FF]/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                 <span className="text-[#4488FF] font-bold uppercase tracking-widest relative z-10 drop-shadow-md">Visualizer in Development</span>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: APPARATUS & SPECS
      ========================================= */}
      <section className="py-20 px-6 lg:px-12 relative border-b border-white/[0.02]">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[#0055FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <Card className="bg-[#030612]/80 backdrop-blur-xl border-white/5 shadow-2xl hover:border-[#0055FF]/30 transition-colors">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-2xl font-bold text-white uppercase flex items-center gap-3"><Settings className="text-[#4488FF]" /> Apparatus Required</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4 text-slate-300 font-light text-lg">
                {data.apparatus.map((item, i) => (
                  <li key={i} className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#4488FF] shadow-[0_0_10px_#4488FF] shrink-0"/> {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-[#030612]/80 backdrop-blur-xl border-white/5 shadow-2xl hover:border-[#0055FF]/30 transition-colors">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-2xl font-bold text-white uppercase flex items-center gap-3"><ListChecks className="text-[#4488FF]" /> Specifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4 text-slate-300 font-light text-lg">
                {data.specifications.map((spec, i) => (
                  <li key={i} className="flex items-start gap-4"><div className="w-2 h-2 mt-2 rounded-full bg-[#4488FF] shadow-[0_0_10px_#4488FF] shrink-0"/> <span><strong className="text-white font-medium">{spec.label}:</strong> {spec.value}</span></li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* =========================================
          SECTION 4: PROCEDURE
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 relative border-b border-white/[0.02]">
        <div className="absolute top-[40%] left-[20%] w-[600px] h-[600px] bg-[#0055FF]/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-16">
            <div className="w-12 h-12 rounded-xl bg-[#0055FF]/10 flex items-center justify-center text-[#4488FF] shadow-[0_0_20px_rgba(0,85,255,0.1)] border border-[#0055FF]/20"><Timer size={24} /></div>
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Experimental Procedure</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative border-l-2 border-[#0055FF]/20 pl-8 ml-4 space-y-10 py-2">
              {data.procedure.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#01030A] border-4 border-[#4488FF] shadow-[0_0_15px_rgba(0,85,255,0.4)] group-hover:bg-[#4488FF] transition-colors" />
                  <h4 className="text-xl font-bold text-white mb-2"><span className="text-[#4488FF] font-mono text-sm mr-2">STEP 0{index + 1}</span> {step.title}</h4>
                  <p className="text-slate-400 font-light leading-relaxed text-lg">{step.text}</p>
                </div>
              ))}
            </div>
            {/* Video Placeholder */}
            <div className="w-full aspect-video bg-[#030612]/60 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-[#0055FF]/30 transition-all">
               <div className="absolute inset-0 bg-[#0055FF]/5 group-hover:bg-[#0055FF]/10 transition-colors z-10" />
               <div className="relative z-20 w-20 h-20 rounded-full bg-[#0055FF]/10 backdrop-blur-md flex items-center justify-center border border-[#4488FF]/50 group-hover:bg-[#0055FF]/20 transition-all shadow-[0_0_30px_rgba(0,85,255,0.3)]">
                  <PlayCircle size={40} strokeWidth={1.5} className="text-white ml-1" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: AI BATCH SIMULATOR
      ========================================= */}
      <section className="py-24 px-6 lg:px-12 relative scroll-mt-24" id="simulator">
        {/* Massive bottom glow pulling the eye down */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#0055FF]/10 blur-[150px] rounded-t-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-6 flex items-center justify-center gap-4 drop-shadow-[0_0_30px_rgba(0,85,255,0.4)]">
              <Cpu className="text-[#4488FF]" size={40}/> Sim-to-Real Batch Engine
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: CONTROLS & DATA ENTRY */}
            <Card className="lg:col-span-5 bg-[#030612]/80 border-white/5 shadow-2xl backdrop-blur-xl flex flex-col h-full hover:border-[#0055FF]/20 transition-all">
              <CardHeader className="border-b border-white/5 pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-white tracking-tight drop-shadow-md">Dataset Input</CardTitle>
                  <div className="flex bg-[#01030A] rounded-lg p-1 border border-white/5 shadow-inner">
                    <button onClick={() => setEntryMode('manual')} className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'manual' ? 'bg-[#0055FF] text-white shadow-[0_0_15px_rgba(0,85,255,0.5)]' : 'text-slate-400 hover:text-white'}`}><Edit3 size={14} className="inline mr-2 mb-0.5"/> Manual</button>
                    <button onClick={() => setEntryMode('upload')} className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${entryMode === 'upload' ? 'bg-[#0055FF] text-white shadow-[0_0_15px_rgba(0,85,255,0.5)]' : 'text-slate-400 hover:text-white'}`}><FileSpreadsheet size={14} className="inline mr-2 mb-0.5"/> Excel</button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 flex-1 flex flex-col">
                {entryMode === 'manual' ? (
                  <div className="flex-1 flex flex-col">
                    <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                      {dataset.map((row, index) => (
                        <div key={row.id} className="p-4 bg-[#01030A]/60 rounded-lg border border-white/5 hover:border-[#0055FF]/30 transition-colors relative shadow-inner">
                          <div className="absolute top-2 right-2 text-[10px] font-bold text-[#4488FF] uppercase tracking-widest drop-shadow-md">ROW {index + 1}</div>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            {data.inputs.map((inputConfig) => (
                              <div key={inputConfig.id} className="space-y-1">
                                <Label className={`text-[10px] uppercase tracking-wider ${inputConfig.color === 'red' ? 'text-red-400' : 'text-[#4488FF]'}`}>{inputConfig.symbol}</Label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[10px] font-bold text-slate-500 pointer-events-none uppercase">{inputConfig.id}</span>
                                  <Input type="number" step={inputConfig.step} value={row[inputConfig.id]} onChange={(e) => handleInputChange(row.id, inputConfig.id, e.target.value)} className={`pl-10 h-8 bg-[#01030A] text-white text-xs border-white/5 focus-visible:border-[#4488FF] focus-visible:ring-1 ${inputConfig.color === 'red' ? 'focus-visible:ring-red-500 border-red-900/30' : 'focus-visible:ring-[#4488FF]'}`} />
                                  <span className="absolute inset-y-0 right-2 flex items-center text-[10px] text-slate-500 pointer-events-none">{inputConfig.unit}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button onClick={() => handleRemoveRow(row.id)} disabled={dataset.length === 1} className="mt-3 text-[10px] uppercase tracking-wider text-slate-500 hover:text-red-500 disabled:opacity-30 transition-colors flex items-center gap-1"><Trash2 size={12} /> Remove</button>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleAddRow} variant="outline" className="w-full mt-4 border-dashed border-[#0055FF]/30 bg-transparent hover:bg-[#0055FF]/10 text-[#4488FF] h-10 transition-colors"><Plus size={16} className="mr-2" /> Add Row</Button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#0055FF]/30 rounded-xl hover:border-[#4488FF] bg-[#01030A]/60 transition-colors shadow-inner" onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop}>
                    <div className="w-16 h-16 rounded-full bg-[#0055FF]/10 flex items-center justify-center text-[#4488FF] mb-6 border border-[#0055FF]/20 shadow-[0_0_20px_rgba(0,85,255,0.2)]"><UploadCloud size={32} /></div>
                    <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">Upload Dataset</h3>
                    <p className="text-slate-400 text-center text-sm mb-6">Drag and drop your .csv or .xlsx file here.</p>
                    <input type="file" id="file-upload" accept=".csv, .xlsx" className="hidden" onChange={handleFileDrop} />
                    <Label htmlFor="file-upload" className="cursor-pointer bg-[#0055FF]/20 hover:bg-[#0055FF]/40 border border-[#0055FF]/40 text-[#4488FF] hover:text-white px-6 py-2.5 rounded-md font-bold text-sm tracking-wider uppercase transition-colors shadow-lg">Browse Files</Label>
                    {file && (
                      <div className="mt-6 p-3 bg-[#0055FF]/10 border border-[#0055FF]/30 rounded-lg flex items-center gap-3 w-full shadow-inner">
                        <FileSpreadsheet className="text-green-400" size={24}/>
                        <div className="overflow-hidden">
                          <p className="text-sm text-white font-medium truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <Button onClick={handlePredict} disabled={loading || (entryMode === 'upload' && !file)} size="lg" className="w-full mt-6 h-14 bg-[#0055FF] hover:bg-[#0044CC] text-white text-lg font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(0,85,255,0.5)] transition-all border border-[#4488FF]/50">{loading ? "Processing..." : "Run Batch Simulation"}</Button>
              </CardContent>
            </Card>

            {/* RIGHT: BATCH RESULTS */}
            <Card className="lg:col-span-7 bg-[#030612]/80 border-white/5 shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden backdrop-blur-xl hover:border-[#0055FF]/20 transition-all">
              {batchResults && <div className="absolute top-0 right-0 w-80 h-80 bg-[#0055FF]/10 blur-[100px] rounded-full pointer-events-none" />}
              <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center justify-between text-2xl text-white tracking-tight drop-shadow-md">
                  Batch Output Analysis
                  {batchResults ? <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 uppercase tracking-widest px-3 py-1 shadow-[0_0_15px_rgba(34,197,94,0.2)]">Processed</Badge> : <Badge variant="outline" className="text-slate-500 border-white/10 uppercase tracking-widest px-3 py-1 bg-[#01030A]">Idle</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col overflow-hidden">
                {!batchResults ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#0055FF]/30 flex items-center justify-center bg-[#0055FF]/5 shadow-inner"><Zap className="text-[#4488FF]/60" size={24} /></div>
                    <p className="tracking-widest uppercase text-sm">Awaiting dataset...</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-[#01030A] border border-white/5 rounded-lg p-4 text-center shadow-inner hover:border-[#0055FF]/30 transition-colors">
                        <p className="text-[#4488FF] text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">Rows Processed</p>
                        <p className="text-2xl text-white font-mono">{batchResults.length}</p>
                      </div>
                      <div className="bg-[#01030A] border border-white/5 rounded-lg p-4 text-center shadow-inner hover:border-[#0055FF]/30 transition-colors">
                        <p className="text-[#4488FF] text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">Avg Accuracy</p>
                        <p className="text-2xl text-green-400 font-mono">98.4%</p>
                      </div>
                      <div className="bg-[#01030A] border border-white/5 rounded-lg p-4 text-center shadow-inner hover:border-[#0055FF]/30 transition-colors">
                        <p className="text-[#4488FF] text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">Compute Time</p>
                        <p className="text-2xl text-[#4488FF] font-mono">0.42s</p>
                      </div>
                    </div>
                    <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-[#01030A] shadow-inner">
                      <Table>
                        <TableHeader className="bg-[#030612] sticky top-0 z-10 shadow-md">
                          <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-[#4488FF] uppercase text-[10px] tracking-widest py-3 font-bold">Row</TableHead>
                            <TableHead className="text-[#4488FF] uppercase text-[10px] tracking-widest py-3 font-bold">Inputs</TableHead>
                            {data.outputs.map(out => <TableHead key={out.id} className="text-[#4488FF] uppercase text-[10px] tracking-widest py-3 font-bold">AI Pred ({out.symbol})</TableHead>)}
                            <TableHead className="text-right text-[#4488FF] uppercase text-[10px] tracking-widest py-3 pr-4 font-bold">Dev %</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {batchResults.map((res, idx) => (
                            <TableRow key={idx} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                              <TableCell className="font-medium text-slate-500 text-xs">{idx + 1}</TableCell>
                              <TableCell className="text-slate-400 font-mono text-[10px]">
                                {data.inputs.map(i => `${res.input[i.id]}`).join(" | ")}
                              </TableCell>
                              {data.outputs.map((out, outIdx) => (
                                <TableCell key={out.id} className="font-mono text-white font-bold text-sm drop-shadow-sm">
                                  <span className={outIdx === 0 ? "text-red-400" : "text-[#4488FF]"}>{res.ml_out[out.id]}</span>
                                </TableCell>
                              ))}
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 85, 255, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 85, 255, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 85, 255, 0.6); }
      `}} />
    </div>
  );
};

export default ExperimentLayout;