import React, { useEffect } from 'react'
import SignUp from "../components/SignUp"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);
  return (
    <div><SignUp /></div>
  )
}

export default SignUpPage