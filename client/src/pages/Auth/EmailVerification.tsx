import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { emailVerification } from "../../redux/user/AuthReducer";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";

const EmailVerification = () => {
  const { key } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const [status, setStatus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(key);

    try {
      dispatch(emailVerification(key));
      setStatus(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (status) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col mt-60 h-screen w-screen">
      <h2 className="mb-4 text-3xl font-bold text-center text-gray-700">
        Activate Account
      </h2>
      <h5 className="mb-4 text-center text-gray-500">
        Click the button below to activate your account
      </h5>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="grid mt-5 justify-center self-center gap-2">
          <button
            className="px-6 py-2 font-bold text-white bg-gray-900 rounded hover:bg-slate-500"
            type="submit">
            Activate
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
