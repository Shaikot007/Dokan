import React, { useState } from "react";
import "./ProductsCarousel.css";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";

import Logo1 from "../../Images/Carousel-images/Products-carousel/Auto-parts.jpg";
import Logo2 from "../../Images/Carousel-images/Products-carousel/Fruits-vegetables.jpg";
import Logo3 from "../../Images/Carousel-images/Products-carousel/Garments-products.jpg";
import Logo4 from "../../Images/Carousel-images/Products-carousel/Health_and_beauty_products.jpg";
import Logo5 from "../../Images/Carousel-images/Products-carousel/Home-appliances.jpeg";

const items = [
  {
    src: Logo1,
    altText: "Slide 1"
  },
  {
    src: Logo2,
    altText: "Slide 2"
  },
  {
    src: Logo3,
    altText: "Slide 3"
  },
  {
    src: Logo4,
    altText: "Slide 4"
  },
  {
    src: Logo5,
    altText: "Slide 5"
  }
];

const ProductsCarousel = () => {
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

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={""} className="ProductsCarousel" />
      </CarouselItem>
    );
  });

  return (
    <Carousel className="CarouselArea"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default ProductsCarousel;
