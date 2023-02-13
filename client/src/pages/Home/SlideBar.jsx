import Flickity from 'react-flickity-component';

import {
  EXAMPLE_SLIDER,
  EXAMPLE_SLIDER_TEXT,
  FEEDBACK_SLIDER,
  FEEDBACK_SLIDER_TEXT,
  MAIN_SLIDER,
} from '../../constants/carousel';

import style from './SlideBar.module.sass';
import './flickity.css';

const SliderBar = (props) => {
  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    groupCells: true,
    lazyLoad: true,
  };

  const getStyleName = () => {
    const { carouselType } = props;
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
    const { carouselType } = props;
    switch (carouselType) {
      case MAIN_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <img
            src={props.images[key]}
            alt="slide"
            key={index}
            className={style['carousel-cell']}
          />
        ));
      }
      case EXAMPLE_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <div className={style['example-cell']} key={index}>
            <img src={props.images[key]} alt="slide" />
            <p>{EXAMPLE_SLIDER_TEXT[index]}</p>
          </div>
        ));
      }
      case FEEDBACK_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <div className={style['feedback-cell']} key={index}>
            <img src={props.images[key]} alt="slide" />
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
