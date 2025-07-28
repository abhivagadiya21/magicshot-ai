import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import './agePredictor.css';
import star from '../BabyGenrator_page/babyG-img/star.svg'
import predictorImage from './predictor_image/agepredictor.png';
function AgePredictor() {
    return (
        <>
            <div className="main-baby-genrartor">
                <div className="left-main-babyG-2">
                    <div className="inner-left-1-babyG">
                        <h4>AI Age Predictor</h4>
                    </div>
                    <div className='inner-left-2-babyG'>
                        <div className='upload-image-age-container'>
                            <div className='upload-image-age-button'>
                                <button className='upload-age-button'>
                                    <p className='plus-iocn-2'>+</p>
                                    <p className='font-wirth'>Drag or choose your image</p>
                                    <p className='font-size'>Max size 30 MB</p>
                                </button>
                            </div>
                        </div>
                        <div className='Version-main-container'>
                            <div className='version-main-left'>  
                                <p className='version-text-1'>Version (optional)</p>
                                <div className='version-star-container'>
                                    <div className='version-star-icon-text-container'>
                                        
                                    <div className='version-star-icon'>
                                        <img src={star} alt="" />
                                    </div>
                                    <div className='version-star-text'> 
                                        <p>-1

                                        </p>
                                    </div>
                                    </div>

                                </div>
                            </div>
                            <div className='version-main-right'>
                                <p className='version-text-2'>V1</p>
                                <span>
                                    <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="1em" data-slot="selectorIcon" class="absolute end-3 w-4 h-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180"><path d="m6 9 6 6 6-6"></path></svg>
                                </span>


                            </div>

                        </div>
                    </div>
                    <div className="inner-left-3-babyG">
                        <div className='inner-1-for-left-3'>
                            <p>Est. time: 30 seconds to 50 seconds</p>
                        </div>
                        <div className="inner-2-for-left-3">
                            <button className='baby-left-3-btn-1'>See Pricing</button>
                            <button className='baby-left-3-btn-2'>Generate
                                < div className="baby-left-3-btn-2-icon">
                                    <img src={star} alt="" /> 
                                    <span>-0.5</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right-main-babyG">
                    <Upload_img uploadDetails={{ image: predictorImage }} />
                </div>
            </div>
        </>
    )
}
export default AgePredictor;
