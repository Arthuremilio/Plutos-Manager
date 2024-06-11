    // Formatar a data para padrão BR
    function formatarDataParaBR(data) {
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
  }
  
    // Validação de CPF  
    document.addEventListener('DOMContentLoaded', function() {
        const pathname = window.location.pathname;
        if (pathname.includes('create-account') || pathname.includes('registerCustomer')) {        
            console.log("DOM totalmente carregado e analisado");
  
            function validarCPF(cpf) {
                cpf = cpf.replace(/[^\d]/g, '');
                console.log("CPF formatado:", cpf);
        
                if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
                    console.log("CPF inválido: tamanho errado ou sequência de dígitos repetidos");
                    return false;
                }
        
                let soma = 0;
                for (let i = 0; i < 9; i++) {
                    soma += parseInt(cpf.charAt(i)) * (10 - i);
                }
        
                let resto = 11 - (soma % 11);
                let digitoVerificador = resto === 10 || resto === 11 ? 0 : resto;
        
                if (digitoVerificador !== parseInt(cpf.charAt(9))) {
                    console.log("Primeiro dígito verificador inválido");
                    return false;
                }
        
                soma = 0;
                for (let i = 0; i < 10; i++) {
                    soma += parseInt(cpf.charAt(i)) * (11 - i);
                }
        
                resto = 11 - (soma % 11);
                digitoVerificador = resto === 10 || resto === 11 ? 0 : resto;
        
                if (digitoVerificador !== parseInt(cpf.charAt(10))) {
                    console.log("Segundo dígito verificador inválido");
                    return false;
                }

                return true;
            }
        
            function validarCampoCPF() {
                let campoCPF = document.getElementById('documento');
                let hint = document.getElementById('cpf-hint');
                if (!campoCPF) {
                    console.log("Elemento campoCPF não encontrado");
                    return;
                }
        
                console.log("Elemento campoCPF encontrado:", campoCPF);
        
                campoCPF.addEventListener("change", function() {
                    let cpf = campoCPF.value;
                    console.log("Validando CPF:", cpf);
        
                    if (validarCPF(cpf)) {
                        campoCPF.setCustomValidity('CPF válido');
                        campoCPF.style.borderColor = 'green';
                        campoCPF.style.backgroundColor = 'green';
                        hint.innerHTML  = 'CPF válido <i class="fas fa-check-circle fa-lg"></i>';
                        hint.style.color = 'green';
                    } else {
                        campoCPF.setCustomValidity('CPF inválido');
                        campoCPF.style.borderColor = 'red';
                        campoCPF.style.backgroundColor = 'red';
                        hint.innerHTML  = 'CPF inválido <i class="fas fa-times-circle fa-lg"></i>';
                        hint.style.color = 'red';
                    }
                });
            }
        
            validarCampoCPF();
        }       
    });

//Salvar usuário logado
    function salvarUsuarioSenhaNoLocalStorage(usuario, senha) {
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('senha', senha);
        console.log("Usuário e senha armazenados em localStorage");
    }

// CONSUMINDO AS APIS DO BACKEND
//cadastrar usuário 
    document.addEventListener('DOMContentLoaded', function () {
        const pathname = window.location.pathname;
        if (pathname.includes('create-account')) {
            const forms = document.querySelectorAll('.create-account-form');

            forms.forEach(function(form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    const usuario = document.getElementById('usuario').value
                    const senha = document.getElementById('senha').value;
                    const repetirSenha = document.getElementById('repetirSenha').value;
                    const dataAtual = new Date();
                    const vencimento = new Date(dataAtual.setMonth(dataAtual.getMonth() + 1)).toISOString().split('T')[0];
                    const hint = document.getElementById('cpf-hint');

                    if (senha !== repetirSenha) {
                        alert('As senhas não coincidem!');
                        return;
                    }

                    if (hint.style.color === 'red') {
                        alert('CPF informado é inválido!');
                        return;
                    }

                    const data = {
                        loginUsuario: usuario,
                        nomeUsuario: document.getElementById('nome').value,
                        senha: senha,
                        email: document.getElementById('email').value,
                        cpf: document.getElementById('documento').value,
                        cep: document.getElementById('cep').value,
                        rua: document.getElementById('rua').value,
                        bairro: document.getElementById('bairro').value,
                        numeroResidencia: document.getElementById('numero').value,
                        telefone: document.getElementById('telefone').value,                
                        cidade: document.getElementById('cidade').value,
                        pais: document.getElementById('pais').value,
                        estado: document.getElementById('estado').value,
                        dataNascimento: formatarDataParaBR(document.getElementById('dataNascimento').value),         
                        vencimento: formatarDataParaBR(vencimento)                                                                 
                    };
                    console.log(JSON.stringify(data));
                    fetch('http://localhost:8080/api/usuarios', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data.loginUsuario);
                        alert('Usuário criado com sucesso!');
                        form.reset();

                        salvarUsuarioSenhaNoLocalStorage(usuario, senha);
                        window.location.href = 'home.html';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('Erro ao criar usuário.');
                    });
                });
            });
    }});

    //cadastro de pessoas
    document.addEventListener('DOMContentLoaded', function () {
        const pathname = window.location.pathname;
    
        if (pathname.includes('registerCustomer')) {
    
            const forms = document.querySelectorAll('.register-customer-form');
    
            forms.forEach(function(form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
    
                    const data = {
                        nome: document.getElementById('nome').value,
                        cpf: document.getElementById('documento').value,
                        email: document.getElementById('email').value,
                        telefone: document.getElementById('telefone').value,
                        saldoDisponivel: parseFloat(document.getElementById('saldo').value),
                        cep: document.getElementById('cep').value,
                        rua: document.getElementById('rua').value,
                        bairro: document.getElementById('bairro').value,
                        numeroResidencia: document.getElementById('numero').value,
                        cidade: document.getElementById('cidade').value,
                        estado: document.getElementById('estado').value,
                        pais: document.getElementById('pais').value,
                        usuario: {
                            usuarioId: "915B6BE9-2B0E-400E-A1F6-5A912CFD26F7"
                        }
                    };
    
                    console.log(JSON.stringify(data));
    
                    fetch('http://localhost:8080/api/pessoas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        alert('Cliente cadastrado com sucesso!');
                        forms.forEach(form => form.reset());
    
                        salvarUsuarioSenhaNoLocalStorage('usuario', 'senha');
                        window.location.href = 'customers.html';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('Erro ao cadastrar cliente.');
                    });
                });
            });
        };
    });

    // Cadastro de categoria
    document.addEventListener('DOMContentLoaded', function () {
        const pathname = window.location.pathname;
        
        if (pathname.includes('registerCategory')) {
            console.log('Entrou no método');
            const forms = document.querySelectorAll('.register-category-form');
            console.log('Formulários encontrados:', forms.length);
    
            forms.forEach(function(form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
    
                    const data = {
                        nome: "Nova categoria",
                        descricao: document.getElementById('name').value,
                        usuario: {
                            usuarioId: "915B6BE9-2B0E-400E-A1F6-5A912CFD26F7"
                        }
                    };
    
                    console.log(JSON.stringify(data));
    
                    fetch('http://localhost:8080/api/categoria', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        alert('Categoria cadastrada com sucesso!');
                        forms.forEach(form => form.reset());
                        window.location.href = 'category.html';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('Erro ao cadastrar categoria.');
                    });
                });
            });
        }
    });

    //Listar Clientes
    document.addEventListener('DOMContentLoaded', function () {
        const pathname = window.location.pathname;
        
        if (pathname.includes('customers.html')) {
            console.log('Entrou no método de categorias');
    
            fetch('http://localhost:8080/api/pessoas')
            .then(response => response.json())
            .then(data => {
                console.log('Clientes obtidos:', data);
    
                const tableBody = document.querySelector('#reservationsTable tbody');
                tableBody.innerHTML = '';  // Limpa o conteúdo existente da tabela
                data.forEach(function(pessoa) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="reservationCheckbox"><input type="checkbox" class="checkbox"></td>
                        <td>${pessoa.pessoaId}</td>
                        <td>${pessoa.nome}</td>
                        <td>${pessoa.email}</td>
                        <td>${pessoa.telefone}</td>
                        <td>${pessoa.saldoDisponivel.toFixed(2)}</td>
                        <td class="editButton"><button class="editButton"><i class="fa-solid fa-pencil"></i></button></td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao obter clientes:', error));
        }
    });
    

    //Listar categorias
    document.addEventListener('DOMContentLoaded', function () {
        const pathname = window.location.pathname;
        
        if (pathname.includes('category.html')) {
            console.log('Entrou no método de categorias');
    
            fetch('http://localhost:8080/api/categoria')
            .then(response => response.json())
            .then(data => {
                console.log('Categorias obtidas:', data);
    
                const tableBody = document.querySelector('#reservationsTable tbody');
                data.forEach(function(categoria) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="reservationCheckbox"><input type="checkbox" class="checkbox"></td>
                        <td>${categoria.categoriaId}</td>
                        <td>${categoria.descricao}</td>
                        <td class="editButton"><button class="editButton"><i class="fa-solid fa-pencil"></i></button></td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao obter categorias:', error));
        }
    });
    
    
    // Exibir o usuário
    window.onload = function() {
        const usuarioLogado = document.getElementById('usuarioLogado');
        const pathname = window.location.pathname;
        const usuario = localStorage.getItem('usuario');
        if (pathname.includes('home')) {
            const saudacao = document.getElementById('saudacao');
            if (saudacao) {
                if (usuario) {
                    saudacao.innerHTML = 'Seja Bem-vindo ' + usuario + '!';
                } else {
                    console.log("Nenhum usuário encontrado no localStorage");
                }
            } 
        } 
        if (usuarioLogado) {
            if (usuario) {
                usuarioLogado.innerHTML = 'Olá, ' + usuario + '!';
            } else {
                console.log("Nenhum usuário encontrado no localStorage");
            }
        } 
    };
    // listar categorias no cadastro de produtos
    document.addEventListener('DOMContentLoaded', function() {
        const selectCategoria = document.getElementById('categoria');
    
        fetch('http://localhost:8080/api/categoria')
        .then(response => response.json())
        .then(data => {
            data.forEach(function(categoria) {
                const option = document.createElement('option');
                option.value = categoria.categoriaId;
                option.textContent = categoria.descricao;
                selectCategoria.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao obter categorias:', error));
    });
    
    // mudar a cor na grid para linhas selecionadas 
    document.addEventListener('DOMContentLoaded', function() {
        const reservationsTable = document.getElementById('reservationsTable');
        reservationsTable.addEventListener('change', function(event) {
            if (event.target.matches('.checkbox')) {
                var row = event.target.closest('tr');
                if (row) {
                    var button = row.querySelector('button.editButton')
                    if (event.target.checked) {
                        row.style.backgroundColor = 'darkred';
                        row.style.color = 'white';
                        if (button) {
                            button.style.backgroundColor = 'darkred';
                        }
                    } else {
                        row.style.backgroundColor = '';
                        row.style.color = '';
                        if (button) {
                            button.style.backgroundColor = '';
                        }
                    }
                }
            }
        });
    });
    
