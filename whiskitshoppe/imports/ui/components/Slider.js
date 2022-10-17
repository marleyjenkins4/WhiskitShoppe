import React, { useRef } from 'react';

import useSlider from '../hooks/useSlider';
import { dom } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom';
dom.watch()


const Slider = ({images}) => {
  
  const slideImage = useRef(null);
  const slideText = useRef(null);
  const { goToPreviousSlide, goToNextSlide } = useSlider(
    slideImage, 
    slideText, 
    images
    );

    return (
          <div className="slider" ref={slideImage}>
            <div className="slider--content">
              <button onClick={goToPreviousSlide} className="slider__btn-left">
                <i className="fas fa-angle-left"/>
              </button>
             <div className="slider--feature">
                <h1 className="feature--title">Order Today!</h1>
                <div className="storeInfo2" id = "infoMobile">
            <h1 className="title"> Location and Hours </h1>
            <ul>
              <li className="location">
                1204 Mt. Gallant Rd, Rock Hill, SC 29732
              </li>
              <li className="infoDay"> Sunday - Monday</li>
              <li className="info"> Closed</li>
              <li className="infoDay">Tuesday - Thursday</li>
              <li className="info"> 10:00 am - 6:00 pm</li>
              <li className="infoDay">Friday</li>
              <li className="info"> 10:00 am - 5:00 pm</li>
            </ul>
          </div>
                <p ref={slideText} className="feature--text" id = "infoDesk"></p>
                <Link to="/menu" className='feature__btn'>Menu</Link>
              </div>
              <button onClick={goToNextSlide} className="slider__btn-right">
                <i className="fas fa-angle-right"/>
              </button>
            </div>
        </div>
    );
};

export default Slider;
