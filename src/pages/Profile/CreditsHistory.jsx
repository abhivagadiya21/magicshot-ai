import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import starIcon from "../BabyGenerator/baby-img/star.svg"
import { getTransactionsAPI } from "../../services/imageBase";
import { useCredits } from "../../components/GlobalCom/Context";
import backArrow from "./Profile-image/backArrow.png";
function CreditsHistory() {
  const { state, dispatch, fetchUser } = useCredits();
  const { credits } = state;
  const [transactions, setTransactions] = useState([]);
  const [filterTransactions, setFilterTransactions] = useState([]);
  // const [filterType, setFilterType] = useState("all");
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
        setFilterTransactions(transactionsData);
      }
    } catch (error) {
      console.error("Transactions fetch error:", error);
    }
  };
  const handleFilter = (type) => {
    // setFilterType(type);
    if (type === "all") {
      setFilterTransactions(transactions);
    } else if (type === "recharge") {
      setFilterTransactions(transactions.filter((t) => t.credits > 0))
    } else if (type === "consumed") {
      setFilterTransactions(transactions.filter((t) => t.credits < 0))
    }
  }
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
          <div className="credit-history-dropdown">
            <select className="buy-credit-dropdown" onChange={(e) => handleFilter(e.target.value)} >
              <option value="all" >All</option>
              <option value="recharge" >Recharge</option>
              <option value="consumed" >Consumed</option>
            </select>
          </div>
        </div>
        <div className="divayder"></div>
        <div className="table-container">
          <table className="table-credit-history">
            <DataTable
              className="my-custom-table"
              columns={columns}
              data={filterTransactions}
              pagination
              
              // highlightOnHover
              // striped
              customStyles={{
                table: {
                  style: {
                    backgroundColor: "#15191c",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#15191c",
                    color: "white",
                  },
                },
                rows: {
                  style: {
                    backgroundColor: "#15191c",
                    color: "white",
                    borderBottom: "1px solid #2a2e32",
                  },
                },
                pagination: {
                  style: {
                    backgroundColor: "#15191c",
                    color: "white",
                  },
                },
                svgWrapper: {
                  style: {
                    fill: "white",
                    color: "white",
                  },
                },
              }}
            />
          </table>
        </div>
      </div >

    </>
  )
}

export default CreditsHistory;
