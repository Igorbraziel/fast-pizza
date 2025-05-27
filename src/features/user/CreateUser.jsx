import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState(() => user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col items-center"
    >
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        name="username"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />

      {username === "" && (
        <div className="mt-6 sm:mt-8">
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
