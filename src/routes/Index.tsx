import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { CriarTutor } from "../pages/CriarTutor";
import { EditarTutor } from "../pages/EditarTutor";

export function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/home" element={<Home />} />

            <Route path="/tutor/novo" element={<CriarTutor />} />

            <Route path="/tutor/editar/:id" element={<EditarTutor/>} />

            <Route path="*" element={<Login />} />
        </Routes>
    )
}