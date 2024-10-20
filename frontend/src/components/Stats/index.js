import { useState, useEffect } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import axios from "axios";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./index.css";

const status = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
};

const COLORS = [
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "#FF6692",
  "#AAB2FF",
  "#FFB300",
  "#FF5E5E",
  "#00A3E0",
];

function Stats() {
  const [pieDetails, setPieDetails] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [topMoments, setTopMoments] = useState([]);
  const [pieStatus, setPieStatus] = useState(status.initial);
  const [moodStatus, setMoodStatus] = useState(status.initial);
  const [momentsStatus, setMomentStatus] = useState(status.initial);

  const TopMoment = ({ moment }) => {
    const { id, positiveScore, summary, date } = moment;
    const newDate = new Date(date);
    return (
      <div
        className="border rounded top-moment-container p-2 d-flex flex-column align-items-center justify-content-between"
        style={{ minHeight: "280px" }}
      >
        <p className="date border rounded-circle text-center p-3 mb-0">
          {newDate.getDate()}
          <br />
          {newDate.toLocaleString("default", { month: "short" })}
          <br />
          <small>
            {newDate.toLocaleString("default", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </p>

        <div className="d-flex align-items-center">
          <b>Positive Score:</b>{" "}
          <span>
            <Gauge
              width={50}
              height={50}
              value={(positiveScore * 100).toFixed()}
            />
          </span>
        </div>
        <p className="summary text-center">{summary}</p>
        <Link to={`/journal/${id}`} className="btn btn-warning">
          View this Moment
        </Link>
      </div>
    );
  };

  useEffect(() => {
    setPieStatus(status.loading);
    setMoodStatus(status.loading);
    axios
      .get(`http://localhost:3001/journals/pie-chart`, {
        headers: {
          "auth-token": Cookie.get("reviva-token"),
        },
      })
      .then((res) => {
        setPieDetails(res.data.aggregation);
        setPieStatus(status.success);
      })
      .catch((err) => {
        console.error("Error", err?.response?.data?.message);
        setPieStatus(status.error);
      });

    axios
      .get(`http://localhost:3001/journals/emotions-trends-data`, {
        headers: {
          "auth-token": Cookie.get("reviva-token"),
        },
      })
      .then((res) => {
        setMoodData(res?.data?.trendsData);
        setMoodStatus(status.success);
      })
      .catch((err) => {
        console.error("Error", err?.response?.data?.message);
        setMoodStatus(status.failed);
      });

    axios
      .get(`http://localhost:3001/journals/top-moments`, {
        headers: {
          "auth-token": Cookie.get("reviva-token"),
        },
      })
      .then((res) => {
        setTopMoments(res.data.topMoments);
        setMomentStatus(status.success);
      })
      .catch((err) => {
        console.error("Error", err?.response?.data?.message);
        setMomentStatus(status.error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card mood-distribution-container">
            <div className="card-body">
              <h5 className="card-title">
                Mood Distribution <small>(Past 10 entries)</small>
              </h5>
              {pieStatus === status.success && (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieDetails}
                      dataKey="value"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      fill="#8884d8"
                    >
                      {pieDetails.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card emotional-trends-container">
            <div className="card-body h-100">
              <h5 className="card-title">
                Emotional Trends <small>(Past 10 entries)</small>
              </h5>
              <div>
                {moodStatus === status.success && (
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={moodData}>
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="name" />

                      <YAxis
                        label={{
                          value: "Sentiment Scores",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                        }}
                      />

                      <Tooltip />
                      <Legend />
                      <Line type="linear" dataKey="positive" stroke="#82ca9d" />
                      <Line type="linear" dataKey="neutral" stroke="#8884d8" />
                      <Line type="linear" dataKey="negative" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <div className="card top-3-emotional-moments">
            <div className="card-body">
              <h5 className="card-title">Top 3 Happy Moments</h5>
              <div className="d-flex align-items-center justify-content-between flex-column flex-md-row">
                {momentsStatus === status.success &&
                  topMoments.map((moment, index) => (
                    <TopMoment key={index} moment={moment} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
