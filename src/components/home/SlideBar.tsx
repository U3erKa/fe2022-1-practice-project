import Image from 'next/image';
import type { FC } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
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

export type Props = {
  readonly carouselType:
    | typeof MAIN_SLIDER
    | typeof EXAMPLE_SLIDER
    | typeof FEEDBACK_SLIDER;
};

const CONTAINER_STYLE = {
  [MAIN_SLIDER]: styles.mainCarousel,
  [EXAMPLE_SLIDER]: styles.exampleCarousel,
  [FEEDBACK_SLIDER]: styles.feedbackCarousel,
};

const SliderBar: FC<Props> = ({ carouselType }) => {
  const renderSlides = () => {
    switch (carouselType) {
      case MAIN_SLIDER: {
        return MAIN_SLIDER_IMAGES.map(({ id, ...props }) => (
          <SwiperSlide className={styles.carouselCell} key={id}>
            <Image alt="slide" {...props} />
          </SwiperSlide>
        ));
      }
      case EXAMPLE_SLIDER: {
        return EXAMPLE_SLIDER_IMAGES.map(({ text, ...props }) => (
          <SwiperSlide className={styles.exampleCell} key={text}>
            <Image alt="slide" {...props} />
            <p>{text}</p>
          </SwiperSlide>
        ));
      }
      case FEEDBACK_SLIDER: {
        return FEEDBACK_SLIDER_IMAGES.map(({ feedback, name, ...props }) => (
          <SwiperSlide className={styles.feedbackCell} key={name}>
            <Image alt="slide" {...props} />
            <p>{feedback}</p>
            <span>{name}</span>
          </SwiperSlide>
        ));
      }
      default:
        return null;
    }
  };
  return (
    <Swiper
      loop
      className={CONTAINER_STYLE[carouselType]}
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
    >
      {renderSlides()}
    </Swiper>
  );
};

export default SliderBar;
