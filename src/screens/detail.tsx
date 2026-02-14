import { useNavigate, useParams } from "react-router-dom";

export default function DetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ margin: 0 }}>Details</h1>
      <p style={{ fontSize: 22 }}>Selected item: {id}</p>

      <button
        onClick={() => navigate(-1)}
        style={{ fontSize: 18, padding: "10px 14px" }}
      >
        Back
      </button>
    </div>
  );
}
