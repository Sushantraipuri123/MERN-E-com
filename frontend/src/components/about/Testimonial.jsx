import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";

const Brand = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true, // Enable default arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonial = [
    {
      quote: "This is hands down the best e-commerce platform I've ever used. The seamless interface and top-notch customer service make every shopping experience a delight. Highly recommend!",
      author: "Sarah Thompson",
    },
    {
      quote: "As a vendor, I couldn't ask for a better platform to showcase my products. The site is user-friendly, and the support team is always quick to help. It's been a game-changer for my business.",
      author: "Michael Chen",
    },
    {
      quote: "I love the variety and quality of products available on this site. It's become my go-to place for everything I need, from tech gadgets to fashion items. Great job!",
      author: "Emily Davis",
    },
    {
      quote: "The ease of navigation and the secure checkout process are impressive. I’ve made multiple purchases, and each time the experience has been smooth and reliable. Fantastic work!",
      author: "David Lee",
    },
    {
      quote: "The customer service here is exceptional. Whenever I’ve had questions or needed assistance, the team has been incredibly responsive and helpful. I’ll definitely be coming back!",
      author: "Jessica Smith",
    },
  ];
  
  return (
    <div className="brand">
      <div className="brand-heading">
        <h1 className=" Urbanist">What Our Client Says</h1>
      </div>
      <div className="car_brand">
        <Slider {...settings}>
          {testimonial.map((item, index) => (
            <div key={index} className="brand-slide">
              <div className="brand-logo">
                {/* Add any content or images for the slide here */}
              </div>
              <div className="testimonial-content p-5">
                <h3 className=" Urbanist mx-3">{item.quote}</h3>
                <h4 className="Urbanist mt-4 text-muted">- {item.author}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Brand;
