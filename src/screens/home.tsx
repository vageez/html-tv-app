import React from "react";
import { useNavigate } from "react-router-dom";
import { Tile } from "../ui/components/tile";
import { FocusScope } from "../ui/focus/focus-scope";

export default function HomeScreen() {
  const navigate = useNavigate();
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
    label: `Item ${i + 1}`,
  }));

  return (
    <FocusScope
      focusKey="HOME_GRID"
      preferredChildFocusKey="HOME_TILE_1"
      initialFocusKey="HOME_TILE_1"
    >
      <h1 className="m-0 text-tv-title">Home</h1>

      <div className="mt-[30px] grid grid-cols-4 gap-5">
        {items.map((it) => (
          <Tile
            key={it.id}
            label={it.label}
            focusKey={`HOME_TILE_${it.id}`}
            onPress={() => navigate(`/details/${it.id}`)}
          />
        ))}
      </div>
    </FocusScope>
  );
}
