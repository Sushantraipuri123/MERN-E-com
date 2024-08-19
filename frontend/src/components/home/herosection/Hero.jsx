import react from 'react'
import './Hero.css'
function Hero(){
    return(
        <>
        <div className="container-fluid bg-hero ">
       <div className="container pt-5 ">
        <div className="row align-items-center my-auto mt-5 pt-5">
            <div className="col-6 mt-5 pt-5">
                <h4 className='subtitle'>In a World full of trends</h4>
                <h2 className='mt-5 mb-5 hero-heading'>
                    Fashion style fade is eternal
                </h2>
                <div className='pt-3'>
                    <button className="hero-btn">
                        Collection
                    </button>
                </div>
            </div>
        </div>

       </div>
        </div>
        </>
    )
}

export default Hero