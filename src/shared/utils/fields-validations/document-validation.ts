/* eslint-disable-next-line complexity */
export function validCPF(cpf: string): string {
    const cpfInvalidMessage = 'Invalid student CPF.';
    let add: number;
    let rev: number;
    let i: number;

    cpf = cpf.replace(/\./g, '').replace('-', '').replace('_', '').trim();

    if (
        !cpf ||
        cpf === '' ||
        cpf.length !== 11 ||
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
    )
    {
        throw new Error(cpfInvalidMessage);
    }

    add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
    {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9)))
    {
        throw new Error(cpfInvalidMessage);
    }

    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
    {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(10)))
    {
        throw new Error(cpfInvalidMessage);
    }

    return cpf;
}

export function validRG(rg: string): string {
    rg = rg.replace(/\D/g,'');

    if (!rg || rg.length > 14 || rg.length < 8) {
        throw new Error('Invalid student CPF.');
    }
    return rg;
}
