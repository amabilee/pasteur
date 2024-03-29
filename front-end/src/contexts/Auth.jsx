import { AuthContext } from "./authContext";
import React, { useState, useEffect } from 'react'
import { server } from "../services/server";

export const AuthProvider = ({ children }) => {
    // const [token, setToken] = useState(null)
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
    const [loading, setLoading] = useState(null);

    const users = [
        {
            id: 1,
            matricula: 'aluno',
            senha: '123',
            nome: 'Marcos Santos',
            cargo: 'aluno'
        },
        {
            id: 2,
            matricula: 'colab',
            senha: '123',
            nome: 'Ana Souza',
            cargo: 'colaborador',
        },
        {
            id: 3,
            matricula: 'admin',
            senha: '123',
            nome: 'João Marques',
            cargo: 'administrador'
        }
    ]

    useEffect(() => {
        localStorage.setItem('auth1', String(auth1));
        localStorage.setItem('auth2', String(auth2));
        localStorage.setItem('auth3', String(auth3));
    }, [user, auth1, auth2, auth3, storedAuth1, storedAuth2, storedAuth3]);

    async function loginAdmin(matricula, senha) {
        try {
            const response = await server.post('/login', { matricula, senha })
            if (response.status === 200) {
                if (window.innerWidth <= 767) {
                    const token = response.data.token
                    console.log(token)
                    setAuth1(true)
                    setAuth2(false)
                    setAuth3(false)
                } else {
                    const token = response.data.token
                    console.log(token)
                    setAuth1(false)
                    setAuth2(false)
                    setAuth3(false)
                }
                // if (token === tokenAdminCode) {
                //     setAuth1(false)
                //     setAuth2(false)
                //     setAuth3(true)
                // }
                // localStorage.setItem('userToken', token)
            }
        } catch (e) {
            // const errorData = e.response.data
            setAuth1(false)
            setAuth2(false)
            setAuth3(false)
            // setError(errorData.error
            // console.log(errorData.error)
            console.error(e)
        }
    }


    async function signIn(usuario, senha) {
        const credenciais = users.find(option => option.matricula === usuario && option.senha === senha);
        if (credenciais.cargo !== '') {
            if (window.innerWidth <= 767) {
                switch (credenciais.cargo) {
                    case 'aluno':
                        setAuth1(true)
                        setAuth2(false)
                        setAuth3(false)
                        setLocalLogged(credenciais)
                        window.localStorage.setItem("loggedUser", JSON.stringify(credenciais));
                        return
                    case 'colaborador':
                        setAuth1(false)
                        setAuth2(false)
                        setAuth3(false)
                        setError('Admins devem acessar somente em dispositivos da clinica.')
                        return
                    case 'administrador':
                        setAuth1(false)
                        setAuth2(false)
                        setAuth3(false)
                        setError('Colaboradores devem acessar somente em dispositivos da clinica.')
                        return

                }
            } else {
                switch (credenciais.cargo) {
                    case 'aluno':
                        setAuth1(false)
                        setAuth2(false)
                        setAuth3(false)
                        setError('Aluno devem acessar somente em dispositivos mobile.')
                        return
                    case 'colaborador':
                        setAuth1(false)
                        setAuth2(true)
                        setAuth3(false)
                        setLocalLogged(credenciais)
                        return
                    case 'administrador':
                        setAuth1(false)
                        setAuth2(false)
                        setAuth3(true)
                        setLocalLogged(credenciais)
                        return
                }
            }
        } else {
            setError('Credenciais inválidas')
            setAuth1(false)
            setAuth2(false)
            setAuth3(false)
            setLocalLogged()
        }
    }

    function signOut() {
        setUser("");
        setAuth1(false);
        setAuth2(false);
        setAuth3(false);
        setError('')
        setLocalLogged()
        localStorage.removeItem('user');
        localStorage.removeItem('loggedUser');
        localStorage.removeItem('auth1');
        localStorage.removeItem('auth2');
        localStorage.removeItem('auth3');
    }

    return (
        <AuthContext.Provider value={{ user, loginAdmin, auth1, auth2, auth3, error, loading, signIn, signOut, localLogged }}>
            {children}
        </AuthContext.Provider>
    )
}