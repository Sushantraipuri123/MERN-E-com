import './Footer.css';
import { GrLocation } from "react-icons/gr";
import { LuRotateCcw } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { FiCreditCard } from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer(){

    useEffect(()=>{
        AOS.init({
             duration:'1000',
             once:"true",

        },[]);
    })

    return(<>
    <section className='container-fluid footer-container mt-5 pb-3'>
        <div className='container-fluid'>
            <div data-aos="fade-up" data-aos-delay="500" className='row'>
                <div className='col-lg-3 footer-card sora'>
                    <div className='footer-container'>
                        <div className='footer-box'>
                        <span className='footer-icon'><GrLocation /></span>
                        <h5 className='footer-title'>Order tracking</h5>
                        <p className='footer-text'>Track Your order where is it..?</p>
                        </div>
                    </div>
                    </div>
                    <div className='col-lg-3 footer-card sora'>
    <div className='footer-container'>
        <div className='footer-box'>
            <span className='footer-icon'><LuRotateCcw /></span>
            <h5 className='footer-title'>45 days return</h5>
            <p className='footer-text'>Return order within 45 days of purchase</p>
        </div>
    </div>
</div>

                    <div className='col-lg-3 footer-card sora'>
                    <div className='footer-container'>
                        <div className='footer-box'>
                        <span className='footer-icon'><FiDollarSign /></span>
                        <h5 className='footer-title'>Money guarantee</h5>
                        <p className='footer-text'>100% money back guarantee if returned </p>
                        </div>
                    </div>
                    </div>
                    <div className='col-lg-3 footer-card sora'>
                    <div className='footer-container'>
                        <div className='footer-box'>
                        <span className='footer-icon'><FiCreditCard /></span>
                        <h5 className='footer-title'>Flexible payment</h5>
                        <p className='footer-text'>COD , Netbanking , UPI</p>
                        </div>
                    </div>
                    </div>
                

            </div>

        </div>
        <hr></hr>
        <div className=' sora'>
            <div className="row">
                <div className="col-lg-12  footer-blogs">

                    <div className='footer-content'>
                        <h5>My Account</h5>
                        <div className='footer-para-area mt-4'>
                            <Link to="/account" style={{color:'#636363'}}><p>My Account</p></Link>
                            <Link to="/account/my-orders" style={{color:'#636363'}}><p>Order History</p></Link>
                            <Link to="/refund" style={{color:'#636363'}}><p>Return Policy</p></Link>
                        </div>
                    </div>
                    <div className='footer-content'>
                        <h5>Our legal</h5>
                        <div className='footer-para-area mt-4'>
                        <Link to="/terms" style={{color:'#636363'}}><p>Terms & condition</p></Link>
                            <Link to="/about" style={{color:'#636363'}}><p>About us</p></Link>
                            <Link to="/contact" style={{color:'#636363'}}><p>Our location</p></Link>
                        </div>
                    </div>
                    <div className='footer-content'>
                        <h5>Information</h5>
                        <div className='footer-para-area mt-4'>
                        <Link to="/contact" style={{color:'#636363'}}><p>Keep in touch</p></Link>
                        <Link to="/privacy" style={{color:'#636363'}}><p>Privacy policy</p></Link>
                        <Link to="/refund" style={{color:'#636363'}}><p>Refund policy</p></Link>
                        </div>
                    </div>
                    <div className='footer-content' style={{marginRight:'20px'}}>
                        <h5>Contact us</h5>
                        <div className='footer-para-area mt-4'>
                            <p>+91 78761-35383</p>
                            <p>cashu853@gmaill.com</p>
                            <p style={{color:'black'}}><strong>We're located in India</strong></p>
                            <p>Custom care hours</p>
                            <p>10:00 AM - 8:30 PM</p>
                        </div>
                    </div>
                    <div className='footer-content'style={{marginRight:'10px'}}>
                        <div className='footer-tit'>
                        <h5>OUR INSTAGRAM</h5>
                        </div>
                        <div className='footer-insta'>
                        <div className='footer-insta-first'>
                            <img src='https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-instagram-images-01_0554be35-9f59-46ea-aa5f-6f5d58a2d698.jpg?v=1689065261&width=352'></img>
                            <img src='https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-instagram-images-03_df0babb4-0180-40d0-a0cd-570f054c4539.jpg?v=1689065261&width=352'></img>
                            <img src='https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-instagram-images-05_49c9fb27-6c9e-4e57-a68c-ea545521d282.jpg?v=1689065261&width=352'></img>
                            </div>
                            <div className='footer-insta-second'>
                            <img src='https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-instagram-images-02_ff4a7a24-58d4-4ee4-bec3-a9d2d98929ee.jpg?v=1689065261&width=352'></img>
                            <img src='https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-instagram-images-04_24380b1d-4fa0-4a6e-b6d2-ea94217b8b82.jpg?v=1689065261&width=352'></img>
                            <img src='https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-instagram-images-06_28ccd17f-1f61-4db6-a88d-21fa6b780a1d.jpg?v=1689065261&width=352'></img>
                            </div>
                            </div>
                        
                    </div>

                </div>
            </div>
        </div>
    </section>
            <p className='text-center text-muted mt-3'>&copy; 2024 Sushant Raipuri. All rights reserved. </p>
    </>)
};

export default Footer;