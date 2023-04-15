const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/cliente', (req, res)=>{
    res.render('categoria/index');
});

app.get('/listagemCliente', (req, res)=>{

    const urlListarCliente = 'http://localhost:3000/listarCliente';

    axios.get(urlListarCliente)
    .then((response)=>{

        console.log(response.data);
        let clientes = response.data;
        res.render('categoria/listagemCliente', {clientes});

    });
});

app.get('/alterarCliente/:idCliente', (req,res) =>{
    let {idCliente} = req.params;

    urlListarClientePK = `http://localhost:3000/listarClientePK/${idCliente}`;
    axios.get(urlListarClientePK)
    .then((response)=>{
        let cliente = response.data;
        res.render('categoria/editarCliente.ejs', {cliente});

    });

    app.post('/alterarCliente', (req, res)=>{
    
        let urlEditar = 'http://localhost:3000/alterarCliente';
    
        axios.put(urlEditar, req.body)
            .then((response)=>{
                res.redirect('/listagemCliente');
            });
    
    });

    app.get('/excluirCliente/:idCliente', (req, res)=>{
        let {idCliente} = req.params;
    
        const urlExcluirCliente = `http://localhost:3000/excluirCliente/${idCliente}`;
    
        axios.delete(urlExcluirCliente)
        .then((response)=>{
            res.redirect('/listagemCliente');
        }
        )
    });

});

    app.listen(3001, ()=>{
        console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
    });
