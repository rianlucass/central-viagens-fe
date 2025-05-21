// Máscara para CPF: 000.000.000-00
function mascaraCPF(valor) {
  return valor
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// Máscara para telefone: (00) 00000-0000
function mascaraTelefone(valor) {
  valor = valor.replace(/\D/g, '');
  return valor.length > 10 ?
    valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3') :
    valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
}

// Máscara para CEP: 00000-000
function mascaraCEP(valor) {
  return valor.replace(/\D/g, '').replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
}

// Aplicar máscaras
document.getElementById('cpf')?.addEventListener('input', (e) => {
  e.target.value = mascaraCPF(e.target.value);
});

document.getElementById('telefone')?.addEventListener('input', (e) => {
  e.target.value = mascaraTelefone(e.target.value);
});

document.getElementById('cep')?.addEventListener('input', (e) => {
  e.target.value = mascaraCEP(e.target.value);
});