import './Adds.css';
import Slideshow from './SlideShow.tsx';

const collection = [
  {
    src: 'https://www.bio-rad.com/webroot/web/images/hmp/COVID_HPB_4711_LGao.jpg',
  },
  {
    src: 'https://content3.jdmagicbox.com/comp/def_content/Pathology_Labs/default-pathology-labs-242.jpg?clr=5727f',
  },
  {
    src: 'https://www.bio.org/sites/default/files/2021-01/we-are-bio.png',
  },
];

function Adds() {
  return (
    <div className="body">
      <div className="bodyContent">
        <h1 className="bodyContentIntro">Innovate, Inspire, Implement:</h1>
        <h3 className="bodyContentSub">LearnForge - Crafting Tomorrow's Tech Today</h3>
        {/*<br />*/}
      </div>
      <div className="slideshowStyles">
        <Slideshow input={collection} ratio={`3:2`} mode={`automatic`} timeout={`3000`} />
      </div>
      {/*<br />*/}
    </div>
  );
}

export default Adds;
