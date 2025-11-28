import { Button } from "../Button/Button";
import {ConfirmModalProps} from "../../types/types";
import './ConfirmModal.css';

export function ConfirmModal({ nomeEntidade, onCancel, onConfirm }: ConfirmModalProps) {

    return (
        <div className="modal-container">
            <div className="modal">
                <h1>Tem certeza que deseja excluir {nomeEntidade}?</h1>
                <div className="acoes">
                    <Button variant="cancelar" onClick={onCancel}>Cancelar</Button>
                    <Button variant="enter" onClick={onConfirm}>Confirmar</Button>
                </div>
            </div>
        </div>
    )
}