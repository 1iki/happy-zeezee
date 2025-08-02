"use client";
import React, { useState, useEffect } from "react";
import LottieLoading from "./LottieLoading";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LottieLoading />;
  }
  return <>{children}</>;
}
