import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import '../BabyGenrator_page/babyPage.css';
import star from './babyG-img/star.svg'
import babyImage from './babyG-img/babyG.png'
function babyPage() {
    return (
        <>
            <div className="main-baby-genrartor">
                <div className="left-main-babyG">
                    <div className="inner-left-1-babyG">
                        <h4>AI Baby Genrator</h4>
                    </div>
                    <div className='inner-left-2-babyG'>
                        <div className='upload-image-buttons'>

                            
                        <div className='uplod-image-button'>
                            <p className='Upload-img-lebal'>Your Image</p>
                            
                            <button className='uplod-button-babyG'><p className='plus-iocn'>+</p><p className='icon-text'>Upload</p></button>

                        </div>
                         <div className='uplod-image-button'>
                            <p className='Upload-img-lebal'>Your Partner's Image</p>
                            
                            <button className='uplod-button-babyG'><p className='plus-iocn'>+</p><p className='icon-text'>Upload</p></button>

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
                    <Upload_img uploadDetails={{ image: babyImage }} />
                </div>
            </div>
        </>
    )
}
export default babyPage;
