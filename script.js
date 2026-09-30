const projetos = [
  {
    titulo: 'Sistema de Gestão para Pequenos Negócios',
    descricao: 'Ferramenta para auxiliar pequenos empreendedores no controle de vendas, estoque e clientes.',
    categoria: 'Gestão'
  },
  {
    titulo: 'Monitoramento de Infraestrutura',
    descricao: 'Sistema para registrar problemas relacionados à infraestrutura de escolas, comunidades e espaços públicos.',
    categoria: 'Infraestrutura'
  },
  {
    titulo: 'Inclusão Digital',
    descricao: 'Materiais e informações para ajudar pessoas a desenvolver conhecimentos básicos de tecnologia.',
    categoria: 'Educação'
  }
];

const estado = {
  page: document.body.dataset.page
};

function scrollToObjetivos() {
  const section = document.getElementById('objetivos');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderCards() {
  const container = document.getElementById('solucoesGrid');
  if (!container) return;

  container.innerHTML = projetos
    .map(
      (item) => `
        <article class="solution-card">
          <span class="tag">${item.categoria}</span>
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          <a href="login.html" class="btn btn-primary">Ver solução</a>
        </article>
      `
    )
    .join('');
}

function readIdeas() {
  const savedIdeas = JSON.parse(localStorage.getItem('inovaIdeias') || '[]');
  return Array.isArray(savedIdeas) ? savedIdeas : [];
}

function renderIdeas() {
  const list = document.getElementById('ideiasList');
  if (!list) return;

  const ideias = readIdeas();

  if (!ideias.length) {
    list.innerHTML = '<div class="empty-state">Nenhuma ideia foi enviada ainda. Seja o primeiro a compartilhar uma proposta inovadora.</div>';
    return;
  }

  list.innerHTML = ideias
    .map(
      (ideia) => `
        <article class="idea-item">
          <strong>${ideia.titulo}</strong>
          <small>${ideia.nome} • ${ideia.categoria}</small>
          <p>${ideia.descricao}</p>
          <span class="tag-mini">${ideia.categoria}</span>
        </article>
      `
    )
    .join('');
}

function handleIdeaSubmit(event) {
  event.preventDefault();

  const nome = document.getElementById('nomeIdeia')?.value.trim();
  const titulo = document.getElementById('tituloIdeia')?.value.trim();
  const categoria = document.getElementById('categoriaIdeia')?.value;
  const descricao = document.getElementById('descricaoIdeia')?.value.trim();

  if (!nome || !titulo || !descricao) {
    alert('Preencha todos os campos antes de enviar sua ideia.');
    return;
  }

  const ideias = readIdeas();
  ideias.push({ nome, titulo, categoria, descricao });
  localStorage.setItem('inovaIdeias', JSON.stringify(ideias));

  event.target.reset();
  renderIdeas();
  alert('Ideia enviada com sucesso!');
}

function setActiveTab(targetId) {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.auth-panel');

  tabs.forEach((tab) => {
    const active = tab.dataset.target === targetId;
    tab.classList.toggle('active', active);
  });

  panels.forEach((panel) => {
    const active = panel.id === `${targetId}Panel`;
    panel.classList.toggle('active', active);
  });
}

function getStoredUser() {
  const user = localStorage.getItem('inovaUsuario');
  return user ? JSON.parse(user) : null;
}

function saveUser(user) {
  localStorage.setItem('inovaUsuario', JSON.stringify(user));
}

function handleRegister(event) {
  event.preventDefault();

  const nome = document.getElementById('nomeUsuario').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const senha = document.getElementById('registerSenha').value;
  const confirmar = document.getElementById('confirmarSenha').value;
  const tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked')?.value || 'Estudante';

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

  const usuario = { nome, email, senha, tipoUsuario };
  saveUser(usuario);

  alert('Cadastro realizado com sucesso!');
  event.target.reset();
  setActiveTab('loginForm');
}

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const usuario = getStoredUser();

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

function bindHomeInteractions() {
  const button = document.getElementById('btnConheca');
  if (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      scrollToObjetivos();
    });
  }
}

function bindAuthInteractions() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => setActiveTab(tab.dataset.target));
  });

  document.querySelector('.switch-form')?.addEventListener('click', function (event) {
    event.preventDefault();
    setActiveTab('registerForm');
  });

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
}

function bindIdeaForm() {
  const ideaForm = document.getElementById('ideaForm');
  if (ideaForm) {
    ideaForm.addEventListener('submit', handleIdeaSubmit);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (estado.page === 'home') {
    bindHomeInteractions();
  }

  if (estado.page === 'solucoes') {
    renderCards();
  }

  if (estado.page === 'sobre') {
    renderIdeas();
    bindIdeaForm();
  }

  if (estado.page === 'login') {
    bindAuthInteractions();
  }
});
