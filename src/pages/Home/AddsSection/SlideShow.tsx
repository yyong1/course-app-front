import React, { useState, useEffect, useRef } from 'react';
import './SlideShow.css';

const Slideshow = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const ratioWH = useRef(1); // Default value for ratio

  useEffect(() => {
    // Ensure that props.ratio is defined and not empty
    if (props.ratio && typeof props.ratio === 'string') {
      const ratioWHArray = props.ratio.split(':');
      if (ratioWHArray.length === 2) {
        ratioWH.current = ratioWHArray[0] / ratioWHArray[1];
      }
    }
  }, [props.ratio]);

  const ratioWHArray = props.ratio.split(':');
  // @ts-ignore
  ratioWH.current = ratioWHArray[0] / ratioWHArray[1];

  const getNewSlideIndex = (step) => {
    let newSlideIndex = slideIndex + step;
    const numberSlide = props.input.length;

    if (newSlideIndex >= numberSlide) newSlideIndex = 0;
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

    return newSlideIndex;
  };

  const backward = () => {
    setSlideIndex(getNewSlideIndex(-1));
  };

  const forward = () => {
    setSlideIndex(getNewSlideIndex(1));
  };

  const updateDimensions = () => {
    const containerElm = document.querySelector('.lp-slideshow .container');
    // @ts-ignore
    containerElm.style.height = `${containerElm.offsetWidth / ratioWH.current}px`;
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    let automaticInterval: string | number | NodeJS.Timeout | undefined;
    if (props.mode === 'automatic') {
      const timeout = props.timeout || 5000;
      automaticInterval = setInterval(() => {
        setSlideIndex(getNewSlideIndex(1));
      }, Number.parseInt(timeout));
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (automaticInterval) clearInterval(automaticInterval);
    };
  }, [slideIndex, props.mode, props.timeout]);

  // @ts-ignore
  // @ts-ignore
  return (
    <div className="lp-slideshow">
      <div className="container">
        {props.input.map(
          (image: { src: string | undefined; caption: string | undefined }, index: React.Key | null | undefined) => (
            <div key={index} className={`slide ${slideIndex === index ? 'active' : ''}`}>
              <img className="image" src={image.src} alt={image.caption} />
            </div>
          ),
        )}

        <span className="prev" onClick={backward}>
          ❮
        </span>
        <span className="next" onClick={forward}>
          ❯
        </span>
      </div>

      <div className="dot-container">
        {props.input.map(
          (_: any, index: string | number | bigint | ((prevState: number) => number) | null | undefined) => (
            <span
              key={index}
              className={`dot ${slideIndex === index ? 'active' : ''}`}
              onClick={() => setSlideIndex(index)}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Slideshow;
