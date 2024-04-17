import { AuthContext } from "./authContext";
import React, { useState, useEffect } from 'react'
import { server } from "../services/server";

export const AuthProvider = ({ children }) => {
    const [localLogged, setLocalLogged] = useState()
    let storedUser;
    const storedAuth1 = localStorage.getItem('auth1') === 'true';
    const storedAuth2 = localStorage.getItem('auth2') === 'true';
    const storedAuth3 = localStorage.getItem('auth3') === 'true';
    const [user, setUser] = useState(storedUser);
    const [error, setError] = useState('');
    const [auth1, setAuth1] = useState(storedAuth1);
    const [auth2, setAuth2] = useState(storedAuth2);
    const [auth3, setAuth3] = useState(storedAuth3);
    const [accessLevel, setAccessLevel] = useState(0);

    useEffect(() => {
        localStorage.setItem('auth1', String(auth1));
        localStorage.setItem('auth2', String(auth2));
        localStorage.setItem('auth3', String(auth3));
    }, [user, auth1, auth2, auth3, storedAuth1, storedAuth2, storedAuth3]);

    async function loginAdmin(matricula, senha) {
        try {
            const response = await server.post('/login', { matricula, senha })
            console.log(response.data)
            if (window.innerWidth <= 767) {
                switch (response.data.cargo) {
                    case 2:
                        setAuth1(false)
                        setAuth2(false)
                        setAuth3(false)
                        setError('Colaboradores devem acessar somente em dispositivos da clinica.')
                        return
                    case 3:
                        setAuth1(true)
                        setAuth2(false)
                        setAuth3(false)
                        setLocalLogged(response)
                        localStorage.setItem("loggedUserToken", response.data.token);
                        localStorage.setItem("loggedUserData", JSON.stringify(response.data));
                        return
                    case 1:
                        setAuth1(false)
                        setAuth2(false)
                        setAuth3(false)
                        setError('Admins devem acessar somente em dispositivos da clinica.')
                        return

                }
            } else {
                switch (response.data.cargo) {
                    case 2:
                        setAuth1(false)
                        setAuth2(true)
                        setAuth3(false)
                        localStorage.setItem("loggedUserToken", response.data.token);
                        localStorage.setItem("loggedUserData", JSON.stringify(response.data));
                        console.log(response.data.token)
                        return
                    case 3:
                        setAuth1(false)
                        setAuth2(false)
                        setAuth3(false)
                        setError('Aluno devem acessar somente em dispositivos mobile.')
                        return
                    case 1:
                        setAuth1(false)
                        setAuth2(false)
                        setAuth3(true)
                        localStorage.setItem("loggedUserToken", response.data.token);
                        localStorage.setItem("loggedUserData", JSON.stringify(response.data));
                        console.log(response.data.token)
                        return
                }
            };
        } catch (e) {
            setAuth1(false)
            setAuth2(false)
            setAuth3(false)
            setError(e.response.data.error)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            var token = localStorage.getItem("loggedUserToken");
            if (!token || token.length <= 1) {
                console.log('deslogar')
                signOut()
            } else {
                console.log('continuar logado')
            }
        }, 100);
    }, [localStorage.getItem("loggedUserToken")]);


    function signOut() {
        setUser("");
        setAuth1(false);
        setAuth2(false);
        setAuth3(false);
        setError('')
        setLocalLogged()
        localStorage.removeItem('user');
        localStorage.removeItem('loggedUserToken');
        localStorage.removeItem('loggedUserData');
        localStorage.removeItem('auth1');
        localStorage.removeItem('auth2');
        localStorage.removeItem('auth3');
    }

    return (
        <AuthContext.Provider value={{ user, loginAdmin, auth1, auth2, auth3, error, signOut, localLogged }}>
            {children}
        </AuthContext.Provider>
    )
}