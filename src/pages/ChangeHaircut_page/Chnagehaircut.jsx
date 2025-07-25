import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import './chnageHaircut.css';
import star from '../BabyGenrator_page/babyG-img/star.svg';
import hairImage from './hairstyle_image/changehaircut.png'
function ChangehaircutPage() {
    return (
        <>
            <div className="main-baby-genrartor">
                <div className="left-main-babyG">
                    <div className="inner-left-1-babyG">
                        <h4>Change Hairstyle</h4>
                    </div>
                    <div className='inner-left-2-babyG'>

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
                    <Upload_img uploadDetails={{ image: hairImage }} />
                </div>
            </div>
        </>
    )
}
export default ChangehaircutPage;
