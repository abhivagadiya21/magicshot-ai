import React, { use, useEffect, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
  useEffect(() => {
    fetchTransactions();
  }, []);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

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
            <thead>
              <tr>
                <th>Time & Date</th>
                <th>Recharge/Consumed</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>

              {(currentTransactions.length === 0) ? <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                No credit history available.</td> : currentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.created_at}</td>
                    <td>
                      {transaction.credits > 0 ? (
                        <>
                          <FaPlus style={{ color: "green", marginRight: "5px" }} />
                          {transaction.credits}
                        </>
                      ) : transaction.credits < 0 ? (
                        <>
                          <FaMinus style={{ color: "red", marginRight: "5px" }} />
                          {Math.abs(transaction.credits)}
                        </>
                      ) : (
                        transaction.credits
                      )}
                    </td>
                    <td>{transaction.type_cast}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination-container">
          {/* Prev button */}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="pagination-button-prev"
            disabled={currentPage === 1} // disable on first page
          >
            ◀
          </button>

          {/* Current page only */}
          <button className="pagination-button active" style={{ margin: "0 5px" }}>
            {currentPage}
          </button>

          {/* Next button */}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="pagination-button-next"
            disabled={currentPage === totalPages} // disable on last page
          >
            ▶
          </button>
        </div>
      </div>

    </>
  )

}

export default CreditsHistory;
