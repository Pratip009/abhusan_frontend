import Title from "./Title";

const MissionStatement = () => {
  return (
    <div className="my-10">
      {/* Title Section */}
      <div className="text-center py-8 text-3xl">
        <Title text1={"MISSION &"} text2={"VISION"} />
      </div>

      {/* Mission and Vision Statements Side by Side */}
      <div className="flex flex-col md:flex-row justify-center items-center text-gray-700">
        {/* Mission Statement */}
        <div className="md:w-1/2 text-center md:text-right px-4">
          <h3 className="text-xl font-semibold mb-4">Mission Statement</h3>
          <p className="text-xs sm:text-sm md:text-base leading-relaxed">
            To offer our customers the beauty and sophistication of fine jewellery with an emphasis on 
            affordability and superior quality, enhancing their personal style without compromise.
          </p>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block mx-6 border-l-2 h-24 border-gray-300"></div>

        {/* Vision Statement */}
        <div className="md:w-1/2 text-center md:text-left px-4 mt-6 md:mt-0">
          <h3 className="text-xl font-semibold mb-4">Vision Statement</h3>
          <p className="text-xs sm:text-sm md:text-base leading-relaxed">
            To be the global leader in imitation jewellery, known for our innovative designs, exceptional 
            quality, and customer-centric approach, making luxury accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;
