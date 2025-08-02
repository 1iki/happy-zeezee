"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import FlowerLottie from "./FlowerLottie";
import LottieLoading from "./LottieLoading";

const loveLetter = `
Untuk Zeezee Cantik, cinta hatiku,

Melihat perjalanan panjang yang sudah kamu lalui, hatiku dipenuhi kekaguman yang tak terhingga. Begitu banyak tantangan yang telah kamu hadapi dengan penuh keberanian, baik yang kita lalui bersama maupun yang harus kamu tanggung sendirian. Aku sangat bangga padamu, sayang. Kekuatanmu dalam menjalani hari-hari berat, bahkan saat aku tak bisa mendampingimu, sungguh membuatku terpesona.

Meski sudah kuucapkan sebelumnya, izinkan aku mengulanginya sekali lagi—ulang tahunmu bukan sekadar tentang bertambahnya usia. Ini adalah momen bersyukur atas keajaiban Tuhan yang menghadirkanmu ke dunia ini... dan ke dalam hidupku yang sederhana.

Setiap senyuman manis yang kamu berikan, setiap kata lembut yang terucap dari bibirmu, dan setiap langkah kecil yang kita tempuh berdampingan—semua itu adalah anugerah yang selalu kupanjatkan syukur.

Untuk masa depan yang menanti kita, aku hanya ingin menjadi pelabuhan hatimu. Tempat pulang yang mungkin tak sempurna, namun selalu berusaha menghadirkan kehangatan. Aku ingin menyaksikan dirimu terus tumbuh, berkembang, dan menemukan kebahagiaan sejati... dan berharap aku bisa menjadi bagian indah dari setiap cerita itu.

Selamat ulang tahun sekali lagi, peri cantikku. Semoga alam semesta senantiasa berpihak pada hati tulusmu. Dan semoga aku diberi kesempatan untuk terus belajar mencintaimu dengan cara yang paling membahagiakan hatimu.
Dengan cinta yang tak bertepi,

Untukmu, Zeezee cantik tercintaku 🌷🤗
`;

function BalloonsAnimation() {
  // Array posisi balon (random, proporsional di layar)
  const positions = [
    { left: "5%", top: "60%" },
    { left: "20%", top: "70%" },
    { left: "35%", top: "55%" },
    { left: "50%", top: "75%" },
    { left: "65%", top: "60%" },
    { left: "80%", top: "68%" },
    { left: "30%", top: "80%" },
    { left: "70%", top: "78%" },
  ];
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      {positions.map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: pos.left,
            top: pos.top,
            width: "min(120px, 18vw)",
            height: "min(120px, 18vw)",
            animation: `balloonUp 3.5s ${i * 0.3}s linear forwards`,
            zIndex: 0,
          }}
        >
          <DotLottieReact
            src="https://lottie.host/0e61f030-1306-4825-b59a-5de1d6e6fbb9/VBrE15rBjR.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ))}
      <style>{`
        @keyframes balloonUp {
          to {
            transform: translateY(-60vh);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const audioRefMain = useRef<HTMLAudioElement>(null);
  const audioRefLetter = useRef<HTMLAudioElement>(null);
  const [showLetter, setShowLetter] = useState(false);
  const [showBalloons, setShowBalloons] = useState(true);
  const [canProceed, setCanProceed] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [musicReady, setMusicReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setMusicReady(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (musicReady && !showLetter && audioRefMain.current) {
      audioRefMain.current.volume = 0.5;
      audioRefMain.current.play().catch(() => {});
    }
    if (showLetter && audioRefLetter.current) {
      audioRefLetter.current.volume = 0.5;
      audioRefLetter.current.play().catch(() => {});
    }
  }, [musicReady, showLetter]);

  // Balon animasi hilang setelah 3.5 detik, lalu user bisa klik layar
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBalloons(false);
      setCanProceed(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, [showLetter]);

  // Handler klik layar untuk menampilkan icon 💌
  const handleProceed = () => {
    if (canProceed && !showEnvelope && !showLetter) {
      setShowEnvelope(true);
      setCanProceed(false);
    }
  };

  // Handler klik icon 💌 untuk membuka surat cinta
  const handleOpenLetter = () => {
    if (showEnvelope && !showLetter) {
      setShowLetter(true);
    }
  };

  if (loading) {
    return <LottieLoading />;
  }

  if (showLetter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-red-100 to-pink-400 relative">
        <audio ref={audioRefLetter} src="/her.mp3" loop autoPlay hidden />
        <div className="z-10 mt-8 p-6 rounded-2xl shadow-2xl bg-white/90 border-2 border-pink-300 max-w-xl text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-pink-600 mb-4 flex items-center justify-center gap-2">
            <span>💌</span> Surat Cinta Untukmu <span>💌</span>
          </h2>
          <pre className="whitespace-pre-wrap text-pink-800 text-lg font-serif leading-relaxed">
            {loveLetter}
          </pre>
          {/* Gambar ticket dan tombol download untuk mobile */}
          <div className="flex flex-col items-center mt-6">
            <img
              src="/TicketSpesialZeezee.png"
              alt="Tiket Spesial ulang tahun zeezee ke- 20"
              className="w-40 h-auto rounded-lg shadow-md mb-2"
            />
            <a
              href="/TicketSpesialZeezee.png"
              download
              className="sm:hidden flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-8m0 8l-4-4m4 4l4-4M4 20h16"
                />
              </svg>
              Download Ticket
            </a>
            {/* Tombol kirim pesan ke WhatsApp dengan modal custom pesan */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition mt-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.13 2.484 7.23L4 29l7.03-2.37A12.96 12.96 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.91-.52-5.59-1.51l-.4-.23-4.17 1.41 1.38-4.06-.26-.42A9.93 9.93 0 0 1 6 15c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.31s.99 2.68 1.13 2.87c.14.18 1.95 2.98 4.74 4.05.66.23 1.18.37 1.58.47.66.17 1.26.15 1.73.09.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
              </svg>
              Kirim ke WhatsApp
            </button>
            {/* Modal custom pesan WhatsApp */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 shadow-lg max-w-xs w-full flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-pink-600 mb-2 text-center">
                    Edit Pesan WhatsApp
                  </h3>
                  <textarea
                    className="w-full h-24 p-2 border rounded focus:outline-pink-400 text-pink-800"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Tulis pesan balasan..."
                  />
                  <div className="flex gap-2 justify-center mt-2">
                    <a
                        href={`https://wa.me/+6283186603458?text=${encodeURIComponent(
                        customMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-5 h-5"
                        fill="currentColor"
                      >
                        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.13 2.484 7.23L4 29l7.03-2.37A12.96 12.96 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.91-.52-5.59-1.51l-.4-.23-4.17 1.41 1.38-4.06-.26-.42A9.93 9.93 0 0 1 6 15c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.31s.99 2.68 1.13 2.87c.14.18 1.95 2.98 4.74 4.05.66.23 1.18.37 1.58.47.66.17 1.26.15 1.73.09.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
                      </svg>
                      Kirim
                    </a>
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full shadow hover:bg-gray-400 transition"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <footer className="z-10 mt-12 text-pink-500 text-sm text-center">
          Dibuat dengan penuh cinta menggunakan Next.js & Tailwind CSS
        </footer>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.7s ease;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-red-100 to-pink-400 relative overflow-hidden"
      onClick={handleProceed}
      style={{ cursor: canProceed && !showEnvelope ? "pointer" : "default" }}
    >
      <audio ref={audioRefMain} src="/hbd.mp3" loop autoPlay hidden />
      {/* Animasi Balon & Ucapan Ulang Tahun */}
      {(showBalloons || canProceed) && !showEnvelope && (
        <>
          <BalloonsAnimation />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-pink-600 text-center drop-shadow-lg animate-fade-in">
            Selamat Ulang Tahun</h1>
            <h1 className="text-4xl sm:text-5xl font-bold text-pink-600 text-center drop-shadow-lg animate-fade-in">
            Zeezee sayang! 🤗🥰</h1>
            <p className="text-lg sm:text-xl text-center text-pink-700 max-w-xl mt-4 animate-fade-in">
            Waktu terasa begitu cepat berlalu, dan sekarang kamu sudah memasuki usia 20 tahun yang indah.
            Aku sangat mengagumi perjalanan hidup yang sudah kamu lalui selama ini. Setiap perjuangan yang kamu hadapi, setiap usaha yang kamu berikan, dan setiap pengalaman berharga yang kamu dapatkan telah membentuk dirimu menjadi sosok yang luar biasa.
            Aku berdoa semoga semua langkah yang sudah kamu tempuh ini akan membawa kamu semakin dekat dengan mimpi-mimpi indahmu. Amiin, ya rabbal alamiin.
            Semoga Allah SWT senantiasa melimpahkan kesehatan, keberkahan, dan kebahagiaan dalam hidupmu. Amiin.
            Maaf kalau aku belum bisa memberikan hadiah istimewa dalam bentuk material untukmu. Yang bisa aku hadiahkan saat ini hanyalah doa tulus dan ungkapan hati yang sederhana ini. Meski terlihat kecil, semoga kehangatan cinta dan harapan baikku bisa tersampaikan dengan sempurna kepadamu, sayang 🥰🌷
            </p>

            {canProceed && (
              <span className="mt-8 text-pink-700 font-semibold text-lg animate-fade-in">
                Klik layar untuk melanjutkan
              </span>
            )}
            {/* Animasi Lottie di kiri bawah */}
            {/* Baris ke 144: Tambahkan animasi kue ulang tahun */}
            <div className="flex items-center justify-center mt-8">
              <DotLottieReact
                src="https://lottie.host/da08051f-89ec-4f97-8a43-5425147a685d/4bsBlU96dj.lottie"
                loop
                autoplay
                style={{ width: 300, height: 300 }}
              />
            
            <div className="absolute right-0 bottom-0 z-20">
              <FlowerLottie
                style={{ width: 180, height: 180, transform: "scaleX(-1)" }}
              />
            </div>
            {/* Animasi Lottie di kanan bawah */}
            <div className="absolute left-0 bottom-0 z-20">
              <FlowerLottie style={{ width: 180, height: 180 }} />
            </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20">
              
            </div>
          </div>
        </>
      )}
      {/* Icon 💌 muncul setelah klik layar */}
      {showEnvelope && !showLetter && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            className="flex flex-col items-center justify-center focus:outline-none animate-fade-in"
            onClick={handleOpenLetter}
            aria-label="Buka surat cinta"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span className="text-7xl sm:text-8xl animate-pulse text-pink-500 drop-shadow-lg mb-4 transition-transform duration-300 hover:scale-110">
              💌
            </span>
            <span className="text-pink-700 font-semibold text-lg">
              Klik surat untuk melihat isi pesan
            </span>
          </button>
        </div>
      )}
      <footer className="z-10 mt-12 text-pink-500 text-sm text-center"></footer>
      <style>{`{/* Animasi Lottie di kanan bawah */}
            <div className="absolute right-0 bottom-0 z-20">
              <FlowerLottie style={{ width: 180, height: 180 }} />
            </div>
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease;
        }
      `}</style>
    </div>
  );
}
