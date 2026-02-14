import { useNavigate, useParams } from "react-router-dom";
import { FocusButton } from "../ui/components/focus-button";
import { FocusScope } from "../ui/focus/focus-scope";

export default function DetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <FocusScope
      focusKey="DETAIL_ROOT"
      preferredChildFocusKey="DETAIL_BACK_BUTTON"
      initialFocusKey="DETAIL_BACK_BUTTON"
      className="w-full"
    >
      <h1 className="m-0 text-tv-title">Details</h1>
      <p className="text-tv-body-lg">Selected item: {id}</p>

      <FocusButton
        label="Back"
        focusKey="DETAIL_BACK_BUTTON"
        onPress={() => navigate(-1)}
      />
    </FocusScope>
  );
}
