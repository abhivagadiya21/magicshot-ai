import './Upload_img.css';
import babyG from './image_that/babyG.png'
function Upload_img(){
    return (
        <>
        <div className="main-upload-img-babyG">
            <div className="inner-1-img-babyG">
                <img src={babyG} alt="Baby Generator"  className='upload-img-props ' />
            </div>
            <div className="inner-1-imgUpload-babyG">uploadder button</div>
        </div>
        </>
    )
}
export default Upload_img;