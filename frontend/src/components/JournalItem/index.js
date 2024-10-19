import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";

import "./index.css";

function JournalItem({ details }) {
  const { date, dayType, emotions, _id } = details;
  const { positive, negative, neutral, summary } = emotions;

  const newDate = new Date(date);

  return (
    <li className="card mb-3">
      <div className="card-body d-flex align-items-center flex-column flex-md-row">
        <div className="date-container p-2">
          <p className="mb-0 text-center p-3 rounded-circle border border-secondary">
            {newDate.getDate()}
            <br />
            {newDate.toLocaleString("default", { month: "short" })}
          </p>
        </div>
        <div className="journal-label-mood-container me-3 me-md-0">
          <div className="d-flex flex-column w-100 ">
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
          className="btn btn-warning ms-md-auto mt-3 mt-md-0 align-self-stretch align-self-md-center"
        >
          View
        </Link>
      </div>
    </li>
  );
}

export default JournalItem;
