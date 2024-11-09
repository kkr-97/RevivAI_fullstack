import CircularProgress from "@mui/material/CircularProgress";

type SpinnerPropType = {
  color: string
}

export default function CircularIndeterminate({ color }:SpinnerPropType) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <CircularProgress  />
    </div>
  );
}
