import "./Shimmer.css";

function ShimmerCard() {
  return (
    <div className="shimmer-card">
      <div className="shimmer-line title" />
      <div className="shimmer-line description" />
      <div className="shimmer-line description-short" />
      <div className="shimmer-line date" />
      <div className="shimmer-btn" />
    </div>
  );
}

export default ShimmerCard;