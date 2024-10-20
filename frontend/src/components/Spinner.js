import CircularProgress from "@mui/material/CircularProgress";

export default function CircularIndeterminate({ color }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <CircularProgress color={color} />
    </div>
  );
}
