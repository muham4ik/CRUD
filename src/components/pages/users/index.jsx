import axios from "axios";
import { useState, useEffect } from "react";
import ModalUnstyled from "../modal/modal";
import { useNavigate } from "react-router-dom";
import Single_User from "../single_user/index";
import "./index.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const toggle = () => {
    setOpen(false);
    setUser({});
  };

  const deleteITEM = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    });
  };

  const openModal = (item) => {
    setUser(item);
    setOpen(true);
  };

  const navSin = (id) => {
    navigate("/single_user", { state: { id: id } });
  };

  return (
    <div className="container">
      <ModalUnstyled open={open} toggle={toggle} user={user} />
      <h1 className="p-3 fs-1 text-primary fw-bolder d-flex align-items-center justify-content-center gap-2 my-5">
        USERS{" "}
        <box-icon
          type="solid"
          size="42px"
          color="#0D6EFD"
          name="user-circle"
        ></box-icon>
      </h1>
      <button className="btn btn-dark my-1" onClick={() => setOpen(true)}>
        ADD USER
      </button>
      <table className="table table-bordered table-hover table-dark">
        <thead className="thead-dark">
          <tr>
            <th>T/R</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>NUMBER</th>
            <th>EDIT</th>
            <th>SHOW</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{item.name}</th>
              <th>{item.email}</th>
              <th>{item.number}</th>
              <th>
                <button
                  className="btn btn-info"
                  onClick={() => openModal(item)}
                >
                  <box-icon name="message-square-edit" color="white"></box-icon>
                </button>
              </th>
              <th>
                <button
                  className="btn btn-primary"
                  onClick={() => navSin(item.id)}
                >
                  <box-icon type="solid" name="show" color="white"></box-icon>
                </button>
              </th>
              <th>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteITEM(item.id)}
                >
                  <box-icon name="trash" color="white"></box-icon>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
