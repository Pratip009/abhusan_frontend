import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import OverView from "../components/OverView";
// import MissionStatement from "../components/MissionStatement";
import Testimonials from "../components/Testimonials";


const Home = () => {
  return (
    <div>
      <Hero />
      <OverView />
      <LatestCollection />
      <BestSeller />
      {/* <MissionStatement /> */}
      <Testimonials />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
