import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import Loader from "./Loader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");
  const { get, loading } = useFetch("https://jsonplaceholder.org/");
  const [filterData, setFilteredData] = useState([]);

  useEffect(() => {
    get("users")
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log("Could not load users", error));
  }, []);

  const thStyle = {
    borderBottom: "2px solid #ddd",
    padding: "12px 15px",
    textAlign: "left",
    backgroundColor: "#f8f8f8",
    fontWeight: "bold",
  };

  const tdStyle = {
    borderBottom: "1px solid #ddd",
    padding: "10px 15px",
    textAlign: "left",
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "20px",
  };

  const tableContainerStyle = {
    overflowX: "auto",
    margin: "20px 0",
  };

  const buttonStyle = {
    margin: "0 5px",
    padding: "5px 10px",
    cursor: "pointer",
  };
  const borderblack = {
    border: "2px solid black",
    borderRadius: "5px",
    padding: "5px 10px",
  };

  function handleAddUser() {
    if (!firstName | !lastName | !email | !phone | !company | !website) {
      alert("All fields are mandatory !");
      setFirstName("");
      setLastName("");
      setCompany("");
      setWebsite("");
      setPhoneNumber("");
      setEmail("");
      return;
    }
    // email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please Enter Valid Email !");
      setEmail("");
      return;
    }

    setUsers([
      ...users,
      {
        id: users.length + 1,
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        company: { name: company },
        website,
      },
    ]);
    setFirstName("");
    setLastName("");
    setCompany("");
    setWebsite("");
    setPhoneNumber("");
    setEmail("");
  }
  console.log(users);
  const handleDelete = (id) => {
    const warning = window.confirm("Do you really want to delete?");
    if (!warning) return;
    if (filterData) {
      const usersFilterData = filterData.filter((user) => user.id !== id);
      setFilteredData(usersFilterData);
    }
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEdit = (id) => {
    if (filterData) {
      const usersFilterData = filterData.filter((user) => user.id !== id);
      setFilteredData(usersFilterData);
    }

    const firstname = prompt("Enter the new Firstname:");
    const lastname = prompt("Enter the new Lastname:");
    const email = prompt("Enter the new email:");
    const phone = prompt("Enter the new Phone Number");
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, firstname, lastname, email, phone } : user
    );
    setUsers(updatedUsers);
  };

  const handleFilterUser = (fullName) => {
    const filteredData = users.filter((user) => {
      // console.log(firstName, user.firstname);
      // console.log((user.firstname + " " + user.lastname).toLowerCase());
      if (
        (user.firstname + " " + user.lastname)
          .toLowerCase()
          .includes(fullName.toLowerCase())
      ) {
        console.log(fullName);
        return user;
      }
    });
    setFilteredData(filteredData);
    // console.log(filteredData);
  };

  return (
    <>
      <div className="users-layout">
        <div className="" style={borderblack}>
          <div className="NewUsers">
            <label htmlFor="name">First Name :</label>
            <input
              type="text"
              id="name"
              value={firstName}
              placeholder="Please Enter Your First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="name">Last Name :</label>
            <input
              type="text"
              id="name"
              value={lastName}
              placeholder="Please Enter Your Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="NewUsers">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Please Enter Your E-Mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="phone">Phone Number :</label>
            <input
              type="number"
              id="phone"
              value={phone}
              placeholder="Please Enter Your Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div className="NewUsers">
            <label htmlFor="website">Website :</label>
            <input
              type="text"
              id="website"
              value={website}
              placeholder="Please Enter Your Website"
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
            <label htmlFor="company">Company :</label>
            <input
              type="text"
              id="company"
              value={company}
              placeholder="Please Enter Your Comapny Name"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <button onClick={handleAddUser} style={{ marginBottom: "3px" }}>
          Add
        </button>
        <br />
        <div className="filterData">
          <input
            onChange={(e) => {
              handleFilterUser(e.target.value);
            }}
            style={borderblack}
            type="text"
            placeholder="Search User"
          />
        </div>

        <br />
        <hr />
        <h1>Users</h1>

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Company</th>
                <th style={thStyle}>Website</th>
              </tr>
            </thead>
            {loading && <Loader />}
            <tbody>
              {filterData.length !== 0
                ? filterData.map((data) => (
                    <tr key={data.id}>
                      <td style={tdStyle}>{data.id}</td>
                      <td style={tdStyle}>
                        {data.firstname + " " + data.lastname}
                      </td>
                      <td style={tdStyle}>{data.email}</td>
                      <td style={tdStyle}>{data.phone || "N/A"}</td>
                      <td style={tdStyle}>{data.company.name || "N/A"}</td>
                      <td style={tdStyle}>{data.website || "N/A"}</td>
                      <td style={tdStyle}>
                        <button
                          style={{
                            ...buttonStyle,
                            backgroundColor: "#4CAF50",
                            margin: "1.5px",
                          }}
                          onClick={() => handleEdit(data.id)}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            ...buttonStyle,
                            backgroundColor: "#f44336",
                            margin: "1.5px",
                          }}
                          onClick={() => handleDelete(data.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : users.map((user) => (
                    <tr key={user.id}>
                      <td style={tdStyle}>{user.id}</td>
                      <td style={tdStyle}>
                        {user.firstname + " " + user.lastname}
                      </td>
                      <td style={tdStyle}>{user.email}</td>
                      <td style={tdStyle}>{user.phone || "N/A"}</td>
                      <td style={tdStyle}>{user.company.name || "N/A"}</td>
                      <td style={tdStyle}>{user.website || "N/A"}</td>
                      <td style={tdStyle}>
                        <button
                          style={{
                            ...buttonStyle,
                            backgroundColor: "#4CAF50",
                            margin: "1.5px",
                          }}
                          onClick={() => handleEdit(user.id)}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            ...buttonStyle,
                            backgroundColor: "#f44336",
                            margin: "1.5px",
                          }}
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
