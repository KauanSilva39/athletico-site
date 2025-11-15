// script.js — Versão corrigida e defensiva
document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     MODO CLARO / ESCURO
     ============================ */
  (function initTema() {
    const btns = Array.from(document.querySelectorAll('#toggleTema, #toggleTemaElenco'));
    if (!btns.length) return;
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.body.classList.toggle('modo-claro');
        const on = document.body.classList.contains('modo-claro');
        btns.forEach(b => {
          b.textContent = on ? 'Modo Escuro' : 'Modo Claro';
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
      });
    });
  })();


  /* ============================
     CARROSSEL (index.html)
     ============================ */
  (function initCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    const imgs = Array.from(track.querySelectorAll('img'));
    if (!imgs.length) return;
    let index = 0;

    const show = i => imgs.forEach((img, idx) => img.style.display = (idx === i) ? 'block' : 'none');
    show(index);

    const next = () => { index = (index + 1) % imgs.length; show(index); };
    const prev = () => { index = (index - 1 + imgs.length) % imgs.length; show(index); };

    document.getElementById('nextBtn')?.addEventListener('click', next);
    document.getElementById('prevBtn')?.addEventListener('click', prev);

    let timer = setInterval(next, 4500);
    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', () => timer = setInterval(next, 4500));
  })();


  /* ============================
     MODAL GALERIA (arena.html)
     ============================ */
  (function initModal() {
    const gal = document.getElementById('galeria');
    if (!gal) return;
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    if (!modal || !modalImg) return;

    gal.querySelectorAll('img.thumb').forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.dataset.full || img.src;
        modalImg.alt = img.alt || '';
        modalCaption && (modalCaption.textContent = img.nextElementSibling?.textContent || img.alt || '');
        modal.setAttribute('aria-hidden', 'false');
      });
    });

    modalClose?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.setAttribute('aria-hidden', 'true'); });
  })();


  /* ============================
     VALIDAÇÃO FORM (cadastro.html)
     ============================ */
  (function initForm() {
    const form = document.getElementById('formTorcedor');
    if (!form) return;

    const errorsP = document.getElementById('formErrors') || document.getElementById('formErrors') ;
    const successP = document.getElementById('formSuccess');
    const btn = document.getElementById('btnEnviar');
    if (!btn) return;

    const validate = () => {
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const nascimento = form.nascimento.value;
      const posicao = form.posicao.value;
      const camisa = form.camisa.value;
      const termos = form.termos.checked;
      const errors = [];

      if (!nome || nome.length < 3) errors.push('Nome com pelo menos 3 caracteres.');
      if (!email.includes('@') || !email.includes('.')) errors.push('E-mail inválido.');
      if (!nascimento) errors.push('Informe a data de nascimento.');
      if (!posicao) errors.push('Selecione sua posição favorita.');
      if (camisa && (camisa < 1 || camisa > 99)) errors.push('Número da camisa deve ser entre 1 e 99.');
      if (!termos) errors.push('Você precisa aceitar os termos.');
      return errors;
    };

    btn.addEventListener('click', () => {
      if (errorsP) errorsP.innerHTML = '';
      if (successP) successP.textContent = '';
      const erros = validate();
      if (erros.length) {
        if (errorsP) errorsP.innerHTML = erros.map(e => `• ${e}`).join('<br>');
        return;
      }
      if (successP) successP.textContent = `Obrigado, ${form.nome.value.trim()}! Cadastro recebido.`;
      form.reset();
    });
  })();


  /* ============================
     DESTAQUE ATHLETICO (tabela)
     ============================ */
  (function destaqueTabela() {
    const btn = document.getElementById("destaqueAthletico");
    const linha = document.querySelector("tr[data-time='Athletico Paranaense']");
    if (btn && linha) {
      btn.addEventListener("click", () => {
        linha.classList.toggle("destaque-athletico");
        btn.textContent = linha.classList.contains("destaque-athletico")
          ? "Remover Destaque"
          : "Destacar Athletico";
      });
    }
  })();


  /* ============================
     DESTAQUE NO VESTIÁRIO (lista)
     ============================ */
  (function destaqueVestiario() {
    const itens = document.querySelectorAll("#vestiario li");
    if (!itens.length) return;
    itens.forEach(item => {
      item.addEventListener("click", () => item.classList.toggle("destaque-athletico"));
    });
  })();


  /* ============================
     ÁUDIO (torcida.html)
     ============================ */
  (function audios() {
    const botoes = document.querySelectorAll(".btnAudio");
    const audios = document.querySelectorAll("audio");
    if (!botoes.length) return;
    botoes.forEach(botao => {
      botao.addEventListener("click", () => {
        const audio = document.getElementById(botao.dataset.audio);
        audios.forEach(a => a !== audio && a.pause());
        if (audio.paused) {
          audio.play();
          botao.textContent = "Pausar";
        } else {
          audio.pause();
          botao.textContent = "Tocar / Pausar";
        }
      });
    });
  })();


  /* ============================
     CURIOSIDADES (curiosidades.html)
     ============================ */
  (function curiosidades() {
    const curiosidades = [
      "O Athletico foi o primeiro clube brasileiro a usar grama sintética aprovada pela FIFA.",
      "O Furacão foi o primeiro time do Paraná a conquistar o Campeonato Brasileiro (2001).",
      "A Arena da Baixada foi o primeiro estádio do país a ter teto retrátil.",
      "O clube tem uma das categorias de base mais premiadas do Brasil.",
      "O clube foi pioneiro em adotar identidade visual moderna e nome sem o 'h' tradicional.",
      "A torcida organizada Os Fanáticos foi fundada em 1977.",
      "O apelido “Furacão” surgiu em 1949."
    ];
    const btn = document.getElementById("btnCuriosidade");
    const titulo = document.getElementById("curiosidadeTitulo");
    const texto = document.getElementById("curiosidadeTexto");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const random = curiosidades[Math.floor(Math.random() * curiosidades.length)];
      if (titulo) titulo.textContent = "Curiosidade do Furacão:";
      if (texto) texto.textContent = random;
    });
  })();


  /* ============================
     VÍDEO (torcida.html)
     ============================ */
  (function videoTorcida() {
    const video = document.getElementById("videoTorcida");
    const btnVideo = document.getElementById("btnVideo");
    if (!video || !btnVideo) return;
    btnVideo.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        btnVideo.textContent = "⏸️ Pausar Vídeo";
      } else {
        video.pause();
        btnVideo.textContent = "▶️ Reproduzir Vídeo";
      }
    });
  })();


  /* ============================
     CARROSSEL ELENCO (elenco.html)
     ============================ */
  (function carrosselElenco() {
    const slides = document.querySelectorAll("#carrosselElenco .slide");
    const btnAnterior = document.getElementById("anteriorElenco");
    const btnProximo = document.getElementById("proximoElenco");
    if (!slides.length) return;
    let indiceAtual = 0;
    const mostrar = i => slides.forEach((s, idx) => s.classList.toggle("ativo", idx === i));
    btnAnterior?.addEventListener("click", () => {
      indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
      mostrar(indiceAtual);
    });
    btnProximo?.addEventListener("click", () => {
      indiceAtual = (indiceAtual + 1) % slides.length;
      mostrar(indiceAtual);
    });
    mostrar(indiceAtual);
  })();


  /* ============================
     ACORDION TITULOS (titulos.html)
     ============================ */
  (function accordionTitulos() {
    const botoes = document.querySelectorAll(".btn-toggle[data-target]");
    if (!botoes.length) return;
    botoes.forEach(btn => {
      const alvo = document.getElementById(btn.dataset.target);
      if (!alvo) return;
      alvo.classList.remove("visivel");
      alvo.style.maxHeight = "0";
      alvo.style.opacity = "0";
      alvo.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "Mostrar detalhes";
      btn.addEventListener("click", () => {
        const aberto = alvo.getAttribute("aria-hidden") === "false";
        if (aberto) {
          alvo.style.maxHeight = "0";
          alvo.style.opacity = "0";
          alvo.setAttribute("aria-hidden", "true");
          btn.textContent = "Mostrar detalhes";
          btn.setAttribute("aria-expanded", "false");
        } else {
          alvo.classList.add("visivel");
          alvo.style.maxHeight = alvo.scrollHeight + "px";
          alvo.style.opacity = "1";
          alvo.setAttribute("aria-hidden", "false");
          btn.textContent = "Ocultar detalhes";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  })();


  /* ============================
     CONTROLE VÍDEOS DOS TÍTULOS
     ============================ */
  (function videosTitulos() {
    const botoesVideo = document.querySelectorAll(".btn-video");
    if (botoesVideo.length) {
      botoesVideo.forEach(botao => {
        botao.addEventListener("click", () => {
          const video = document.getElementById(botao.dataset.video);
          if (!video) return;
          if (video.paused) {
            video.play();
            botao.textContent = "⏸ Pausar";
          } else {
            video.pause();
            botao.textContent = "▶ Reproduzir";
          }
        });
      });
    }

    const botoesAvancar = document.querySelectorAll(".btn-avancar");
    const botoesVoltar = document.querySelectorAll(".btn-voltar");
    botoesAvancar.forEach(b => b.addEventListener("click", () => {
      const v = document.getElementById(b.dataset.video);
      if (v) v.currentTime += 10;
    }));
    botoesVoltar.forEach(b => b.addEventListener("click", () => {
      const v = document.getElementById(b.dataset.video);
      if (v) v.currentTime -= 10;
    }));
  })();


  /* ============================
     BOTÃO VOLTAR AO TOPO
     ============================ */
  (function btnTopo() {
    const btn = document.getElementById("btnTopo");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("visivel", window.scrollY > 400);
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  })();


  /* ============================
     NOTÍCIAS: MOSTRAR/OCULTAR DETALHES
     ============================ */
  (function noticiasToggle() {
    const botoes = document.querySelectorAll(".btn-detalhes");
    if (!botoes.length) return;
    botoes.forEach(b => {
      b.addEventListener("click", () => {
        const detalhe = document.getElementById(b.dataset.target);
        if (!detalhe) return;
        const aberto = detalhe.style.display === "block";
        detalhe.style.display = aberto ? "none" : "block";
        b.textContent = aberto ? "Ver detalhes" : "Ocultar detalhes";
      });
    });
  })();


  /* ============================
     DATA DE ATUALIZAÇÃO (notícias)
     ============================ */
  (function atualizacaoData() {
    const atualizacao = document.getElementById("atualizacao");
    if (!atualizacao) return;
    const agora = new Date();
    const data = agora.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
    const hora = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    atualizacao.textContent = `Última atualização: ${data}, às ${hora}`;
  })();


  /* ============================
     ANIMAÇÃO FADE-IN (notícias)
     ============================ */
  (function fadeInNoticias() {
    const noticias = document.querySelectorAll(".noticia-card");
    if (!noticias.length) return;
    const obs = new IntersectionObserver(entradas => {
      entradas.forEach(e => { if (e.isIntersecting) e.target.classList.add("visivel"); });
    }, { threshold: 0.2 });
    noticias.forEach(n => obs.observe(n));
  })();


  /* ============================
     MENU HAMBURGUER FUNCIONAL
     ============================ */
  (function menuHamburguer() {
    const btnMenu = document.getElementById("menuToggle");
    const menu = document.getElementById("menuLista");
    if (!btnMenu || !menu) return;
    btnMenu.addEventListener("click", () => {
      const aberto = menu.classList.toggle("ativo");
      btnMenu.textContent = aberto ? "❌" : "☰";
      btnMenu.setAttribute("aria-expanded", aberto);
    });
  })();


  /* ===========================================================
     DADOS E FUNÇÕES DE JOGADORES (perfil, comparação, ranking)
     =========================================================== */

  // Ordem oficial do elenco para navegação
  const ordemJogadores = [
    "mycael","santos","leo","aguirre","arthur","teran","benavidez",
    "derik","esquivel","felipinho","patrick","joaocruz","dudu",
    "zapelli","luizfernando","mendoza","leozinho","julimar",
    "renanpeixoto","viveros","odair"
  ];

  // Objeto com os perfis (você já tinha estes dados — mantive)
  const jogadores = {
  mycael: {
    nome: "Mycael",
    numero: "1",
    posicao: "Goleiro",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/MYCAEL_FP.jpg",
    jogos: 34,
    golsSofridos: 35,
    cleanSheets: 11,
    gols: 0,
    assist: 0,
    altura: "1,91m",
    peso: "78kg",
    idade: 21,
    pe: "Canhoto",
    clubeAnterior: "Athletico Sub-23",
    bio: "Goleiro jovem e promissor, destaque das seleções brasileiras de base. Atua com segurança e grande reflexo nas finalizações."
  },

  santos: {
    nome: "Santos",
    numero: "23",
    posicao: "Goleiro",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/SANTOS_FP.jpg",
    jogos: 24,
    golsSofridos: 25,
    cleanSheets: 9,
    gols: 0,
    assist: 0,
    altura: "1,91m",
    peso: "83kg",
    idade: 35,
    pe: "Destro",
    clubeAnterior: "Fortaleza",
    bio: "Ídolo do clube, goleiro multicampeão e referência de liderança dentro do elenco."
  },

  leo: {
    nome: "Léo",
    numero: "3",
    posicao: "Zagueiro",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/LEO_FP.jpg",
    jogos: 45,
    gols: 1,
    assist: 0,
    altura: "1,83m",
    peso: "71kg",
    idade: 29,
    pe: "Canhoto",
    clubeAnterior: "Vasco",
    bio: "Zagueiro firme e de muita imposição física, com grande leitura defensiva e qualidade na saída de bola."
  },

  aguirre: {
    nome: "Aguirre",
    numero: "33",
    posicao: "Zagueiro",
    nacionalidade: "Colômbia",
    foto: "./fotos jogadores/AGUIRRE_FP.jpg",
    jogos: 17,
    gols: 0,
    assist: 1,
    altura: "1,88m",
    peso: "78kg",
    idade: 29,
    pe: "Destro",
    clubeAnterior: "Atlético Nacional",
    bio: "Defensor colombiano de muita força e agressividade, especialista em duelos e jogo aéreo."
  },

  arthur: {
    nome: "Arthur Dias",
    numero: "65",
    posicao: "Zagueiro",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/ARTHUR_FP.jpg",
    jogos: 16,
    gols: 0,
    assist: 0,
    altura: "1,88m",
    peso: "82kg",
    idade: 18,
    pe: "Canhoto",
    clubeAnterior: "Athletico Sub-23",
    bio: "Zagueiro da base rubro-negra, com boa velocidade e antecipação."
  },

  teran: {
    nome: "Carlos Téran",
    numero: "13",
    posicao: "Zagueiro",
    nacionalidade: "Colômbia",
    foto: "./fotos jogadores/TERAN_FP.jpg",
    jogos: 9,
    gols: 0,
    assist: 0,
    altura: "1,88m",
    peso: "83kg",
    idade: 25,
    pe: "Destro",
    clubeAnterior: "Chicago Fire",
    bio: "Zagueiro colombiano de alto potencial, destaque pela imposição física e marcação intensa."
  },

  benavidez: {
    nome: "Gáston Benavídez",
    numero: "29",
    posicao: "Lateral Direito",
    nacionalidade: "Argentina",
    foto: "./fotos jogadores/BENAVIDEZ_FP.jpg",
    jogos: 22,
    gols: 1,
    assist: 3,
    altura: "1,75m",
    peso: "71kg",
    idade: 30,
    pe: "Destro",
    clubeAnterior: "Talleres",
    bio: "Lateral argentino ofensivo, conhecido pelas ultrapassagens e precisão nos cruzamentos."
  },

  derik: {
    nome: "Léo Derik",
    numero: "61",
    posicao: "Lateral Esquerdo",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/DERIK_FP.jpg",
    jogos: 20,
    gols: 1,
    assist: 0,
    altura: "1,65m",
    peso: "58kg",
    idade: 20,
    pe: "Canhoto",
    clubeAnterior: "Athletico Sub-23",
    bio: "Jovem lateral formado no Athletico, com velocidade e boa chegada ao ataque."
  },

  esquivel: {
    nome: "Lucas Esquivel",
    numero: "37",
    posicao: "Lateral Esquerdo",
    nacionalidade: "Argentina",
    foto: "./fotos jogadores/ESQUIVEL_FP.jpg",
    jogos: 26,
    gols: 1,
    assist: 5,
    altura: "1,80m",
    peso: "78kg",
    idade: 24,
    pe: "Canhoto",
    clubeAnterior: "Unión Santa Fé",
    bio: "Lateral técnico e consistente, destaque pela regularidade e apoio ofensivo."
  },

  felipinho: {
    nome: "Felipinho",
    numero: "5",
    posicao: "Meio Campo",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/FELIPINHO_FP.jpg",
    jogos: 48,
    gols: 0,
    assist: 1,
    altura: "1,83m",
    peso: "??kg",
    idade: 24,
    pe: "Canhoto",
    clubeAnterior: "Ponte Preta",
    bio: "Volante versátil, com grande poder de marcação e dinâmica no meio-campo."
  },

  patrick: {
    nome: "Patrick",
    numero: "88",
    posicao: "Meio Campo",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/PATRICK_FP.jpg",
    jogos: 39,
    gols: 0,
    assist: 2,
    altura: "1,78m",
    peso: "81kg",
    idade: 33,
    pe: "Canhoto",
    clubeAnterior: "Santos",
    bio: "Meia físico e de chegada forte à área, sempre participativo na transição ofensiva."
  },

  joaocruz: {
    nome: "João Cruz",
    numero: "57",
    posicao: "Meio Campo",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/JOAO_FP.jpg",
    jogos: 29,
    gols: 2,
    assist: 2,
    altura: "1,70m",
    peso: "67kg",
    idade: 19,
    pe: "Destro",
    clubeAnterior: "Athletico Sub-23",
    bio: "Meio-campista talentoso formado na base rubro-negra, destaque pela visão de jogo."
  },

  dudu: {
    nome: "Dudu",
    numero: "53",
    posicao: "Meio Campo",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/DUDU_FP.jpg",
    jogos: 22,
    gols: 3,
    assist: 0,
    altura: "1,77m",
    peso: "??kg",
    idade: 19,
    pe: "Canhoto",
    clubeAnterior: "Athletico Sub-23",
    bio: "Atleta jovem e promissor, com boa movimentação e intensidade no meio-campo."
  },

  zapelli: {
    nome: "Bruno Zapelli",
    numero: "10",
    posicao: "Meio Campo",
    nacionalidade: "Argentina e Itália",
    foto: "./fotos jogadores/ZAPELLI_FP.jpg",
    jogos: 53,
    gols: 4,
    assist: 10,
    altura: "1,80m",
    peso: "78kg",
    idade: 23,
    pe: "Canhoto",
    clubeAnterior: "Belgrano",
    bio: "Meia criativo e elegante, líder de assistências e um dos principais articuladores do Athletico."
  },

  luizfernando: {
    nome: "Luiz Fernando",
    numero: "19",
    posicao: "Ponta",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/LF_FP.jpg",
    jogos: 51,
    gols: 12,
    assist: 6,
    altura: "1,78m",
    peso: "66kg",
    idade: 29,
    pe: "Destro",
    clubeAnterior: "Atlético Goianiense",
    bio: "Atacante veloz que atua pelos lados, forte em jogadas de profundidade."
  },

  mendoza: {
    nome: "Mendoza",
    numero: "17",
    posicao: "Ponta",
    nacionalidade: "Colômbia",
    foto: "./fotos jogadores/MENDOZA_FP.jpg",
    jogos: 22,
    gols: 2,
    assist: 3,
    altura: "1,73m",
    peso: "68kg",
    idade: 33,
    pe: "Canhoto",
    clubeAnterior: "Léon",
    bio: "Extremo colombiano habilidoso, com drible curto e conhecido por sua extrema velocidade"
  },

  leozinho: {
    nome: "Leozinho",
    numero: "21",
    posicao: "Ponta",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/LEOZINHO_FP.jpg",
    jogos: 31,
    gols: 3,
    assist: 1,
    altura: "1,75m",
    peso: "??kg",
    idade: 26,
    pe: "Canhoto",
    clubeAnterior: "Ituano",
    bio: "Jovem atacante de grande mobilidade, vindo do futsal, uma das revelações do elenco em 2025."
  },

  julimar: {
    nome: "Julimar",
    numero: "20",
    posicao: "Atacante",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/JULIMAR_FP.jpg",
    jogos: 12,
    gols: 4,
    assist: 2,
    altura: "1,88m",
    peso: "86kg",
    idade: 24,
    pe: "Destro",
    clubeAnterior: "Athletico Sub-23",
    bio: "Atacante de lado com boa finalização e importante presença ofensiva ."
  },

  renanpeixoto: {
    nome: "Renan Peixoto",
    numero: "70",
    posicao: "Atacante",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/PEIXOTO_FP.jpg",
    jogos: 25,
    gols: 8,
    assist: 0,
    altura: "1,85m",
    peso: "??kg",
    idade: 25,
    pe: "Destro",
    clubeAnterior: "Portuguesa",
    bio: "Jovem atacante é o jogador que menos precisa de minutos em campo pra marcar na Série B."
  },

  viveros: {
    nome: "Kevin Viveros",
    numero: "9",
    posicao: "Atacante",
    nacionalidade: "Colômbia",
    foto: "./fotos jogadores/VIVEROS_FP.jpg",
    jogos: 23,
    gols: 10,
    assist: 1,
    altura: "1,80m",
    peso: "77kg",
    idade: 25,
    pe: "Destro",
    clubeAnterior: "Atletico Nacional",
    bio: "Artilheiro da equipe na temporada, com explosão, drible e grande poder de finalização."
  },

  odair: {
    nome: "Odair Hellmann",
    numero: "—",
    posicao: "Técnico",
    nacionalidade: "Brasil",
    foto: "./fotos jogadores/equipe_odair.jpg",
    jogos: 30,
    gols: "—",
    assist: "—",
    bio: "Técnico do Athletico Paranaense, reconhecido pela organização tática, intensidade e evolução defensiva do time."
  }
};

  /* ============================
     FUNÇÕES DE PERFIL DO JOGADOR
     ============================ */
  function getJogadorID() {
    const params = new URLSearchParams(window.location.search);
    return params.get("j");
  }

  function mostrarEstatisticasExtras(jogador) {
    const extras = document.getElementById("estatisticasExtras");
    if (!extras) return;
    if (!jogador || !jogador.posicao) {
      extras.innerHTML = "";
      return;
    }
    if (!jogador.posicao.toLowerCase().includes("goleiro")) {
      extras.innerHTML = "";
      return;
    }
    extras.innerHTML = `
      <h3>📈 Estatísticas — Goleiro</h3>
      <p><strong>Gols Sofridos:</strong> ${jogador.golsSofridos ?? "—"}</p>
      <p><strong>Clean Sheets:</strong> ${jogador.cleanSheets ?? "—"}</p>
    `;
  }

  function carregarJogador() {
    const id = getJogadorID();
    const jogador = jogadores[id];
    if (!jogador) {
      const nomeEl = document.getElementById("nomeJogador");
      if (nomeEl) nomeEl.textContent = "Jogador não encontrado";
      return;
    }

    // Preencher dados principais (checar existência dos elementos)
    const setText = (idEl, value) => {
      const el = document.getElementById(idEl);
      if (el) el.textContent = value ?? "—";
    };
    const setSrc = (idEl, value) => {
      const el = document.getElementById(idEl);
      if (el && value) el.src = value;
    };

    setText("nomeJogador", jogador.nome);
    setSrc("fotoJogador", jogador.foto);
    setText("numeroJogador", jogador.numero);
    setText("posicaoJogador", jogador.posicao);
    setText("nacionalidadeJogador", jogador.nacionalidade);
    setText("jogosJogador", jogador.jogos);
    setText("golsJogador", jogador.gols);
    setText("assistJogador", jogador.assist);
    setText("bioJogador", jogador.bio);
    setText("alturaJogador", jogador.altura);
    setText("pesoJogador", jogador.peso);
    setText("idadeJogador", jogador.idade ? (jogador.idade + " anos") : "—");
    setText("peJogador", jogador.pe);
    setText("clubeJogador", jogador.clubeAnterior);

    mostrarEstatisticasExtras(jogador);
  }

  // conectar botões de navegação do jogador (se presentes)
  (function ligaNavegacaoJogadores() {
    const btnProximo = document.getElementById("btnProximo");
    const btnAnterior = document.getElementById("btnAnterior");

    function navegarJogador(direcao) {
      const idAtual = getJogadorID();
      const indexAtual = ordemJogadores.indexOf(idAtual);
      if (indexAtual === -1) return;
      const novoIndex = direcao === "proximo"
        ? (indexAtual + 1) % ordemJogadores.length
        : (indexAtual - 1 + ordemJogadores.length) % ordemJogadores.length;
      const novoId = ordemJogadores[novoIndex];
      window.location.href = `jogador.html?j=${novoId}`;
    }

    if (btnProximo) btnProximo.addEventListener("click", () => navegarJogador("proximo"));
    if (btnAnterior) btnAnterior.addEventListener("click", () => navegarJogador("anterior"));
  })();

  // ficha técnica expand/collapse (se elementos existirem)
  (function ligaFichaTecnica() {
    const btnFicha = document.getElementById("btnFicha");
    const fichaBox = document.getElementById("fichaTecnica");
    if (!btnFicha || !fichaBox) return;
    btnFicha.addEventListener("click", () => {
      const isClosed = !fichaBox.style.maxHeight || fichaBox.style.maxHeight === "0px";
      fichaBox.style.maxHeight = isClosed ? "500px" : "0px";
      btnFicha.textContent = isClosed ? "📄 Ocultar ficha técnica" : "📄 Ver ficha técnica completa";
    });
  })();

  // chamar carregarJogador se estivermos na página de jogador
  if (window.location.pathname.toLowerCase().includes("jogador.html")) {
    carregarJogador();
  }


  /* ============================
     COMPARAR JOGADORES — comparar.html
     ============================ */
  function carregarListaComparacao() {
    const selects = document.querySelectorAll(".selectJogador");
    if (!selects || selects.length < 2) return;
    // Limpa opções existentes
    selects.forEach(s => { s.innerHTML = '<option value="">Selecione</option>'; });

    Object.keys(jogadores).forEach(id => {
      const op = new Option(jogadores[id].nome, id);
      selects[0].appendChild(op.cloneNode(true));
      selects[1].appendChild(op.cloneNode(true));
    });
  }

  function compararJogadores() {
    const aEl = document.getElementById("selectA");
    const bEl = document.getElementById("selectB");
    const box = document.getElementById("resultadoComparacao");
    if (!aEl || !bEl || !box) return;
    const a = aEl.value;
    const b = bEl.value;

    if (!a || !b || a === b) {
      box.innerHTML = "<p>Selecione dois jogadores diferentes.</p>";
      return;
    }

    const j1 = jogadores[a];
    const j2 = jogadores[b];

    box.innerHTML = `
      <div style="display:flex; gap:40px; flex-wrap:wrap;">
        <div class="cardComp">
          <h3>${j1.nome}</h3>
          <p><strong>Jogos:</strong> ${j1.jogos ?? '—'}</p>
          <p><strong>Gols:</strong> ${j1.gols ?? '—'}</p>
          <p><strong>Assistências:</strong> ${j1.assist ?? '—'}</p>
        </div>

        <div class="cardComp">
          <h3>${j2.nome}</h3>
          <p><strong>Jogos:</strong> ${j2.jogos ?? '—'}</p>
          <p><strong>Gols:</strong> ${j2.gols ?? '—'}</p>
          <p><strong>Assistências:</strong> ${j2.assist ?? '—'}</p>
        </div>
      </div>
    `;
  }

  if (window.location.pathname.toLowerCase().includes("comparar.html")) {
    carregarListaComparacao();
    const botao = document.getElementById("btnComparar");
    if (botao) botao.addEventListener("click", compararJogadores);
  }


  /* ============================
     RANKING TOP5 (ranking.html)
     ============================ */
  function gerarRanking(campo, idLista) {
    const lista = document.getElementById(idLista);
    if (!lista) return;
    const arr = Object.values(jogadores)
      .filter(j => typeof j[campo] === "number")
      .sort((a, b) => b[campo] - a[campo])
      .slice(0, 5);

    lista.innerHTML = arr.map(j => `<li><strong>${j.nome}</strong> — ${j[campo]}</li>`).join("");
  }

  if (window.location.pathname.toLowerCase().includes("ranking.html")) {
    gerarRanking("gols", "rankGols");
    gerarRanking("assist", "rankAssist");
    gerarRanking("jogos", "rankJogos");
  }

  /* ================================
   BUSCA INSTANTÂNEA NO ELENCO
================================ */
function initBuscaElenco() {
  const input = document.getElementById("buscaJogador");
  const cards = document.querySelectorAll(".jogador-card");

  if (!input || !cards.length) return;

  input.addEventListener("input", () => {
    const txt = input.value.toLowerCase();

    cards.forEach(card => {
      const nome = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = nome.includes(txt) ? "block" : "none";
    });
  });
}

if (window.location.pathname.includes("elenco.html")) {
  initBuscaElenco();
}

/* ================================
      FILTRO POR POSIÇÃO
================================ */
function initFiltroPosicao() {
  const botoes = document.querySelectorAll(".btnFiltro");
  const cards = document.querySelectorAll(".jogador-card");

  if (!botoes.length) return;

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const pos = btn.dataset.pos;

      cards.forEach(card => {
        const p = card.querySelector("p strong:nth-child(1)").nextSibling.textContent;

        if (pos === "todos" || p.includes(pos)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

if (window.location.pathname.includes("elenco.html")) {
  initFiltroPosicao();
}

/* ===============================================
      TIME IDEAL — 3-5-2 COM FOTOS E REUSO
================================================ */

function montarTime352() {
  const lista = document.getElementById("listaJogadores352");
  const slots = document.querySelectorAll(".slot, #goleiroSlot");

  if (!lista) return;

  /* ---- Criar cards com foto ---- */
  Object.keys(jogadores).forEach(id => {
    const j = jogadores[id];
    if (j.posicao === "Técnico") return;

    const card = document.createElement("div");
    card.className = "jCard";
    card.draggable = true;
    card.dataset.id = id;

    card.innerHTML = `
      <img src="${j.foto}" alt="${j.nome}">
      <div class="info">
        <strong>${j.nome}</strong>
        <small>${j.posicao}</small>
      </div>
    `;

    card.addEventListener("dragstart", e => {
      e.dataTransfer.setData("id", id);
    });

    lista.appendChild(card);
  });

  /* ---- Evitar bloqueio em outros slots ---- */
  slots.forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());

    slot.addEventListener("drop", e => {
      const id = e.dataTransfer.getData("id");
      const j = jogadores[id];

      // 🔒 Bloqueio apenas no goleiro
      if (slot.id === "goleiroSlot" && j.posicao !== "Goleiro") {
        alert("Somente goleiros podem ocupar esse espaço!");
        return;
      }

      // Se o slot já tem alguém → devolver para lista
      if (slot.dataset.ocupado) {
        const antigoID = slot.dataset.ocupado;
        devolverJogadorParaLista(antigoID);
      }

      // Preencher slot com foto + nome
      slot.innerHTML = `
        <img src="${j.foto}" class="slotFoto">
        <div class="slotNome">${j.nome}</div>
      `;

      slot.style.background = "#003300cc";
      slot.style.border = "2px solid #00ff88";
      slot.dataset.ocupado = id;

      esconderJogadorDaLista(id);
    });
  });
}

/* =============================================
   ESCONDER / RETORNAR JOGADORES NA LISTA
============================================= */

function esconderJogadorDaLista(id) {
  const card = document.querySelector(`.jCard[data-id="${id}"]`);
  if (card) card.style.display = "none";
}

function devolverJogadorParaLista(id) {
  const card = document.querySelector(`.jCard[data-id="${id}"]`);
  if (card) card.style.display = "flex";
}

/* =============================================
   INICIAR NA PÁGINA CORRETA
============================================= */

if (window.location.pathname.includes("time352.html")) {
  montarTime352();
}




/* ======================================
   CAPTURAR E SALVAR PNG DO CAMPO
====================================== */

function salvarTimePNG() {
  console.log("➡ FUNÇÃO salvarTimePNG EXECUTOU");

  const campo = document.getElementById("campo352");
  if (!campo) {
    console.log("⛔ Campo não encontrado!");
    return;
  }

  html2canvas(campo, {
    backgroundColor: "#101010",
    scale: 3,
    useCORS: true
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "meu_time_352.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    console.log("✔ PNG GERADO");
  });
}

/* ============================
   ATIVAR O BOTÃO DO PNG
=============================== */

if (window.location.pathname.includes("time352.html")) {

  // ← ESTE é o correto (fora do outro DOMContentLoaded)
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnSalvarPNG");

    console.log("BOTÃO PNG ENCONTRADO:", btn);

    if (btn) {
      btn.addEventListener("click", salvarTimePNG);
      console.log("✔ EVENTO ADICIONADO");
    }
  });
}














}); // fim DOMContentLoaded
