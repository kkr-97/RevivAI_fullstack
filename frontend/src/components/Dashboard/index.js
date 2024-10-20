import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";
import JournalItem from "../JournalItem";

const status = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
};

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loadStatus, setLoadStatus] = useState(status.initial);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/journal-items/`, {
        headers: {
          "auth-token": Cookie.get("reviva-token"),
        },
      })
      .then((res) => {
        setItems(res.data.journalArray);
        setLoadStatus(status.success);
      })
      .catch((err) => {
        setLoadStatus(status.error);
        console.error(err);
      });
  }, []);

  return (
    loadStatus === status.success && (
      <div className="container">
        <div className="row">
          <h2 className="col-12 mb-4">Your Moments...</h2>
          <ul className="col-12 parent-journal-items-container list-unstyled">
            {items.map((item, index) => (
              <li>
                <h5>{item.date}</h5>
                {item.journalItems.map((jItem, index) => (
                  <JournalItem key={jItem._id} details={jItem} />
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}

export default Dashboard;
