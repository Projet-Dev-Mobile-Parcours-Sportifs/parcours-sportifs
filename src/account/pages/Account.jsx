import { useEffect } from "react";
import { call, showDatas } from "../../shared/stores";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, List } from "@mui/material";
import { useAccount } from "../hooks/useAccount";

export const Account = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    const getAllInfos = async () => {
      dispatch(call("users/me", [], "get", "", "me"));
    };
    return getAllInfos;
  }, []);
  
  let { data, isLoading, error } = useSelector(showDatas);

  const hasDatas = !isLoading && data.me;

  console.log(data.me)

  return (
    <>
      <h1>Page Account</h1>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vw",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      ) : hasDatas ? (
        <div className="list">
          {data.modules.map(function (object, key) {
            return (
              <List
                displayList={object}
                typeList={useAccount}
                key={key}
              />
            );
          })}
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>
          Vous n'êtes actuellement pas connecté
        </h2>
      )}
    </>
  );
};

export default Account;
