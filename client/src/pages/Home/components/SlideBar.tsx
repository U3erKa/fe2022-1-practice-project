import Flickity, { type FlickityOptions } from 'react-flickity-component';

import {
  EXAMPLE_SLIDER,
  EXAMPLE_SLIDER_TEXT,
  FEEDBACK_SLIDER,
  FEEDBACK_SLIDER_TEXT,
  MAIN_SLIDER,
} from 'constants/carousel';

import style from '../styles/SlideBar.module.scss';
import '../styles/flickity.css';

import type { FC } from 'react';
import { Picture } from 'components/general';

export type Props = {
  carouselType:
    | typeof MAIN_SLIDER
    | typeof EXAMPLE_SLIDER
    | typeof FEEDBACK_SLIDER;
  images: { src: string; srcSet?: string[] }[];
};

const SliderBar: FC<Props> = ({ carouselType, images }) => {
  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    groupCells: true,
    lazyLoad: true,
  } satisfies FlickityOptions;

  const getStyleName = () => {
    switch (carouselType) {
      case MAIN_SLIDER:
        return style.mainCarousel;
      case EXAMPLE_SLIDER:
        return style.exampleCarousel;
      case FEEDBACK_SLIDER:
        return style.feedbackCarousel;
      default: {
        break;
      }
    }
  };

  const renderSlides = () => {
    switch (carouselType) {
      case MAIN_SLIDER: {
        return images.map(({ src, srcSet }, index) => (
          <div className={style['carousel-cell']} key={index}>
            <Picture src={src} srcSet={srcSet} alt="slide" />
          </div>
        ));
      }
      case EXAMPLE_SLIDER: {
        return images.map(({ src, srcSet }, index) => (
          <div className={style['example-cell']} key={index}>
            <Picture src={src} srcSet={srcSet} alt="slide" />
            <p>{EXAMPLE_SLIDER_TEXT[index]}</p>
          </div>
        ));
      }
      case FEEDBACK_SLIDER: {
        return images.map(({ src, srcSet }, index) => (
          <div className={style['feedback-cell']} key={index}>
            <Picture src={src} srcSet={srcSet} alt="slide" />
            <p>{FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{FEEDBACK_SLIDER_TEXT[index].name}</span>
          </div>
        ));
      }
      default: {
        break;
      }
    }
  };
  return (
    <Flickity className={getStyleName()} elementType="div" options={options}>
      {renderSlides()}
    </Flickity>
  );
};

export default SliderBar;
