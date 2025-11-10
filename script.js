/* script.js — Versão final otimizada e corrigida */
document.addEventListener("DOMContentLoaded", () => {
  /* ======= MODO CLARO/ESCURO ======= */
  const btnTema = document.getElementById("toggleTema") || document.getElementById("toggleTemaElenco");
  if (btnTema) {
    btnTema.addEventListener("click", () => {
      document.body.classList.toggle("modo-claro");
      const on = document.body.classList.contains("modo-claro");
      document.querySelectorAll('#toggleTema, #toggleTemaElenco').forEach(b => {
        b.textContent = on ? 'Modo Escuro' : 'Modo Claro';
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  }

  /* ======= CARROSSEL (index.html) ======= */
  (function initCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    const imgs = Array.from(track.querySelectorAll('img'));
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

  /* ======= MODAL GALERIA (arena.html) ======= */
  (function initModal() {
    const gal = document.getElementById('galeria');
    if (!gal) return;
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    gal.querySelectorAll('img.thumb').forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.dataset.full || img.src;
        modalImg.alt = img.alt || '';
        modalCaption.textContent = img.nextElementSibling?.textContent || img.alt || '';
        modal.setAttribute('aria-hidden', 'false');
      });
    });

    modalClose?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.setAttribute('aria-hidden', 'true'); });
  })();

  /* ======= VALIDAÇÃO DE FORMULÁRIO ======= */
  (function initForm() {
    const form = document.getElementById('formTorcedor');
    if (!form) return;

    const errorsP = document.getElementById('formErrors');
    const successP = document.getElementById('formSuccess');
    const btn = document.getElementById('btnEnviar');

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
      errorsP.innerHTML = '';
      successP.textContent = '';
      const erros = validate();
      if (erros.length) {
        errorsP.innerHTML = erros.map(e => `• ${e}`).join('<br>');
        return;
      }
      successP.textContent = `Obrigado, ${form.nome.value.trim()}! Cadastro recebido.`;
      form.reset();
    });
  })();

  /* ======= DESTAQUE ATHLETICO ======= */
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

  /* ======= DESTAQUE NO ELENCO (clique no nome) ======= */
  document.querySelectorAll("#vestiario li").forEach(item => {
    item.addEventListener("click", () => item.classList.toggle("destaque-athletico"));
  });

  /* ======= ÁUDIO (torcida.html) ======= */
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

  /* ======= CURIOSIDADES ======= */
  (function curiosidades() {
    const curiosidades = [
      "O Athletico foi o primeiro clube brasileiro a usar grama sintética aprovada pela FIFA.",
      "O Furacão foi o primeiro time do Paraná a conquistar o Campeonato Brasileiro (2001).",
      "A Arena da Baixada foi o primeiro estádio do país a ter teto retrátil.",
      "O Athletico tem uma das categorias de base mais premiadas do Brasil.",
      "O clube foi pioneiro em adotar identidade visual moderna e nome sem o 'h' tradicional."
    ];
    const btn = document.getElementById("btnCuriosidade");
    const titulo = document.getElementById("curiosidadeTitulo");
    const texto = document.getElementById("curiosidadeTexto");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const random = curiosidades[Math.floor(Math.random() * curiosidades.length)];
      titulo.textContent = "Curiosidade do Furacão:";
      texto.textContent = random;
    });
  })();

  /* ======= VÍDEO (torcida.html) ======= */
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

  /* ======= CARROSSEL ELENCO ======= */
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

  /* ======= TÍTULOS: Mostrar/Ocultar Detalhes ======= */
  (function accordionTitulos() {
    const botoes = document.querySelectorAll(".btn-toggle[data-target]");
    if (!botoes.length) return;

    botoes.forEach(btn => {
      const alvo = document.getElementById(btn.dataset.target);
      if (!alvo) return;

      // Estado inicial: fechado
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

  /* ======= CONTROLE DE VÍDEOS DOS TÍTULOS ======= */
  (function videosTitulos() {
    const botoesVideo = document.querySelectorAll(".btn-video");
    botoesVideo.forEach(botao => {
      botao.addEventListener("click", () => {
        const video = document.getElementById(botao.dataset.video);
        if (video.paused) {
          video.play();
          botao.textContent = "⏸ Pausar";
        } else {
          video.pause();
          botao.textContent = "▶ Reproduzir";
        }
      });
    });

    const botoesAvancar = document.querySelectorAll(".btn-avancar");
    const botoesVoltar = document.querySelectorAll(".btn-voltar");
    botoesAvancar.forEach(b => b.addEventListener("click", () => {
      const v = document.getElementById(b.dataset.video);
      v.currentTime += 10;
    }));
    botoesVoltar.forEach(b => b.addEventListener("click", () => {
      const v = document.getElementById(b.dataset.video);
      v.currentTime -= 10;
    }));
  })();

  /* ======= BOTÃO VOLTAR AO TOPO ======= */
  (function btnTopo() {
    const btn = document.getElementById("btnTopo");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("visivel", window.scrollY > 400);
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  })();

  /* ======= DETALHES DAS NOTÍCIAS ======= */
  (function noticiasToggle() {
    const botoes = document.querySelectorAll(".btn-detalhes");
    botoes.forEach(b => {
      b.addEventListener("click", () => {
        const detalhe = document.getElementById(b.dataset.target);
        const aberto = detalhe.style.display === "block";
        detalhe.style.display = aberto ? "none" : "block";
        b.textContent = aberto ? "Ver detalhes" : "Ocultar detalhes";
      });
    });
  })();

  /* ======= DATA DE ATUALIZAÇÃO ======= */
  const atualizacao = document.getElementById("atualizacao");
  if (atualizacao) {
    const agora = new Date();
    const data = agora.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
    const hora = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    atualizacao.textContent = `Última atualização: ${data}, às ${hora}`;
  }

  /* ======= ANIMAÇÃO FADE-IN NAS NOTÍCIAS ======= */
  const noticias = document.querySelectorAll(".noticia-card");
  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(e => { if (e.isIntersecting) e.target.classList.add("visivel"); });
  }, { threshold: 0.2 });
  noticias.forEach(n => obs.observe(n));

/* ===== MENU RESPONSIVO ===== */
document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.getElementById("btnMenu");
  const nav = document.getElementById("navPrincipal");

  if (!btnMenu || !nav) return;

  btnMenu.addEventListener("click", () => {
    const aberto = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", !aberto);
    btnMenu.textContent = aberto ? "☰" : "✖"; // muda o ícone
  });

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.setAttribute("data-open", "false");
      btnMenu.textContent = "☰";
    });
  });
});


});
