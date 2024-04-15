import React from 'react';
import { Navigate } from 'react-router-dom';
import { UseAuth } from '../hooks/index';
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
import EntryAdmin from '../pages/administrador/entryAdmin';
import ExitAdmin from '../pages/administrador/exitAdmin';


const PrivateRoute = ({ component: Component, authKey, ...rest }) => {
  const { [authKey]: isAuthenticated } = UseAuth();
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/entrar" />;
};

// Aluno
const PrivateRouteAlunoHome = (props) => <PrivateRoute component={HomeAluno} authKey="auth1" {...props} />;
const PrivateRouteAlunoEntry = (props) => <PrivateRoute component={EntryAluno} authKey="auth1" {...props} />;
const PrivateRouteAlunoExit = (props) => <PrivateRoute component={ExitAluno} authKey="auth1" {...props} />;
const PrivateRouteAlunoSignature = (props) => <PrivateRoute component={SignatureAluno} authKey="auth1" {...props} />;

// Colab
const PrivateRouteColaboradorHome = (props) => <PrivateRoute component={EntryColaborador} authKey="auth2" {...props} />;
const PrivateRouteColaboradorHistory = (props) => <PrivateRoute component={HistoryColaborador} authKey="auth2" {...props} />;
const PrivateRouteColaboradorExit = (props) => <PrivateRoute component={ExitColaborador} authKey="auth2" {...props} />;

// Admin
const PrivateRouteAdminHome = (props) => <PrivateRoute component={HistoryAdmin} authKey="auth3" {...props} />;
const PrivateRouteAdminStaff = (props) => <PrivateRoute component={StaffAdmin} authKey="auth3" {...props} />;
const PrivateRouteAdminFamily = (props) => <PrivateRoute component={FamilyAdmin} authKey="auth3" {...props} />;
const PrivateRouteAdminEntry = (props) => <PrivateRoute component={EntryAdmin} authKey="auth3" {...props} />;
const PrivateRouteAdminExit = (props) => <PrivateRoute component={ExitAdmin} authKey="auth3" {...props} />;

export {
  PrivateRouteAlunoHome,
  PrivateRouteAlunoEntry,
  PrivateRouteAlunoExit,
  PrivateRouteAlunoSignature,
  PrivateRouteColaboradorHome,
  PrivateRouteColaboradorHistory,
  PrivateRouteColaboradorExit,
  PrivateRouteAdminHome,
  PrivateRouteAdminStaff,
  PrivateRouteAdminFamily,
  PrivateRouteAdminEntry,
  PrivateRouteAdminExit
};
