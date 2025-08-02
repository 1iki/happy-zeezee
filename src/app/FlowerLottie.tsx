import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function FlowerLottie(props: { style?: React.CSSProperties; className?: string }) {
  return (
    <DotLottieReact
      src="https://lottie.host/1b395f4b-2f5c-4a92-8cec-d8a841dd165e/dP35igVU36.lottie"
      loop
      autoplay
      style={props.style}
      className={props.className}
    />
  );
}
