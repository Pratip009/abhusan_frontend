import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import FAQ from "./FAQ";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            ABHUSHAN JEWELLERYCO.is a leading designer and manufacturer of
            high-quality imitation jewellery. Established in [2022], our company
            has carved a niche in the fashion industry by providing exquisite
            jewellery that captures the elegance of fine pieces at a fraction of
            the cost. Our commitment to craftsmanship, style, and affordability
            makes us a preferred choice for fashion-conscious individuals
            worldwide.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            To offer our customers the beauty and sophistication of fine
            jewellery with an emphasis on affordability and superior quality,
            enhancing their personal style without compromise.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            To be the global leader in imitation jewellery, known for our
            innovative designs, exceptional quality, and customer-centric
            approach, making luxury accessible to everyone.
          </p>
        </div>
      </div>

      <div className=" text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className=" text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className=" text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className=" text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <NewsletterBox />
      <FAQ/>
    </div>
  );
};

export default About;
