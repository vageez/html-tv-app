import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useNavigate } from "react-router-dom";

function FocusButton({
  label,
  onEnter,
}: {
  label: string;
  onEnter: () => void;
}) {
  const { ref, focused } = useFocusable({ onEnterPress: onEnter });

  return (
    <div
      ref={ref as any}
      role="button"
      tabIndex={-1}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 14px",
        borderRadius: 12,
        fontSize: 18,
        background: "#d1d1d1",
        border: "1px solid #ffff",
        outline: focused ? "4px solid white" : "4px solid transparent",
      }}
      // keep mouse support for desktop dev
      onClick={onEnter}
    >
      {label}
    </div>
  );
}

function Tile({ label, onEnter }: { label: string; onEnter: () => void }) {
  const { ref, focused } = useFocusable({
    onEnterPress: onEnter,
  });

  return (
    <div
      ref={ref as any}
      style={{
        width: 220,
        height: 120,
        borderRadius: 14,
        background: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        outline: focused ? "4px solid white" : "4px solid transparent",
      }}
    >
      {label}
    </div>
  );
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
    label: `Item ${i + 1}`,
  }));

  return (
    <div>
      <h1 style={{ margin: 0 }}>Home</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 240px)",
          gap: 20,
          marginTop: 30,
        }}
      >
        {items.map((it) => (
          <div
            key={it.id}
            onClick={() => navigate(`/details/${it.id}`)}
            style={{
              width: 220,
              height: 120,
              borderRadius: 14,
              background: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}
