import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
export default function ModalUnstyled(props) {
  const { open, toggle ,user } = props;
  const [form, setForm] = useState({});
  const handleSubmit =(e)=>{
    e.preventDefault()
  if(!user.id){
    axios.post("http://localhost:3000/users" , form).then(res=>{
        if(res.status === 201){
            window.location.reload()
        }
    })
  }else{
    let payload = {
        name : form.name ? form.name : user.name,
        email: form.email ? form.email : user.email,
        number: form.number ? form.number : user.number
    }
    axios.put(`http://localhost:3000/users/${user.id}` , payload).then(res=>{
        if(res.status === 200){
            window.location.reload()
        }
    })
  }
  }
  const handleChange =(event)=>{
    const {name, value} = event.target
    setForm({...form, [name] : value})
  }
  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={toggle}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h1 className="d-flex align-items-center gap-1 text-primary justify-content-center">
            ADD USER{" "}
            <box-icon name="user-pin" color="#0D6EFD" size="42px"></box-icon>
          </h1>

          <form action="" className="form form-control" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="NAME"
              name="name"
              className="my-2"
              onChange={handleChange}
              defaultValue={user.name}
            />
            <TextField
              fullWidth
              label="EMAIL"
              name="email"
              className="my-2"
              onChange={handleChange}
              defaultValue={user.email}
            />
            <TextField
              fullWidth
              label="NUMBER"
              name="number"
              type="number"
              className="my-2"
              onChange={handleChange}
              defaultValue={user.number}
            />
            <button className="btn btn-dark w-100 p-3" type="submit">
              ADD USER
            </button>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const TriggerButton = styled("button")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);
