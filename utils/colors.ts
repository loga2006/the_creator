export interface GradientInfo {
  class: string;
  color: string;
}

export const gradients: GradientInfo[] = [
  // Original
  { class: 'from-[#00c6ff] to-[#0072ff]', color: '#00c6ff' },
  { class: 'from-[#11998e] to-[#38ef7d]', color: '#11998e' },
  { class: 'from-[#ff9966] to-[#ff5e62]', color: '#ff9966' },
  { class: 'from-[#834d9b] to-[#d04ed6]', color: '#834d9b' },
  { class: 'from-[#f7971e] to-[#ffd200]', color: '#f7971e' },
  { class: 'from-[#43cea2] to-[#185a9d]', color: '#43cea2' },
  { class: 'from-[#56ab2f] to-[#a8e063]', color: '#56ab2f' },
  { class: 'from-[#6a3093] to-[#a044ff]', color: '#6a3093' },
  // New additions
  { class: 'from-[#e96443] to-[#904e95]', color: '#e96443' }, // Orange-Pink to Purple
  { class: 'from-[#4B79A1] to-[#283E51]', color: '#4B79A1' }, // Steel Blue to Dark Slate Gray
  { class: 'from-[#C33764] to-[#1D2671]', color: '#C33764' }, // Crimson to Dark Blue (Sunset)
  { class: 'from-[#1A2980] to-[#26D0CE]', color: '#1A2980' }, // Dark Blue to Turquoise (Ocean)
  { class: 'from-[#f857a6] to-[#ff5858]', color: '#f857a6' }, // Pink to Red (Rose)
  { class: 'from-[#00c9ff] to-[#92fe9d]', color: '#00c9ff' }, // Sky Blue to Light Green (Emerald)
  { class: 'from-[#f12711] to-[#f5af19]', color: '#f12711' }, // Red to Gold (Fire)
  { class: 'from-[#ff00cc] to-[#333399]', color: '#ff00cc' }, // Magenta to Indigo (Cosmic)
];

export const getRandomGradient = (): GradientInfo => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};