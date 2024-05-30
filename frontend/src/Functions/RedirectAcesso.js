import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectAcesso(User) {
    const navigate = useNavigate();
    useEffect(() => {
        if (User && User.userData && User.userData.Nivel_acesso === 2) {
            // Authorized access
            return;
        } else {
            // Unauthorized access
            navigate('/pagHome');
        }
    }, [User, navigate]);
}



export default RedirectAcesso;