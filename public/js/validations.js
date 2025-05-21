function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const toggleButton = field.nextElementSibling; // Pega o botão "Mostrar"
  
  if (field.type === "password") {
    field.type = "text";
    toggleButton.textContent = "Ocultar";
    toggleButton.setAttribute("aria-label", "Ocultar senha");
  } else {
    field.type = "password";
    toggleButton.textContent = "Mostrar";
    toggleButton.setAttribute("aria-label", "Mostrar senha");
  }
}

function validarIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade >= 18;
}

function mostrarErro(campoId, mensagem) {
  const campo = document.getElementById(campoId);
  const erro = document.getElementById(`${campoId}-error`);
  campo.classList.add('error');
  erro.textContent = mensagem;
  erro.style.display = 'block';
}

function limparErro(campoId) {
  const campo = document.getElementById(campoId);
  const erro = document.getElementById(`${campoId}-error`);
  campo.classList.remove('error');
  erro.style.display = 'none';
}

// Validação ao enviar o formulário
document.getElementById('formCadastroPassageiro')?.addEventListener('submit', (e) => {
  e.preventDefault();
  // ... (validações específicas)
});