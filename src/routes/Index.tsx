import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { CriarTutor } from "../pages/CriarTutor";
import { EditarTutor } from "../pages/EditarTutor";
import { AnimaisTutor } from "../pages/AnimaisTutor";
import { CriarAnimal } from "../pages/CriarAnimal";
import { EditarAnimal } from "../pages/EditarAnimal";

export function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/home" element={<Home />} />

            <Route path="/tutor/novo" element={<CriarTutor />} />

            <Route path="/tutor/editar/:id" element={<EditarTutor/>} />

            <Route path="/tutor/:id/animais" element={<AnimaisTutor/>} />

            <Route path="/tutor/:id/animal/novo" element={<CriarAnimal/>} />

            <Route path="/animal/editar/:id" element={<EditarAnimal />} />

            <Route path="*" element={<Login />} />
        </Routes>
    )
}