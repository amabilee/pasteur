import React from 'react';
import { Navigate } from 'react-router-dom';

import HomeAluno from '../pages/aluno/homeAluno';
import EntryAluno from '../pages/aluno/entryAluno';
import ExitAluno from '../pages/aluno/exitAluno';
import SignatureAluno from '../pages/aluno/signatureAluno';

import EntryColaborador from '../pages/colaborador/entryColaborador';
import ExitColaborador from '../pages/colaborador/exitColaborador';
import HistoryColaborador from '../pages/colaborador/historyColaborador';

import HistoryAdmin from '../pages/administrador/historyAdmin';
import StaffAdmin from '../pages/administrador/staffAdmin';
import FamilyAdmin from '../pages/administrador/familyAdmin';

import { UseAuth } from '../hooks/index';


//Private Routes Aluno

const PrivateRouteAlunoHome = () => {
    const { auth1 } = UseAuth();
    return auth1 ? <HomeAluno /> : <Navigate to="/login" />;
};

const PrivateRouteAlunoEntry = () => {
    const { auth1 } = UseAuth();
    return auth1 ? <EntryAluno /> : <Navigate to="/login" />;
};

const PrivateRouteAlunoExit = () => {
    const { auth1 } = UseAuth();
    return auth1 ? <ExitAluno /> : <Navigate to="/login" />;
};

const PrivateRouteAlunoSignature = () => {
    const { auth1 } = UseAuth();
    return auth1 ? <SignatureAluno /> : <Navigate to="/login" />;
};

//Private Routes Colab

const PrivateRouteColaboradorHome = () => {
    const { auth2 } = UseAuth();
    return auth2 ? <EntryColaborador /> : <Navigate to="/login" />;
};

const PrivateRouteColaboradorHistory = () => {
    const { auth2 } = UseAuth();
    return auth2 ? <HistoryColaborador /> : <Navigate to="/login" />;
};

const PrivateRouteColaboradorExit = () => {
    const { auth2 } = UseAuth();
    return auth2 ? <ExitColaborador /> : <Navigate to="/login" />;
};

//Private Routes Admin

const PrivateRouteAdminHome = () => {
    const { auth3 } = UseAuth();
    return auth3 ? <HistoryAdmin /> : <Navigate to="/login" />;
};

const PrivateRouteAdminStaff = () => {
    const { auth3 } = UseAuth();
    return auth3 ? <StaffAdmin /> : <Navigate to="/login" />;
};

const PrivateRouteAdminFamily = () => {
    const { auth3 } = UseAuth();
    return auth3 ? <FamilyAdmin /> : <Navigate to="/login" />;
};
export { PrivateRouteAlunoHome, PrivateRouteAlunoEntry, PrivateRouteAlunoExit, PrivateRouteAlunoSignature, PrivateRouteColaboradorHome, PrivateRouteColaboradorHistory, PrivateRouteColaboradorExit, PrivateRouteAdminHome, PrivateRouteAdminStaff, PrivateRouteAdminFamily };
