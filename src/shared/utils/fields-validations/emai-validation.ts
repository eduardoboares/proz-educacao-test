const emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function validEmail(email: string): string
{
    if(!emailPattern.test(email.trim().toLowerCase())) {
        throw new Error('Invalid student email.');
    }

    return email;
}
