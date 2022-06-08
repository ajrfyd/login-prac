export const utils = {
}

export const user_regex = /^[A-z][A-z0-9-_]{3,23}$/;
export const pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const REGISTER_URL = '/register';