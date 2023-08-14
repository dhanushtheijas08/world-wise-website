import Button from "./Button";
import { useNavigate } from "react-router-dom";
function BackButton() {
  const navigate = useNavigate();
  return (
    <Button type="back" handleBtnClick={() => navigate(-1)}>
      Back
    </Button>
  );
}

export default BackButton;
