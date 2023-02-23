import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  let url = "http://localhost:3000/";
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        password: details.password,
      }),
    });
    const res = await response.json();
    console.log(res);
    localStorage.setItem("token", res.token);
    props.onAlert("Sucessfully signed up!");
    navigate("/");
    setDetails({ name: "", email: "", password: "", confirmPassword: "" });
  };
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-6">
          <h4 className="my-2">Sign up to continue with iNotes</h4>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Name"
                name="name"
                value={details.name}
                onChange={onChange}
                placeholder="Enter name..."
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="Email"
                name="email"
                value={details.email}
                onChange={onChange}
                aria-describedby="emailHelp"
                placeholder="Enter email..."
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="Password1"
                name="password"
                value={details.password}
                onChange={onChange}
                placeholder="Enter password..."
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="Password2"
                name="confirmPassword"
                value={details.confirmPassword}
                onChange={onChange}
                placeholder="Same password as above..."
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-rounded"
              disabled={
                details.password != details.confirmPassword ||
                details.name.length < 3 ||
                details.password.length < 5
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
