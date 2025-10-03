import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import starIcon from "../BabyGenerator/baby-img/star.svg"
import { getTransactionsAPI } from "../../services/imageBase";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCredits } from "../../components/GlobalCom/Context";
import backArrow from "./Profile-image/backArrow.png";
function CreditsHistory() {
  const { state, dispatch, fetchUser } = useCredits();
  const { credits } = state;
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();


  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await getTransactionsAPI(token);
      if (res.status === "success") {
        console.log("Fetched transactions:", res.data);
        const transactionsData = res.data.transactionsDetails || [];
        setTransactions(transactionsData);
      }
    } catch (error) {
      console.error("Transactions fetch error:", error);
    }
  };
  const columns = [
    {
      name: "Time & Date",
      selector: (row) => row.created_at,
    },
    {
      name: "Recharge/Consumed",
      selector: (row) => row.credits,
    },
    {
      name: "Details",
      selector: (row) => row.type_cast,
    },
  ];
  useEffect(() => {
    fetchTransactions();
  }, []);


  return (
    <>
      <div className="right-main-container">
        <div className="right-container">
          <img className="credits-back-arrow" onClick={() => navigate(`/profile/personal-info`)} src={backArrow} alt="" />
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
              <p>{credits}</p>
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
            <DataTable
              className="my-custom-table"
              columns={columns}
              data={transactions}
              pagination
              // highlightOnHover
              // striped
            />
          </table>
        </div>
      </div >

    </>
  )
}

export default CreditsHistory;
