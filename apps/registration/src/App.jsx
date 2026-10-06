import React, { useState } from "react";
import { Copy, CheckCircle2, RefreshCw, ArrowDown, FileText, UserSquare2 } from "lucide-react";

const RETRO_SHADOW = "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
const RETRO_SHADOW_HOVER = "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all";
const RETRO_BORDER = "border-2 border-black";

export default function App() {
  const [extInput, setExtInput] = useState("");
  const [extOutput, setExtOutput] = useState("");
  const [extCopied, setExtCopied] = useState(false);

  const handleExtract = () => {
    const lines = extInput.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    if (lines.length === 0) {
      setExtOutput("");
      return;
    }

    const values = lines.map(line => {
      const idx = line.indexOf(':');
      let val = idx !== -1 ? line.substring(idx + 1).trim() : line.trim();
      val = val.replace(/^[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
      return val;
    });

    const cleanNum = (str) => {
        if (!str) return "";
        return str.replace(/[^0-9]/g, '');
    };

    let result = "";
    if (values.length >= 6) {
      result = `Name:${values[0]}\nEmail:${values[1]}\nIC:${cleanNum(values[2])}\nPhone:${cleanNum(values[3])}\nParent Name:${values[4]}\nParent IC:${cleanNum(values[5])}`;
    } else if (values.length >= 4) {
      result = `Name:${values[0]}\nEmail:${values[1]}\nIC:${cleanNum(values[2])}\nPhone:${cleanNum(values[3])}`;
    } else {
      result = `[ERROR: DATA TIDAK CUKUP]\nSistem mengesan hanya ${values.length} baris data.\n\nSila pastikan:\nDewasa = 4 Baris\nJunior = 6 Baris`;
    }

    setExtOutput(result);
    setExtCopied(false);
  };

  const handleCopyExt = () => {
    if (!extOutput) return;
    const textArea = document.createElement("textarea");
    textArea.value = extOutput;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setExtCopied(true);
      setTimeout(() => setExtCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const handleClearExt = () => {
    setExtInput("");
    setExtOutput("");
    setExtCopied(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] font-sans selection:bg-[#FFD700] selection:text-black p-4 md:p-8 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
      <div className="w-full max-w-4xl mx-auto relative z-10 pb-16">
        <section className="space-y-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-[#FFD700] text-black mb-4 ${RETRO_BORDER} shadow-[4px_4px_0px_rgba(0,0,0,1)]`}>
              <RefreshCw size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-black mb-2 uppercase drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
              Customer Registration
            </h1>
            <p className="text-black font-mono font-bold text-sm bg-white px-3 py-1 inline-block border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
              Convert Contact Into Registration Format
            </p>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Input Box */}
            <div className="flex flex-col w-full">
              <div className={`bg-black text-white px-4 py-2 font-mono text-xs flex justify-between items-center border-2 border-black border-b-0`}>
                <span className="flex items-center gap-2"><FileText size={14}/> RAW_INPUT.TXT</span>
              </div>
              <textarea
                value={extInput}
                onChange={(e) => setExtInput(e.target.value)}
                placeholder={`Paste borang kat sini...\n\nContoh:\n📋 Nama: Taufik Bin Musa\n📧 Email: taufik@gmail.com\n🪪 No. IC: 123456789012\n📱 No. telefon: 60132740711`}
                className={`w-full min-h-[250px] bg-white text-black font-mono text-sm p-5 focus:outline-none focus:bg-[#FFFBE5] transition-colors resize-y placeholder:text-gray-400 ${RETRO_BORDER} ${RETRO_SHADOW}`}
              />
            </div>

            {/* Middle Controls (Horizontal) */}
            <div className="flex flex-row justify-center items-center gap-4 py-4">
              <button 
                onClick={handleExtract}
                className={`flex items-center justify-center gap-2 bg-[#FFD700] text-black font-black uppercase tracking-widest px-10 py-4 transition-all ${RETRO_BORDER} ${RETRO_SHADOW_HOVER} active:translate-y-0 active:shadow-none`}
              >
                <span>CHANGE</span>
                <ArrowDown size={24} strokeWidth={3} />
              </button>
              <button 
                onClick={handleClearExt}
                className={`bg-white text-red-500 font-bold uppercase text-xs px-6 py-4 hover:bg-red-50 transition-all ${RETRO_BORDER} shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none`}
              >
                Clear
              </button>
            </div>

            {/* Output Box */}
            <div className="flex flex-col w-full">
              <div className={`bg-black text-white px-4 py-2 font-mono text-xs flex justify-between items-center border-2 border-black border-b-0`}>
                <span className="flex items-center gap-2"><UserSquare2 size={14}/> CLEAN_DATA.EXE</span>
                {extCopied && <span className="text-[#FFD700] font-bold flex items-center gap-1"><CheckCircle2 size={12}/> COPIED!</span>}
              </div>
              <div className="relative flex flex-col w-full">
                <textarea
                  readOnly
                  value={extOutput}
                  placeholder="Data yang dah diproses akan keluar di sini..."
                  className={`w-full min-h-[250px] bg-[#FFFBE5] text-black font-mono font-bold text-base p-5 focus:outline-none transition-colors resize-y placeholder:text-gray-400 ${RETRO_BORDER} ${RETRO_SHADOW}`}
                />
                <button 
                  onClick={handleCopyExt}
                  disabled={!extOutput}
                  className={`absolute bottom-6 right-6 flex items-center gap-2 font-black uppercase px-6 py-3 transition-all ${!extOutput ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-400' : `bg-[#FFD700] text-black ${RETRO_BORDER} ${RETRO_SHADOW_HOVER} active:translate-y-0 active:shadow-none`}`}
                >
                  {extCopied ? <CheckCircle2 size={18} strokeWidth={3}/> : <Copy size={18} strokeWidth={3}/>}
                  {extCopied ? "COPIED!" : "COPY DATA"}
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
