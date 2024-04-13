'use client';

import Image from 'next/image';
import type { FC } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react';
import 'swiper/scss';
import {
  EXAMPLE_SLIDER,
  EXAMPLE_SLIDER_IMAGES,
  FEEDBACK_SLIDER,
  FEEDBACK_SLIDER_IMAGES,
  MAIN_SLIDER,
  MAIN_SLIDER_IMAGES,
} from 'constants/carousel';
import styles from './styles/SlideBar.module.scss';

type Props = {
  readonly carouselType:
    | typeof EXAMPLE_SLIDER
    | typeof FEEDBACK_SLIDER
    | typeof MAIN_SLIDER;
};

const SliderBar: FC<Props & SwiperProps> = ({ carouselType, ...props }) => {
  let slides;
  switch (carouselType) {
    case MAIN_SLIDER: {
      slides = MAIN_SLIDER_IMAGES.map(({ id, ...props }) => (
        <SwiperSlide className={styles.carouselCell} key={id}>
          <Image alt="slide" {...props} />
        </SwiperSlide>
      ));
      break;
    }
    case EXAMPLE_SLIDER: {
      slides = EXAMPLE_SLIDER_IMAGES.map(({ text, ...props }) => (
        <SwiperSlide className={styles.exampleCell} key={text}>
          <Image alt="slide" {...props} />
          <p>{text}</p>
        </SwiperSlide>
      ));
      break;
    }
    case FEEDBACK_SLIDER: {
      slides = FEEDBACK_SLIDER_IMAGES.map(({ feedback, name, ...props }) => (
        <SwiperSlide className={styles.feedbackCell} key={name}>
          <Image alt="slide" {...props} />
          <p>{feedback}</p>
          <span>{name}</span>
        </SwiperSlide>
      ));
      break;
    }
    default:
      return null;
  }

  return (
    <Swiper
      loop
      className={styles.carousel}
      modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={10}
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        512: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
      {...props}
    >
      {slides}
    </Swiper>
  );
};

export default SliderBar;
