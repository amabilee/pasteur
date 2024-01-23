import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginAluno from '../pages/login/login';


import { PrivateRouteAlunoHome, PrivateRouteAlunoEntry, PrivateRouteAlunoExit, PrivateRouteAlunoSignature, PrivateRouteColaboradorHome, PrivateRouteColaboradorHistory, PrivateRouteColaboradorExit, PrivateRouteAdminHome, PrivateRouteAdminStaff, PrivateRouteAdminFamily } from '../components/PrivateRoute.jsx';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginAluno />} />
        <Route path="/home-aluno" element={<PrivateRouteAlunoHome />} />
        <Route path="/entry-aluno" element={<PrivateRouteAlunoEntry />} />
        <Route path="/exit-aluno" element={<PrivateRouteAlunoExit />} />
        <Route path="/signature-aluno" element={<PrivateRouteAlunoSignature />} />
        <Route path="/entry-colaborador" element={<PrivateRouteColaboradorHome />} />
        <Route path="/exit-colaborador" element={<PrivateRouteColaboradorExit />} />
        <Route path="/history-colaborador" element={<PrivateRouteColaboradorHistory />} />
        <Route path="/history-admin" element={<PrivateRouteAdminHome />} />
        <Route path="/staff-admin" element={<PrivateRouteAdminStaff />} />
        <Route path="/familia-admin" element={<PrivateRouteAdminFamily />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router

