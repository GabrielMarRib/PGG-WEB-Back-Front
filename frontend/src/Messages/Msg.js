export const camposNaoPreenchidos = (plural) => {
    if(plural)
        return "Preencha todos os campos antes de continuar";
    else
        return "Preencha o campo antes de continuar";
};
