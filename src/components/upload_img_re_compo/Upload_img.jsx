import './Upload_img.css';
// import babyG from './image_that/babyG.png'
function Upload_img({uploadDetails}) {
    return (
        <>
            <div className="main-upload-img-babyG">
                <div className="inner-1-img-babyG">
                    <img src={uploadDetails.image} alt="Baby Generator" className='upload-img-props ' />
                </div>
                <div className="upload-container">
                    <span className="plus-icon">+</span>
                    <div className="text">Drag or choose your image</div>
                    <div className="subtext">Max size 30 MB</div>
                    <button className="upload-btn">Upload image</button>
                </div>

            </div>
        </>
    )
}
export default Upload_img;