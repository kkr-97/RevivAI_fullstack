import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import JournalItem from "../JournalItem";
import Spinner from "../Spinner";

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
    setLoadStatus(status.loading);
    axios
      .get(`https://revivai-fullstack.onrender.com/journal-items/`, {
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

  switch (loadStatus) {
    case status.loading:
      return <Spinner color="#ffffff" />;
    case status.failed:
      return <h2>Failed to fetch Journals</h2>;
    case status.success:
      return (
        <div className="container">
          <div className="row">
            <h2 className="col-12 mb-4">Your Moments...</h2>
            <ul className="col-12 parent-journal-items-container list-unstyled">
              {items.map((item, index) => (
                <li key={index}>
                  <h5>{item.date}</h5>
                  {item.journalItems.map((jItem) => (
                    <JournalItem key={jItem._id} details={jItem} />
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default Dashboard;
