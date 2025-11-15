export interface User {
    id: string;
    username: string;
    email: string
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    securityQuestion: string;
    securityAnswer: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface ChangePasswordData {
    username: string;
    securityAnswer: string;
    newPassword: string;
    confirmPassword: string;
}