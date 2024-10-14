import React from "react";
import "../Styles/App/Service/BtnAjuda.css";

const BtnAjuda = ({ msgChave, fechar }) => {

  const ObtemMsg = (msgChave) => {
    switch (msgChave) {
      case 'EXCEL': // pra cada chave nova, cria um caso no switch
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
            <h1>Guia de Ajuda - Tela de Importação de Planilha Excel</h1>
            <h1>Visão Geral</h1>
            Nesta tela, você pode importar planilhas em formato Excel (.xlsx ou .xls) para o sistema. Isso é super útil para atualizar dados em massa, sem precisar fazer isso manualmente. Vamos ver como funciona!
            <h1>Como Usar</h1>
            <h2>1. Voltar para o Perfil</h2>
            Se precisar voltar para a tela anterior, clique no botão Voltar. Isso te levará de volta para a sua página de perfil sem perder tempo.
            <h2>2. Enviando sua Planilha</h2>
            <p>Clique em Selecione a Planilha para abrir o explorador de arquivos do seu computador. </p>
            <p>Escolha o arquivo Excel que você deseja importar. Após selecionar, o nome do arquivo aparecerá logo abaixo. </p>
            <h2>3. Enviando a Planilha</h2>
            <p>Clique no botão Enviar Planilha para carregar os dados no sistema. </p>
            <p>Certifique-se de que a planilha contém os dados que você deseja importar. Se não houver nada, o sistema não fará nada. </p>
            <h2>4. Visualizando os Dados Importados</h2>
            Após o envio, você verá uma tabela com os dados que foram importados. Isso te permite confirmar que tudo foi carregado corretamente.
            <h2>5. Gerenciando Importações Salvas</h2>
            Na parte inferior da tela, há uma lista de importações salvas. Aqui você pode ver:
            <strong>
              <p>- ID: Identificação única da importação. - Nome do Arquivo: O nome do arquivo que foi importado. </p>
              <p>- Dados: Uma pré-visualização dos dados importados. </p>
              <p>- Data de Importação: Quando os dados foram carregados. </p>
              <p>- Ações: Um botão para Deletar a importação, caso você não precise mais dela. </p>
            </strong>
            <h2>6. Deletando uma Importação</h2>
            Se decidir que não precisa mais de uma importação, clique no botão Deletar. O sistema vai perguntar se você tem certeza antes de apagar tudo. É sempre bom verificar duas vezes, né?
            <h1>Dicas Finais</h1>
            <p>Sempre confira os dados na sua planilha antes de enviar. Um pequeno erro pode causar confusão depois.</p>
            <p>Se precisar mudar a planilha, você pode clicar em Selecionar Outra Planilha para escolher um novo arquivo.</p>
          </>
        )
      case 'CATEGORIAS':
        return (
            <>
              <h1>kkkkk eu sou um teste blz??</h1>
              <h2>ola sou um h2</h2>
              <h3>e eu um h3 kkkkkkkkk vai se fuder</h3>
            </>
          ) // dispensa break no switch, pq já tem return.
      default:
        return (
          <>
            <h1>Chave inválida, verifique o prop 'msgChave'</h1>
          </>
        )
    }
  }

  return (
    <div className="BtnAjuda">
      <div className="popup">
        <div className="popup-conteudo">
          <button className="fechar-popup" onClick={() => { fechar() }}>Fechar</button>
          {ObtemMsg(msgChave)}
        </div>
      </div>
    </div>
  );
};

export default BtnAjuda;