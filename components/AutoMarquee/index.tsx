import Image from "next/image";
import React from "react";
import "./style.css";

const AutoMarquee: React.FC<{
  images?: string[];
}> = (props) => {
  let { images } = props;
  if (!images?.length) {
    images = [
      "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
      "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
      "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
      "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
      "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
      "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
    ];
  }

  const duplicateImages = [...images];

  while (duplicateImages.length < 10) {
    duplicateImages.push(...images.slice(0, 10 - duplicateImages.length));
  }

  return (
    <div
      className="marquee fadeout-horizontal"
      style={
        {
          "--num-items": duplicateImages.length,
        } as React.CSSProperties
      }
    >
      <div className="marquee-track">
        {duplicateImages.map((image, index) => (
          <div
            key={image + index}
            className="marquee-item"
            style={
              {
                "--item-position": index,
              } as React.CSSProperties
            }
          >
            {image ? (
              <Image
                unoptimized
                src={image}
                alt={image}
                width={420}
                height={420}
                quality={85}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoMarquee;
