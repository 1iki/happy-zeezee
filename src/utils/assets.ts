// Utility function untuk menangani path assets di GitHub Pages
export const getAssetPath = (path: string): string => {
  const basePath = process.env.NODE_ENV === 'production' ? '/happy-zeezee' : '';
  return `${basePath}${path}`;
};

export const playAudio = (audioPath: string): HTMLAudioElement | null => {
  try {
    const audio = new Audio(getAssetPath(audioPath));
    audio.preload = 'auto';
    return audio;
  } catch (error) {
    console.error('Error loading audio:', error);
    return null;
  }
};