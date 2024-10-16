import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "./index.css";

const dayTypes = [
  { type: "Happy", icon: "😊" },
  { type: "Stressed", icon: "🤯" },
  { type: "Sad", icon: "🥺" },
  { type: "Angry", icon: "😠" },
  { type: "Not Able to know", icon: "❔" },
];

const journalStatus = {
  initial: "INITIAL",
  submitting: "SUBMITTING",
  submitted: "SUBMITTED",
};

function Home() {
  const [date, setDate] = useState(new Date());
  const [journal, setJournal] = useState("");
  const [dayType, setVerdict] = useState("");
  const [status, setStatus] = useState(journalStatus.initial);

  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.userId);

  const onChangeDate = (e) => setDate(e.target.value);
  const onChangeJournal = (e) => setJournal(e.target.value);
  const onChangeVerdict = (e) => setVerdict(e.target.value);

  const submitJournal = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3001/create-journal", {
        userId,
        date,
        dayType,
        journal,
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e.response.data.message));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="main-head ">
            👋 Hello {username}!, how's your day...
          </h2>
          <form
            onSubmit={submitJournal}
            className="journal-container bg-light bg-gradient"
          >
            <div className="header-container pb-2">
              <div className="input-container date-container form-group">
                <label htmlFor="journal_input_date">Date</label>
                <input
                  type="date"
                  id="journal_input_date"
                  className="form-control"
                  name="date"
                  onChange={onChangeDate}
                  value={date}
                />
              </div>
              <div className="input-container type-container from-group">
                <label htmlFor="dayType">Verdict of the Day</label>
                <select
                  id="dayType"
                  className="form-control"
                  onChange={onChangeVerdict}
                  value={dayType}
                >
                  <option disabled>Select your dayType of the day</option>
                  {dayTypes.map((dayType, index) => (
                    <option key={index} value={dayType.type}>
                      {dayType.icon} {dayType.type}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="journal-input-container flex-grow-1">
              <textarea
                value={journal}
                onChange={onChangeJournal}
                placeholder="Describe about your day here..."
                className="flex-grow-1 form-control"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-warning submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
