import Slider from "react-slick";
import "./Hero.css"; // Import the external CSS file
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Disable arrows for smaller screens
        },
      },
    ],
  };

  return (
    <div className="hero-carousel-wrapper">
      <div className="hero-carousel">
        <Slider {...settings}>
          {/* Slide 1 */}
          <HeroSlide
            title="From classic to contemporary"
            heading="find your shine"
            cta="SHOP NOW"
            imgSrc="https://t3.ftcdn.net/jpg/08/55/93/82/360_F_855938258_DfrwKI6t3i5w1PaJdLjIAY6vOEMNsNk1.jpg"
            customClass="slide1"
          />
          {/* Slide 2 */}
          <HeroSlide
            title="Modern Minimalist "
            heading="Light , luminous and luxurious"
            cta="EXPLORE NOW"
            imgSrc="https://i.pinimg.com/736x/94/f1/4f/94f14fe690d62b6c5b1c05e172f57a88.jpg"
            customClass="slide2"
          />
          {/* Slide 3 */}
          <HeroSlide
            title="Jewellery for Everyday Queen’s "
            heading="Light, chic and comfy"
            cta="SHOP THE DEAL"
            imgSrc="https://t4.ftcdn.net/jpg/05/27/71/81/360_F_527718147_x7XDK929xZnZqjgh0oPYz7xK0EvtnlIF.jpg"
            customClass="slide3"
          />
          {/* Slide 4 */}
          <HeroSlide
            title="Delicate yet Dazzling "
            heading="Designs that are as light as your lifestyle"
            cta="SHOP SUMMER"
            imgSrc="https://t3.ftcdn.net/jpg/08/36/22/32/360_F_836223272_6y32LS6xndXCOFDYmtMYHxiS07bfvAjO.jpg"
            customClass="slide4"
          />
          {/* Slide 5 */}
          <HeroSlide
            title="Brides who deserves the BEST "
            heading="Designed to shine as brightly as your love"
            cta="DISCOVER MORE"
            imgSrc="https://images.diamondstuds.com/general_images/promotionimg/promotion_banner_274_06_17_2024_mobile.jpg"
            customClass="slide5"
          />
          {/* Slide 6 */}
          <HeroSlide
            title="Gifts that last LIFETIME"
            heading="Elevate your elegance with the perfect accessory"
            cta="SHOP WINTER"
            imgSrc="https://t3.ftcdn.net/jpg/09/31/45/96/360_F_931459604_aMU6X8j1l7XlkxjRBXzwgtTE9ihzTlh0.jpg"
            customClass="slide6"
          />
          {/* Add additional slides as needed */}
        </Slider>
      </div>
    </div>
  );
};

const HeroSlide = ({ title, heading, cta, imgSrc, customClass }) => (
  <div className={`hero-slide ${customClass}`}>
    <img className="w-full h-full object-cover" src={imgSrc} alt={heading} />
    <div className="hero-overlay">
      <p className={`hero-title ${customClass}-title`}>{title}</p>
      {/* Removed the <hr> tag */}
      <h1 className={`hero-heading ${customClass}-heading`}>{heading}</h1>
      <button>{cta}</button>
    </div>
  </div>
);

export default Hero;
