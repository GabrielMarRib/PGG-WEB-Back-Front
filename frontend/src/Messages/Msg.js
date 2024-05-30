export const camposNaoPreenchidos = (plural) => {
    if(plural)
        return "Preencha todos os campos antes de continuar";
    else
        return "Preencha o campo antes de continuar";
};

export const loginOk = () =>{
    return "Logado com sucesso";
}

export const loginFalha = () =>{
    return "Usuário ou senha inválidos"; 
}

export const emailOk = () =>{
    return "Link de redefinição de senha enviado";
}

export const emailFalha = () =>{
    return "Falha ao enviar email de recuperação de senha. Por favor, tente novamente";
}