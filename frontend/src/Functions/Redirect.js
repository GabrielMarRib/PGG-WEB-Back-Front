import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect(User) {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (User === null) {
                navigate('/PagLogin');
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [User, navigate]);
}



export default Redirect;