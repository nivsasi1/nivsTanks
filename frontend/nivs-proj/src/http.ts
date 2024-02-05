type loginInfo = {
  username: number;
  password: string;
};

export const loginTry = async (data: loginInfo) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let resData;
  try {
    resData = await response.text();
    console.log(resData);
  } catch {
    console.log("JSOn GAE");
  }
  if (!response.ok) {
    throw new Error("התחברות נכשלה, בעיה במערכת");
  }
  const response1 = await fetch("http://localhost:3000/isLoggedIn");
  console.log(response1);
  console.log(await response1.text());
};

type tank = {
  carNumber: number;
  makat: number;
  kshirot: number;
  gdud: number;
};

export const addTank = async (data: tank) => {
  const response = await fetch("http://localhost:3000/addTank", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let resData;
  try {
    resData = await response.text();
    console.log(resData);
  } catch {
    console.log("JSOn GAE");
  }
  if (!response.ok) {
    throw new Error("הוספה נכשלה, בעיה");
  }
  return resData ?? "error occured";
};
