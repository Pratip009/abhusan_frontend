import { useState } from "react";

const Hero = () => {
  const images = [
    {
      src: "https://zeevector.com/wp-content/uploads/Jewellery-Poster-Background.jpg",
      alt: "First slide",
      title: "First Slide Title",
      subtitle: "This is the subtitle for the first slide",
    },
    {
      src: "https://zeevector.com/wp-content/uploads/background-for-jewellery-poster.jpg",
      alt: "Second slide",
      title: "Second Slide Title",
      subtitle: "This is the subtitle for the second slide",
    },
    {
      src: "https://i.pinimg.com/1200x/ef/f1/8b/eff18be295cc0dde7e002de20f8c2cad.jpg",
      alt: "Third slide",
      title: "Third Slide Title",
      subtitle: "This is the subtitle for the third slide",
    },
    {
      src: "https://images.meesho.com/images/products/2987210/1_512.webp",
      alt: "Fourth slide",
      title: "Fourth Slide Title",
      subtitle: "This is the subtitle for the fourth slide",
    },
    {
      src: "https://content.jdmagicbox.com/comp/etawah/p3/9999p5688.5688.191217193650.t7p3/catalogue/tarun-jewellers-etawah-jewellery-showrooms-0bb8cew104.jpg",
      alt: "Fifth slide",
      title: "Fifth Slide Title",
      subtitle: "This is the subtitle for the fifth slide",
    },
    {
      src: "https://5.imimg.com/data5/SELLER/Default/2023/5/307649835/JK/QY/MD/14629741/gold-plated-dabi-kundan-necklace-sets.jpg",
      alt: "Sixth slide",
      title: "Sixth Slide Title",
      subtitle: "This is the subtitle for the sixth slide",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const changeSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      data-hs-carousel='{"loadingClasses": "opacity-0"}'
      className="relative"
    >
      <div className="hs-carousel flex space-x-2">
        <div className="flex-none">
          <div className="hs-carousel-pagination max-h-48 sm:max-h-96 flex flex-col gap-y-2 overflow-y-auto">
            {images.map((image, index) => (
              <div
                key={index}
                className={`hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[100px] sm:w-[150px] ${
                  index === currentSlide ? "border-blue-400" : ""
                }`}
                onClick={() => changeSlide(index)}
              >
                <div className="flex justify-center h-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative grow overflow-hidden max-h-[300px] sm:max-h-[500px] bg-white rounded-lg">
          <div
            className="hs-carousel-body absolute top-0 bottom-0 start-0 flex transition-transform duration-700"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="hs-carousel-slide"
                style={{ minWidth: "100%" }}
              >
                <div className="flex flex-col sm:flex-row border border-gray-400 w-full h-full">
                  <div className="w-full sm:w-1/2 flex sm:items-start sm:justify-start py-4 sm:py-10 px-4 sm:text-left">
                    <div className="text-[#414141]">
                      <div className="flex items-center gap-2">
                        <p className="w-6 sm:w-8 h-[1px] sm:h-[2px] bg-[#414141]"></p>
                        <p className="font-medium text-xs sm:text-sm md:text-base">
                          OUR BESTSELLERS
                        </p>
                      </div>

                      <h1 className="prata-regular text-2xl sm:text-3xl lg:text-5xl leading-relaxed">
                        {image.title}
                      </h1>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        {image.subtitle}
                      </p>

                      <div className="flex items-center gap-2 mt-4">
                        <p className="font-semibold text-xs sm:text-sm md:text-base">
                          SHOP NOW
                        </p>
                        <p className="w-6 sm:w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                      </div>
                    </div>
                  </div>

                  {/* Hero Right Side */}
                  <img
                    className="w-full sm:w-3/5 object-cover h-full" // Ensures the image fills the height on desktop
                    src={image.src}
                    alt={image.alt}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-between">
            <button
              type="button"
              className="hs-carousel-prev inline-flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-md text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-full transition duration-200"
              onClick={handlePrev}
            >
              <span className="text-lg sm:text-2xl" aria-hidden="true">
                <svg
                  className="shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </span>
              <span className="sr-only">Previous</span>
            </button>

            <button
              type="button"
              className="hs-carousel-next inline-flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-md text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-full transition duration-200"
              onClick={handleNext}
            >
              <span className="sr-only">Next</span>
              <span className="text-lg sm:text-2xl" aria-hidden="true">
                <svg
                  className="shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
