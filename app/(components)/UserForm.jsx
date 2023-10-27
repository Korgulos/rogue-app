"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = ({ user }) => {
  const EDITMODE = user == !null ? false : true;
  console.log(EDITMODE);
  const router = useRouter();
  const startingUserData = {
    fr_name: "",
    las_name: "",
    email: "",
    password: "",
  };

  if (EDITMODE) {
    startingUserData["fr_name"] = user.first_name;
    startingUserData["las_name"] = user.last_name;
    startingUserData["email"] = user.email;
    startingUserData["password"] = user.password;
  }

  const [formData, setFormData] = useState(startingUserData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/user/${user.user_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ formData }),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className=" flex justify-center">
      <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
        <h3>{EDITMODE ? "Update Your User Account" : "Create New User Account"}</h3>
        <label>First name</label>
        <input id="fr_name" name="fr_name" type="text" onChange={handleChange} required={true} value={formData.fr_name} />
        <label>Last name</label>
        <input id="las_name" name="las_name" type="text" onChange={handleChange} required={true} value={formData.las_name} />
        <label>Email</label>
        <input id="email" name="email" type="text" onChange={handleChange} required={true} value={formData.email} />

        <label>Password</label>
        <input id="password" name="password" type="password" onChange={handleChange} required={true} value={formData.password} />

        <input type="submit" className="btn max-w-xs" value={EDITMODE ? "Update Ticket" : "Create Ticket"} />
      </form>
    </div>
  );
};

export default UserForm;
