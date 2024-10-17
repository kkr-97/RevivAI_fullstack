import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";

import "./index.css";

function JournalItem({ details }) {
  const { date, dayType, emotions, _id } = details;
  const { positive, negative, neutral, summary } = emotions;

  const newDate = new Date(date);

  return (
    <li className="journal-item d-flex align-items-center">
      <div className="date-container p-2">
        <p className="mb-0 text-center p-3 rounded-circle border border-secondary">
          {newDate.getDay()}
          <br />
          {newDate.toLocaleString("default", { month: "short" })}
        </p>
      </div>
      <div className="journal-label-mood-container">
        <div className="d-flex flex-column w-75">
          <p className="mb-1">
            <b>Day Type: </b>
            {dayType}
          </p>
          <div className="mt-1 mb-0 d-flex align-items-center">
            <small>
              <b>Positive</b>
            </small>{" "}
            <ProgressBar
              bgColor="#2b8600"
              height="12px"
              completed={(positive * 100).toFixed()}
              className="flex-grow-1 ms-2"
            />
          </div>
          <div className="mb-0 d-flex align-items-center">
            <small>
              <b>Neutral</b>
            </small>{" "}
            <ProgressBar
              bgColor="#e0a91e"
              height="12px"
              completed={(neutral * 100).toFixed()}
              className="flex-grow-1 ms-2"
            />
          </div>
          <div className="mb-2 d-flex align-items-center">
            <small>
              <b>Negative</b>
            </small>{" "}
            <ProgressBar
              bgColor="#f00808"
              height="12px"
              completed={(negative * 100).toFixed()}
              className="flex-grow-1 ms-2"
            />
          </div>
        </div>
        <p className="journal-summary mb-0">
          <b>Summary: </b>
          {summary}
        </p>
      </div>
      <Link
        to={`/journal/${_id}`}
        className="btn btn-warning flex-grow ms-auto"
      >
        View
      </Link>
    </li>
  );
}

export default JournalItem;
