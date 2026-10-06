import React, { useState } from "react";
import { 
  Copy, CheckCircle2, User, Phone, MessageSquare, Send, 
  MousePointerClick, MessageCircle, ArrowDown, RefreshCw, 
  FileText, UserSquare2 
} from "lucide-react";

// Reusable Retro styling classes
const RETRO_SHADOW = "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
const RETRO_SHADOW_SM = "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
const RETRO_SHADOW_HOVER = "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all";
const RETRO_BORDER = "border-2 border-black";

const TEMPLATES = [
  {
    id: 1,
    title: "MESEJ 1: GREETING",
    content: `Salam\n\nTerima kasih kerana menghubungi saya. \nSaya Taufik, Dealer Rasmi Public Gold.\n\nBoleh saya tahu nama dan berapa bajet \nyang ada untuk mulakan simpanan emas? \n(Boleh bermula serendah RM100)`
  },
  {
    id: 2,
    title: "MESEJ 2: EXPLAIN GAP",
    content: `Berdasarkan bajet [NAME], paling sesuai \nmulakan dengan Akaun Emas GAP.\n\nGold Accumulation Program (GAP) —\n✓ Mula dengan RM100 atau 1 gram\n✓ Beli & jual bila-bila masa\n✓ Tiada komitmen bulanan\n✓ Simpan dengan PG percuma, tiada had\n✓ Boleh keluarkan jadi gold bar atau \n  dinar bila-bila masa\n\nMudah, fleksibel, dan patuh syariah.`
  },
  {
    id: 3,
    title: "MESEJ 3: CONFIRM & REGISTER",
    content: `[NAME] ada sebarang soalan tentang \nakaun GAP sebelum kita proceed?\n\nKalau dah clear, saya boleh bantu \ndaftarkan akaun sekarang.\n\nProses ambil dalam 5 minit je, \ndan pendaftaran percuma. 😊`
  },
  {
    id: 4,
    title: "MESEJ 4: INFO COLLECTION",
    content: `Untuk saya daftarkan, boleh kongsikan \nmaklumat berikut:\n\n📋 Nama penuh (ikut IC):\n📧 Email:\n🪪 No. IC (12 digit):\n📱 No. telefon:\n\nMaklumat ini hanya digunakan untuk \npendaftaran akaun Public Gold sahaja.`
  },
  {
    id: 5,
    title: "MESEJ 5: REGISTRATION SUCCESS",
    content: `Alhamdulillah, akaun [NAME] dah berjaya \ndidaftarkan! 🎉\n\nSekarang kita proceed ke langkah \nseterusnya untuk aktifkan akaun.`
  },
  {
    id: 6,
    title: "MESEJ 6: APP DOWNLOAD",
    content: `Untuk buat transaksi dengan lebih \nmudah, download apps Public Gold dulu:\n\nAndroid 📱\nhttps://play.google.com/store/apps/details?id=com.pgmapp.publicgold\n\niOS 🍎\nhttps://apps.apple.com/my/app/public-gold/id1591580964`
  },
  {
    id: 7,
    title: "MESEJ 7: LOGIN GUIDE",
    content: `Untuk login kali pertama:\n- Username: No. IC (12 digit, tanpa dash)\n- Password: No. IC (12 digit, tanpa dash)\n\nSistem akan hantar TAC dari PG untuk \nPengesahan.`
  },
  {
    id: 8,
    title: "MESEJ 8: FIRST PURCHASE",
    content: `Lepas login, aktifkan akaun dengan \npembelian minimum RM100:\n\nKlik Top-Up > Pilih FPX > Bayar\n\nLepas berjaya beli, [NAME] akan dapat \nPG CODE melalui email — tu username \nbaru yang kekal.\n\nUntuk panduan visual:\nhttps://publicgoldofficial.com/taufikmusa/gap-fpx`
  },
  {
    id: 9,
    title: "MESEJ 9: CONFIRMATION & SUPPORT",
    content: `Bila dah berjaya buat pembelian pertama, \nbagitahu saya — saya akan invite [NAME] \njoin support group dan guide cara \ntingkatkan tabungan emas dengan cepat.`
  },
  {
    id: 10,
    title: "MESEJ 10: REWARD & CLOSING",
    content: `🎉 Tahniah [NAME]! Selamat mengumpul \nemas bersama lebih 1.1 juta penyimpan \ndalam G100 Network.\n\nSebagai tanda penghargaan, saya \nhadiahkan beberapa sumber percuma:\n\n📖 Ebook Emas & Public Gold\n🔗 https://publicgoldofficial.com/taufikmusa/ebook\n\n💬 WhatsApp Group VIP\n🔗 https://chat.whatsapp.com/JN5GFxR2d3I05akgmRHFxs\n\n🎥 Tutorial Public Gold\n🔗 https://publicgoldofficial.com/taufikmusa/tutorial\n\n✅ Checklist Penyimpan Emas Berilmu\n🔗 https://publicgoldofficial.com/taufikmusa/checklist\n\n📚 Buku Wang Emas & Misi Bebas Hutang\n🔗 https://pgmall.my/p/N108/0071?referralPgCode=taufikbinmusa14@gmail.com\n\nSemoga simpanan emas [NAME] terus \nbertambah. Saya sentiasa ada kalau \nada pertanyaan! 🚀`
  },
  {
    id: 11,
    title: "MESEJ 11: PRIVATE WEBINAR (GROUP)",
    content: `Guru emas saya akan sampaikan Private Webinar "Membina Satu Juta Pertama".\n\nGuru emas yang saya maksudkan ialah Tuan Mohd Zulkifli Shafie. Boleh stalk FB beliau di www.fb.com/mohdzulkifli.shafie. Beliau antara guru kewangan yang disegani di Malaysia.\n\n✅ Penulis buku best seller iaitu buku Misi Bebas Hutang dan Wang Emas.\n✅ Membimbing lebih 9,000 orang penyimpan emas dan mempunyai lebih 800,000 anak didik dari Malaysia, Indonesia, Singapura dan Brunei.\n\nAntara topik yang akan dikongsikan dalam Private Webinar:\n\n⏺ Simpanan sebagai asas membina kekayaan.\n⏺ Bagaimana emas membentuk disiplin menabung, dan mengekalkan tabungan.\n⏺ Cara mengira jumlah tabungan yang cukup untuk capai "financial freedom".\n⏺ Cara pantas mengembangkan kekayaan dan kesilapan yang sering dilakukan untuk mengembangkan kekayaan.\n\nBagi Tuan & Puan yang serius ingin jadikan simpanan emas sebagai back up kewangan, wajib hadir Private Webinar ini.\n\nYuran pendaftaran adalah RM50. Cuma untuk team kita, Alhamdulillah Tuan Zulkifli offer *5 tiket percuma* kerana saya adalah salah seorang anak didik beliau.\n\nBagi sesiapa yang nak tambah ilmu dan belajar direct dengan beliau, boleh daftar di link di bawah.\n\nLINK PENDAFTARAN\nhttps://pg2u.my/app/pw/taufikmusa`
  },
  {
    id: 12,
    title: "MESEJ 12: PRIVATE WEBINAR (PERSONAL)",
    content: `Salam [NAME],\n\nKalau nak belajar tingkatkan jumlah TABUNGAN, selesaikan masalah HUTANG dan bina HARTA sampai RM 1 Juta Pertama, jemput join ke Private Webinar Membina Satu Juta Pertama.\n\nSesi ini bernilai tapi setiap penyimpan emas saya dapat FREE access sekali saja.\nTerhad kepada 1000 peserta pertama sahaja.\n\nDaftar sekarang untuk claim tiket anda:\n\nLINK PENDAFTARAN\nhttps://pg2u.my/app/pw/taufikmusa`
  }
];

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentMessage, setCurrentMessage] = useState(TEMPLATES[0].content);
  
  const [copiedId, setCopiedId] = useState(null);
  const [appliedId, setAppliedId] = useState(null);
  const [waError, setWaError] = useState("");

  const [extInput, setExtInput] = useState("");
  const [extOutput, setExtOutput] = useState("");
  const [extCopied, setExtCopied] = useState(false);

  const processText = (text) => {
    const prospectName = name.trim() !== "" ? name : "[NAME]";
    return text.replace(/\[NAME\]/g, prospectName);
  };

  const copyToClipboard = (text, id) => {
    const final_text = processText(text);
    const textArea = document.createElement("textarea");
    textArea.value = final_text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const applyTemplate = (text, id) => {
    setCurrentMessage(processText(text));
    setAppliedId(id);
    setTimeout(() => setAppliedId(null), 2000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    if (!phone.trim()) {
      setWaError("Sila masukkan No. Telefon prospek dahulu.");
      setTimeout(() => setWaError(""), 3000);
      return;
    }
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '6' + cleanPhone;
    }
    const encodedText = encodeURIComponent(currentMessage);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

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
      {/* Decorative Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="w-full max-w-4xl mx-auto relative z-10 space-y-24 animate-in fade-in zoom-in-95 duration-300 pb-16">
        
        {/* =========================================
            SECTION 1: PROSPECT SCRIPT 
            ========================================= */}
        <section className="space-y-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-[#FFD700] text-black mb-4 ${RETRO_BORDER} shadow-[4px_4px_0px_rgba(0,0,0,1)]`}>
              <MessageSquare size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-black mb-2 uppercase drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
              Prospect Script
            </h1>
            <p className="text-black font-mono font-bold text-sm bg-white px-3 py-1 inline-block border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
              WhatsApp Template Manager
            </p>
          </div>

          <div className={`bg-white p-6 ${RETRO_BORDER} ${RETRO_SHADOW} space-y-6`}>
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-bold flex items-center gap-2 text-sm uppercase">
                  <User size={16} /> Name
                </label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="En. Taufik"
                  className={`w-full p-3 font-mono text-sm bg-[#FFFBE5] outline-none focus:bg-[#FFD700]/20 ${RETRO_BORDER}`}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold flex items-center gap-2 text-sm uppercase">
                  <Phone size={16} /> Phone No
                </label>
                <input 
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="60132740711"
                  className={`w-full p-3 font-mono text-sm bg-[#FFFBE5] outline-none focus:bg-[#FFD700]/20 ${RETRO_BORDER}`}
                />
              </div>
            </div>

            <hr className="border-black border-t-2" />

            {/* Active Editor */}
            <div className="space-y-4">
              <label className="font-bold flex items-center gap-2 text-sm uppercase">
                <MessageCircle size={16} /> Mesej Semasa
              </label>
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className={`w-full h-64 p-4 font-mono text-sm leading-relaxed bg-[#F0FDF4] outline-none resize-y ${RETRO_BORDER} focus:bg-[#DCFCE7] transition-colors`}
                placeholder="Taip mesej atau pilih template di bawah..."
              />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
                {waError && (
                  <span className="text-red-600 font-bold text-sm mr-auto animate-pulse">
                    {waError}
                  </span>
                )}
                <button 
                  onClick={() => copyToClipboard(currentMessage, 'editor')}
                  className={`flex-1 sm:flex-none flex justify-center items-center gap-2 bg-white text-black font-bold uppercase px-6 py-3 ${RETRO_BORDER} ${RETRO_SHADOW_HOVER}`}
                >
                  {copiedId === 'editor' ? <CheckCircle2 size={18} className="text-green-600"/> : <Copy size={18} />}
                  {copiedId === 'editor' ? "COPIED!" : "COPY TEXT"}
                </button>
                <button 
                  onClick={handleWhatsApp}
                  className={`flex-1 sm:flex-none flex justify-center items-center gap-2 bg-[#25D366] text-black font-black uppercase px-8 py-3 ${RETRO_BORDER} ${RETRO_SHADOW_HOVER}`}
                >
                  <Send size={18} />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* TEMPLATES LIST */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black uppercase bg-black text-white px-4 py-1 border-2 border-black shadow-[4px_4px_0px_rgba(255,215,0,1)]">
                Template Library
              </h2>
              <div className="h-1 bg-black flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEMPLATES.map((tpl) => (
                <div key={tpl.id} className={`bg-white flex flex-col ${RETRO_BORDER} shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-transform duration-200`}>
                  <div className="bg-[#FFD700] border-b-2 border-black p-3 font-bold flex justify-between items-center">
                    <span className="truncate pr-2">{tpl.title}</span>
                  </div>
                  <div className="p-4 flex-1">
                    <p className="font-mono text-xs text-gray-700 whitespace-pre-wrap line-clamp-4">
                      {processText(tpl.content)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 border-t-2 border-black bg-gray-50">
                    <button 
                      onClick={() => applyTemplate(tpl.content, tpl.id)}
                      className={`p-3 text-sm font-bold flex items-center justify-center gap-2 border-r-2 border-black hover:bg-[#FFD700] transition-colors ${appliedId === tpl.id ? 'bg-[#FFD700]' : ''}`}
                    >
                      {appliedId === tpl.id ? <CheckCircle2 size={16} /> : <MousePointerClick size={16} />}
                      {appliedId === tpl.id ? "APPLIED" : "APPLY"}
                    </button>
                    <button 
                      onClick={() => copyToClipboard(tpl.content, tpl.id)}
                      className="p-3 text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                      {copiedId === tpl.id ? <CheckCircle2 size={16} className="text-green-600"/> : <Copy size={16} />}
                      {copiedId === tpl.id ? "COPIED" : "COPY"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            DIVIDER
            ========================================= */}
        <div className="flex items-center justify-center space-x-6 py-4">
          <div className="h-1 bg-black/20 flex-1"></div>
          <div className="flex items-center space-x-2 text-black/40">
             <span className="block w-2 h-2 bg-black rounded-full"></span>
             <span className="block w-2 h-2 bg-black rounded-full"></span>
             <span className="block w-2 h-2 bg-black rounded-full"></span>
          </div>
          <div className="h-1 bg-black/20 flex-1"></div>
        </div>

        {/* =========================================
            SECTION 2: DATA EXTRACTOR 
            ========================================= */}
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

        {/* Global Footer */}
        <div className="mt-16 text-center font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <span>Developed for Public Gold Dealers | Taufik Musa</span>
        </div>

      </div>
    </div>
  );
}