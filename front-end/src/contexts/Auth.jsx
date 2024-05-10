import { AuthContext } from "./authContext";
import { useState } from 'react';
import { server } from "../services/server";
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
    const [localLogged, setLocalLogged] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [auth1, setAuth1] = useState(false);
    const [auth2, setAuth2] = useState(false);
    const [auth3, setAuth3] = useState(false);

    const setAuth = (auth1, auth2, auth3) => {
        setAuth1(auth1);
        setAuth2(auth2);
        setAuth3(auth3);
    };

    const storeAuthData = (token, userData) => {
        localStorage.setItem("loggedUserToken", token);
        localStorage.setItem("loggedUserData", JSON.stringify(userData));
        setLocalLogged(userData);
    };

    const loginAdmin = async (matricula, senha) => {
        try {
            const response = await server.post('/login', { matricula, senha });

            if (window.innerWidth <= 767) {
                switch (response.data.cargo) {
                    case 2:
                        setAuth(false, false, false);
                        setError('Colaboradores devem acessar somente em dispositivos da clinica.');
                        return;
                    case 3:
                        setAuth(true, false, false);
                        storeAuthData(response.data.token, response.data);
                        return;
                    case 1:
                        setAuth(false, false, false);
                        setError('Admins devem acessar somente em dispositivos da clinica.');
                        return;
                }
            } else {
                switch (response.data.cargo) {
                    case 2:
                        setAuth(false, true, false);
                        storeAuthData(response.data.token, response.data);
                        return;
                    case 3:
                        setAuth(false, false, false);
                        setError('Alunos devem acessar somente em dispositivos mobile.');
                        return;
                    case 1:
                        setAuth(false, false, true);
                        storeAuthData(response.data.token, response.data);
                        return;
                }
            }
        } catch (e) {
            setAuth(false, false, false);
            setError(e.response ? e.response.data.error : 'An unexpected error occurred');
        }
    };

    const signOut = () => {
        setAuth1(false);
        setAuth2(false);
        setAuth3(false);
        setError('');
        setUser(null);
        setLocalLogged(null);
        localStorage.clear(); // Clears all localStorage data
    };

    return (
        <AuthContext.Provider value={{ user, loginAdmin, auth1, auth2, auth3, error, signOut, localLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // 'children' must be a React node and is required
};

export default AuthProvider;
