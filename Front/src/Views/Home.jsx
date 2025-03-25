import { useState, useEffect } from 'react';
import '../Styles/Home.css';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://logos.flamingtext.com/Word-Logos/oferta-design-china-name.png",
    "https://logos.flamingtext.com/Word-Logos/oferta-design-china-name.png",
    "https://logos.flamingtext.com/Word-Logos/oferta-design-china-name.png",
    "https://logos.flamingtext.com/Word-Logos/oferta-design-china-name.png",
    "https://logos.flamingtext.com/Word-Logos/oferta-design-china-name.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="home-container">
      <div className="carousel-container">
        <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Oferta producto ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-button prev" onClick={prevSlide}>❮</button>
        <button className="carousel-button next" onClick={nextSlide}>❯</button>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="boxText">
        <h1 className="title">¿Quiénes somos?</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum explicabo asperiores dolorem illum praesentium dignissimos. Perferendis sit assumenda eos reprehenderit nulla veniam eligendi asperiores excepturi repudiandae, hic optio quo magnam!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, nulla. Itaque aperiam consequuntur, commodi ipsa eius quae, adipisci ipsam, distinctio id dolorem asperiores sint corrupti temporibus. Nam aliquid ipsa tenetur.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi corporis ipsum aperiam laborum recusandae corrupti magnam natus odio vitae. Mollitia explicabo quasi rem ad molestiae ipsam odit architecto sunt fugit?
        </p>

        <h2 className="title">¿Dónde nos encontramos?</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum explicabo asperiores dolorem illum praesentium dignissimos. Perferendis sit assumenda eos reprehenderit nulla veniam eligendi asperiores excepturi repudiandae, hic optio quo magnam!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id hic iusto, unde laborum, voluptas deserunt optio vel, eaque rerum quidem necessitatibus culpa nobis enim obcaecati praesentium nihil magnam ducimus est!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum recusandae soluta ad quo quasi ex, ipsum sed quaerat exercitationem modi labore sapiente impedit, deserunt laudantium tempora vero iure quas consequuntur?
        </p>

        <h2 className="title">Nuestros servicios</h2>
        <ol>
          <li>Opción 1</li>
          <li>Opción 2</li>
          <li>Opción 3</li>
          <li>Opción 4</li>
        </ol>
      </div>
    </div>
  );
};
