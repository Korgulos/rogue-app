import UserForm from "@/app/(components)/UserForm";
import React from "react";

const getUserById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/user/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
let user = {};
const User = async ({ params }) => {
  user = await getUserById(params.id);
  [user] = user.data;
  console.log("pages[id]", user);

  return <UserForm user={user} />;
};

export default User;
