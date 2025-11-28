import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Home } from "../pages/Home/Home";
import { CriarTutor } from "../pages/CriarTutor/CriarTutor";
import { EditarTutor } from "../pages/EditarTutor/EditarTutor";
import { AnimaisTutor } from "../pages/AnimaisTutor/AnimaisTutor";
import { CriarAnimal } from "../pages/CriarAnimal/CriarAnimal";
import { EditarAnimal } from "../pages/EditarAnimal/EditarAnimal";
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