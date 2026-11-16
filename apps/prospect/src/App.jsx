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

const WA_TEMPLATES = [
  {
    id: "wa-1",
    title: "FASA 1: SAMBUT & KENALI",
    content: `Assalamualaikum dan salam kenal!

Terima kasih kerana menghubungi saya.

Saya Taufik, Dealer Rasmi Public Gold.

Insya-Allah, saya boleh bantu terangkan bagaimana simpanan emas berfungsi dan bagaimana kita boleh mula membina simpanan secara berperingkat.

Boleh saya tahu nama Cik/Tuan?

Dan satu lagi, adakah ini kali pertama Cik/Tuan nak mula menyimpan emas?`
  },
  {
    id: "wa-2",
    title: "FASA 2A: TUJUAN SIMPANAN",
    content: `Baik, [NAME].

Sebelum saya cadangkan cara yang sesuai, boleh saya tahu apa tujuan utama [NAME] nak mula menyimpan emas?

Adakah untuk:

- Simpanan jangka panjang?
- Persediaan pendidikan anak?
- Dana kecemasan?
- Persediaan persaraan?
- Atau sekadar nak mula membina aset?

Saya tanya supaya saya boleh bantu cadangkan kaedah simpanan yang sesuai dengan kemampuan dan matlamat [NAME].`
  },
  {
    id: "wa-3",
    title: "FASA 2B: BAJET (BILA PERLU)",
    content: `Untuk permulaan, berapa bajet yang [NAME] selesa peruntukkan untuk simpanan emas?

Tak perlu besar pun. Di Public Gold, kita boleh mula dengan serendah RM100 melalui akaun GAP.`
  },
  {
    id: "wa-4",
    title: "FASA 3: PERKENALKAN GAP",
    content: `Berdasarkan apa yang [NAME] kongsikan tadi, saya cadangkan kita kenali dahulu satu kemudahan simpanan emas yang disediakan oleh Public Gold, iaitu Gold Accumulation Program (GAP).

Apa yang menarik tentang GAP?

1. Boleh mula menyimpan serendah RM100.
2. Tak perlu beli gold bar secara fizikal untuk mula mengumpul emas.
3. Boleh tambah simpanan mengikut kemampuan.
4. Tiada komitmen bulanan.
5. Tiada had maksimum simpanan gram.
6. Boleh menjual semula emas melalui Public Gold.
7. Boleh membuat penebusan dalam bentuk gold bar atau dinar, tertakluk kepada denominasi, premium dan syarat penebusan.

Simpanan emas ini juga mempunyai pengesahan patuh syariah.

Konsepnya mudah. Kita kumpul gram emas sedikit demi sedikit mengikut kemampuan, tanpa perlu tunggu ada modal yang besar.`
  },
  {
    id: "wa-5",
    title: "FASA 4A: SEMAK KEFAHAMAN",
    content: `Setakat ini, jelas tak bagaimana konsep simpanan GAP berfungsi, [NAME]?

Ada mana-mana bahagian yang [NAME] nak saya terangkan dengan lebih lanjut?

Saya lebih suka [NAME] faham dahulu bagaimana simpanan ini berfungsi sebelum membuat keputusan.`
  },
  {
    id: "wa-6",
    title: "FASA 4B: JIKA DAH JELAS & NAK DAFTAR",
    content: `Alhamdulillah.

Kalau [NAME] dah bersedia, saya boleh bantu tunjukkan cara membuka akaun Public Gold.

Pendaftaran akaun adalah percuma dan prosesnya agak mudah.

Saya akan guide [NAME] satu persatu sampai berjaya membuat pembelian pertama.`
  },
  {
    id: "wa-7",
    title: "FASA 5: PROSES PENDAFTARAN",
    content: `Baik [NAME], kita teruskan dengan pendaftaran akaun.

Untuk pendaftaran, [NAME] perlukan beberapa maklumat asas seperti:

- Nama penuh mengikut IC
- Nombor kad pengenalan
- Email
- Nombor telefon

Saya akan tunjukkan cara mengisi maklumat tersebut melalui saluran pendaftaran Public Gold.

Pastikan semua maklumat yang dimasukkan adalah tepat supaya proses pengesahan akaun berjalan lancar.`
  },
  {
    id: "wa-8",
    title: "FASA 6: AKAUN BERJAYA DIDAFTAR",
    content: `Alhamdulillah! Akaun Public Gold [NAME] dah berjaya didaftarkan.

Tahniah kerana dah mengambil langkah pertama untuk mula membina simpanan emas.

Sekarang kita teruskan dengan proses pengaktifan akaun melalui pembelian pertama.`
  },
  {
    id: "wa-9",
    title: "FASA 7: DOWNLOAD APLIKASI",
    content: `Untuk memudahkan [NAME] menguruskan simpanan emas, boleh download aplikasi rasmi Public Gold terlebih dahulu.

Android:
https://play.google.com/store/apps/details?id=com.pgmapp.publicgold

iPhone:
https://apps.apple.com/my/app/public-gold/id1591580964

Selepas selesai install, kita boleh teruskan dengan login kali pertama.`
  },
  {
    id: "wa-10",
    title: "FASA 8: LOGIN KALI PERTAMA",
    content: `Untuk login kali pertama:

Username: Nombor IC 12 digit tanpa dash.

Password: Nombor IC 12 digit tanpa dash, jika ditetapkan begitu oleh sistem pendaftaran.

Selepas itu, ikut arahan pengesahan yang diberikan oleh sistem Public Gold melalui TAC.

Penting: Jangan kongsikan password atau nombor TAC dengan sesiapa, termasuk saya.`
  },
  {
    id: "wa-11",
    title: "FASA 9: PEMBELIAN PERTAMA",
    content: `Seterusnya, kita aktifkan akaun dengan membuat pembelian pertama melalui GAP.

Langkah-langkahnya:

1. Login ke aplikasi Public Gold.
2. Pilih menu Top-Up.
3. Pilih pembayaran FPX.
4. Masukkan jumlah pembelian, minimum RM100.
5. Teruskan pembayaran melalui online banking.

Selepas transaksi berjaya, semak email daripada Public Gold untuk mendapatkan PG Code.

PG Code ini akan menjadi username baharu untuk login seterusnya.

Saya sertakan panduan bergambar supaya lebih mudah:

https://pg2u.my/taufikmusa/gap-fpx

Kalau ada sebarang masalah semasa proses ini, beritahu saya. Saya bantu guide.`
  },
  {
    id: "wa-12",
    title: "FASA 10: SELEPAS PEMBELIAN PERTAMA",
    content: `Alhamdulillah! Macam mana, dah berjaya buat pembelian pertama?

Tahniah [NAME]!

Sekarang [NAME] dah mula memiliki simpanan emas sendiri.

Saya akan bantu invite [NAME] ke dalam support group supaya boleh belajar lebih banyak tentang ilmu simpanan emas, pengurusan kewangan dan cara membina tabungan secara konsisten.

Ingat, matlamat kita bukan sekadar membeli emas. Matlamat kita ialah membina tabungan yang lebih kukuh untuk masa depan.`
  },
  {
    id: "wa-13",
    title: "FASA 11: HADIAH & BAHAN PEMBELAJARAN",
    content: `Sebagai tanda penghargaan kerana memilih untuk memulakan perjalanan simpanan emas bersama saya, saya nak kongsikan beberapa bahan pembelajaran percuma untuk [NAME].

Antaranya:

📖 Ebook Emas & Public Gold
https://pg2u.my/taufikmusa/ebook

💬 WhatsApp Group VIP
https://chat.whatsapp.com/JN5GFxR2d3I05akgmRHFxs

🎥 Tutorial Public Gold
https://pg2u.my/taufikmusa/tutorial

✅ Checklist Penyimpan Emas Berilmu
https://pg2u.my/taufikmusa/checklist

📚 Buku Wang Emas & Misi Bebas Hutang
https://pgmall.my/p/N108/0071?referralPgCode=taufikbinmusa14@gmail.com

Saya galakkan [NAME] manfaatkan bahan-bahan ini untuk tambah ilmu.

Semoga perjalanan simpanan emas [NAME] dipermudahkan dan terus konsisten.

Selamat menyimpan emas!`
  },
  {
    id: "wa-14",
    title: "FASA 12: JEMPUTAN WEBINAR (OPSYENAL)",
    note: "Sahkan yuran, tiket percuma dan kuota setiap sesi webinar sebelum guna.",
    content: `Satu lagi perkongsian yang saya nak jemput [NAME] sertai.

Guru emas saya, Tuan Mohd Zulkifli Shafie, turut berkongsi ilmu melalui Private Webinar bertajuk:

MEMBINA SATU JUTA PERTAMA

Beliau merupakan penulis buku Misi Bebas Hutang dan Wang Emas, serta aktif membimbing masyarakat dalam ilmu kewangan dan simpanan emas.

Antara topik yang akan dikongsikan:

1. Simpanan sebagai asas membina kekayaan.
2. Bagaimana emas membantu membentuk disiplin menabung.
3. Cara mengira jumlah tabungan untuk mencapai kebebasan kewangan.
4. Strategi mengembangkan kekayaan dan kesilapan yang perlu dielakkan.

Saya sendiri banyak belajar daripada perkongsian beliau.

Kalau [NAME] berminat untuk mendalami ilmu kewangan dan membina kekayaan, boleh lihat maklumat webinar di sini:

https://pg2u.my/app/pw/taufikmusa

Semak maklumat sesi, yuran dan kelayakan tiket percuma yang ditawarkan sebelum membuat pendaftaran.`
  }
];

const DM_TEMPLATES = [
  {
    id: "dm-0",
    title: "DM PERTAMA",
    content: `Salam Cik. Terima kasih sebab follow akaun saya.

Saya nak kongsikan sedikit ilmu tentang bagaimana kita boleh bina simpanan jangka panjang menggunakan emas.

Mungkin ada beberapa perkara tentang simpanan emas yang Cik belum tahu.

Kalau Cik terbuka untuk tambah ilmu, saya boleh luangkan masa 5 minit untuk terangkan secara ringkas bagaimana nak mulakan simpanan emas di Public Gold.`
  },
  {
    id: "dm-1",
    title: "STEP 1: SAMBUT JAWAPAN \"YA\"",
    content: `Alhamdulillah, terima kasih Cik.

Sebelum saya terangkan, boleh saya tahu satu perkara?

Cik pernah menyimpan emas sebelum ini atau masih belum pernah mencuba?

Saya tanya supaya saya boleh terangkan ikut tahap pengetahuan Cik. Tak naklah saya cerita benda yang Cik dah tahu.`
  },
  {
    id: "dm-2",
    title: "STEP 2A: BELUM PERNAH SIMPAN EMAS",
    content: `Oh, tak apa Cik. Sebenarnya ramai yang baru nak mula pun bermula dari kosong.

Perkara pertama yang Cik perlu tahu, simpanan emas bukan bertujuan untuk cepat kaya. Ia lebih kepada usaha membina aset dan mengekalkan nilai simpanan untuk jangka panjang.

Di Public Gold, kita ada satu kemudahan dipanggil Gold Accumulation Program (GAP), yang membolehkan kita mula menyimpan emas serendah RM100.`
  },
  {
    id: "dm-3",
    title: "STEP 2B: PERNAH SIMPAN EMAS",
    content: `Oh, bagus Cik. Maknanya Cik dah ada sedikit pengalaman dengan emas.

Boleh saya tahu, sebelum ini Cik simpan emas dalam bentuk barang kemas, gold bar atau akaun simpanan emas?

Sebab setiap jenis simpanan emas ada kelebihan dan perkara yang kita perlu faham.`
  },
  {
    id: "dm-4",
    title: "STEP 3: PERKENALKAN GAP",
    content: `Sebenarnya, melalui GAP Public Gold, kita tak perlu keluarkan modal besar untuk mula menyimpan emas.

Kita boleh tambah simpanan mengikut kemampuan, bermula RM100.

Setiap pembelian akan ditukarkan kepada gram emas dan direkodkan dalam akaun GAP kita.

Apabila gram dah terkumpul, kita boleh terus simpan, jual semula kepada Public Gold atau keluarkan dalam bentuk emas fizikal tertakluk kepada syarat penebusan.

Jadi, kita boleh bina simpanan emas sedikit demi sedikit tanpa perlu tunggu ada duit yang banyak.`
  },
  {
    id: "dm-5",
    title: "STEP 4: BUKA RUANG UNTUK TINDAKAN",
    content: `Setakat ni, jelas tak bagaimana konsep simpanan GAP ni berfungsi?

Kalau Cik rasa kaedah ini sesuai dengan matlamat simpanan Cik, saya boleh bantu tunjukkan cara untuk buka akaun dan bagaimana nak mula menyimpan.`
  },
  {
    id: "dm-6",
    title: "BRIDGE: TIKTOK / DM KE WHATSAPP",
    note: "Selepas ni sambung guna Fasa 5 dan seterusnya dalam Mod 1.",
    content: `Baik, terima kasih kerana sudi belajar bersama saya.

Sebelum kita teruskan pendaftaran, saya nak pastikan Cik dah jelas tentang konsep simpanan emas GAP dan bagaimana ia berfungsi.

Kalau semuanya dah jelas dan Cik memang bersedia untuk mula, saya boleh bantu tunjukkan proses pembukaan akaun.

Kita buat satu persatu, tak perlu tergesa-gesa.`
  }
];

const MODES = {
  wa: {
    label: "1. Prospect WhatsApp Saya",
    short: "Prospek WhatsApp saya sendiri",
    tip: "Hantar satu mesej, tunggu jawapan, kemudian sambung. Jangan hantar semua fasa sekali gus.",
    templates: WA_TEMPLATES,
  },
  dm: {
    label: "2. Saya Terjah & DM Prospek",
    short: "Saya terjah dan DM prospek",
    tip: "Bina perbualan dulu, jangan cuba close orang yang belum nampak value. Satu mesej satu masa.",
    templates: DM_TEMPLATES,
  },
};

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState("wa");
  const [currentMessage, setCurrentMessage] = useState(WA_TEMPLATES[0].content);
  
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

          {/* Mode switcher */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(MODES).map(([k, m]) => (
                <button
                  key={k}
                  onClick={() => { setMode(k); setCurrentMessage(m.templates[0].content); }}
                  className={`p-4 text-left font-black uppercase text-sm ${RETRO_BORDER} transition-all ${mode === k ? `bg-[#FFD700] ${RETRO_SHADOW}` : 'bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'}`}
                >
                  {m.label}
                  <span className="block mt-1 font-mono font-bold text-[11px] normal-case text-black/60">{m.short}</span>
                </button>
              ))}
            </div>
            <p className={`bg-[#FFFBE5] ${RETRO_BORDER} px-3 py-2 font-mono text-xs font-bold`}>💡 {MODES[mode].tip}</p>
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
                Template Library · {mode === "wa" ? "Mod 1" : "Mod 2"}
              </h2>
              <div className="h-1 bg-black flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MODES[mode].templates.map((tpl) => (
                <div key={tpl.id} className={`bg-white flex flex-col ${RETRO_BORDER} shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-transform duration-200`}>
                  <div className="bg-[#FFD700] border-b-2 border-black p-3 font-bold flex justify-between items-center">
                    <span className="truncate pr-2">{tpl.title}</span>
                  </div>
                  <div className="p-4 flex-1">
                    <p className="font-mono text-xs text-gray-700 whitespace-pre-wrap line-clamp-4">
                      {processText(tpl.content)}
                    </p>
                    {tpl.note && <p className="mt-2 font-mono text-[10px] font-bold text-red-600 uppercase">⚠ {tpl.note}</p>}
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