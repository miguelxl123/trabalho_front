const estado = {
  pagina: document.body.dataset.page
};

function rolarParaOds9() {
  const secao = document.getElementById('ods9');
  if (secao) {
    secao.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function definirAbaAtiva(idAlvo) {
  const abas = document.querySelectorAll('.tab-btn');
  const paineis = document.querySelectorAll('.auth-panel');

  abas.forEach((aba) => {
    const ativa = aba.dataset.target === idAlvo;
    aba.classList.toggle('active', ativa);
  });

  paineis.forEach((painel) => {
    const ativa = painel.id === `${idAlvo}Panel`;
    painel.classList.toggle('active', ativa);
  });
}

function obterUsuarioSalvo() {
  const usuarioSalvo = localStorage.getItem('inovaUsuario');
  return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

function salvarUsuario(usuario) {
  localStorage.setItem('inovaUsuario', JSON.stringify(usuario));
}

function lidarComCadastro(evento) {
  evento.preventDefault();

  const nome = document.getElementById('nomeUsuario').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const senha = document.getElementById('registerSenha').value;
  const confirmar = document.getElementById('confirmarSenha').value;

  if (!nome || !email || !senha || !confirmar) {
    alert('Preencha todos os campos do cadastro.');
    return;
  }

  if (senha.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  if (senha !== confirmar) {
    alert('As senhas informadas não conferem.');
    return;
  }

  const usuario = { nome, email, senha };
  salvarUsuario(usuario);

  alert('Cadastro realizado com sucesso!');
  evento.target.reset();
  definirAbaAtiva('loginForm');
}

function lidarComLogin(evento) {
  evento.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const usuario = obterUsuarioSalvo();

  if (!email || !senha) {
    alert('Informe e-mail e senha para continuar.');
    return;
  }

  if (!usuario) {
    alert('Nenhum usuário cadastrado. Crie uma conta primeiro.');
    return;
  }

  if (usuario.email === email && usuario.senha === senha) {
    alert('Login realizado com sucesso!');
    window.location.href = 'index.html';
    return;
  }

  alert('E-mail ou senha incorretos.');
}

function conectarInteracoesInicio() {
  const botao = document.getElementById('btnConheca');
  if (botao) {
    botao.addEventListener('click', function (evento) {
      evento.preventDefault();
      rolarParaOds9();
    });
  }
}

function conectarInteracoesAutenticacao() {
  const abas = document.querySelectorAll('.tab-btn');
  abas.forEach((aba) => {
    aba.addEventListener('click', () => definirAbaAtiva(aba.dataset.target));
  });

  document.querySelector('.switch-form')?.addEventListener('click', function (evento) {
    evento.preventDefault();
    definirAbaAtiva('registerForm');
  });

  const formularioLogin = document.getElementById('loginForm');
  const formularioCadastro = document.getElementById('registerForm');

  if (formularioLogin) {
    formularioLogin.addEventListener('submit', lidarComLogin);
  }

  if (formularioCadastro) {
    formularioCadastro.addEventListener('submit', lidarComCadastro);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (estado.pagina === 'home') {
    conectarInteracoesInicio();
  }

  if (estado.pagina === 'login') {
    conectarInteracoesAutenticacao();
  }
});
