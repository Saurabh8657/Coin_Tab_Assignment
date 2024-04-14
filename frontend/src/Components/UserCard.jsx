import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCard({ item, addButton }) {
  const [Button, setButton] = useState(addButton);
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
      city: item.address.city,
    };
    axios
      .post(`http://localhost:8080/users/add`, obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        width: "300px",
        backgroundColor: "rgba(13,110,253,0.2)",
        transition: "transform 0.3s ease-in-out",
        ":hover": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          transform: "scale(1.05)",
        },
      }}
      className="border border-primary p-3 mb-3 rounded text-start px-4"
    >
      <p>
        <b className="text-primary">Name</b> {item.name}
      </p>
      <p>
        <b className="text-primary">Email:</b> {item.email}
      </p>
      <p>
        <b className="text-primary">Phone</b> {item.phone}
      </p>

      <p>
        <b className="text-primary">Website:</b> {item.website}
      </p>
      <p>
        <b className="text-primary">City:</b> {item.address.city}
      </p>
      <p>
        <b className="text-primary">Company:</b> {item.company.name}
      </p>

      {Button && (
        <button onClick={() => handleAddToDB(item)} className="btn btn-primary">
          Add
        </button>
      )}
      {!Button && (
        <button onClick={() => handleNavigate()} className="btn btn-success">
          Open
        </button>
      )}
    </div>
  );
}
