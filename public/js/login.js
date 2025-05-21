document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formLogin');

  // Exibe mensagem de erro visual
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

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    removerErro(usernameInput);
    removerErro(passwordInput);

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    let temErro = false;

    if (!username) {
      mostrarErro(usernameInput, 'Informe o nome de usuário.');
      temErro = true;
    }

    if (!password) {
      mostrarErro(passwordInput, 'Informe a senha.');
      temErro = true;
    }

    if (temErro) return;

    const dados = { username, password };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      if (response.ok) {
        const result = await response.json();

        // Salva token e tipo de usuário
        localStorage.setItem('token', result.token);
        localStorage.setItem('tipoUsuario', result.userType); 

        // Redirecionamento com base no tipo
        if (result.userType === 'MOTORISTA') {
          window.location.href = '/dashboard';
        } else if (result.userType === 'PASSAGEIRO') {
          window.location.href = '/home';
        } else {
          alert('Tipo de usuário não reconhecido.');
        }
      } else {
        const error = await response.json();
        alert(error.message || 'Usuário ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro de conexão com o servidor.');
    }
  });
});
