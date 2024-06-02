const express = require('express');
const routes = express.Router();
const { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } = require('firebase/auth');
const { app } = require('./Firebase/Firebase.js');
const { admin, db } = require('./Firebase/FirebaseAdmin.js');


routes.get('/teste', async (req, res) => {
    res.json("hahaha teste ");
})

routes.post('/Login', async (req, res) => { // Adicionando 'async' aqui
    const auth = getAuth(app);
    const { email, password } = req.body;

    try {
        // Autenticação no Firebase
        await signInWithEmailAndPassword(auth, email, password);

        // Obtenha o usuário autenticado
        const user = auth.currentUser;


        // Buscar informações adicionais no Firestore
        const userDoc = await db.collection('Logins').doc(user.uid).get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: "Usuário não encontrado no Firestore" });
        }

        const userData = userDoc.data();

        // Retorne os dados do usuário salve
        return res.status(200).json({
            id: user.uid,
            userData: userData,
        });
    } catch (error) {
        // Trate os erros de autenticação
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            return res.status(401).json({ message: "Usuário ou senha inválidos" });
        } else {
            return res.status(500).json({ message: "Erro desconhecido", error: error.message });
        }
    }
});

routes.post('/RedefinirSenha', async (req, res) => {
    const auth = getAuth(app);
    const { email } = req.body;

    try {
        await sendPasswordResetEmail(auth, email); // se der ruim, manda exception....

        return res.status(200).json({ message: "Caso o e-mail estiver cadastrado, enviamos um link de redefinição" })

    } catch (error) {
        if (error.code === 'auth/invalid-email')
            return res.status(400).json({ message: "Email inválido inserido" }) //400 = Bad Request, nao foi possivel concluir a operação
        else if (error.code === 'auth/user-not-found')
            return res.status(404).json({ message: "Email não encontrado na base de dados" }) // 404 = Not found, nao achou
        else
            return res.status(500).json({ message: "Erro desconhecido", error: error.message }); //500 internal server error, ou seja, deu merda mas nao se sabe qual
    }
});

routes.post('/CriarFuncionario', async (req, res) => {
    const auth = admin.auth();

    //vindo do frontend...
    const { nome, cpf, email, telefone, acesso } = req.body;

    //senha aleatória...
    //const senhaAleat = gerarSenhaAleat(15);

    try {
        const userRecord = await auth.createUser({
            email: email,
            password: "batataFrita"
        });
        const userId = userRecord.uid;
        const LoginsRef = db.collection('Logins');
        const docRef = LoginsRef.doc(userId);
        await docRef.set({
            Nome: nome,
            Email: email,
            CPF: cpf,
            Celular: telefone,
            Nivel_acesso: acesso
        });
        return res.status(200).json({ message: "Usuario adicionado" })

    } catch (error) {
        return res.status(500).json({ message: "Erro ao adicionar o usuario", error: error.message });
    }
});

routes.get('/PegaProdutos', async (req, res) => {
    try {
        const snapshot = await db.collection('Estoque').get(); // pega uma snap de estoque

        const produtos = []; // array de produtos
        snapshot.forEach(doc => { // pra cada doc na snapshot
            produtos.push({ id: doc.id, data: doc.data() }); // manda o doc.id e os dados
        });

        res.json(produtos); // Send the snapshot data as JSON

    } catch (error) {
        console.error('Error handling route: ', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

routes.post('/insereProdutos', async (req, res) => {

    const { nome, custoUnit, quantidade, descricao } = req.body;
    const data = new Date();
    try {
        const EstoqueRef = db.collection('Estoque');
        const produtoNew = await EstoqueRef.add({
            Data_Entrada: data,
            Descricao: descricao,
            Nome: nome,
            Custo_Unitario: custoUnit,
            Quantidade: quantidade
        });

        res.status(200).json({ response: produtoNew.id});
    } catch (error) {
        console.error('Error handling route: ', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

routes.post('/insereCurvaAbc', async (req, res) => {

    const { produtoId,qdeCon } = req.body;
    try {
        const CurvaAbcRef = db.collection('CurvaAbc');
        const curvaAbcProdutoRef = CurvaAbcRef.doc(produtoId);
        
        await curvaAbcProdutoRef.set({
            QtdeConsumo: qdeCon
        })

        res.status(200).json({ message: "inserção OK" });
    } catch (error) {
        console.error('Error handling route: ', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

routes.post('/inserePontoDePedido', async (req, res) => {

    const { DM,TE,TR,QV,PP,ES,produtoId } = req.body;
    try {
        const PontoDePedidoRef = db.collection('PontoDePedido');
        const PontoDePedidoProdutoRef = PontoDePedidoRef.doc(produtoId);
        
        await PontoDePedidoProdutoRef.set({
            DM: DM,
            ES: ES,
            PP: PP,
            QV: QV,
            TE: TE,
            TR: TR
        })

        res.status(200).json({ message: "inserção OK" });
    } catch (error) {
        console.error('Error handling route: ', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

routes.get('/pegaPontoDePedido', async (req,res) =>{
    try {
        const snapshot = await db.collection('PontoDePedido').get(); // pega uma snap de PontoDePedido

        const PP = []; // array de PP
        snapshot.forEach(doc => { // pra cada doc na snapshot
            PP.push({ id: doc.id, data: doc.data() }); // manda o doc.id e os dados
        });
        
        res.json(PP); // Send the snapshot data as JSON

    } catch (error) {
        console.error('Error handling route: ', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

routes.post('/insereVendas', async (req, res) => {
    const { quantidadeVenda, itemId, receita, quantidadeAtual } = req.body;

    try {
        const VendasRef = db.collection('Vendas');
        const EstoqueRef = db.collection('Estoque');
        const VendaProdutoRef = VendasRef.doc(itemId);
        const EstoqueProdutoRef = EstoqueRef.doc(itemId);

        const vendaDoc = await VendaProdutoRef.get();
        let vendidostotal = 0;
        let receitatotal = 0;

        if (vendaDoc.exists) {
            const existingData = vendaDoc.data();
            vendidostotal = existingData.Totais_Vendidos || 0;
            receitatotal = existingData.Total_Receita_Gerada || 0;
        }

        vendidostotal += quantidadeVenda;
        receitatotal += receita;

        await VendaProdutoRef.set({
            Ultimos_Vendidos: quantidadeVenda,
            Ultima_Receita_Gerada: receita,
            Totais_Vendidos: vendidostotal,
            Total_Receita_Gerada: receitatotal
        });

        atualizaProdutosQtde(EstoqueProdutoRef,(quantidadeAtual - quantidadeVenda))


        res.status(200).json({ message: "inserção OK" });
    } catch (error) {
        console.error('Error handling route: ', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

routes.post('/LoteEconomico', async (req, res) => {

    const { HashProduto } = req.body;
    try {
        const EstoqueRef = db.collection('LoteEconomico').doc(HashProduto);
        const doc = await EstoqueRef.get();
    
        if (!doc.exists) {
            console.log('Documento não encontrado');
            res.status(200).json({Resposta: 'Documento não encontrado'});
            return;
        }
        res.status(200).json({ Resposta: JSON.stringify(doc.data()) });

    } catch (error) {
        console.error('Error handling route: ', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
    
});


routes.post('/InsereCalculosLote', async (req, res) => {

    const { Hash, CP, CA, LEC, ExisteBD } = req.body;
    try {
        const LoteEconomicoRef = db.collection('LoteEconomico');
        const LoteEconomicoRefDoc = LoteEconomicoRef.doc(Hash); 

        const NovoCalculoDoc = await LoteEconomicoRefDoc.set({
                CustoArmazem: CA,
                CustoPedido: CP,
                CalculoLoteEconomico: LEC,
        });
        
    
       
        res.status(200).json({ message: "Inserção OK" });
    } catch (error) {
const atualizaProdutosQtde = async (EstoqueProdutoRef,valor) =>{
    await EstoqueProdutoRef.update({
        Quantidade: valor
    });
}
    }
});

routes.post('/geraRelatorioVendas', async (req,res) =>{
    try {
        const { produtoVendidoId,QtdeVendida,pessoaId,PessoaNome,produtoVendidoNome } = req.body;
        const data = new Date();

        const relatoriosVendaRef = db.collection('Relatorios').doc('Vendas').collection('ListaRelatorios');
        await relatoriosVendaRef.add({
            Data_Venda: data,
            Produto_Vendido_Id: produtoVendidoId,
            Produto_Vendido_Nome: produtoVendidoNome,
            Quantidade_Vendida: QtdeVendida,
            Responsavel_Id: pessoaId,
            Responsavel_Nome: PessoaNome
        });
        res.status(200).json({ message: "inserção OK" });
    }catch(error){
        console.error('Error handling route: ', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

routes.post('/geraRelatorioPP', async (req,res) =>{
    try {
        const { PP,QtdeAtual,msg,produtoID,produtoNome } = req.body;
        const data = new Date();

        const relatoriosVendaRef = db.collection('Relatorios').doc('PontoDePedido').collection('ListaRelatorios');
        await relatoriosVendaRef.add({
            Data_Venda: data,
            PP: PP,
            msg: msg,
            QtdeAtual: QtdeAtual,
            produtoID: produtoID,
            produtoNome: produtoNome
        });
        res.status(200).json({ message: "inserção OK" });
    }catch(error){
        console.error('Error handling route: ', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

routes.get('/pegaRelatorioPP', async (req,res) =>{
    try{
        const snapshot = await db.collection('Relatorios').doc('PontoDePedido').collection('ListaRelatorios').get(); // pega uma snap de PontoDePedido

        const PP = []; // array de PP
        snapshot.forEach(doc => { // pra cada doc na snapshot
            PP.push({ id: doc.id, data: doc.data() }); // manda o doc.id e os dados
        });

        res.json(PP)
    }catch(error){

    }
});


module.exports = routes;
