import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../Components/UserCard";
export default function HomePage() {
  const [userList, setUserList] = useState([]);
  const [databaseUsersMap, setDatabaseUsersMap] = useState({});
  const [display, setDisplay] = useState(false);
  // const [addButton, setAddButton] = useState(true);
  const fetchFuncFromAPI = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        console.log(res);
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchFuncFromSQLDB = () => {
    axios
      .get(`http://localhost:8080/users`)
      .then((res) => {
        console.log("Aiven Response : " + res)
        const usersMap = res.data.Users.reduce((map, user) => {
          map[user.id] = user;
          return map;
        }, {});
        setDatabaseUsersMap(usersMap);
      })
      .catch((err) => console.log(err));

  };
  const handleUsersFetch = (e) => {
    e.preventDefault();
    setDisplay(true);
  };
  useEffect(() => {
    fetchFuncFromSQLDB();
    fetchFuncFromAPI();
  }, []);
  return (
    <div>
      <h2>Cointab SE-ASSIGNMENT.</h2>
      <button onClick={(e) => handleUsersFetch(e)} className="btn btn-primary"  >All Users</button>

      <div className="d-flex justify-content-around flex-wrap gap-3 px-5 mt-5 mb-5">
        {display &&
          userList?.map((item) => {
            return <UserCard key={item.id} item={item} addButton={!databaseUsersMap[item.id]} />;
          })}
      </div>
    </div>
  );
}
