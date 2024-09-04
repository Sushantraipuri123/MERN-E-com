import { IoLocationOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { CgMail } from "react-icons/cg";
import './Contact.css'
import ContactForm from "./ContactForm";
function Contact() {
  return (
    <>
      <div className="container-fluid bg-single-product py-5">
        <div>
          <h5 className="text-center Urbanist  mt-5">HOME / contact</h5>
          <h6  className="text-center Urbanist  mt-2">Keep in Touch</h6>
        </div>
      </div>

      <div className="container">
        <h1 className="Urbanist text-center mt-4 pt-lg-3 pb-lg-3q">Quick support</h1>
            <div className="row   mt-4 justify-content-center">
                <div className="col-lg-4 mt-3 col-md-4 d-flex justify-content-center">
                    <div>
                    <div className="icon-container">
                    <IoLocationOutline />
                    </div>
                    <h5 className="Urbanist text-center mt-2">V.P.O Raipur (H.P)</h5>
                    </div>
                </div>
                
                <div className="col-lg-4 mt-3 col-md-4 d-flex justify-content-center">
                    <div>
                    <div className="icon-container">
                    <LuPhoneCall />
                    </div>
                    <h5 className="Urbanist text-center mt-2">+91 78761-35383</h5>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4 mt-3 d-flex justify-content-center">
                    <div>
                    <div className="icon-container">
                    <CgMail />
                    </div>
                    <h5 className="Urbanist text-center mt-2">cashu853@gmail.com</h5>
                    </div>
                </div>
            </div>
      </div>

      <div className="container-fluid mt-4">
      <div className="bg-map"></div>
      <div className="container rounded map-container">
        <iframe
          title="map"
          width="100%"
          height="450"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16184.125476040883!2d76.45934609679131!3d32.06297669457446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904b4bde725de51%3A0xefff3814c4ec433b!2sRaipur%20Khas%2C%20Himachal%20Pradesh%20176085%2C%20India!5e1!3m2!1sen!2sus!4v1725443183287!5m2!1sen!2sus"
          frameBorder="0"
          style={{ border: 0, borderRadius:"15px" }}
          allowFullScreen
        ></iframe>
      </div>
     
    </div>

    <div className="container mt-3">
        <ContactForm/>
    </div>
    </>
  )
}

export default Contact