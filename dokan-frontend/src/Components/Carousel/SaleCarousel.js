import React, { useState } from "react";
import "./SaleCarousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import {
  Carousel,
  CarouselItem
} from "reactstrap";

const items = [
  {
    text: "10% off on vegetables",
    altText: "Slide 1"
  },
  {
    text: "5% off on fruits",
    altText: "Slide 2"
  },
  {
    text: "8% off! shop now",
    altText: "Slide 3"
  },
  {
    text: "12% off on baby care",
    altText: "Slide 4"
  },
  {
    text: "15% off on promo code: offT30",
    altText: "Slide 5"
  }
];

const CarouselImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.text}
      >
        <div className="SaleCarousel">
          <FontAwesomeIcon icon={faOpencart} size="sm" className="SaleCarouselIcon" />
          <p>{item.text}</p>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel className="CarouselArea"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      {slides}
    </Carousel>
  );
}

export default CarouselImages;
