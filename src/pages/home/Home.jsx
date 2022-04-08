import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../services/api";

function Home() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    userApi
      .get("/api/?seed=foobar")
      .then((res) => {
        setUser([res.data.results[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Button onClick={() => setIsShow(!isShow)}>Gerar usuario</Button>
      <Button
        onClick={() => {
          navigate("/");
          signOut();
        }}
      >
        logout
      </Button>
      {isShow &&
        user.map((item) => {
          return (
            <div className="container mt-5">
              <div className="row d-flex justify-content-center">
                <div className="col-md-7">
                  <div className="card p-3 py-4">
                    <div className="text-center">
                      <img
                        src={item.picture.medium}
                        alt="user"
                        width="100"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="text-center mt-3">
                      <h5 className="mt-2 mb-0">{`${item.name.first} ${item.name.last}`}</h5>
                      <span>{item.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
