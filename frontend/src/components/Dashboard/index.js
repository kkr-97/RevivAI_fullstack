import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
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

  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/journal-items/${userId}`)
      .then((res) => {
        setItems(res.data.journalItems);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <ul className="col-12 journals-list-container">
          {items.map((item) => (
            <JournalItem key={item._id} details={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
