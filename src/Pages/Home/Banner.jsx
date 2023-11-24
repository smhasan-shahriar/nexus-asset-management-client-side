import AwesomeSlider from "react-awesome-slider";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

const Banner = () => {
   const navigate = useNavigate()
  return (
    <div className="max-h-[600px]">
      <Carousel infiniteLoop={true} showStatus={false}>
        <div>
          <div
            className="hero"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/xM1kwDp/abenteuer-albanien-Dn-S2wr-PDV8o-unsplash.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-xl lg:py-20 py-10">
                <h1 className="mb-5 text-5xl font-bold">Welcome to Nexus Asset Management</h1>
                <p className="mb-5">
                Streamline asset control effortlessly! Empower Administration with seamless asset management tools. Elevate efficiency and optimize resources for a thriving workplace
                </p>
                <button onClick={() => navigate('/signup-admin')} className="btn btn-primary">Join as HR/Admin</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="hero"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/xM1kwDp/abenteuer-albanien-Dn-S2wr-PDV8o-unsplash.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-xl lg:py-20 py-10">
                <h1 className="mb-5 text-5xl font-bold">Welcome to Nexus Asset Management</h1>
                <p className="mb-5">
                Optimize office assets effortlessly! Elevate productivity and comfort. Join as an employee and experience seamless asset management for a brighter and better workplace.
                </p>
                <button onClick={() => navigate('/signup-employee')}  className="btn btn-primary">Join As Employee</button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
