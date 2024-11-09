import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count > 0) {
        setCount((prevCount) => prevCount - 1);
      } else {
        navigate("/", { replace: true });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count, navigate]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "60vh" }}
    >
      <h1 className="text-warning text-center">404 Page Not Found...</h1>
      <p className="text-secondary">
        You will be redirected to home page in {count} sec...
      </p>
    </div>
  );
}

export default NotFound;
