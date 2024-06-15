import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

const Single_User = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state && location.state.id) {
      axios
        .get(`http://localhost:3000/users/${location.state.id}`)
        .then((res) => {
          setUser(res.data);
        });
    }
  }, [location.state]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h2>User Details</h2>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h4 className="card-title">Name</h4>
                <p className="card-text">{user.name}</p>
              </div>
              <div className="mb-3">
                <h4 className="card-title">Email</h4>
                <p className="card-text">{user.email}</p>
              </div>
              <div className="mb-3">
                <h4 className="card-title">Number</h4>
                <p className="card-text">{user.number}</p>
              </div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single_User;
