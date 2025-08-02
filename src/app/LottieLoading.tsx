import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LottieLoading() {
  const [fade, setFade] = useState("fade-in");

  useEffect(() => {
    // Fade in 0.3s, show 1.7s, then fade out 0.3s
    const fadeOutTimer = setTimeout(() => setFade("fade-out"), 2000);
    return () => clearTimeout(fadeOutTimer);
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 transition-opacity duration-300 ${fade}`}
      style={{ opacity: fade === "fade-in" ? 1 : 0 }}
    >
      <DotLottieReact
        src="https://lottie.host/3f4b13ee-8237-4d8e-bee3-dc378dcd2905/j8Gfgeo0Vz.lottie"
        loop
        autoplay
      />
      <style>{`
        .fade-in {
          opacity: 1;
          transition: opacity 0.3s;
        }
        .fade-out {
          opacity: 1;
          transition: opacity 0.3s;
        }
      `}</style>
    </div>
  );
}
