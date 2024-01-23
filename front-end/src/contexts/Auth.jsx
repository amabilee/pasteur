import { AuthContext } from "./authContext";
import React, { useState, useEffect } from 'react'
// import { server } from "../services"; API

export const AuthProvider = ({ children }) => {


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

    const userDataAluno = {
        user: 'aluno',
        senha: '123'
    }
    const userDataColab = {
        user: 'colab',
        senha: '123'
    };
    const userDataAdmin = {
        user: 'admin',
        senha: '123'
    };

    useEffect(() => {
        localStorage.setItem('auth1', String(auth1));
        localStorage.setItem('auth2', String(auth2));
        localStorage.setItem('auth3', String(auth3));
        console.log('logou')
    }, [user, auth1, auth2, auth3, storedAuth1, storedAuth2, storedAuth3]);

    async function signIn(user, pwd) {
        if (window.innerWidth <= 767) {
            if (user === userDataAluno.user && pwd === userDataAluno.senha) {
                localStorage.setItem('user', 'aluno');
                setAuth1(true)
                setAuth2(false)
                setAuth3(false)
            } else if (user === userDataAdmin.user && pwd === userDataAdmin.senha) {
                localStorage.setItem('user', 'none');
                setAuth1(false)
                setAuth2(false)
                setAuth3(false)
                setError('Admins devem acessar somente em dispositivos da clinica.')
            } else if (user === userDataColab.user && pwd === userDataColab.senha) {
                localStorage.setItem('user', 'none');
                setAuth1(false)
                setAuth2(false)
                setAuth3(false)
                setError('Colaboradores devem acessar somente em dispositivos da clinica.')
            } else {
                localStorage.setItem('user', 'none');
                setAuth1(false)
                setAuth2(false)
                setAuth3(false)
                setError('Credenciais inválidas')
            }
        } else {
            if (user === userDataColab.user && pwd === userDataColab.senha) {
                localStorage.setItem('user', 'colab');
                setAuth1(false)
                setAuth2(true)
                setAuth3(false)
            } else if (user === userDataAdmin.user && pwd === userDataAdmin.senha) {
                localStorage.setItem('user', 'admin');
                setAuth1(false)
                setAuth2(false)
                setAuth3(true)
            } else if (user === userDataAluno.user && pwd === userDataAluno.senha) {
                localStorage.setItem('user', 'none');
                setAuth1(false)
                setAuth2(false)
                setAuth3(false)
                setError('Aluno devem acessar somente em dispositivos mobile.')
            } else {
                localStorage.setItem('user', 'none');
                setAuth1(false)
                setAuth2(false)
                setAuth3(false)
                setError('Credenciais inválidas')
            }
        }
    }



    function signOut() {
        setUser("");
        setAuth1(false);
        setAuth2(false);
        setAuth3(false);
        localStorage.removeItem('user');
        localStorage.removeItem('auth1');
        localStorage.removeItem('auth2');
        localStorage.removeItem('auth3');
    }
    return (
        <AuthContext.Provider value={{ user, auth1, auth2, auth3, error, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}