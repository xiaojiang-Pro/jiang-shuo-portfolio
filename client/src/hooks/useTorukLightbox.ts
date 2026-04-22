import { useState } from "react";
import { TORUK_IMG_1, TORUK_IMG_2, TORUK_IMG_3 } from "@/components/LeonopteryxIcon";

export const TORUK_IMAGES = [
  {
    src: TORUK_IMG_2,
    alt: "图鲁克仰视飞翔全身 - 阿凡达官方形象",
    title: "✦ TORUK MAKTO ✦",
    subtitle: "潘多拉最强飞行生物 · 仰视飞翔",
  },
  {
    src: TORUK_IMG_1,
    alt: "图鲁克飞行仰视蓝天 - 阿凡达官方形象",
    title: "✦ TORUK · 大莱昂诺普特里克斯 ✦",
    subtitle: "潘多拉最强飞行生物 · 蓝天飞翔",
  },
  {
    src: TORUK_IMG_3,
    alt: "图鲁克头部特写艺术图 - 阿凡达官方形象",
    title: "✦ TORUK · 头部特写 ✦",
    subtitle: "橙黄底色 · 蓝色骨质头冠 · 阿凡达设定集",
  },
];

export function useTorukLightbox() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const navigateLightbox = (index: number) => setLightboxIndex(index);

  return { lightboxIndex, openLightbox, closeLightbox, navigateLightbox };
}
