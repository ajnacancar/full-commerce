import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

function ActivationPage() {
  const { activationToken } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activationToken) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activationToken,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {error ? (
        <p>Your token is expired</p>
      ) : (
        <p>Your account has been created successufully.</p>
      )}
    </div>
  );
}

export default ActivationPage;
