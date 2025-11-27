import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { CriarTutor } from "../pages/CriarTutor";
import { EditarTutor } from "../pages/EditarTutor";
import { AnimaisTutor } from "../pages/AnimaisTutor";
import { CriarAnimal } from "../pages/CriarAnimal";
import { EditarAnimal } from "../pages/EditarAnimal";
import { RotasPrivadas } from "./RotasPrivadas";

export function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/home" element={<RotasPrivadas> <Home/> </RotasPrivadas>} />

            <Route path="/tutor/novo" element={<RotasPrivadas>  <CriarTutor/> </RotasPrivadas>} />

            <Route path="/tutor/editar/:id" element={<RotasPrivadas> <EditarTutor/> </RotasPrivadas>} />

            <Route path="/tutor/:id/animais" element={<RotasPrivadas> <AnimaisTutor/> </RotasPrivadas>} />

            <Route path="/tutor/:id/animal/novo" element={<RotasPrivadas> <CriarAnimal/> </RotasPrivadas>} />

            <Route path="/animal/editar/:id" element={<RotasPrivadas> <EditarAnimal/> </RotasPrivadas>} />

            <Route path="*" element={<Login />} />
        </Routes>
    )
}