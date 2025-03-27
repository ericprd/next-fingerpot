import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const { push } = useRouter();
  const [username, setUsername] = useState("");

  async function registerHandler() {
    try {
      await fetch("/api/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      push("/users");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-2 mx-auto w-96 p-3">
      <input
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
        className="w-full border p-2 rounded"
        placeholder="username"
      />
      <button
        onClick={registerHandler}
        className="p-2 cursor-auto uppercase border rounded-sm"
      >
        Register
      </button>
    </div>
  );
}
