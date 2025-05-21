document.addEventListener('DOMContentLoaded', function () {
  // Máscaras
  function mascaraCPF(valor) {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function mascaraTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 10) {
      return valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      return valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    }
  }

  function mascaraCEP(valor) {
    return valor.replace(/\D/g, '').replace(/(\d{5})(\d{1,3})$/, '$1-$2');
  }

  // Aplica máscaras
  document.getElementById('cpf').addEventListener('input', function (e) {
    e.target.value = mascaraCPF(e.target.value);
  });

  document.getElementById('telefone').addEventListener('input', function (e) {
    e.target.value = mascaraTelefone(e.target.value);
  });

  document.getElementById('cep').addEventListener('input', function (e) {
    e.target.value = mascaraCEP(e.target.value);
  });

  // Cria campo de erro abaixo dos inputs
  function mostrarErro(input, mensagem) {
    removerErro(input);

    const erro = document.createElement('small');
    erro.classList.add('erro');
    erro.style.color = 'red';
    erro.style.fontSize = '0.75rem';
    erro.textContent = mensagem;
    input.insertAdjacentElement('afterend', erro);
  }

  function removerErro(input) {
    const proximo = input.nextElementSibling;
    if (proximo && proximo.classList.contains('erro')) {
      proximo.remove();
    }
  }

  // Manipula envio do formulário
  document
    .getElementById('formCadastroPassageiro')
    .addEventListener('submit', async function (event) {
      event.preventDefault();

      let temErro = false;

      // Campos
      const senha = document.getElementById('senha');
      const confirmarSenha = document.getElementById('confirmarSenha');
      const email = document.getElementById('email');
      const cpf = document.getElementById('cpf');
      const cep = document.getElementById('cep');

      // Limpa erros antigos
      [senha, confirmarSenha, email, cpf, cep].forEach(removerErro);

      // Validações
      if (senha.value.length < 6) {
        mostrarErro(senha, 'A senha deve ter pelo menos 6 caracteres.');
        temErro = true;
      }

      if (senha.value !== confirmarSenha.value) {
        mostrarErro(confirmarSenha, 'As senhas não coincidem.');
        temErro = true;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        mostrarErro(email, 'Email inválido.');
        temErro = true;
      }

      if (cpf.value.replace(/\D/g, '').length !== 11) {
        mostrarErro(cpf, 'CPF deve conter 11 números.');
        temErro = true;
      }

      if (cep.value.replace(/\D/g, '').length !== 8) {
        mostrarErro(cep, 'CEP deve conter 8 números.');
        temErro = true;
      }

      if (temErro) return;

      // Dados sem máscaras
      const cpfLimpo = cpf.value.replace(/\D/g, '');
      const telefone = document.getElementById('telefone').value.replace(/\D/g, '');
      const cepLimpo = cep.value.replace(/\D/g, '');

      const dados = {
        usuario: {
          username: document.getElementById('username').value,
          email: email.value,
          password: senha.value
        },
        passageiro: {},
        dadosPessoais: {
          nome: document.getElementById('nome').value,
          dataNascimento: converterParaISO(document.getElementById('dataNascimento').value),
          cpf: cpfLimpo,
          telefone: telefone
        },
        endereco: {
          estado: document.getElementById('estado').value,
          cidade: document.getElementById('cidade').value,
          cep: cepLimpo,
          rua: document.getElementById('rua').value,
          bairro: document.getElementById('bairro').value,
          complemento: document.getElementById('complemento').value,
          numero: document.getElementById('numero').value
        }
      };

      try {
        const response = await fetch('http://localhost:8080/cadastro-passageiro/passageiro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dados)
        });

        if (response.ok) {
          const result = await response.json();
          alert('Cadastro realizado com sucesso!');
          window.location.href = '/login';
        } else {
          const error = await response.json();
          alert(`Erro no cadastro: ${error.message || 'Erro desconhecido'}`);
        }
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    });

    function mascaraData(valor) {
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})\d+?$/, '$1');
        }
    
    document.getElementById('dataNascimento').addEventListener('input', function(e) {
        e.target.value = mascaraData(e.target.value);
    });

    function converterParaISO(data) {
    const partes = data.split('/');
    if (partes.length !== 3) return '';
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
});
