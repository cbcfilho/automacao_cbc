#!/usr/bin/env node
// Gera as imagens de um carrossel do Instagram (1080x1350) a partir de um JSON.
//
// Uso:
//   node agente-conteudo/carrossel/gerar.mjs <carrossel.json> [pasta-de-saida]
//
// Saída (padrão: agente-conteudo/saida/<slug>/):
//   01.jpg, 02.jpg, ...  -> slides prontos para postar (JPEG, formato exigido pela API do Instagram)
//   preview.jpg          -> todos os slides lado a lado, para aprovação
//   legenda.txt          -> legenda + hashtags
//
// Tipos de slide: capa, texto, passos, lista, antes_depois, numero, cta.
// No texto, *palavra* vira destaque na cor da marca e \n quebra a linha.
// Cores, nome, @ e logo vêm de marca.json (mesma pasta deste script).

import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const AQUI = path.dirname(fileURLToPath(import.meta.url));

function carregarPlaywright() {
  try {
    return require('playwright');
  } catch {
    const raizGlobal = execSync('npm root -g').toString().trim();
    try {
      return require(path.join(raizGlobal, 'playwright'));
    } catch {
      console.error('Playwright não encontrado. Rode: npm install -g playwright && npx playwright install chromium');
      process.exit(1);
    }
  }
}

const W = 1080;
const H = 1350;

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Escapa o HTML e aplica a marcação simples: *destaque* e quebra de linha.
function fmt(s) {
  return esc(s)
    .replace(/\*([^*]+)\*/g, '<em class="hl">$1</em>')
    .replace(/\n/g, '<br>');
}

function logoHtml(marca) {
  if (marca.logo) {
    const arq = path.resolve(AQUI, marca.logo);
    if (fs.existsSync(arq)) {
      const ext = path.extname(arq).slice(1).replace('svg', 'svg+xml').replace('jpg', 'jpeg');
      const b64 = fs.readFileSync(arq).toString('base64');
      return `<img class="logo" src="data:image/${ext};base64,${b64}" alt="">`;
    }
    console.warn(`Aviso: logo "${marca.logo}" não encontrado; usando o nome em texto.`);
  }
  return `<span class="marca-nome">${esc(marca.nome)}</span>`;
}

function css(marca) {
  const c = marca.cores;
  return `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W}px; height: ${H}px; }
  body { font-family: '${marca.fonte}', 'Segoe UI', Roboto, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
  .slide { position: relative; width: ${W}px; height: ${H}px; padding: 96px 88px 0; display: flex; flex-direction: column; overflow: hidden; }
  .escuro { background: ${c.escuro}; color: ${c.texto_claro}; }
  .claro  { background: ${c.claro};  color: ${c.texto_escuro}; }
  .escuro .suave { color: ${c.suave_escuro}; }
  .claro  .suave { color: ${c.suave_claro}; }
  .escuro .hl { color: ${c.destaque}; font-style: normal; }
  .claro  .hl { color: ${c.primaria}; font-style: normal; background: linear-gradient(transparent 62%, ${c.destaque} 62%); padding: 0 4px; }

  /* textura discreta nos slides escuros */
  .escuro::before { content: ''; position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(${c.escuro_2} 2px, transparent 2px), linear-gradient(90deg, ${c.escuro_2} 2px, transparent 2px);
    background-size: 90px 90px; opacity: .55; }
  .escuro::after { content: ''; position: absolute; width: 760px; height: 760px; right: -260px; top: -260px; border-radius: 50%;
    background: radial-gradient(circle, ${c.primaria}88 0%, transparent 68%); pointer-events: none; }
  .slide > * { position: relative; z-index: 1; }

  .topo { display: flex; justify-content: space-between; align-items: center; margin-bottom: 56px; }
  .etiqueta { display: inline-block; font-size: 26px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; padding: 14px 26px; border-radius: 999px; }
  .escuro .etiqueta { background: ${c.destaque}; color: ${c.escuro}; }
  .claro  .etiqueta { background: ${c.escuro}; color: ${c.destaque}; }
  .pagina { font-size: 26px; font-weight: 600; letter-spacing: .08em; }

  .corpo { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column; font-size: 54px; padding-bottom: 40px; }
  .titulo { font-size: 1.6em; font-weight: 800; line-height: 1.08; letter-spacing: -.02em; margin-bottom: .7em; }
  .texto { font-size: 1em; line-height: 1.45; margin-bottom: .6em; }
  .texto p + p { margin-top: .7em; }

  .capa .corpo { justify-content: center; font-size: 46px; }
  .capa .titulo { font-size: 2.05em; line-height: 1.02; margin-bottom: .55em; }
  .capa .subtitulo { font-size: .85em; line-height: 1.4; max-width: 90%; }
  .arraste { position: absolute; right: 88px; bottom: 150px; font-size: 26px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }

  .destaque-box { margin-top: auto; padding: .8em 1em; border-radius: 28px; font-size: .9em; line-height: 1.4; font-weight: 600; }
  .claro .destaque-box  { background: ${c.escuro}; color: ${c.texto_claro}; }
  .claro .destaque-box .hl { color: ${c.destaque}; background: none; padding: 0; }
  .escuro .destaque-box { background: ${c.destaque}; color: ${c.escuro}; }
  .escuro .destaque-box .hl { color: ${c.primaria}; }

  .passos { list-style: none; display: flex; flex-direction: column; gap: .62em; margin-bottom: .6em; }
  .passos li { display: flex; gap: .6em; align-items: flex-start; font-size: .95em; line-height: 1.35; }
  .passos .n { flex: 0 0 1.75em; height: 1.75em; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: .85em; }
  .claro .passos .n { background: ${c.primaria}; color: ${c.claro}; }
  .escuro .passos .n { background: ${c.destaque}; color: ${c.escuro}; }
  .passos .t { padding-top: .12em; }

  .lista { list-style: none; display: flex; flex-direction: column; gap: .55em; margin-bottom: .6em; }
  .lista li { position: relative; padding-left: 1.2em; font-size: .95em; line-height: 1.38; }
  .lista li::before { content: ''; position: absolute; left: 0; top: .48em; width: .5em; height: .5em; border-radius: 3px; }
  .claro .lista li::before { background: ${c.primaria}; }
  .escuro .lista li::before { background: ${c.destaque}; }

  .ad { display: flex; flex-direction: column; gap: .55em; }
  .ad-card { border-radius: 28px; padding: .8em .9em; }
  .ad-card h3 { font-size: .58em; letter-spacing: .16em; text-transform: uppercase; margin-bottom: .6em; font-weight: 800; }
  .ad-card ul { list-style: none; display: flex; flex-direction: column; gap: .42em; }
  .ad-card li { display: flex; gap: .5em; font-size: .78em; line-height: 1.35; }
  .ad-card li b { flex: 0 0 auto; font-weight: 800; }
  .ad-antes { background: ${c.claro_2}; color: ${c.suave_claro}; }
  .ad-antes li b { color: #B4472E; }
  .ad-depois { background: ${c.escuro}; color: ${c.texto_claro}; }
  .ad-depois h3 { color: ${c.destaque}; }
  .ad-depois li b { color: ${c.destaque}; }

  .numero .corpo { justify-content: center; font-size: 44px; }
  .grande { font-size: 6em; font-weight: 900; line-height: .95; letter-spacing: -.04em; margin-bottom: .2em; }
  .claro .grande { color: ${c.primaria}; }
  .escuro .grande { color: ${c.destaque}; }
  .fonte { margin-top: 1.2em; font-size: .55em; line-height: 1.4; }

  .cta .corpo { justify-content: center; font-size: 48px; }
  .cta .titulo { font-size: 1.9em; }
  .comente { margin-top: .9em; display: flex; align-items: center; gap: .5em; font-size: .9em; font-weight: 600; }
  .palavra { font-size: 1.25em; font-weight: 900; letter-spacing: .06em; padding: .3em .8em; border-radius: 22px; background: ${c.destaque}; color: ${c.escuro}; }

  .rodape { height: 128px; flex: 0 0 128px; display: flex; align-items: center; justify-content: space-between; border-top: 2px solid; font-size: 26px; font-weight: 600; }
  .escuro .rodape { border-color: ${c.escuro_2}; }
  .claro  .rodape { border-color: ${c.claro_2}; }
  .marca-nome { font-weight: 900; letter-spacing: .22em; font-size: 28px; }
  .logo { height: 54px; width: auto; }
  .progresso { position: absolute; left: 0; bottom: 0; height: 10px; z-index: 2; }
  .escuro .progresso { background: ${c.destaque}; }
  .claro  .progresso { background: ${c.primaria}; }
  `;
}

function conteudoSlide(s) {
  const titulo = s.titulo ? `<h1 class="titulo">${fmt(s.titulo)}</h1>` : '';
  const destaque = s.destaque ? `<div class="destaque-box">${fmt(s.destaque)}</div>` : '';
  const paragrafos = (t) => String(t ?? '').split(/\n\s*\n/).map((p) => `<p>${fmt(p.trim())}</p>`).join('');

  switch (s.tipo) {
    case 'capa':
      return `${titulo}${s.subtitulo ? `<p class="subtitulo suave">${fmt(s.subtitulo)}</p>` : ''}`;
    case 'texto':
      return `${titulo}<div class="texto">${paragrafos(s.texto)}</div>${destaque}`;
    case 'passos':
      return `${titulo}<ol class="passos">${(s.itens || [])
        .map((it, i) => `<li><span class="n">${i + 1}</span><span class="t">${fmt(it)}</span></li>`)
        .join('')}</ol>${destaque}`;
    case 'lista':
      return `${titulo}<ul class="lista">${(s.itens || []).map((it) => `<li>${fmt(it)}</li>`).join('')}</ul>${destaque}`;
    case 'antes_depois':
      return `${titulo}<div class="ad">
        <div class="ad-card ad-antes"><h3>${esc(s.rotulo_antes || 'Antes')}</h3><ul>${(s.antes || [])
          .map((it) => `<li><b>✕</b><span>${fmt(it)}</span></li>`)
          .join('')}</ul></div>
        <div class="ad-card ad-depois"><h3>${esc(s.rotulo_depois || 'Depois')}</h3><ul>${(s.depois || [])
          .map((it) => `<li><b>✓</b><span>${fmt(it)}</span></li>`)
          .join('')}</ul></div>
      </div>`;
    case 'numero':
      return `<div class="grande">${esc(s.numero)}</div><div class="texto">${paragrafos(s.texto)}</div>${
        s.fonte ? `<p class="fonte suave">Fonte: ${fmt(s.fonte)}</p>` : ''
      }`;
    case 'cta':
      return `${titulo}${s.texto ? `<div class="texto suave">${paragrafos(s.texto)}</div>` : ''}${
        s.palavra ? `<div class="comente">Comente <span class="palavra">${esc(s.palavra)}</span></div>` : ''
      }`;
    default:
      throw new Error(`Tipo de slide desconhecido: "${s.tipo}"`);
  }
}

const TEMA_PADRAO = { capa: 'escuro', cta: 'escuro', numero: 'escuro' };

function htmlSlide(s, i, total, marca, pilar) {
  const tema = s.tema || TEMA_PADRAO[s.tipo] || 'claro';
  const etiqueta = s.etiqueta ?? (s.tipo === 'capa' ? pilar : '');
  const pagina = `${String(i + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`;
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${css(marca)}</style></head>
  <body><div class="slide ${tema} ${s.tipo}">
    <div class="topo">${etiqueta ? `<span class="etiqueta">${esc(etiqueta)}</span>` : '<span></span>'}<span class="pagina suave">${pagina}</span></div>
    <div class="corpo">${conteudoSlide(s)}</div>
    ${s.tipo === 'capa' ? '<span class="arraste suave">Arraste →</span>' : ''}
    <div class="rodape">${logoHtml(marca)}<span class="suave">${esc(marca.arroba)}</span></div>
    <div class="progresso" style="width:${((i + 1) / total) * 100}%"></div>
  </div></body></html>`;
}

// Parte da fonte máxima do CSS e reduz até o conteúdo caber no slide.
async function ajustarTexto(page) {
  return page.evaluate(() => {
    const corpo = document.querySelector('.corpo');
    const maximo = parseFloat(getComputedStyle(corpo).fontSize);
    let tamanho = maximo;
    while (corpo.scrollHeight > corpo.clientHeight + 1 && tamanho > maximo * 0.55) {
      tamanho -= 1;
      corpo.style.fontSize = `${tamanho}px`;
    }
    return { cabe: corpo.scrollHeight <= corpo.clientHeight + 1, escala: tamanho / maximo };
  });
}

async function main() {
  const [entrada, saidaArg] = process.argv.slice(2);
  if (!entrada) {
    console.error('Uso: node gerar.mjs <carrossel.json> [pasta-de-saida]');
    process.exit(1);
  }
  const dados = JSON.parse(fs.readFileSync(entrada, 'utf8'));
  const marca = { ...JSON.parse(fs.readFileSync(path.join(AQUI, 'marca.json'), 'utf8')), ...(dados.marca || {}) };
  const slides = dados.slides || [];
  if (!slides.length) throw new Error('O JSON não tem slides.');
  if (slides.length > 20) throw new Error('O Instagram aceita no máximo 20 itens por carrossel.');
  if (slides.length > 10) console.warn('Aviso: pela API de publicação o limite é 10 itens; acima disso, poste pelo app.');

  const slug = dados.slug || path.basename(entrada, '.json');
  const saida = path.resolve(saidaArg || path.join(AQUI, '..', 'saida', slug));
  fs.mkdirSync(saida, { recursive: true });

  const { chromium } = carregarPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const arquivos = [];
  const imagens = [];

  for (let i = 0; i < slides.length; i++) {
    await page.setContent(htmlSlide(slides[i], i, slides.length, marca, dados.pilar), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const { cabe, escala } = await ajustarTexto(page);
    if (!cabe) {
      console.warn(`Aviso: o texto do slide ${i + 1} é longo demais e foi cortado. Encurte-o.`);
    } else if (escala < 0.75) {
      console.warn(`Aviso: o texto do slide ${i + 1} ficou pequeno para ler no celular. Encurte-o ou divida em dois slides.`);
    }
    const arq = path.join(saida, `${String(i + 1).padStart(2, '0')}.jpg`);
    imagens.push((await page.screenshot({ path: arq, type: 'jpeg', quality: 95 })).toString('base64'));
    arquivos.push(arq);
  }

  // Prévia: todos os slides em grade, para revisar e aprovar de uma vez.
  const porLinha = Math.min(4, arquivos.length);
  const tw = 360;
  const th = 450;
  const gap = 24;
  const pw = porLinha * tw + (porLinha + 1) * gap;
  const ph = Math.ceil(arquivos.length / porLinha) * (th + gap) + gap;
  await page.setViewportSize({ width: pw, height: ph });
  await page.setContent(
    `<html><body style="margin:0;background:#d9d6cc;display:flex;flex-wrap:wrap;gap:${gap}px;padding:${gap}px;width:${pw}px">${imagens
      .map((b64) => `<img src="data:image/jpeg;base64,${b64}" style="width:${tw}px;height:${th}px;border-radius:12px">`)
      .join('')}</body></html>`,
    { waitUntil: 'load' },
  );
  await page.screenshot({ path: path.join(saida, 'preview.jpg'), type: 'jpeg', quality: 85 });
  await browser.close();

  const hashtags = (dados.hashtags || []).join(' ');
  fs.writeFileSync(path.join(saida, 'legenda.txt'), `${dados.legenda || ''}${hashtags ? `\n\n${hashtags}` : ''}\n`);

  console.log(`${arquivos.length} slides gerados em ${saida}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
