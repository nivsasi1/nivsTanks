import { createContext } from "react";

export const authContext = createContext({
    isLogged: false,
    getIsManager: ()=>{}
});


// type loginInfo = {
//     username: number;
//     password: string;  
// }

// export const loginTry = async (data : loginInfo) =>{
// const response = await fetch('http://localhost:3000/login', {method:'POST', body: JSON.stringify(data), headers:{'Content-Type': 'application/json'}})
// let resData
//     try{
//     resData = await response.text();
//     console.log(resData)
//     }catch{
//     console.log("JSOn GAE")
//     }
//     if(!response.ok){
//         throw new Error('התחברות נכשלה, בעיה במערכת')
//     }
//     const response1 = await fetch('http://localhost:3000/isLoggedIn')
//         console.log(response1)
//         console.log(await response1.text());
// }
// const getIsManager(pernr) => {

// }