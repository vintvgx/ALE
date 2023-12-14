import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../../redux/user/AuthReducer";
import { RootState } from "../../redux/store";
import "./Alert.css";

const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.user.message);
  const [classAlert, setClassAlert] = useState("alert");

  const handleClose = () => {
    setClassAlert("alert d-none");
    dispatch(closeAlert());
  };

  return (
    <div className={classAlert}>
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <div
          className="button btn-close me-2 m-auto"
          onClick={handleClose}></div>
      </div>
    </div>
  );
};

export default Alert;
