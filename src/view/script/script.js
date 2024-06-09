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

    // Formatar a data para padrão BR
    function formatarDataParaBR(data) {
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
  }
  
    // Validação de CPF  
    document.addEventListener('DOMContentLoaded', function() {
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
        
  });
  

  
  
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
            event.preventDefault();

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

