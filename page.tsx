"use client";

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Upload, FileText, Play, Pause, Download, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("en-US-AriaNeural");
  const [speed, setSpeed] = useState(1.0);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch voices on load
    axios.get(`${API_URL}/api/voices`)
      .then(res => setVoices(res.data))
      .catch(err => console.error("Failed to fetch voices", err));
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setError("");
    setResult(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1
  });

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('voice', selectedVoice);
    formData.append('speed', speed.toString());

    try {
      const response = await axios.post(`${API_URL}/api/convert`, formData);
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Play size={16} fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tight">AudioDoc AI</span>
          </div>
          <a href="https://github.com" target="_blank" className="text-slate-400 hover:text-white transition">GitHub</a>
        </header>

        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Turn Documents into <br/> Lifelike Audiobooks
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Upload your PDF, DOCX, or TXT files and let our AI narrate them for you. 
            Includes summarization and multi-language support.
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left: Controls */}
          <div className="space-y-6">
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
                ${isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800'}
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                  <Upload className="text-indigo-400" />
                </div>
                {file ? (
                  <div className="flex items-center gap-2 text-indigo-300 font-medium">
                    <FileText size={20} />
                    {file.name}
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-slate-200">Click to upload or drag & drop</p>
                    <p className="text-sm text-slate-500 mt-1">PDF, DOCX, TXT (Max 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 space-y-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Settings size={18} className="text-indigo-400" />
                <h3 className="font-semibold">Configuration</h3>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-2">Voice</label>
                <select 
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {voices.map((v: any) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Speed: {speed}x</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.0" 
                  step="0.1" 
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <button
                onClick={handleConvert}
                disabled={!file || loading}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2
                  ${!file || loading 
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'}
                `}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play size={20} fill="currentColor" />
                    Generate Audio
                  </>
                )}
              </button>
              
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            {result ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Audio Player */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="text-green-400" size={20} />
                    Audio Ready
                  </h3>
                  <audio 
                    controls 
                    src={`${API_URL}${result.audio_url}`} 
                    className="w-full mb-4"
                  />
                  <a 
                    href={`${API_URL}${result.audio_url}`} 
                    download
                    className="flex items-center justify-center gap-2 w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
                  >
                    <Download size={18} />
                    Download MP3
                  </a>
                </div>

                {/* Summary Card */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3">
                    AI Summary
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {result.summary}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-700 flex gap-4 text-sm text-slate-500">
                    <span>Language: <span className="text-slate-300 uppercase">{result.detected_language}</span></span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-2xl p-12">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Play size={32} className="text-slate-700 ml-1" />
                </div>
                <p>Your audio and summary will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}