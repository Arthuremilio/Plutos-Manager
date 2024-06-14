// Método de login
document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;
            
    if (pathname.includes('acess.html')) {
        const loginForm = document.getElementById('loginForm');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const loginUsuario = document.getElementById('usuario').value;
            const senha = document.getElementById('senha').value;

            console.log('Enviando dados:', { loginUsuario, senha });

            fetch('http://localhost:8080/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loginUsuario: loginUsuario,
                    senha: senha
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta recebida:', data);

                if (data) {
                    localStorage.setItem('usuario', loginUsuario);
                    localStorage.setItem('senha', senha);
                    localStorage.setItem('id', data);
                    window.location.href = 'home.html';
                } else {
                    console.error('usuário não encontrado na resposta');
                    document.getElementById('error-message').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                document.getElementById('error-message').style.display = 'block';
            });
        });
    };
});
    
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
    
        if (pathname.includes('registerCustomer.html')) {
    
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
                            usuarioId: localStorage.getItem('id')
                        }
                    };
    
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
            const forms = document.querySelectorAll('.register-category-form');
    
            forms.forEach(function(form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
    
                    const data = {
                        nome: "Nova categoria",
                        descricao: document.getElementById('nome').value,
                        usuario: {
                            usuarioId: localStorage.getItem('id')
                        }
                    };
    
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
                        alert('Categoria alterada com sucesso!');
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

    // Cadastro de produto
    document.addEventListener('DOMContentLoaded', function () {
        const pathname = window.location.pathname;
        
        if (pathname.includes('registerProducts.html')) {
            const forms = document.querySelectorAll('.register-product-form');
    
            forms.forEach(function(form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
    
                    const data = {
                        descricao: document.getElementById('nome').value,
                        preco: parseFloat(document.getElementById('preco').value),  
                        custo: parseFloat(document.getElementById('custo').value),  
                        usuario: {
                            usuarioId: localStorage.getItem('id')
                        },
                        categoria: {
                            categoriaId: document.getElementById('categoria').value
                        }
                    };
    
                    fetch('http://localhost:8080/api/produto', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        alert('Produto cadastrado com sucesso!');
                        forms.forEach(form => form.reset());
                        window.location.href = 'products.html';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('Erro ao cadastrar produto.');
                    });
                });
            });
        }
    });

    //Listar Clientes
    document.addEventListener('DOMContentLoaded', function () {
        const pathname = window.location.pathname;
        
        if (pathname.includes('customers.html')) {
            console.log('Entrou no método')
            fetch('http://localhost:8080/api/pessoas')
            .then(response => response.json())
            .then(data => {
    
                const tableBody = document.querySelector('#reservationsTable tbody');
                tableBody.innerHTML = '';  
                data.forEach(function(pessoa) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="reservationCheckbox"><input type="checkbox" class="checkbox"></td>
                        <td class="customer-id">${pessoa.pessoaId}</td>
                        <td>${pessoa.nome}</td>
                        <td>${pessoa.email}</td>
                        <td>${pessoa.telefone}</td>
                        <td>${pessoa.saldoDisponivel.toFixed(2)}</td>
                        <td class="editButton"><button id="editButton"><i class="fa-solid fa-pencil"></i></button></td>
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
            fetch('http://localhost:8080/api/categoria')
            .then(response => response.json())
            .then(data => {
    
                const tableBody = document.querySelector('#reservationsTable tbody');
                data.forEach(function(categoria) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                            <td class="reservationCheckbox"><input type="checkbox" class="checkbox"></td>
                            <td class="categoria-id">${categoria.categoriaId}</td>
                            <td class="categoria-descricao">${categoria.descricao}</td>
                            <td class="editButton"><button id="editButton"><i class="fa-solid fa-pencil"></i></button></td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao obter categorias:', error));
        }
    });

        //Listar produtos
        document.addEventListener('DOMContentLoaded', function () {
            const pathname = window.location.pathname;
            
            if (pathname.includes('products.html')) {
        
                fetch('http://localhost:8080/api/produto')
                .then(response => response.json())
                .then(data => {
        
                    const tableBody = document.querySelector('#reservationsTable tbody');
                    data.forEach(function(produto) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td class="reservationCheckbox"><input type="checkbox" class="checkbox"></td>
                        <td class="produto-id">${produto.produtoId}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.custo}</td>
                        <td>${produto.preco}</td>
                        <td class="editButton"><button id="editButton"><i class="fa-solid fa-pencil"></i></button></td>
                        `;
                        tableBody.appendChild(row);
                    });
                })
                .catch(error => console.error('Erro ao obter categorias:', error));
            }
        });
    
    //Deletar categoria
    document.addEventListener('DOMContentLoaded', (event) => {
        const pathname = window.location.pathname;
            
            if (pathname.includes('category.html')) {
                document.getElementById('btnDelete').addEventListener('click', () => {
                    const table = document.getElementById('reservationsTable');
                    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                    const idsToDelete = [];
                    const promises = [];
            
                    for (let i = 0; i < rows.length; i++) {
                        const checkbox = rows[i].getElementsByTagName('input')[0];
                        if (checkbox && checkbox.checked) {
                            const id = rows[i].getElementsByTagName('td')[1].innerText;
                            idsToDelete.push(id);
                        }
                    }
            
                    idsToDelete.forEach(id => {
                        const deletePromise = fetch(`http://localhost:8080/api/categoria/${id}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                console.log(`Categoria com id ${id} deletada com sucesso.`);
                            } else {
                                console.error(`Falha ao deletar categoria com id: ${id}`);
                            }
                        })
                        .catch(error => console.error('Erro:', error));
            
                        promises.push(deletePromise);
                    });

                    Promise.all(promises).then(() => {
                        window.location.reload();
                    });
                });
            };
    });

    // Deletar clientes
    document.addEventListener('DOMContentLoaded', (event) => {
        const pathname = window.location.pathname;
    
        if (pathname.includes('customers.html')) {
            const btnDelete = document.getElementById('btnDelete');
            if (btnDelete) {
                btnDelete.addEventListener('click', () => {
                    const table = document.getElementById('reservationsTable');
                    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                    const idsToDelete = [];
                    const promises = [];
    
                    for (let i = 0; i < rows.length; i++) {
                        const checkbox = rows[i].getElementsByTagName('input')[0];
                        if (checkbox && checkbox.checked) {
                            const id = rows[i].getElementsByTagName('td')[1].innerText.trim();
                            idsToDelete.push(id);
                        }
                    }
    
                    idsToDelete.forEach(id => {
                        const deletePromise = fetch(`http://localhost:8080/api/pessoas/${id}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.status = 204) {
                                console.log(`Pessoa com id ${id} deletada com sucesso.`);
                            } else {
                                console.error(`Falha ao deletar pessoa com id: ${id}`, response.status);
                            }
                        })
                        .catch(error => console.error('Erro:', error));
    
                        promises.push(deletePromise);
                    });
    
                    Promise.all(promises).then(() => {
                        console.log('Todos os itens foram deletados, recarregando a página.');
                        window.location.reload();
                    });
                });
            };
        };
    });

    //Deletar produtos
    document.addEventListener('DOMContentLoaded', (event) => {
        const pathname = window.location.pathname;
    
        if (pathname.includes('products.html')) {
            const btnDelete = document.getElementById('btnDelete');

            btnDelete.addEventListener('click', () => {
                const table = document.getElementById('reservationsTable');
                const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                const idsToDelete = [];
                const promises = [];

                for (let i = 0; i < rows.length; i++) {
                    const checkbox = rows[i].getElementsByTagName('input')[0];
                    if (checkbox && checkbox.checked) {
                        const id = rows[i].getElementsByTagName('td')[1].innerText.trim();
                        idsToDelete.push(id);
                    }
                }

                console.log('elementos selecionados:', idsToDelete);

                idsToDelete.forEach(id => {
                    const deletePromise = fetch(`http://localhost:8080/api/produto/${id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.status = 204) {
                            console.log(`Produto com id ${id} deletada com sucesso.`);
                        } else {
                            console.error(`Falha ao deletar o produto com id: ${id}`, response.status);
                        }
                    })
                    .catch(error => console.error('Erro:', error));

                    promises.push(deletePromise);
                });

                Promise.all(promises).then(() => {
                    console.log('Todos os itens foram deletados, recarregando a página.');
                    window.location.reload();
                });
            });
        };
    });

// Preencher e alterar categoria   
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    if (pathname.includes('category.html')) {
        const table = document.getElementById('reservationsTable');

        table.addEventListener('click', (event) => {
            if (event.target.closest('#editButton')) {
                console.log('Acionou o evento click');
                const row = event.target.closest('tr');
                const categoryId = row.querySelector('.categoria-id').textContent.trim();
                console.log(row)
                // Fazer a requisição GET para obter os dados da categoria
                fetch(`http://localhost:8080/api/categoria/${categoryId}`)
                   .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao buscar dados da categoria.');
                        }
                        return response.json();
                    })
                   .then(data => {
                        // Armazenar os dados da categoria no localStorage
                        localStorage.setItem('idCategoria', data.categoriaId);
                        localStorage.setItem('descricaoCategoria', data.descricao);

                        // Redirecionar para a página de edição
                        window.location.href = 'category-alter.html';
                    })
                   .catch(error => {
                        console.error('Erro ao buscar dados da categoria:', error);
                        alert('Erro ao buscar dados da categoria. Verifique o console para mais detalhes.');
                    });
            }
        });
    }

    if (pathname.includes('category-alter.html')) {
        const idCategoria = localStorage.getItem('idCategoria');
        const descricaoCategoria = localStorage.getItem('descricaoCategoria');

        if (idCategoria && descricaoCategoria) {
            document.getElementById('idItem').textContent = `ID: ${idCategoria}`;
            document.getElementById('nome').value = descricaoCategoria;

        } 
        const forms = document.querySelectorAll('.register-category-form');
    
            forms.forEach(function(form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
    
                    const data = {
                        categoriaId: idCategoria,    
                        nome: "Nova categoria",
                        descricao: document.getElementById('nome').value,
                        usuario: {
                            usuarioId: localStorage.getItem('id')
                        }
                    };
    
                    fetch(`http://localhost:8080/api/categoria/${idCategoria}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        alert('Categoria alterada com sucesso!');
                        forms.forEach(form => form.reset());
                        localStorage.removeItem('idCategoria');
                        localStorage.removeItem('descricaoCategoria');
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

// Preencher e alterar pessoa   
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    if (pathname.includes('customers.html')) {
        const table = document.getElementById('reservationsTable');

        table.addEventListener('click', (event) => {
            if (event.target.closest('#editButton')) {
                console.log('Acionou o evento click');
                const row = event.target.closest('tr');
                const pessoaId = row.querySelector('.customer-id').textContent.trim();
                console.log(row)
                // Fazer a requisição GET para obter os dados da pessoa
                fetch(`http://localhost:8080/api/pessoas/${pessoaId}`)
                   .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao buscar dados da pessoa.');
                        }
                        return response.json();
                    })
                   .then(data => {
                        localStorage.setItem('pessoaId', data.pessoaId);
                        localStorage.setItem('nome', data.nome);
                        localStorage.setItem('cpf', data.cpf);
                        localStorage.setItem('email', data.email);
                        localStorage.setItem('telefone', data.telefone);
                        localStorage.setItem('saldoDisponivel', data.saldoDisponivel);
                        localStorage.setItem('cep', data.cep);
                        localStorage.setItem('rua', data.rua);
                        localStorage.setItem('bairro', data.bairro);
                        localStorage.setItem('numeroResidencia', data.numeroResidencia);
                        localStorage.setItem('cidade', data.cidade);
                        localStorage.setItem('estado', data.estado);
                        localStorage.setItem('pais', data.pais);

                        // Redirecionar para a página de edição
                        window.location.href = 'customer-alter.html';
                    })
                   .catch(error => {
                        console.error('Erro ao buscar dados da categoria:', error);
                        alert('Erro ao buscar dados da categoria. Verifique o console para mais detalhes.');
                    });
            }
        });
    }

    if (pathname.includes('customer-alter.html')) {
        const pessoaId = localStorage.getItem('pessoaId');
        const nome = localStorage.getItem('nome');
        const cpf = localStorage.getItem('cpf');
        const email = localStorage.getItem('email');
        const telefone = localStorage.getItem('telefone');
        const saldoDisponivel = localStorage.getItem('saldoDisponivel');
        const cep = localStorage.getItem('cep');
        const rua = localStorage.getItem('rua');
        const bairro = localStorage.getItem('bairro');
        const numeroResidencia = localStorage.getItem('numeroResidencia');
        const cidade = localStorage.getItem('cidade');
        const estado = localStorage.getItem('estado');
        const pais = localStorage.getItem('pais');

        if (pessoaId && pais) {
            document.getElementById('idItem').textContent = `ID: ${pessoaId}`;
            document.getElementById('nome').value = nome;
            document.getElementById('documento').value = cpf;
            document.getElementById('email').value = email;
            document.getElementById('telefone').value = telefone;
            document.getElementById('saldo').value = saldoDisponivel;
            document.getElementById('cep').value = cep;
            document.getElementById('rua').value = rua;
            document.getElementById('bairro').value = bairro;
            document.getElementById('numero').value = numeroResidencia;
            document.getElementById('cidade').value = cidade;
            document.getElementById('estado').value = estado;
            document.getElementById('pais').value = pais;
        } 
        const forms = document.querySelectorAll('.register-customer-form');
    
        forms.forEach(function(form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                const data = {
                    pessoaId: pessoaId,
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
                        usuarioId: localStorage.getItem('id')
                    }
                };

                fetch(`http://localhost:8080/api/pessoas/${pessoaId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert('Cliente cadastrado com sucesso!');
                    localStorage.removeItem('pessoaId');
                    localStorage.removeItem('nome');
                    localStorage.removeItem('cpf');
                    localStorage.removeItem('email');
                    localStorage.removeItem('telefone');
                    localStorage.removeItem('saldoDisponivel');
                    localStorage.removeItem('cep');
                    localStorage.removeItem('rua');
                    localStorage.removeItem('bairro');
                    localStorage.removeItem('numeroResidencia');
                    localStorage.removeItem('cidade');
                    localStorage.removeItem('estado');
                    localStorage.removeItem('pais');
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
    }
});

// Preencher e alterar produtos   
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    if (pathname.includes('products.html')) {
        const table = document.getElementById('reservationsTable');

        table.addEventListener('click', (event) => {
            if (event.target.closest('#editButton')) {
                console.log('Acionou o evento click');
                const row = event.target.closest('tr');
                const produtoId = row.querySelector('.produto-id').textContent.trim();
                console.log(row);
                // Fazer a requisição GET para obter os dados do produto
                fetch(`http://localhost:8080/api/produto/${produtoId}`)
                   .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao buscar dados do produto.');
                        }
                        return response.json();
                    })
                   .then(data => {
                        localStorage.setItem('produtoId', data.produtoId);
                        localStorage.setItem('descricao', data.descricao);
                        localStorage.setItem('custo', data.custo);
                        localStorage.setItem('preco', data.preco);
                        localStorage.setItem('categoriaId', data.categoria.categoriaId);

                        // Redirecionar para a página de edição
                        window.location.href = 'product-alter.html';
                    })
                   .catch(error => {
                        console.error('Erro ao buscar dados do produto:', error);
                        alert('Erro ao buscar dados do produto. Verifique o console para mais detalhes.');
                    });
            }
        });
    }

    if (pathname.includes('product-alter.html')) {
        const produtoId = localStorage.getItem('produtoId');
        const descricao = localStorage.getItem('descricao');
        const custo = localStorage.getItem('custo');
        const preco = localStorage.getItem('preco');
        const categoriaId = localStorage.getItem('categoriaId')
        const selectCategoria = document.getElementById('categoria');
            
        fetch('http://localhost:8080/api/categoria')
        .then(response => response.json())
        .then(data => {
            data.forEach(function(categoria) {
                const option = document.createElement('option');
                option.value = categoria.categoriaId;
                option.textContent = categoria.descricao;
                selectCategoria.appendChild(option);
                selectCategoria.value = categoriaId;
            });
        });

        if (produtoId && descricao) {
            document.getElementById('idItem').textContent = `ID: ${produtoId}`;
            document.getElementById('nome').value = descricao;
            document.getElementById('custo').value = custo;
            document.getElementById('preco').value = preco;
            
        } 
        const form = document.querySelector('.register-product-form');
        
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const produtoId = localStorage.getItem('produtoId');
            const data = {
                produtoId: produtoId,
                descricao: document.getElementById('nome').value,
                preco: parseFloat(document.getElementById('preco').value),  
                custo: parseFloat(document.getElementById('custo').value),  
                usuario: {
                    usuarioId: localStorage.getItem('id')
                },
                categoria: {
                    categoriaId: document.getElementById('categoria').value
                }
            };

            fetch(`http://localhost:8080/api/produto/${produtoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar produto.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Produto atualizado com sucesso!');
                localStorage.removeItem('produtoId');
                localStorage.removeItem('descricao');
                localStorage.removeItem('custo');
                localStorage.removeItem('preco');
                localStorage.removeItem('categoriaId');
                form.reset();
                window.location.href = 'products.html';

            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao atualizar produto.');
            });
        });
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
        const pathname = window.location.pathname;
        
        if (pathname.includes('registerProducts.html')) {
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
        };
    });
    
    // mudar a cor na grid para linhas selecionadas 
    document.addEventListener('DOMContentLoaded', function() {
        const pathname = window.location.pathname;
        
        if (pathname.includes('registerProducts.html') || pathname.includes('registerCustomer.html') || pathname.includes('category.html')) {
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
        }
    });
    
