import React, { Component } from 'react'
import backArrow from "./Profile-image/backArrow.png";
import ProfileImage from "./Profile-image/Profile-icon.svg";

export class ImageHistory extends Component {
  render() {
    return (
      <div className='image-history-container'>
        <div className='image-card'>
            <img src={backArrow} alt="" />
        </div>
        <div className='image-card'>
            <img src={ProfileImage} alt="" />
        </div>
        <div className='image-card'>
            <img src={backArrow} alt="" />
        </div>
        <div className='image-card'>
            <img src={ProfileImage} alt="" />
        </div>
        <div className='image-card'>
            <img src={backArrow} alt="" />
        </div>
        <div className='image-card'>
            <img src={ProfileImage} alt="" />
        </div>
        <div className='image-card'>
            <img src={backArrow} alt="" />
        </div>
        <div className='image-card'>
            <img src={ProfileImage} alt="" />
        </div>
        <div className='image-card'>
            <img src={backArrow} alt="" />
        </div>

      </div>
    )
  }
}

export default ImageHistory
