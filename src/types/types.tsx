export interface ConfirmModalProps {
    nomeEntidade: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export interface AnimalCardProps {
    key: string;
    nome: string;
    especie: string;
    raca: string;
    idade: string;
    imagem?: string;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'create' |'enter' | 'logout' |'view' | 'edit' | 'delete' |'cancelar' |'back';
    fullWidth?: boolean;
}

export interface CardProps {
    children: React.ReactNode;
    variant?: 'tutor' | 'animal';
}

export interface HeaderProps {
    nomeUsuario: string;
    onLogout?: () => void;
}

export interface InputProps {
    label: string;
    type?: 'text' | 'email' | 'password' | 'tel' | 'number';
    id?: string;
    placeholder?: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
}

export interface TutorCardProps {
    key: string;
    nome: string;
    email: string;
    telefone: string;
    cidade: string;
    onClickVer: () => void;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

export interface Animal {
    id: string;
    especie: string;
    nome: string;
    raca: string;
    idade: string;
    tutorId: string;
    imagem: string;
}

export interface Tutor {
    id: string;
    nome: string;
}

export interface Tutor {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    cidade: string;
}

export interface ToastMessage {
    id: string;
    type?: 'success' | 'error' | 'info';
    message: string;
    duration?: number;
}

export interface ToastContextProps {
    showToast: (message: Omit<ToastMessage, 'id'>) => void;
}

export interface ToastProps {
    toasts: ToastMessage[];
}