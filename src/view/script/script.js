document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    const closeMenuButton = document.querySelector('.close-menu');
    const checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        var row = this.closest('tr');
        var button = row.querySelector('button.editButton')
        if (this.checked) {
          row.style.backgroundColor = 'darkred';
          row.style.color = 'white';
          button.style.backgroundColor = 'darkred'
        } else {
          row.style.backgroundColor = '';
          row.style.color = '';
          button.style.backgroundColor = '';
        }
      });
    })});
    function formatarDataParaBR(data) {
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
  }
  
    // hamburgerMenu.addEventListener('click', function() {
    //   menu.classList.toggle('open'); 
    //   overlay.style.display = menu.classList.contains('open') ? 'block' : 'none'; 
    // });
  
    // overlay.addEventListener('click', function() {
    //   menu.classList.remove('open'); 
    //   overlay.style.display = 'none';
    // });
  
  //   closeMenuButton.addEventListener('click', function() {
  //     menu.classList.remove('open'); 
  //     overlay.style.display = 'none';
  //   });
  // });

  // CONSUMINDO AS APIS DO BACKEND

  //cadastrar usuário 
  document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.create-account-form');

    forms.forEach(function(form) {
        form.addEventListener('submit', function (event) {
            console.log("Evento de envio acionado!");
            event.preventDefault();

            const senha = document.getElementById('senha').value;
            const repetirSenha = document.getElementById('repetirSenha').value;
            const dataAtual = new Date();
            const vencimento = new Date(dataAtual.setMonth(dataAtual.getMonth() + 1)).toISOString().split('T')[0];

            if (senha !== repetirSenha) {
                alert('As senhas não coincidem.');
                return;
            }

            const data = {
                loginUsuario: document.getElementById('usuario').value,
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
                console.log('Success:', data.usuario);
                alert('Usuário criado com sucesso!');
                form.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao criar usuário.');
            });
        });
    });
  
    //cadastrar pessoa
    
});

