import Title from "./Title";

const OverView = () => {
  return (
    <div className="my-10 px-4 md:px-8 lg:px-16">
      {/* Title Section */}
      <div className="text-center py-8 text-3xl">
        <Title text1={"COMPANY"} text2={"OVERVIEW"} />
      </div>

     
      <div className="max-w-10xl mx-auto text-center">
        <p className="w-full m-auto text-xs sm:text-sm md:text-base text-gray-600">
          <strong>ABHUSHAN JEWELLERY CO.</strong> is a leading designer and
          manufacturer of high-quality imitation jewellery. Established in{" "}
          <strong>2022</strong>, our company has carved a niche in the fashion
          industry by providing exquisite jewellery that captures the elegance
          of fine pieces at a fraction of the cost. Our commitment to
          craftsmanship, style, and affordability makes us a preferred choice
          for fashion-conscious individuals worldwide.
        </p>
      </div>
    </div>
  );
};

export default OverView;
