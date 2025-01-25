import { useState, useContext } from "react";
const User = () => {
    const { user, setUser } = useContext(AuthedUserContext);
    const username = localStorage.getItem("user").username
    const email = localStorage.getItem("user").email
    return (
        <div>
        <h1>User</h1>
        {user && <p>Welcome, {user.username}!</p>}
        </div>
    );
    }
