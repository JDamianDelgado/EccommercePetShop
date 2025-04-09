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
        <h1 className="title">¿Quiénes somos? 🐶🐱</h1>
        <p>¡Hola! Somos 🐾 una petshop de Buenos Aires creada por amantes de los animales para amantes de los animales.

En pocas palabras... ¡vivimos rodeados de pelos, patitas y mucho amor! 
<br />❤️ Nos encanta ver a las mascotas felices y por eso trabajamos todos los días para que no les falte nada: comida rica 🍖, juguetes divertidos 🎾, accesorios con onda 😎 y todo lo que necesiten para estar sanos y llenos de energía.

<br />Sabemos que tu mascota no es "una más", es familia. Por eso aquí te vas a sentir como en casa — o mejor dicho, ¡como en una casa llena de huellitas y colitas felices! 🐕🐈

<br />¿Buscás lo mejor para tu mejor amigo? Acá lo tenemos. Y si no lo tenemos… ¡lo conseguimos! 😉

<br />Porque en Petshop no solo vendemos cosas… creamos momentos, anécdotas y miles de historias para contar. 🐾</p>

        <h2 className="title">Nuestros servicios</h2>
        <p>En Petshop tenemos todo lo que necesita tu mascota… y un poquito más 😉</p>
        <ol>
          <li>Alimentación 🥩🍖</li>
          <p>Para los que aman comer (o mejor dicho… ¡devorar!). Alimentos balanceados, snacks, golosinas y hasta premios para cuando se portan bien… o solo porque los amás demasiado.</p>
          <li>Juguetes y Accesorios 🎾🦴</li>
          <p>¡Acá la diversión no falta! Juguetes para morder, correr, atrapar o simplemente destruir en 5 minutos (sabemos cómo son 😅). Además, correas, camitas, platitos y un montón de cosas lindas para que tu mascota sea la más facha del barrio 😎.</p>
          <li>Salud y Cuidado 🧼🐕‍🦺</li>
          <p>Porque ser bellos también es importante: shampoos, antipulgas, vitaminas y todo para que estén sanos, felices y brillando como estrellas ✨.</p>
          <li>Amor, mimos y buena onda ❤️</li>
          <p>Esto viene gratis, ¡siempre! Porque en Petshop no solo vendemos productos... también regalamos sonrisas, consejos y un montón de cariño a todos los peludos (y sus humanos también 🐾).</p>
        </ol>
      </div>
    </div>
  );
};
