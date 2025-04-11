import { useState, useEffect } from 'react';
import '../Styles/Home.css';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://img.freepik.com/psd-premium/adopte-plantilla-banner-portada-facebook-promocion-mascotas-redes-sociales_484627-427.jpg?w=1380",
    "https://img.freepik.com/vector-premium/banner-portada-facebook-perros-gatos-cuidado-mascotas_252779-649.jpg?w=1380",
"https://img.freepik.com/vector-premium/adopta-banner-portada-facebook-mascota_252779-446.jpg?w=1380",    "https://img.freepik.com/vector-gratis/plantilla-portada-facebook-tienda-mascotas-dibujada-mano_23-2150383109.jpg?t=st=1744371524~exp=1744375124~hmac=b16b4aa6bbac21a8373fc6f5c1653ab9511ce26d43ed5967534647f5ca8b4762&w=1380",
    "https://img.freepik.com/vector-gratis/portada-facebook-servicio-cuidado-mascotas-dibujada-mano_23-2149636389.jpg?t=st=1744371487~exp=1744375087~hmac=2d6eefac181efab4bc51232aae933820e675982a05313a9b99cfa3090762607a&w=1380"
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

        <div className="BoxPresentation">
         <div className="BoxPresentationText">
        <h1 className="title">¿Quiénes somos?</h1>
        <p>¡Hola! Somos 🐾 una petshop de Buenos Aires creada por amantes de los animales para amantes de los animales.

En pocas palabras... ¡vivimos rodeados de pelos, patitas y mucho amor! 
<br />❤️ Nos encanta ver a las mascotas felices y por eso trabajamos todos los días para que no les falte nada: comida rica 🍖, juguetes divertidos 🎾, accesorios con onda 😎 y todo lo que necesiten para estar sanos y llenos de energía.

<br />Sabemos que tu mascota no es "una más", es familia. Por eso aquí te vas a sentir como en casa — o mejor dicho, ¡como en una casa llena de huellitas y colitas felices! 🐕🐈

<br />¿Buscás lo mejor para tu mejor amigo? Acá lo tenemos. Y si no lo tenemos… ¡lo conseguimos! 😉

<br />Porque en Petshop no solo vendemos cosas… creamos momentos, anécdotas y miles de historias para contar. 🐾</p>
          <img src='https://images.ctfassets.net/1sv59kqumaqp/2ADoT6m1c84hnTZ2VD4YH/e581bb87c9896c7f953c97cb34b4ee7f/mascotas.png'></img>
          </div> 
        </div>

        <div className='boxServices'>
        <h2 className="title">Nuestros servicios</h2>
        <p>En Petshop tenemos todo lo que necesita tu mascota… y un poquito más 😉</p>
        
        
<div className='boxList'>
          <div className='boxListService'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzwAvnfEewQBrSQq1zVJcpH9gJIBd-8dIpw&s" alt="Alimentacion" />
          <h1>Alimentación <br /> 🥩🍖</h1>
          <p>Para los que aman comer (o mejor dicho… ¡devorar!). Alimentos balanceados, snacks, golosinas y hasta premios para cuando se portan bien… o solo porque los amás demasiado.</p>
          </div>
          <div className='boxListService'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW2b6xXrkgY8tdixi8r0DO6nZqObnfzSz29w&s" alt="Juguetes y Accesorios" />
          <h1>Juguetes y Accesorios <br /> 🎾🦴</h1>
          <p>¡Acá la diversión no falta! Juguetes para morder, correr, atrapar o simplemente destruir en 5 minutos (sabemos cómo son 😅). Además, correas, camitas, platitos y un montón de cosas lindas para que tu mascota sea la más facha del barrio 😎.
            <br />
          </p>
          </div>
          <div className='boxListService'>
          <img src="https://img.freepik.com/vector-gratis/perros-dibujos-animados_24640-47500.jpg?semt=ais_hybrid&w=740" alt="Juguetes y Accesorios" />
          <h1>Salud y Cuidado <br />🧼🐕‍🦺</h1>
          <p>Porque ser bellos también es importante: shampoos, antipulgas, vitaminas y todo para que estén sanos, felices y brillando como estrellas ✨.</p>
          </div>
          <div className='boxListService'>
          <img src="https://thumbs.dreamstime.com/b/perro-y-gato-rojo-caracteres-del-gatito-concepto-del-inu-de-akita-de-la-amistad-92104191.jpg" alt="Amor, mimos y buena onda" />
          <h1>Amor y mimos <br />❤️</h1>
          <p>Esto viene gratis, ¡siempre! Porque en Petshop no solo vendemos productos... también regalamos sonrisas, consejos y un montón de cariño a todos los peludos (y sus humanos también 🐾).</p>
          </div>
</div>
        </div>

      </div>
    </div>
  
  );
};
