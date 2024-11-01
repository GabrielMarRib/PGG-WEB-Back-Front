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
        
      case 'CURVAABCVALOR':
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
          <h1>Guia de Ajuda - Visualização de Curva ABC (Valor)</h1>

          <h1>Visão Geral</h1>
          <p>Esta tela exibe a análise da Curva ABC dos produtos com base no seu valor monetário. A Curva ABC por valor classifica os produtos de acordo com o impacto financeiro que eles têm no estoque, ajudando a identificar quais itens são mais valiosos em termos de custo total.</p>
          <p>A visualização inclui um gráfico que demonstra a porcentagem acumulada dos valores dos produtos e uma tabela detalhada com os dados da classificação de cada item.</p>

          <h1>Como Usar</h1>

          <h2>1. Voltar para a Tela Anterior</h2>
          <p>Se precisar retornar à página anterior, clique no botão laranja "Voltar" no canto superior esquerdo da tela. Ele te levará de volta à página anterior do sistema.</p>

          <h2>2. Selecione uma Categoria</h2>
          <p>Acima do gráfico, há uma caixa de seleção para escolher a categoria de produtos que você deseja visualizar. Isso permite filtrar os produtos por categoria e exibir apenas os dados relevantes.</p>
          <ul>
            <li><strong>Categoria</strong>: Selecione a categoria desejada no dropdown. A categoria selecionada será exibida no gráfico e na tabela abaixo.</li>
          </ul>

          <h2>3. Visualização do Gráfico</h2>
          <p>O gráfico exibe a participação de valor dos produtos dentro da categoria selecionada, mostrando a <strong>porcentagem acumulada</strong> em azul e os <strong>pontos de porcentagem acumulada</strong> destacados em vermelho.</p>
          <ul>
            <li><strong>Porcentagem Acumulada</strong>: Representa o valor acumulado dos produtos em relação ao valor total em estoque.</li>
          </ul>

          <h2>4. Análise da Tabela de Produtos</h2>
          <p>Logo abaixo do gráfico, há uma tabela detalhada que exibe as seguintes informações:</p>
          <ul>
            <li><strong>Id</strong>: Identificação numérica do produto.</li>
            <li><strong>Nome</strong>: Nome do produto.</li>
            <li><strong>Qtd. Con.</strong>: Quantidade consumida do produto no período analisado.</li>
            <li><strong>Custo Unitário</strong>: Custo unitário do produto.</li>
            <li><strong>Valor Total</strong>: Cálculo do valor total, ou seja, <strong>Qtd. Con.</strong> multiplicada pelo <strong>Custo Unitário</strong>.</li>
            <li><strong>%</strong>: Percentual que esse produto representa no valor total dos produtos no estoque.</li>
            <li><strong>% Acumulada</strong>: Porcentagem acumulada que esse produto contribui, considerando os produtos acima dele na lista.</li>
            <li><strong>Classificação</strong>: Classificação ABC do produto (<strong>A</strong>, <strong>B</strong> ou <strong>C</strong>), onde:
              <ul>
                <li><strong>A</strong>: Produtos de alta prioridade que representam a maior parte do valor total acumulado do estoque.</li>
                <li><strong>B</strong>: Produtos de importância média em termos de valor.</li>
                <li><strong>C</strong>: Produtos de menor impacto no valor total do estoque, geralmente de baixo valor.</li>
              </ul>
            </li>
          </ul>
          <p>A tabela resume os dados dos produtos com base no valor financeiro, facilitando a visualização de quais produtos têm o maior impacto no estoque em termos de custo total.</p>

          <h2>5. Informações Adicionais</h2>
          <p>No rodapé da tabela, há um resumo total do valor consumido de todos os produtos exibidos.</p>

          <h1>Dicas Finais</h1>
          <ul>
            <li>Utilize o filtro de categoria para analisar diferentes tipos de produtos de acordo com o seu valor financeiro.</li>
            <li>Produtos classificados como "A" devem ser monitorados de perto, pois eles representam a maior parte do valor financeiro em estoque.</li>
            <li>Utilize a Curva ABC por valor para otimizar a gestão de estoque, focando nos itens que têm mais impacto financeiro para o negócio.</li>
          </ul>


        </>

    ) 

    case 'CURVAABCFREQUENCIA':
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
          <h1>Guia de Ajuda - Visualização de Curva ABC (Frequência)</h1>

            <h1>Visão Geral</h1>
            <p>Esta tela exibe a análise da Curva ABC dos produtos com base na sua frequência de movimentação no estoque. A Curva ABC é uma ferramenta que classifica os produtos de acordo com a sua importância, com o objetivo de priorizar os itens mais relevantes.</p>
            <p>A visualização inclui um gráfico que demonstra a porcentagem acumulada dos produtos, e uma tabela detalhada com os dados da classificação de cada item.</p>

            <h1>Como Usar</h1>

            <h2>1. Voltar para a Tela Anterior</h2>
            <p>Se precisar retornar à página anterior, clique no botão laranja "Voltar" no canto superior esquerdo da tela. Ele te levará de volta à página anterior do sistema.</p>

            <h2>2. Selecione uma Categoria</h2>
            <p>Acima do gráfico, há uma caixa de seleção para escolher a categoria de produtos que você deseja visualizar. Isso permite filtrar os produtos por categoria e exibir apenas os dados relevantes.</p>
            <ul>
              <li><strong>Categoria</strong>: Selecione a categoria desejada no dropdown. A categoria selecionada será exibida no gráfico e na tabela abaixo.</li>
            </ul>

            <h2>3. Visualização do Gráfico</h2>
            <p>O gráfico exibe a frequência de consumo dos produtos dentro da categoria selecionada, mostrando a <strong>porcentagem acumulada</strong> em azul e os <strong>pontos de porcentagem acumulada</strong> destacados em vermelho.</p>
            <ul>
              <li><strong>Porcentagem Acumulada</strong>: Representa o consumo acumulado dos produtos conforme o número total de movimentações.</li>
            </ul>

            <h2>4. Análise da Tabela de Produtos</h2>
            <p>Logo abaixo do gráfico, há uma tabela detalhada que exibe as seguintes informações:</p>
            <ul>
              <li><strong>Id</strong>: Identificação numérica do produto.</li>
              <li><strong>Nome</strong>: Nome do produto.</li>
              <li><strong>Qtd. Con.</strong>: Quantidade consumida do produto no período analisado.</li>
              <li><strong>Custo Unitário</strong>: Custo unitário do produto.</li>
              <li><strong>%</strong>: Percentual que esse produto representa no total de consumo.</li>
              <li><strong>% Acumulada</strong>: Porcentagem acumulada que esse produto contribui, considerando os produtos acima dele na lista.</li>
              <li><strong>Classificação</strong>: Classificação ABC do produto (<strong>A</strong>, <strong>B</strong> ou <strong>C</strong>), onde:
                <ul>
                  <li><strong>A</strong>: Produtos de alta prioridade e que representam a maior parte do consumo acumulado.</li>
                  <li><strong>B</strong>: Produtos de importância média.</li>
                  <li><strong>C</strong>: Produtos de menor impacto no total de consumo, geralmente de baixo consumo.</li>
                </ul>
              </li>
            </ul>
            <p>A tabela resume os dados dos produtos de acordo com a sua classificação ABC e consumo, permitindo uma análise detalhada de quais itens merecem maior atenção.</p>

            <h2>5. Informações Adicionais</h2>
            <p>No rodapé da tabela, há um resumo total da quantidade consumida de todos os produtos exibidos.</p>

            <h1>Dicas Finais</h1>
            <ul>
              <li>Utilize o filtro de categoria para analisar diferentes tipos de produtos com mais precisão.</li>
              <li>Observe a coluna "Classificação" para entender quais produtos são mais críticos em termos de consumo e foco de reposição.</li>
              <li>A Curva ABC pode te ajudar a tomar decisões estratégicas sobre o estoque, alocando recursos para os produtos mais importantes.</li>
            </ul>
        </>

    ) 

    case 'CADASTROFORNECEDOR':
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
          <h1>Guia de Ajuda - Cadastro de Fornecedor</h1>

        <h1>Visão Geral</h1>
        <p>Esta tela permite o cadastro de fornecedores no sistema, bem como a visualização da lista de fornecedores já cadastrados. O cadastro inclui informações básicas como nome, CNPJ, endereço, telefone, email, e status do fornecedor (ativo ou inativo).</p>

        <h1>Como Usar</h1>

        <h2>1. Voltar para a Tela Anterior</h2>
        <p>Para retornar à página anterior, clique no botão laranja "Voltar", localizado no canto superior esquerdo da tela. Esse botão o levará de volta à interface anterior do sistema.</p>

        <h2>2. Cadastro de um Novo Fornecedor</h2>
        <p>No lado esquerdo da tela, há um formulário para o cadastro de novos fornecedores. Você precisará preencher as seguintes informações:</p>
        <ul>
          <li><strong>Nome do Fornecedor</strong>: Informe o nome completo do fornecedor. Exemplo: "Fornecedor ABC".</li>
          <li><strong>CNPJ</strong>: Digite o CNPJ do fornecedor no formato 00.000.000/0000-00.</li>
          <li><strong>Endereço</strong>: Informe o endereço completo do fornecedor, incluindo número e bairro. Exemplo: "Av. Brasil, 0000 - Centro".</li>
          <li><strong>Telefone</strong>: Insira o telefone de contato no formato (00) 00000-0000.</li>
          <li><strong>Email</strong>: Preencha o email de contato do fornecedor.</li>
          <li><strong>Status</strong>: O status pode ser configurado como <strong>Ativo</strong> ou <strong>Inativo</strong>, dependendo da situação do fornecedor.</li>
        </ul>
        <p>Após preencher todos os campos, clique no botão laranja "Cadastrar Fornecedor" para salvar as informações no sistema.</p>

        <h2>3. Visualização da Lista de Fornecedores</h2>
        <p>No lado direito da tela, você encontrará uma lista de fornecedores já cadastrados. As informações exibidas incluem:</p>
        <ul>
          <li><strong>Nome do Fornecedor</strong>: O nome do fornecedor cadastrado.</li>
          <li><strong>CNPJ</strong>: O CNPJ do fornecedor.</li>
          <li><strong>Endereço</strong>: O endereço do fornecedor.</li>
          <li><strong>Email</strong>: O email de contato do fornecedor.</li>
          <li><strong>Telefone</strong>: O telefone de contato do fornecedor.</li>
          <li><strong>Status</strong>: O status atual do fornecedor (Ativo/Inativo).</li>
        </ul>

        <h1>Dicas Finais</h1>
        <ul>
          <li>Certifique-se de preencher todas as informações obrigatórias no formulário de cadastro para garantir o correto registro no sistema.</li>
          <li>Use a funcionalidade de status para gerenciar fornecedores ativos e inativos de forma eficiente.</li>
          <li>Verifique os dados dos fornecedores na lista à direita para assegurar que estão corretos e atualizados.</li>
        </ul>

        </>

    ) 

    case 'PESQUISAPRODUTO':
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
          <h1>Guia de Ajuda - Pesquisa de Produtos</h1>

        <h1>Visão Geral</h1>
        <p>Esta tela permite realizar a busca de produtos disponíveis, filtrados por fornecedores, categorias ou pelo nome do produto. Além disso, é possível visualizar a lista de produtos com seus respectivos códigos e solicitar um pedido diretamente pela interface.</p>

        <h1>Como Usar</h1>

        <h2>1. Voltar para a Tela Anterior</h2>
        <p>Para retornar à página anterior, clique no botão laranja "Voltar" no canto superior esquerdo da tela. Isso o levará de volta à página anterior no sistema.</p>

        <h2>2. Pesquisa de Produtos</h2>
        <p>No topo da tela, há três opções de pesquisa disponíveis:</p>
        <ul>
          <li><strong>Pesquisar Fornecedor</strong>: Utilize esta opção para filtrar os produtos de acordo com o fornecedor específico.</li>
          <li><strong>Pesquisar Categorias</strong>: Esta opção permite filtrar os produtos conforme sua categoria, como eletrônicos, acessórios, etc.</li>
          <li><strong>Pesquisar Produto</strong>: Utilize o campo de busca para procurar um produto específico pelo nome.</li>
        </ul>

        <h2>3. Lista de Produtos</h2>
        <p>Na parte central da tela, você encontrará a lista de produtos disponíveis para pedido. Para cada produto, são exibidas as seguintes informações:</p>
        <ul>
          <li><strong>Nome do Produto</strong>: Exemplo - "Monitor Gamer 144hz".</li>
          <li><strong>Código</strong>: Cada produto tem um código único. Exemplo - "Código: 1".</li>
        </ul>
        <p>Para solicitar um produto, clique no botão laranja "Pedir produto" correspondente ao item desejado.</p>

        <h1>Dicas Finais</h1>
        <ul>
          <li>Certifique-se de utilizar os filtros de pesquisa para localizar o produto correto de maneira eficiente.</li>
          <li>Antes de solicitar um produto, confira o código para garantir que é o item certo.</li>
          <li>Utilize o botão "Voltar" sempre que quiser navegar para a tela anterior.</li>
        </ul>

        </>

    ) 

    case 'GESTAOLOTEECONOMICO':
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
      <h1>Guia de Ajuda - Gestão do Lote Econômico</h1>

      <h1>Visão Geral</h1>
      <p>Esta tela permite gerenciar o cálculo do Lote Econômico de Compra (LEC) para os produtos listados. O LEC é utilizado para determinar a quantidade ideal de compra de um produto, minimizando os custos totais relacionados ao pedido e ao estoque. A interface também permite editar valores relacionados aos produtos e visualizar detalhes específicos.</p>

      <h1>Como Usar</h1>

      <h2>1. Voltar para a Tela Anterior</h2>
      <p>Para retornar à página anterior, clique no botão laranja "Voltar" no canto superior esquerdo. Isso o levará de volta à página anterior no sistema.</p>

      <h2>2. Pesquisa de Produtos</h2>
      <p>No topo da lista de produtos, há um campo de busca onde você pode procurar um produto específico pelo nome. Basta digitar o nome do produto no campo "Pesquisar produto..." e a lista será filtrada automaticamente.</p>

      <h2>3. Lista de Produtos</h2>
      <p>Na parte esquerda da tela, você verá uma lista de produtos. Cada produto exibe as seguintes informações:</p>
      <ul>
        <li><strong>Nome do Produto</strong>: O nome do item, como "Monitor Gamer 144hz".</li>
        <li><strong>CP (Custo de Pedido)</strong>: O custo associado ao pedido do produto. Exemplo: "CP: 1.82".</li>
        <li><strong>CA (Custo de Armazenamento)</strong>: O custo associado ao armazenamento do produto. Exemplo: "CA: 0.87".</li>
        <li><strong>LEC (Lote Econômico de Compra)</strong>: O valor do lote econômico calculado para o produto. Exemplo: "LEC: 174.57".</li>
      </ul>
      <p>Para editar os valores do produto, clique no botão laranja "Editar Valor" correspondente ao item desejado.</p>

      <h2>4. Detalhes do Produto Selecionado</h2>
      <p>Ao clicar em "Editar Valor" para um produto, os detalhes serão exibidos na parte direita da tela. Você poderá ajustar os seguintes campos:</p>
      <ul>
        <li><strong>Período</strong>: Selecione o período de cálculo (Anual, Semestral, etc.).</li>
        <li><strong>Valor de Despesas (Anual)</strong>: Insira o valor das despesas relacionadas ao produto para o período selecionado.</li>
        <li><strong>Quantidade de Produtos Estocados (Anual)</strong>: Informe a quantidade de produtos atualmente em estoque para o período escolhido.</li>
        <li><strong>Número de Pedidos (Anual)</strong>: Insira o número total de pedidos feitos para o produto no período.</li>
        <li><strong>Demanda (Anual)</strong>: Defina a demanda total do produto para o período selecionado.</li>
      </ul>
      <p>Após preencher ou ajustar os valores, clique no botão laranja "Atualizar" para salvar as alterações ou no botão "Fechar" para cancelar e voltar à lista de produtos.</p>

      <h1>Dicas Finais</h1>
      <ul>
        <li>Use a funcionalidade de pesquisa para localizar rapidamente o produto desejado.</li>
        <li>Mantenha os dados de custos de pedido e armazenamento atualizados para obter cálculos de LEC precisos.</li>
        <li>Ao editar os detalhes de um produto, certifique-se de revisar todos os campos antes de clicar em "Atualizar" para garantir a precisão das informações.</li>
      </ul>

        </>

    ) 

    case 'LOGS':
        return (
          <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
      <h1>Guia de Ajuda - Logs de Consumo</h1>

      <h1>Visão Geral</h1>
      <p>Esta tela apresenta os logs relacionados ao consumo de produtos, categorizados por tipos de visão, como "Curva ABC". É possível verificar dados de consumo de produtos antigos e novos, bem como visualizar informações sobre autores, datas e justificativas para alterações.</p>

      <h1>Como Usar</h1>

      <h2>1. Voltar para a Tela Anterior</h2>
      <p>Assim como nas outras páginas, o botão laranja "Voltar" no canto superior esquerdo leva de volta à página anterior no sistema.</p>

      <h2>2. Filtro de Tipo de Visão</h2>
      <p>No topo da tabela de logs, você pode selecionar o tipo de visão que deseja visualizar usando o menu suspenso ao lado do texto "Filtrar por tipo de visão:". Exemplo de tipo de visão: "curvaabc". Ao selecionar uma visão, a tabela é filtrada automaticamente para mostrar apenas os registros correspondentes a essa visão.</p>

      <h2>3. Tabela de Logs</h2>
      <p>A tabela de logs mostra uma lista detalhada de registros para os produtos consumidos. Cada linha contém as seguintes colunas:</p>
      <ul>
        <li><strong>Tipo de Visão</strong>: Indica o tipo de visão, como "curvaabc", relacionada ao produto exibido.</li>
        <li><strong>Produto</strong>: Exibe detalhes do produto, como:
          <ul>
            <li><strong>Nome do Produto</strong>: Exemplo, "Monitor Gamer 144hz".</li>
            <li><strong>Id do Produto</strong>: Exemplo, "Id: 1".</li>
            <li><strong>Categoria</strong>: O número da categoria e a descrição. Exemplo, "1 - Periféricos".</li>
          </ul>
        </li>
        <li><strong>Quantidade de Consumo</strong>: Exibe a quantidade de produtos consumidos, separando os valores para "Antigos" e "Novos". Os valores antigos que não possuem dados aparecem com a mensagem "Não possui". Exemplo:
          <ul>
            <li><strong>Antigos:</strong> "Não possui" (em vermelho).</li>
            <li><strong>Novos:</strong> "100" (em verde).</li>
          </ul>
        </li>
        <li><strong>Autor</strong>: Exibe o nome da pessoa que fez a alteração ou inclusão do registro. Exemplo: "Ana Silva".</li>
        <li><strong>Data</strong>: A data e hora em que o log foi registrado. Exemplo: "2024-09-23 20:28:59".</li>
        <li><strong>Justificativa</strong>: Exibe uma justificativa opcional para o registro, como "Conforme observado por Miguel Lima".</li>
      </ul>

      <h2>4. Interpretação dos Valores</h2>
      <p>Na coluna "Quantidade de Consumo", você verá duas categorias de produtos: </p>
      <ul>
        <li><strong>Antigos:</strong> Indica o consumo de produtos que já estavam no sistema.</li>
        <li><strong>Novos:</strong> Indica o consumo de produtos que foram recentemente adicionados ou atualizados no sistema.</li>
      </ul>
      <p>Essas informações são destacadas em cores diferentes (vermelho para antigos e verde para novos) para facilitar a visualização rápida.</p>

      <h1>Dicas Finais</h1>
      <ul>
        <li>Utilize o filtro "Tipo de Visão" para concentrar sua análise em um grupo específico de produtos ou visão.</li>
        <li>Verifique as justificativas e datas para entender melhor o contexto de alterações nos registros de consumo.</li>
        <li>Mantenha os dados de consumo atualizados para que os logs reflitam informações precisas e úteis para a tomada de decisão.</li>
      </ul>

        </>

    ) 

    case 'ADDFUNCIONARIOS':
      return (
        <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
    <h1>Guia de Ajuda - Tela de Adição de Funcionários</h1>

    <h1>Visão Geral</h1>
    <p>Nesta tela, você pode adicionar novos funcionários ao sistema preenchendo informações básicas como nome, CPF, email, telefone, e o nível de acesso. A tela é simples e direta, facilitando o cadastro de novos colaboradores. Vamos ver como usá-la!</p>

    <h1>Como Usar</h1>

    <h2>1. Voltar à Página Anterior</h2>
    <p>Se precisar retornar à página anterior sem salvar o cadastro, clique no botão vermelho "Voltar". Isso te levará de volta sem realizar nenhuma ação no sistema.</p>

    <h2>2. Preenchendo as Informações</h2>
    <p>Preencha os campos solicitados com as seguintes informações:</p>
    <ul>
      <li><strong>Nome:</strong> Digite o nome completo do funcionário.</li>
      <li><strong>CPF:</strong> Insira o CPF do funcionário no formato correto (___ . ___. ___ - __).</li>
      <li><strong>Email:</strong> Informe o email que será usado para contato e comunicação.</li>
      <li><strong>Telefone:</strong> Coloque o número de telefone no formato adequado para facilitar o contato (com DDD).</li>
    </ul>

    <h2>3. Definindo o Nível de Acesso</h2>
    <p>Você verá duas opções de nível de acesso:</p>
    <ul>
      <li><strong>Acesso 0:</strong> Esse nível é para funcionários com permissões básicas no sistema.</li>
      <li><strong>Acesso 1:</strong> Esse nível é para funcionários com permissões administrativas ou maiores responsabilidades.</li>
    </ul>
    <p>Selecione o nível apropriado de acordo com as funções do funcionário.</p>

    <h2>4. Enviando os Dados</h2>
    <p>Depois de preencher todas as informações corretamente, clique no botão laranja "Enviar" para cadastrar o funcionário no sistema.</p>
    <p>Verifique se todos os dados estão corretos antes de enviar, pois qualquer erro pode comprometer o cadastro do funcionário.</p>

    <h1>Dicas Finais</h1>
    <p>Revise os dados antes de enviar, especialmente o CPF e email, para evitar possíveis problemas de cadastro.</p>
    <p>Se cometer algum erro, basta corrigir antes de enviar ou voltar à página anterior para começar novamente.</p>


      </>

  ) 

  case 'LISTAGEMFUNCIONARIOS':
      return (
        <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
    <h1>Guia de Ajuda - Tela de Listagem de Funcionários</h1>

    <h1>Visão Geral</h1>
    <p>Essa tela permite visualizar informações detalhadas sobre cada funcionário, como dados pessoais e nível de acesso. Além disso, é possível pesquisar funcionários e imprimir as informações exibidas na tela.</p>

    <h1>Como Usar</h1>

    <h2>1. Voltar à Página Anterior</h2>
    <p>Para retornar à página anterior sem fazer nenhuma ação, clique no botão vermelho "Voltar" no canto superior esquerdo.</p>

    <h2>2. Pesquisar Funcionários</h2>
    <p>Use o campo "Pesquisar funcionários" para localizar rapidamente o funcionário desejado. Basta digitar o nome ou parte do nome do funcionário. Os resultados serão filtrados automaticamente enquanto você digita.</p>

    <h2>3. Selecionar Funcionário</h2>
    <p>Clique no nome de um funcionário na lista à esquerda para exibir suas informações detalhadas no painel à direita.</p>

    <h2>4. Visualizar Informações Pessoais</h2>
    <p>Após selecionar um funcionário, as seguintes informações pessoais são exibidas:</p>
    <ul>
      <li><strong>Nome:</strong> Nome completo do funcionário.</li>
      <li><strong>Email:</strong> Endereço de email utilizado para contato.</li>
      <li><strong>Telefone:</strong> Número de telefone com DDD.</li>
      <li><strong>CPF:</strong> CPF do funcionário.</li>
    </ul>

    <h2>5. Visualizar Informações de Acesso</h2>
    <p>Abaixo das informações pessoais, você encontrará o <strong>Nível de Acesso</strong> do funcionário, que indica o tipo de permissão que ele possui no sistema. Exemplo de níveis de acesso:</p>
    <ul>
      <li><strong>Nível de Acesso 0:</strong> Permissão básica.</li>
      <li><strong>Nível de Acesso 1:</strong> Permissão administrativa.</li>
    </ul>

    <h2>6. Fechar e Imprimir</h2>
    <ul>
      <li><strong>Fechar:</strong> Clique no botão "Fechar" para ocultar as informações detalhadas do funcionário selecionado.</li>
      <li><strong>Imprimir:</strong> Clique no botão "Imprimir" para gerar uma impressão das informações exibidas na tela.</li>
    </ul>

    <h1>Dicas Finais</h1>
    <p>Utilize o campo de pesquisa para encontrar rapidamente o funcionário desejado, especialmente se houver uma lista longa de funcionários.</p>
    <p>Revise as informações antes de imprimir para garantir que todos os dados estão corretos.</p>



      </>

  ) 


  case 'VISUALIZACAORELATORIO':
    return (
      <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
    <h1>Guia de Ajuda - Tela de Visualização de Relatórios</h1>

    <h1>Visão Geral</h1>
    <p>Essa tela permite ao usuário visualizar relatórios específicos sobre vendas, incluindo detalhes de produtos, quantidades vendidas e informações sobre o responsável pela venda. É possível selecionar diferentes relatórios de vendas e imprimir ou deletar um relatório específico.</p>

    <h1>Como Usar</h1>

    <h2>1. Voltar à Página Anterior</h2>
    <p>Para retornar à página anterior sem realizar nenhuma ação, clique no botão vermelho "Voltar" no canto superior esquerdo.</p>

    <h2>2. Selecionar o Tipo de Relatório</h2>
    <p>No campo "Tipo de relatório", selecione o tipo de relatório desejado. No exemplo, está selecionado "Relatórios de Vendas". Isso ajustará a lista de relatórios exibidos na coluna esquerda para o tipo de relatório escolhido.</p>

    <h2>3. Visualizar um Relatório</h2>
    <p>Após selecionar o tipo de relatório, uma lista de relatórios disponíveis será exibida. Clique em qualquer relatório para visualizar seus detalhes no painel à direita.</p>

    <h2>4. Detalhes do Relatório de Vendas</h2>
    <p>Ao selecionar um relatório de vendas, as seguintes informações serão exibidas:</p>
    <ul>
      <li><strong>Data:</strong> Data e hora da venda registrada.</li>
      <li><strong>Item:</strong> Nome do item vendido, com os detalhes do produto, incluindo:</li>
      <ul>
        <li><strong>Código do produto:</strong> Identificação única do produto.</li>
        <li><strong>Quantidade Antes da venda:</strong> Quantidade disponível antes da venda.</li>
        <li><strong>Quantidade Vendida:</strong> Número de unidades vendidas.</li>
        <li><strong>Quantidade Atual:</strong> Estoque restante após a venda.</li>
        <li><strong>Custo unitário:</strong> Preço unitário do produto.</li>
        <li><strong>Receita Total:</strong> Valor total gerado pela venda.</li>
      </ul>
      <li><strong>Dados sobre o responsável pela venda:</strong> Nome e ID do responsável pela venda.</li>
    </ul>

    <h2>5. Fechar Relatório</h2>
    <p>Clique no botão vermelho "Fechar relatório" para ocultar os detalhes do relatório selecionado e retornar à lista de relatórios.</p>

    <h2>6. Imprimir e Deletar Relatório</h2>
    <ul>
      <li><strong>Imprimir Relatório:</strong> Clique no botão "Imprimir Relatório" para gerar uma impressão dos detalhes exibidos do relatório.</li>
      <li><strong>Deletar relatório:</strong> Clique no botão "Deletar relatório" para remover o relatório selecionado do sistema. Tenha cuidado, pois essa ação é irreversível.</li>
    </ul>

    <h1>Dicas Finais</h1>
    <p>Utilize o seletor de "Tipo de relatório" para navegar entre diferentes relatórios, caso estejam disponíveis.</p>
    <p>Revise as informações com atenção antes de deletar um relatório, pois essa ação não poderá ser desfeita.</p>

    </>

) 

case 'VISUALIZACAORELATORIO':
  return (
    <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
    <h1>Guia de Ajuda - Tela de Visualização de Relatórios</h1>

    <h1>Visão Geral</h1>
    <p>Essa tela permite ao usuário visualizar relatórios específicos sobre vendas, incluindo detalhes de produtos, quantidades vendidas e informações sobre o responsável pela venda. É possível selecionar diferentes relatórios de vendas e imprimir ou deletar um relatório específico.</p>

    <h1>Como Usar</h1>

    <h2>1. Voltar à Página Anterior</h2>
    <p>Para retornar à página anterior sem realizar nenhuma ação, clique no botão vermelho "Voltar" no canto superior esquerdo.</p>

    <h2>2. Selecionar o Tipo de Relatório</h2>
    <p>No campo "Tipo de relatório", selecione o tipo de relatório desejado. No exemplo, está selecionado "Relatórios de Vendas". Isso ajustará a lista de relatórios exibidos na coluna esquerda para o tipo de relatório escolhido.</p>

    <h2>3. Visualizar um Relatório</h2>
    <p>Após selecionar o tipo de relatório, uma lista de relatórios disponíveis será exibida. Clique em qualquer relatório para visualizar seus detalhes no painel à direita.</p>

    <h2>4. Detalhes do Relatório de Vendas</h2>
    <p>Ao selecionar um relatório de vendas, as seguintes informações serão exibidas:</p>
    <ul>
      <li><strong>Data:</strong> Data e hora da venda registrada.</li>
      <li><strong>Item:</strong> Nome do item vendido, com os detalhes do produto, incluindo:</li>
      <ul>
        <li><strong>Código do produto:</strong> Identificação única do produto.</li>
        <li><strong>Quantidade Antes da venda:</strong> Quantidade disponível antes da venda.</li>
        <li><strong>Quantidade Vendida:</strong> Número de unidades vendidas.</li>
        <li><strong>Quantidade Atual:</strong> Estoque restante após a venda.</li>
        <li><strong>Custo unitário:</strong> Preço unitário do produto.</li>
        <li><strong>Receita Total:</strong> Valor total gerado pela venda.</li>
      </ul>
      <li><strong>Dados sobre o responsável pela venda:</strong> Nome e ID do responsável pela venda.</li>
    </ul>

    <h2>5. Fechar Relatório</h2>
    <p>Clique no botão vermelho "Fechar relatório" para ocultar os detalhes do relatório selecionado e retornar à lista de relatórios.</p>

    <h2>6. Imprimir e Deletar Relatório</h2>
    <ul>
      <li><strong>Imprimir Relatório:</strong> Clique no botão "Imprimir Relatório" para gerar uma impressão dos detalhes exibidos do relatório.</li>
      <li><strong>Deletar relatório:</strong> Clique no botão "Deletar relatório" para remover o relatório selecionado do sistema. Tenha cuidado, pois essa ação é irreversível.</li>
    </ul>

    <h1>Dicas Finais</h1>
    <p>Utilize o seletor de "Tipo de relatório" para navegar entre diferentes relatórios, caso estejam disponíveis.</p>
    <p>Revise as informações com atenção antes de deletar um relatório, pois essa ação não poderá ser desfeita.</p>

    </>

) 

case 'PLANILHAEXCEL':
  return (
    <> {/* TEM q ter esse baguio vazio englobando tudo (<>) pq o react é chato */}
    <h1>Guia de Ajuda - Tela de Importação de Planilha Excel</h1>

    <h1>Visão Geral</h1>
    <p>Essa tela permite ao usuário fazer o upload de planilhas Excel, visualizar os dados importados e salvá-los no estoque. Além disso, é possível baixar os dados em formato Excel e visualizar importações anteriores.</p>

    <h1>Como Usar</h1>

    <h2>1. Voltar à Página Anterior</h2>
    <p>Para retornar à página anterior sem realizar nenhuma ação, clique no botão vermelho "Voltar" no canto superior esquerdo.</p>

    <h2>2. Enviar Planilha</h2>
    <ul>
      <li><strong>Selecionar Arquivo:</strong> Clique no botão verde "Selecionar Arquivo" para escolher uma planilha Excel (extensão .xlsx) do seu dispositivo.</li>
      <li><strong>Enviar Planilha:</strong> Após selecionar o arquivo, clique no botão verde "Enviar Planilha" para fazer o upload. Os dados importados serão exibidos na seção "Dados da Importação".</li>
    </ul>

    <h2>3. Visualizar e Editar Dados da Importação</h2>
    <p>Após o envio da planilha, os dados contidos no arquivo serão exibidos na tabela central com as seguintes colunas:</p>
    <ul>
      <li><strong>Descrição:</strong> Descrição do item.</li>
      <li><strong>Nome:</strong> Nome do produto.</li>
      <li><strong>Código de Barras:</strong> Código de barras do produto.</li>
      <li><strong>ID Produto:</strong> Identificação única do produto.</li>
      <li><strong>Categoria:</strong> Categoria a qual o produto pertence.</li>
      <li><strong>Data de Compra:</strong> Data em que o produto foi comprado.</li>
      <li><strong>Quantidade:</strong> Quantidade do produto.</li>
      <li><strong>Valor de Compra:</strong> Valor unitário de compra.</li>
      <li><strong>Valor de Venda:</strong> Valor unitário de venda.</li>
    </ul>

    <h2>4. Configurações de Paginação</h2>
    <p>No canto inferior direito da tabela, é possível ajustar a quantidade de registros exibidos por página e navegar entre as páginas usando os botões "Anterior" e "Próximo".</p>

    <h2>5. Enviar para Estoque</h2>
    <p>Para salvar os dados importados no estoque do sistema, clique no botão verde "Enviar para Estoque".</p>

    <h2>6. Download Excel</h2>
    <p>Clique no botão verde "Download Excel" para baixar uma cópia dos dados importados em formato Excel.</p>

    <h2>7. Importações Salvas</h2>
    <p>Abaixo da tabela de importação, está a seção "Importações Salvas", que lista as planilhas importadas anteriormente. Esta tabela exibe:</p>
    <ul>
      <li><strong>ID:</strong> Identificação única da importação.</li>
      <li><strong>Nome do Arquivo:</strong> Nome da planilha importada.</li>
      <li><strong>Data de Importação:</strong> Data e hora da importação.</li>
      <li><strong>Ações:</strong> Botão vermelho "Deletar" para excluir o registro de uma importação.</li>
    </ul>

    <h1>Dicas Finais</h1>
    <p>Certifique-se de revisar os dados importados antes de enviá-los para o estoque para evitar erros.</p>
    <p>Para manter o sistema organizado, você pode deletar importações antigas que não são mais necessárias, usando o botão "Deletar" na seção "Importações Salvas".</p>

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