
import { tankNumber, loginInfo } from "./context-types";
import { Errors } from "../assets/constants";

  export const loginTry = async (data: loginInfo) => {
    //workin pernr for text :8604191
      try{
        const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
      });
      if(response.status == 200)
        return await response.json();
      if(response.status == 401)
        return {message:"fail"};
    }
    catch(e){
        return {message: "something went wrong"}
    }
      };
  
  export const addTank = async (data: tankNumber) => {
    const response = await fetch("http://localhost:3000/addTank", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    });
    let resData;
    try {
      resData = await response.json();
    } catch {
      console.log("problem");
    }
    if (!response.ok) {
      throw new Error(Errors.ADD_FAIL);
    }
    return resData ?? "error occured";
  };
  
  export const isLoggedIn = async () => {
    try {
      const response = await fetch("http://localhost:3000/isLoggedIn", {
        mode: "cors",
        credentials: "include",
      });
      return await response.json();
    } catch {
      console.log("not logged");
      return null;
    }
  };