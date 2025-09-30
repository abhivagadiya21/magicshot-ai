import React from "react";
import starIcon from "../BabyGenerator/baby-img/star.svg"

function CreditsHistory() {
  return (
    <>
      <div className="right-main-container">
        <div className="right-container">
          <p>Credits History</p>
        </div>
      </div>

      <div className="right-main-creidt-container">
        <p className="my-credits-container">My Credits</p>
        <div className="divayder"></div>

         <div className="credit-and-button-container">
          <div className="credit-icon-main-container">
            <div>
               <img className="staricon" src={starIcon} alt="star icon" />
            </div>
            <div className="credit-text">
              <p>0.00</p>
            </div>
          </div>
          <div className="buy-credit-button-container">
          <button className="buy-credit-button">Buy More Credits</button>
          </div>
        </div>
      </div>
      <div className="right-main-creidt-container">
    

         <div className="credit-history-and-button-container">
            <div className="credit-text">
              <p>Credit History Details</p>
            
          </div>
          <div className="buy-credit-button-container">
          <button className="buy-credit-button">Buy More Credits</button>
          </div>
        </div>
        <div className="divayder"></div>
        <div className="table-container">
        <table className="table-credit-history">
      <thead>
        <tr>
          <th>Time & Date</th>
          <th>Recharge/Consumed</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
       
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
      
      </tbody>
    </table>
    </div>
      </div>
      
    </>
  )

}

export default CreditsHistory;
