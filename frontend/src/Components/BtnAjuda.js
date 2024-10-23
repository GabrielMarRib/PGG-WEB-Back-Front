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
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
          <h1>Guia de Ajuda - Tela de Gerenciamento de Produtos</h1>
          
          <h1>Visão Geral</h1>
          <p>Nesta tela, você pode adicionar novos produtos ao sistema e gerenciar os produtos já cadastrados. É uma maneira eficiente de manter seu estoque sempre atualizado e organizado. Vamos ver como funciona!</p>
          
          <h1>Como Usar</h1>
          
          <h2>1. Voltar para o Perfil</h2>
          <p>Se precisar retornar à tela anterior, clique no botão Voltar. Isso te levará de volta à sua página de perfil rapidamente.</p>
          
          <h2>2. Adicionando um Produto</h2>
          <p>Na seção Adicione um produto, preencha os campos obrigatórios marcados com <strong>*</strong>:</p>
          <ul>
            <li><strong>Código:</strong> Identificação única do produto.</li>
            <li><strong>Nome:</strong> Nome do produto.</li>
            <li><strong>Descrição:</strong> Breve descrição do produto.</li>
            <li><strong>Código de Barras:</strong> Código de barras do produto.</li>
          </ul>
          <p><strong>Informações sobre o Lote:</strong></p>
          <ul>
            <li><strong>Fornecedor:</strong> Selecione um fornecedor da lista.</li>
            <li><strong>Data de Compra:</strong> Insira a data da compra no formato dd/mm/aaaa.</li>
            <li><strong>Data de Validade:</strong> Insira a data de validade do produto.</li>
            <li><strong>Quantidade:</strong> Informe a quantidade do produto em estoque.</li>
            <li><strong>Valor da Compra:</strong> Informe o valor de compra do produto.</li>
            <li><strong>Valor da Venda:</strong> Informe o preço de venda do produto.</li>
          </ul>
          <p>Após preencher todas as informações, clique em <strong>Inserir Produto</strong> para adicionar o produto ao sistema.</p>
          
          <h2>3. Pesquisando Produtos Cadastrados</h2>
          <p>Na seção Produtos cadastrados, você pode pesquisar produtos usando os campos disponíveis:</p>
          <ul>
            <li><strong>Pesquisar categoria:</strong> Para encontrar produtos por categoria.</li>
            <li><strong>Pesquisar produto:</strong> Para localizar um produto específico pelo nome ou código.</li>
          </ul>
          
          <h2>4. Editando Produtos</h2>
          <p>Ao lado de cada produto cadastrado, existe um botão <strong>Editar produto</strong>. Clique nele se precisar atualizar as informações do produto.</p>
          
          <h2>5. Dicas Finais</h2>
          <p>Sempre revise os dados do produto antes de inserir para evitar erros.</p>
          <p>Utilize as ferramentas de pesquisa para facilitar a localização de produtos no sistema.</p>
          <p>Certifique-se de que todas as informações obrigatórias estão preenchidas para que o produto seja cadastrado corretamente.</p>
          
        </>
        
          ) // dispensa break no switch, pq já tem return.

          case 'BAIXASPRODUTOS':
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
          <h1>Guia de Ajuda - Tela de Baixa de Produtos</h1>
          
          <h1>Visão Geral</h1>
          <p>Nesta tela, você pode selecionar um produto de qualquer categoria para efetuar uma baixa. É um processo simples que permite gerenciar o estoque de forma eficaz.</p>
          
          <h1>Como Usar</h1>
          
          <h2>1. Selecionando um Produto</h2>
          <p>Na seção "Produtos da categoria acima:", você verá uma lista de produtos disponíveis. Selecione o produto desejado a partir do dropdown. O produto selecionado será exibido logo abaixo.</p>
          
          <h2>2. Visualizando os Detalhes do Produto</h2>
          <div style={{border: '1px solid black', padding: '10px', margin: '20px 0'}}>
            <p><strong>Produto Selecionado:</strong> Smartphone UltraTech Z10</p>
            <p><strong>Produto ID:</strong> 33333</p>
          </div>
          
          <h2>3. Verificando a Quantidade Disponível</h2>
          <p>A quantidade disponível do produto será exibida automaticamente. Certifique-se de que as informações estão corretas antes de prosseguir.</p>
          
          <h2>4. Motivo da Baixa</h2>
          <p>Selecione o motivo da baixa na lista suspensa. Você pode escolher "Expiração/Vencimento" ou outras opções disponíveis.</p>
          
          <h2>5. Inserindo a Quantidade da Baixa</h2>
          <p>Digite a quantidade que você deseja baixar no campo "Quantidade da Baixa". O sistema não permitirá uma baixa superior à quantidade disponível.</p>
          
          <h2>6. Motivo da Expiração/Vencimento</h2>
          <p>Insira o motivo da expiração ou vencimento do produto no campo designado, caso tenha selecionado essa opção.</p>
          
          <h2>7. Efetuando a Baixa</h2>
          <p>Depois de preencher todos os campos necessários, clique no botão "Efetuar Baixa" para processar a baixa do produto selecionado.</p>
          
          <h1>Dicas Finais</h1>
          <p>Antes de efetuar a baixa, sempre verifique se as informações estão corretas. Um pequeno erro pode afetar o controle de estoque.</p>
          <p>Se precisar voltar e selecionar outro produto, use o botão "Voltar" para retornar à tela anterior.</p>
        </>
          ) 

      case 'GERENCIAMENTECATEGORIA':
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
          <h1>Guia de Ajuda - Gerenciamento de Categoria</h1>
          <h1>Visão Geral</h1>
          Nesta tela, você pode gerenciar as categorias dos produtos no sistema. Isso facilita a organização e a localização de itens, permitindo uma administração mais eficiente.

          <h1>Como Usar</h1>
          
          <h2>1. Voltar para a Página Anterior</h2>
          Se precisar voltar para a tela anterior, clique no botão Voltar. Isso te levará de volta para a sua página anterior sem perder tempo.

          <h2>2. Adicionando uma Nova Categoria</h2>
          <p>Clique no botão Adicionar Categoria para abrir o formulário de inserção.</p>
          <p>Preencha os campos obrigatórios: Nome da Categoria e Descrição. Após isso, clique em "Salvar" para adicionar a categoria ao sistema.</p>

          <h2>3. Listando Categorias</h2>
          Após adicionar categorias, você verá uma lista delas na tela. Isso te permite visualizar todas as categorias cadastradas e acessar as opções de edição e exclusão.

          <h2>4. Atualizando uma Categoria</h2>
          <p>Para atualizar uma categoria, clique no ícone de edição ao lado do nome da categoria desejada. Faça as alterações necessárias e clique em "Salvar" para confirmar.</p>

          <h2>5. Deletando uma Categoria</h2>
          Se decidir que não precisa mais de uma categoria, clique no botão Deletar ao lado da categoria correspondente. O sistema irá perguntar se você tem certeza antes de apagar tudo. É sempre bom verificar duas vezes, né?

          <h1>Dicas Finais</h1>
          <p>Verifique se o nome da categoria que você está adicionando não está duplicado. Categorias com nomes iguais podem causar confusão.</p>
          <p>Se precisar editar uma categoria, faça isso rapidamente após a adição, para evitar inconsistências.</p>
        </>
          ) 

          case 'GERENCIAMENTOLOTES':
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
          <h1>Guia de Ajuda - Gerenciamento de Lotes</h1>

          <h1>Visão Geral</h1>
          <p>Esta tela permite o gerenciamento de lotes de produtos, oferecendo funcionalidades para visualizar, editar e manter controle sobre as informações dos lotes, como datas, valores e fornecedores.</p>

          <h1>Como Usar</h1>

          <h2>1. Voltar para a Página Anterior</h2>
          <p>Clique no botão Voltar no canto superior esquerdo da tela para retornar à página anterior, caso deseje sair da tela de gerenciamento de lotes.</p>

          <h2>2. Visualizando Lotes</h2>
          <p>Ao acessar a tela, você verá uma lista de lotes cadastrados, contendo informações como:</p>
          <ul>
            <li>Id do lote: Número identificador do lote.</li>
            <li>Produto: Nome do produto associado ao lote.</li>
            <li>Fornecedor: Fornecedor responsável.</li>
            <li>Data de compra e Data de validade: As datas relevantes para o lote.</li>
            <li>Valores de compra e venda: Informações financeiras do lote.</li>
          </ul>

          <h2>3. Editando um Lote</h2>
          <p>Para editar um lote, clique no botão Editar abaixo do lote que deseja modificar. Isso abrirá um popup de edição onde você poderá alterar informações detalhadas do lote, como:</p>
          <ul>
            <li>Valor de compra</li>
            <li>Valor de venda</li>
            <li>Quantidade do produto</li>
            <li>Justificativa (explicação sobre a alteração)</li>
          </ul>
          <p>Após preencher as informações, clique no botão Alterar para confirmar as modificações.</p>

          <h2>4. Fechando o Popup de Edição</h2>
          <p>Caso deseje fechar o popup de edição sem salvar as alterações, clique no ícone de "X" no canto superior direito do popup.</p>

          <h1>Dicas Finais</h1>
          <ul>
            Verifique se as informações, especialmente valores e datas, estão corretas antes de confirmar as alterações.
            Utilize a justificativa para documentar o motivo de qualquer mudança nos lotes, mantendo o histórico de edições bem claro.
          </ul>
        </>

          ) 

          case 'INVENTARIO':
            return (
              <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
              <h1>Guia de Ajuda - Tela de Inventário de Produtos</h1>

              <h1>Visão Geral</h1>
              <p>Nesta tela, você pode gerenciar o inventário de produtos, incluindo a pesquisa por fornecedor, categoria, ou nome de produto. Além disso, há opções para editar produtos específicos. Vamos ver como funciona!</p>

              <h1>Como Usar</h1>

              <h2>1. Voltar para a Tela Anterior</h2>
              <p>Se precisar retornar à página anterior, basta clicar no botão "Voltar", localizado no canto superior esquerdo. Ele vai te redirecionar para a tela de navegação anterior.</p>

              <h2>2. Pesquisar Fornecedor, Categoria ou Produto</h2>
              <p>No topo da lista de produtos, você encontrará três campos de pesquisa:</p>
              <ul>
                <li><strong>Pesquisar fornecedor</strong>: Permite filtrar produtos com base em seus fornecedores.</li>
                <li><strong>Pesquisar categoria</strong>: Use este campo para buscar produtos pertencentes a uma categoria específica.</li>
                <li><strong>Pesquisar produto</strong>: Insira o nome do produto que você deseja localizar diretamente.</li>
              </ul>
              <p>Esses campos facilitam a busca de produtos específicos sem a necessidade de rolar a lista manualmente.</p>

              <h2>3. Editar Produtos</h2>
              <p>Cada produto listado na tela apresenta as seguintes informações:</p>
              <ul>
                <li>Nome do produto</li>
                <li>Código do produto</li>
              </ul>
              <p>Para editar um produto, clique no botão laranja "Editar Produto" correspondente. Isso te levará à página de edição, onde você pode modificar as informações do produto.</p>

              <h1>Dicas Finais</h1>
              <ul>
                <li>Utilize os campos de pesquisa para economizar tempo na busca de produtos específicos.</li>
                <li>Sempre verifique as informações antes de clicar em "Editar Produto" para garantir que está fazendo as alterações no item correto.</li>
                <li>Caso tenha dúvidas, clique no botão "Ajuda" para visualizar informações de suporte diretamente na tela.</li>
              </ul>
            </>
    
              ) 
        
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

// const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda
// import BtnAjuda from "../../../Components/BtnAjuda.js";
/* 
        <header className="cabecalhoBtnAjuda">
          <div className="Botaoajuda" onClick={() => {setShowPopup(true)}}> {/*crie um botão que no onClick faz o setShowPopup ficar true}
          Ajuda
          </div>
        </header>

        <div className="BtnAjuda">
          {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
            <BtnAjuda /* chama o btnAjuda 
              fechar={() => {setShowPopup(false)}} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
              msgChave={"BAIXASPRODUTOS"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
            />
          )}
        </div> 

*/

export default BtnAjuda;