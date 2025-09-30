"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
      console.log(data);
      router.push("login");
    } catch (error) {
      console.log(error);
      alert(error)

    }
  };
  return <div>

    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" placeholder="Confirm password" value={email} onChange={(e)=>setEmail(e.target.value)} />

    <button type="submit">Register</button>
    </form>
    <div>
      <p>
        Already have an account <a href="/login">Login</a>
      </p>
    </div>
  </div>;
};

export default register;
