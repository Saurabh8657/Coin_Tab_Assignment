import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCard({ item, addButton }) {
  const [ Button, setButton ] = useState(addButton);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/posts/${item.id}`);
  };
  const handleAddToDB = (item) => {
    setButton(false);
    let obj = {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      website: item.website,
      company: item.company.name,
      city: item.address.city
    };
    axios
      .post(`http://localhost:8080/users/add`, obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ width: "300px" }} className="border border-primary-subtle">
      <p>
        <b>Name</b> {item.name}
      </p>
      <p>
        <b>Email:</b> {item.email}
      </p>
      <p>
        <b>Phone</b> {item.phone}
      </p>

      <p>
        <b>Website:</b> {item.website}
      </p>
      <p>
        <b>city:</b> {item.address.city}
      </p>
      <p>
        <b>Company:</b> {item.company.name}
      </p>

      { Button && <button onClick={() => handleAddToDB(item)}>Add</button>}
      { !Button && <button onClick={() => handleNavigate()}>Open</button>}
    </div>
  );
}
