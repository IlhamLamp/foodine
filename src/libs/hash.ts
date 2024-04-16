import bcrypt from "bcrypt";

function PasswordHash(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}

function PasswordCheck(passwordTarget: string, oldPassword: string): boolean {
    const isValid = bcrypt.compareSync(passwordTarget, oldPassword)
    return isValid;
}

export { PasswordHash, PasswordCheck }
