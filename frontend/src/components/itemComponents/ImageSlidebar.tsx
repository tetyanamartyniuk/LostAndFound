import { useRef } from "react";
import styles from "./ImageSlidebar.module.css";

export interface ImageSlidebarProps {
  imageUrls: string[];
}

export function ImageSlidebar({ imageUrls }: ImageSlidebarProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "right" | "left") => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;

      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.sliderWrapper}>
      {imageUrls.length > 1 && (
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={() => scroll("left")}
        >
          ❮
        </button>
      )}
      <div className={styles.imageContainer} ref={sliderRef}>
        {imageUrls.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={styles.imageItem}
          ></img>
        ))}
      </div>
      {imageUrls.length > 1 && (
        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={() => scroll("right")}
        >
          ❯
        </button>
      )}
    </div>
  );
}
