"use client";

import { useEffect, useState } from "react";

export type LightboxProps = {
  images: string[];
  text: string;
};

const Lightbox = ({ images, text }: LightboxProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="bg-[#D7CEB2] text-black p-5 md:px-10 lg:px-20 xl:px-40">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Placeholder ${index + 1}`}
            className="cursor-pointer w-full h-auto"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <p className="mt-5 text-xl">
        {text}
      </p>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl leading-none text-black shadow-md"
              aria-label="Close image preview"
            >
              x
            </button>
            <img
              src={selectedImage}
              alt="Full size preview"
              className="max-h-[90vh] w-auto max-w-full rounded-md"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Lightbox;