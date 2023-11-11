import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { FC } from 'react';
import { Picture } from 'components/general';
import {
  EXAMPLE_SLIDER,
  EXAMPLE_SLIDER_TEXT,
  FEEDBACK_SLIDER,
  FEEDBACK_SLIDER_TEXT,
  MAIN_SLIDER,
} from 'constants/carousel';
import styles from './styles/SlideBar.module.scss';
import 'swiper/scss';

export type Props = {
  carouselType:
    | typeof MAIN_SLIDER
    | typeof EXAMPLE_SLIDER
    | typeof FEEDBACK_SLIDER;
  images: { src: string; srcSet?: string[] }[];
};

const CONTAINER_STYLE = {
  [MAIN_SLIDER]: styles.mainCarousel,
  [EXAMPLE_SLIDER]: styles.exampleCarousel,
  [FEEDBACK_SLIDER]: styles.feedbackCarousel,
};

const SliderBar: FC<Props> = ({ carouselType, images }) => {
  const renderSlides = () => {
    switch (carouselType) {
      case MAIN_SLIDER: {
        return images.map(({ src, srcSet }, index) => (
          <SwiperSlide className={styles.carouselCell} key={index}>
            <Picture src={src} srcSet={srcSet} alt="slide" />
          </SwiperSlide>
        ));
      }
      case EXAMPLE_SLIDER: {
        return images.map(({ src, srcSet }, index) => (
          <SwiperSlide className={styles.exampleCell} key={index}>
            <Picture src={src} srcSet={srcSet} alt="slide" />
            <p>{EXAMPLE_SLIDER_TEXT[index]}</p>
          </SwiperSlide>
        ));
      }
      case FEEDBACK_SLIDER: {
        return images.map(({ src, srcSet }, index) => (
          <SwiperSlide className={styles.feedbackCell} key={index}>
            <Picture src={src} srcSet={srcSet} alt="slide" />
            <p>{FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{FEEDBACK_SLIDER_TEXT[index].name}</span>
          </SwiperSlide>
        ));
      }
      default:
        return null;
    }
  };
  return (
    <Swiper
      className={CONTAINER_STYLE[carouselType]}
      loop
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
      modules={[Autoplay]}
    >
      {renderSlides()}
    </Swiper>
  );
};

export default SliderBar;
