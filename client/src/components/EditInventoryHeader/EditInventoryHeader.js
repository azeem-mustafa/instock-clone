import "./EditInventoryHeader.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { useHistory } from "react-router";

const EditInventoryHeader = (props) => {
  const history = useHistory();
  return (
    <div className="edit-header">
      <img
        className="edit-header__icon"
        src={backArrow}
        alt="go back icon"
        onClick={history.goBack}
      />
      <h1 className="edit-header__header">{props.header}</h1>
    </div>
  );
};

export default EditInventoryHeader;
