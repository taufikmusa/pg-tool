import React, { useState, useEffect } from "react";
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

const GROUPS = {
  terjah: {
    label: "1. Terjah",
    short: "Prospek yang aku terjah / DM",
    tip: "Bina perbualan dulu, jangan close orang yang belum nampak value. Hantar satu mesej, tunggu jawapan, kemudian sambung.",
    templates: [
      { id: "terjah-1", title: "SAMBUT FOLLOWER", content: `Salam {panggilan}. Tahniah kerana mula mengikuti perkongsian saya.

Saya banyak berkongsi ilmu tentang kewangan dan simpanan emas.

Kalau {panggilan} berminat, saya boleh luangkan masa untuk berikan penerangan percuma tentang bagaimana nak mula menyimpan emas di Public Gold.

{panggilan} nak saya kongsikan sedikit penerangan?` },
      { id: "terjah-2", title: "SOAL: PERNAH SIMPAN EMAS?", content: `Alhamdulillah, terima kasih {panggilan}.

Sebelum saya terangkan, boleh saya tahu satu perkara?

{panggilan} pernah menyimpan emas sebelum ini atau masih belum pernah mencuba?

Saya tanya supaya saya boleh terangkan ikut tahap pengetahuan {panggilan}. Tak naklah saya cerita benda yang {panggilan} dah tahu.` },
      { id: "terjah-3", title: "JAWAB: BELUM PERNAH", content: `Oh, tak apa {panggilan}. Sebenarnya ramai yang baru nak mula pun bermula dari kosong.

Perkara pertama yang {panggilan} perlu tahu, simpanan emas bukan bertujuan untuk cepat kaya. Ia lebih kepada usaha membina aset dan mengekalkan nilai simpanan untuk jangka panjang.

Di Public Gold, kita ada satu kemudahan dipanggil Gold Accumulation Program (GAP), yang membolehkan kita mula menyimpan emas serendah RM100.` },
      { id: "terjah-4", title: "JAWAB: PERNAH SIMPAN", content: `Oh, bagus {panggilan}. Maknanya {panggilan} dah ada sedikit pengalaman dengan emas.

Boleh saya tahu, sebelum ini {panggilan} simpan emas dalam bentuk barang kemas, gold bar atau akaun simpanan emas?

Sebab setiap jenis simpanan emas ada kelebihan dan perkara yang kita perlu faham.` },
      { id: "terjah-5", title: "PERKENALKAN GAP", content: `Sebenarnya, melalui GAP Public Gold, kita tak perlu keluarkan modal besar untuk mula menyimpan emas.

Kita boleh tambah simpanan mengikut kemampuan, bermula RM100.

Setiap pembelian akan ditukarkan kepada gram emas dan direkodkan dalam akaun GAP kita.

Apabila gram dah terkumpul, kita boleh terus simpan, jual semula kepada Public Gold atau keluarkan dalam bentuk emas fizikal tertakluk kepada syarat penebusan.

Jadi, kita boleh bina simpanan emas sedikit demi sedikit tanpa perlu tunggu ada duit yang banyak.` },
      { id: "terjah-6", title: "SEMAK KEFAHAMAN", content: `Setakat ni, jelas tak bagaimana konsep simpanan GAP ni berfungsi?

Kalau {panggilan} rasa kaedah ini sesuai dengan matlamat simpanan {panggilan}, saya boleh bantu tunjukkan cara untuk buka akaun dan bagaimana nak mula menyimpan.` },
      { id: "terjah-7", title: "TAWAR BUKA AKAUN", content: `Alhamdulillah.

Kalau {panggilan} dah bersedia, saya boleh bantu tunjukkan cara membuka akaun Public Gold.

Pendaftaran akaun adalah percuma dan prosesnya agak mudah.

Saya akan guide {panggilan} satu persatu sampai berjaya membuat pembelian pertama.` },
    ],
  },
  lead: {
    label: "2. Lead",
    short: "Prospek yang masuk WhatsApp sendiri",
    tip: "Kenali prospek dulu. Hantar satu mesej satu masa, jangan hantar semua sekali gus.",
    templates: [
      { id: "lead-1", title: "SAMBUT & KENALI", content: `Salam Cik,

Saya Taufik, Dealer Rasmi Public Gold.

Insya-Allah, saya boleh bantu terangkan bagaimana simpanan emas berfungsi dan bagaimana kita boleh mula membina simpanan secara berperingkat.

Boleh saya tahu nama Cik?

Dan satu lagi, adakah ini kali pertama Cik nak mula menyimpan emas?` },
      { id: "lead-2", title: "TUJUAN SIMPANAN", content: `Baik {panggilan},

Sebelum saya cadangkan cara yang sesuai, boleh saya tahu apa tujuan utama {panggilan} nak mula menyimpan emas?

Adakah untuk:

- Simpanan jangka panjang?
- Persediaan pendidikan anak?
- Dana kecemasan?
- Persediaan persaraan?
- Atau sekadar nak mula membina aset?

Saya tanya supaya saya boleh bantu cadangkan kaedah simpanan yang sesuai dengan kemampuan dan matlamat {panggilan}` },
      { id: "lead-3", title: "BAJET", content: `Untuk permulaan, berapa bajet yang {panggilan} selesa peruntukkan untuk simpanan emas?

Tak perlu besar pun. Di Public Gold, kita boleh mula dengan serendah RM100 melalui akaun GAP.` },
      { id: "lead-4", title: "PERKENALKAN GAP", content: `Berdasarkan apa yang {panggilan} kongsikan tadi, saya cadangkan kita kenali dahulu satu kemudahan simpanan emas yang disediakan oleh Public Gold, iaitu Gold Accumulation Program (GAP).

Apa yang menarik tentang GAP?

1. Boleh mula menyimpan serendah RM100.
2. Tak perlu beli gold bar secara fizikal untuk mula mengumpul emas.
3. Boleh tambah simpanan mengikut kemampuan.
4. Tiada komitmen bulanan.
5. Tiada had maksimum simpanan gram.
6. Boleh jual semula emas melalui di Apps
7. Boleh keluarkan emas dalam bentuk gold bar atau dinar malah barang kemas, tertakluk kepada berat gram terkumpul

Simpanan emas ini juga mempunyai pengesahan patuh syariah.

Konsepnya mudah. Kita kumpul gram emas sedikit demi sedikit mengikut kemampuan, tanpa perlu tunggu ada modal yang besar.` },
      { id: "lead-5", title: "SEMAK KEFAHAMAN", content: `Setakat ini, jelas tak bagaimana konsep simpanan GAP berfungsi, {panggilan}?

Ada mana-mana bahagian yang {panggilan} nak saya terangkan dengan lebih lanjut?

Saya lebih suka {panggilan} faham dahulu bagaimana simpanan ini berfungsi sebelum membuat keputusan.` },
      { id: "lead-6", title: "TAWAR BUKA AKAUN", content: `Alhamdulillah.

Kalau {panggilan} dah bersedia, saya boleh bantu tunjukkan cara membuka akaun Public Gold.

Pendaftaran akaun adalah percuma dan prosesnya agak mudah.

Saya akan guide {panggilan} satu persatu sampai berjaya membuat pembelian pertama.` },
    ],
  },
  close: {
    label: "3. Close",
    short: "Bantu daftar, aktifkan akaun & selepas beli",
    tip: "Pastikan prospek faham dan bersedia sebelum masuk langkah pendaftaran.",
    templates: [
      { id: "close-1", title: "PILIHAN PENDAFTARAN", content: `Baik {panggilan}, kalau dah bersedia, kita boleh teruskan dengan pembukaan akaun Public Gold.

Ada 2 cara, {panggilan} boleh pilih mana yang lebih mudah:

OPTION 1 – DAFTAR SENDIRI

{panggilan} boleh daftar terus melalui link rasmi Public Gold di bawah:

https://publicgold.com.my/index.php?route=account/register&intro_pgcode=PG00359605&is_dealer=1

Ikut sahaja arahan yang diberikan dalam sistem.

OPTION 2 – SAYA BANTU DAFTARKAN

Kalau {panggilan} lebih selesa saya bantu uruskan pendaftaran, boleh kongsikan maklumat berikut:

Nama penuh:
Email:
No. IC:
No. Telefon:

Maklumat ini digunakan untuk tujuan pendaftaran akaun Public Gold sahaja.

Mana satu yang lebih mudah untuk {panggilan}? Saya sedia bantu.` },
      { id: "close-2", title: "AKAUN BERJAYA DIDAFTAR", content: `Alhamdulillah! Akaun Public Gold {panggilan} dah berjaya didaftarkan.

Tahniah kerana dah mengambil langkah pertama untuk mula membina simpanan emas.

Sekarang kita teruskan dengan proses pengaktifan akaun melalui pembelian pertama.` },
      { id: "close-3", title: "DOWNLOAD APLIKASI", content: `Untuk memudahkan {panggilan} menguruskan simpanan emas, boleh download aplikasi rasmi Public Gold terlebih dahulu.

Android:
https://play.google.com/store/apps/details?id=com.pgmapp.publicgold

iPhone:
https://apps.apple.com/my/app/public-gold/id1591580964

Selepas selesai install, kita boleh teruskan dengan login kali pertama.` },
      { id: "close-4", title: "LOGIN KALI PERTAMA", content: `Untuk login kali pertama:

Username: Nombor IC 12 digit tanpa dash.

Password: Nombor IC 12 digit tanpa dash, jika ditetapkan begitu oleh sistem pendaftaran.

Selepas itu, ikut arahan pengesahan yang diberikan oleh sistem Public Gold melalui TAC.

Penting: Jangan kongsikan password atau nombor TAC dengan sesiapa, termasuk saya.` },
      { id: "close-5", title: "PEMBELIAN PERTAMA", content: `Seterusnya, kita aktifkan akaun dengan membuat pembelian pertama melalui GAP.

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

Kalau ada sebarang masalah semasa proses ini, beritahu saya. Saya bantu guide.` },
      { id: "close-6", title: "SELEPAS PEMBELIAN PERTAMA", content: `Alhamdulillah! Macam mana, dah berjaya buat pembelian pertama?

Tahniah {panggilan}!

Sekarang {panggilan} dah mula memiliki simpanan emas sendiri.

Saya akan bantu invite {panggilan} ke dalam support group supaya boleh belajar lebih banyak tentang ilmu simpanan emas, pengurusan kewangan dan cara membina tabungan secara konsisten.

Ingat, matlamat kita bukan sekadar membeli emas. Matlamat kita ialah membina tabungan yang lebih kukuh untuk masa depan.` },
      { id: "close-7", title: "BAHAN PEMBELAJARAN PERCUMA", content: `Sebagai tanda penghargaan kerana memilih untuk memulakan perjalanan simpanan emas bersama saya, saya nak kongsikan beberapa bahan pembelajaran percuma untuk {panggilan}.

Antaranya:

📖 Ebook Emas & Public Gold
https://pg2u.my/taufikmusa/ebook

💬 WhatsApp Group VIP
https://chat.whatsapp.com/JN5GFxR2d3I05akgmRHFxs

🎥 Tutorial Public Gold
https://pg2u.my/taufikmusa/tutorial

✅ Checklist Penyimpan Emas Berilmu
https://pg2u.my/taufikmusa/checklist

Saya galakkan {panggilan} manfaatkan bahan-bahan ini untuk tambah ilmu.

Semoga perjalanan simpanan emas {panggilan} dipermudahkan dan terus konsisten.

Selamat menyimpan emas!` },
    ],
  },
  followup: {
    label: "4. Followup",
    short: "Ilmu & jemputan untuk customer sedia ada",
    tip: "Beri nilai dulu. Jangan nampak macam menjual.",
    templates: [
      { id: "followup-1", title: "BUKU: MISI BEBAS HUTANG & WANG EMAS", content: `Salam {panggilan}.

Apa khabar? Harap semuanya baik-baik sahaja.

Hari ni saya nak kongsikan satu perkara yang saya rasa penting untuk kita yang sedang membina simpanan emas.

Mentor saya, Tuan Mohd Zulkifli Shafie, selalu pesan bahawa kalau kita nak bina simpanan dan kekayaan, kita bukan sekadar perlu ada duit. Kita juga kena ada ilmu untuk mengurus dan mengembangkan apa yang kita simpan.

Sebab itu saya nak cadangkan dua buah buku hasil tulisan beliau:

📖 Misi Bebas Hutang
📖 Wang Emas

Kenapa saya cadangkan kedua-duanya?

Sebab kedua-duanya saling melengkapi.

Satu mengajar kita tentang pengurusan kewangan dan bagaimana mengurus hutang. Satu lagi membuka pemahaman tentang emas sebagai salah satu aset simpanan jangka panjang.

Saya percaya, bila kita ada ilmu yang betul, kita lebih faham kenapa kita menyimpan dan bagaimana nak kekalkan disiplin menabung.

Kalau {panggilan} berminat nak tengok perkongsian pembaca tentang kedua-dua buku ni, boleh baca di sini:

www.g100.my/combo-buku

Harga kedua-dua buku hanya RM45 (RM25 + RM20).

Sekarang ada promosi di PG Mall:

https://pgmall.my/p/N108/0071?referralPgCode=taufikbinmusa14@gmail.com

Sedikit info: PGMall juga merupakan platform milik Public Gold. Jadi, {panggilan} boleh login menggunakan PG Code dan password yang sama seperti dalam aplikasi Public Gold.

Saya kongsikan bukan sekadar tentang buku, tetapi sebab saya percaya ilmu kewangan adalah antara pelaburan terbaik yang boleh kita buat untuk diri sendiri.

Semoga bermanfaat untuk {panggilan}!` },
      { id: "followup-2", title: "JEMPUTAN WEBINAR", content: `Salam {panggilan}.

Apa khabar? Semoga semuanya baik-baik sahaja.

Hari ini saya nak kongsikan satu peluang untuk tambah ilmu kewangan.

Guru emas saya, Tuan Mohd Zulkifli Shafie, akan berkongsi dalam satu Private Webinar bertajuk:

MEMBINA SATU JUTA PERTAMA

Beliau merupakan penulis buku Misi Bebas Hutang dan Wang Emas. Banyak perkongsian beliau berkisar tentang pengurusan kewangan, membina tabungan dan mengembangkan kekayaan.

Antara perkara yang akan dikongsikan:

1. Kenapa simpanan menjadi asas untuk membina kekayaan.
2. Bagaimana emas membantu membentuk disiplin menabung.
3. Cara mengira jumlah tabungan untuk mencapai kebebasan kewangan.
4. Strategi mengembangkan kekayaan dan kesilapan yang perlu kita elakkan.

Saya sendiri banyak belajar daripada perkongsian beliau.

Saya kongsikan jemputan ini sebab saya rasa ilmu seperti ini bermanfaat untuk kita semua, bukan sekadar untuk orang yang sudah menyimpan emas.

Kalau {panggilan} berminat nak tambah ilmu, boleh tengok maklumat webinar di sini:

https://pg2u.my/app/pw/taufikmusa

Mana tahu ada sesuatu yang boleh kita manfaatkan untuk perancangan kewangan masa depan.` },
    ],
  },
};

const DEFAULT_PANGGILAN = "Cik";
const fillPanggilan = (text, panggilan) => text.replace(/\{panggilan\}/g, panggilan.trim() || DEFAULT_PANGGILAN);

export default function App() {
  const [panggilan, setPanggilan] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState("terjah");
  const [currentMessage, setCurrentMessage] = useState(fillPanggilan(GROUPS.terjah.templates[0].content, ""));
  const [activeRaw, setActiveRaw] = useState(GROUPS.terjah.templates[0].content);
  const [dirty, setDirty] = useState(false);
  const [open, setOpen] = useState({});
  
  const [copiedId, setCopiedId] = useState(null);
  const [appliedId, setAppliedId] = useState(null);
  const [waError, setWaError] = useState("");

  const [extInput, setExtInput] = useState("");
  const [extOutput, setExtOutput] = useState("");
  const [extCopied, setExtCopied] = useState(false);

  const processText = (text) => fillPanggilan(text, panggilan);

  // Bila panggilan berubah dan mesej belum diedit manual, kemas kini mesej semasa
  useEffect(() => {
    if (activeRaw && !dirty) setCurrentMessage(fillPanggilan(activeRaw, panggilan));
  }, [panggilan]); // eslint-disable-line react-hooks/exhaustive-deps

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
    setActiveRaw(text);
    setDirty(false);
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

          {/* Group switcher */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(GROUPS).map(([k, g]) => (
                <button
                  key={k}
                  onClick={() => {
                    const first = g.templates[0].content;
                    setGroup(k); setActiveRaw(first); setDirty(false); setCurrentMessage(fillPanggilan(first, panggilan));
                  }}
                  className={`p-3 text-left font-black uppercase text-sm ${RETRO_BORDER} transition-all ${group === k ? `bg-[#FFD700] ${RETRO_SHADOW}` : 'bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'}`}
                >
                  {g.label}
                  <span className="block mt-1 font-mono font-bold text-[10px] normal-case text-black/60 leading-tight">{g.short}</span>
                  <span className="block mt-1 font-mono text-[10px] text-black/40">{g.templates.length} mesej</span>
                </button>
              ))}
            </div>
            <p className={`bg-[#FFFBE5] ${RETRO_BORDER} px-3 py-2 font-mono text-xs font-bold`}>💡 {GROUPS[group].tip}</p>
          </div>

          <div className={`bg-white p-6 ${RETRO_BORDER} ${RETRO_SHADOW} space-y-6`}>
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-bold flex items-center gap-2 text-sm uppercase">
                  <User size={16} /> Panggilan <span className="font-mono font-normal text-xs normal-case text-black/50">(kosong = Cik)</span>
                </label>
                <input 
                  type="text"
                  value={panggilan}
                  onChange={(e) => setPanggilan(e.target.value)}
                  placeholder="Cik"
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
                onChange={(e) => { setCurrentMessage(e.target.value); setDirty(true); }}
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
                Template Library · {GROUPS[group].label}
              </h2>
              <div className="h-1 bg-black flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GROUPS[group].templates.map((tpl, idx) => (
                <div key={tpl.id} className={`bg-white flex flex-col ${RETRO_BORDER} shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-transform duration-200`}>
                  <div className="bg-[#FFD700] border-b-2 border-black p-3 font-bold flex justify-between items-center">
                    <span className="truncate pr-2">{idx + 1}. {tpl.title}</span>
                  </div>
                  <div className="p-4 flex-1">
                    <p className={`font-mono text-xs text-gray-700 whitespace-pre-wrap ${open[tpl.id] ? "" : "line-clamp-4"}`}>
                      {processText(tpl.content)}
                    </p>
                    {tpl.note && <p className="mt-2 font-mono text-[10px] font-bold text-red-600 uppercase">⚠ {tpl.note}</p>}
                  </div>
                  <div className="grid grid-cols-3 border-t-2 border-black bg-gray-50">
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
                    <button
                      onClick={() => setOpen((o) => ({ ...o, [tpl.id]: !o[tpl.id] }))}
                      className="p-3 text-sm font-bold flex items-center justify-center gap-1 border-l-2 border-black hover:bg-[#5CE1E6] transition-colors"
                    >
                      {open[tpl.id] ? "TUTUP ▲" : "PENUH ▼"}
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