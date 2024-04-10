import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginDesktop from '../pages/login/login';
import LoginMobile from '../pages/login/loginMobile';


import { PrivateRouteAlunoHome, PrivateRouteAlunoEntry, PrivateRouteAlunoExit, PrivateRouteAlunoSignature, PrivateRouteColaboradorHome, PrivateRouteColaboradorHistory, PrivateRouteColaboradorExit, PrivateRouteAdminHome, PrivateRouteAdminStaff, PrivateRouteAdminFamily, PrivateRouteAdminEntry, PrivateRouteAdminExit } from '../components/PrivateRoute.jsx';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginDesktop />} />
        <Route path="/entrar" element={<LoginMobile />} />
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
        <Route path="/entry-admin" element={<PrivateRouteAdminEntry />} />
        <Route path="/exit-admin" element={<PrivateRouteAdminExit />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router

