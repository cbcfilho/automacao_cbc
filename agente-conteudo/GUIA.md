# Motor de conteúdo da Vanguard — passo a passo

O objetivo é o mesmo do vídeo que você viu: um agente que **pesquisa → escreve → cria a arte → edita o vídeo → publica (com o seu OK) → mede → monta a newsletter**. Ele é montado em fases, para você começar a postar já nesta semana e ir automatizando o resto.

| Etapa | Quem faz hoje | Situação |
|---|---|---|
| 1. Pesquisar pautas | Agente (Claude + busca na web) | ✅ Pronto |
| 2. Escrever (carrossel, legenda, reel, LinkedIn, stories, blog) | Agente, no seu tom | ✅ Pronto |
| 3. Criar a arte do carrossel | Agente (`carrossel/gerar.mjs`) | ✅ Pronto |
| 4. Editar o vídeo | Você no CapCut, com roteiro do agente | 🔜 Fase 4 |
| 5. Publicar | Você agenda no Meta Business Suite | 🔜 Fase 3 (automático após "APROVADO") |
| 6. Captar leads por DM | — | 🔜 Fase 2 |
| 7. Medir e montar a newsletter | Agente, com os números que você colar | 🔜 Fase 5 (automático pela API) |

---

## Fase 0 — Preparar a conta e a marca (você, cerca de 1 hora)

1. **Instagram profissional**: confira em Configurações → Tipo de conta e ferramentas que a conta é *Empresa* (ou *Criador de conteúdo*).
2. **Vincule uma Página do Facebook** da Vanguard à conta (Central de Contas). Isso libera o agendamento gratuito no Meta Business Suite e ferramentas de DM automática.
3. **Bio** (sugestão para ajustar):
   > Software sob medida e IA para a gestão do agro 🌾
   > Automatizamos o que hoje depende de planilha, e-mail e memória.
   > 👇 Diagnóstico gratuito
   Link: WhatsApp com mensagem pronta (`https://wa.me/55DDDNUMERO?text=Quero%20o%20diagn%C3%B3stico`).
4. **Preencha os arquivos** (procure por `[PREENCHER]`):
   - `config.md`: @, link, região, serviços, **cases que já entregou** (o que era o problema, o que foi feito, resultado, se pode citar).
   - `estilo.md`: cole 3 a 5 textos reais seus (legendas, posts do LinkedIn, mensagens). É isso que deixa o texto com a sua cara.
   - `carrossel/marca.json`: o @ real, as cores oficiais (se houver) e o logo (salve o arquivo em `carrossel/` e coloque o nome em `"logo"`).

## Fase 1 — Pautas, textos e artes (pronto para usar)

Rode do mesmo jeito que o agente de e-mail: abra uma sessão do Claude neste repositório e peça.

| Você diz | O agente entrega |
|---|---|
| "Leia `agente-conteudo/prompt.md` e rode as pautas da semana" | 5 pautas com gancho, fonte e palavra-chave de CTA |
| "Escreve a pauta 3" | Pasta em `conteudos/` com carrossel, legenda, roteiro de reel, LinkedIn e stories |
| "Gera o carrossel" | Imagens 1080×1350 em `saida/<pauta>/` + prévia para aprovar |
| "Muda o slide 4 para…" / "Esse tom ficou formal demais" | Ajusta e grava a correção na memória |

Gerar as artes manualmente, se quiser:
```bash
node agente-conteudo/carrossel/gerar.mjs agente-conteudo/conteudos/2026-10-13-case-agente-email/carrossel.json
```
Precisa de Node 18+ e do Playwright (`npm install -g playwright && npx playwright install chromium`). Nas sessões do Claude na nuvem isso já vem instalado.

**Para publicar nesta fase** (gratuito): Meta Business Suite → Criar publicação → selecione o Instagram → adicione as imagens `01.jpg…07.jpg` na ordem → cole o `legenda.txt` → **Agendar** no horário sugerido.

**Rodar sozinho toda semana**: dá para criar uma tarefa agendada no Claude (ex.: toda segunda às 6h45 com o pedido "rode as pautas da semana"). Você abre o app e as pautas já estão lá.

## Fase 2 — Transformar comentário em lead (você + 1 ferramenta, cerca de 2 horas)

É o "comenta MOTOR que eu te mando o link" do vídeo. Funciona assim: a pessoa comenta a palavra-chave → recebe automaticamente uma DM com o link → o link leva ao seu WhatsApp ou a um formulário.

1. Crie conta no **ManyChat** (parceiro oficial da Meta, tem plano gratuito para começar) e conecte o Instagram.
2. Crie uma automação "Comentário com palavra-chave" para cada CTA (AGENTE, PLANILHA, DIAGNÓSTICO…). Resposta: uma mensagem curta + o link do diagnóstico.
3. Defina a **oferta de entrada** em `config.md` (padrão sugerido: diagnóstico gratuito de 30 minutos com 3 processos que dá para automatizar).
4. Registre cada lead numa planilha (nome, empresa, segmento, de qual post veio). O relatório semanal usa isso para mostrar quais posts geram cliente — não só curtida.

## Fase 3 — Publicação automática com o seu OK (eu construo com você)

O agente só publica depois que você responder **APROVADO** para aquele post específico.

O que você faz (uma vez, cerca de 30 minutos):
1. Entre em [developers.facebook.com](https://developers.facebook.com) com o seu Facebook → **Criar app** → tipo *Empresa*.
2. Adicione o produto **Instagram** → configuração da API *com login do Instagram* → conecte a conta da Vanguard.
3. Gere o token com as permissões `instagram_business_basic`, `instagram_business_content_publish`, `instagram_business_manage_insights` e `instagram_business_manage_comments`.
4. Guarde o token como **segredo do ambiente** do Claude (nunca dentro do repositório) e me avise.

O que eu construo em seguida (`publicar.mjs`):
- Sobe as imagens para um endereço público (a API exige URL pública e JPEG — o Supabase Storage, que você já tem conectado, resolve).
- Cria o carrossel pela API (até 10 imagens por post) e publica ou agenda.
- Confere o limite diário da conta antes de publicar e registra o post em `estado.json`.

Documentação oficial: [Content Publishing — Instagram Platform](https://developers.facebook.com/docs/instagram-platform/content-publishing).

## Fase 4 — Edição de vídeo automática

**Para começar já (sem código):** grave o reel seguindo o roteiro do agente (celular na vertical, luz de frente, 30 a 60 s) e edite no **CapCut** (legenda automática, gratuito). Se quiser acelerar, ferramentas pagas como **Submagic** ou **Descript** cortam pausas e vícios de linguagem e colocam legendas animadas sozinhas.

**Automação própria (próxima etapa):** um script que recebe o vídeo bruto e devolve pronto: corta silêncios, transcreve, queima as legendas com as cores da Vanguard, põe o título no começo e o logo no fim, em 1080×1920. Usa ffmpeg + transcrição automática (Whisper). Para construir, preciso de 1 ou 2 vídeos seus gravados de teste.

## Fase 5 — Métricas, painel e newsletter

- **Toda sexta**: peça "relatório da semana". Até a API estar ligada, cole os números do Instagram (ou mande prints). Com a API (Fase 3), o agente lê sozinho.
- O agente grava os números em `estado.json`, tira aprendizados ("carrossel de case salva 2x mais") e usa isso nas próximas pautas e horários.
- **Painel**: quando houver 3 ou 4 semanas de dados, dá para montar uma página com gráficos de alcance, salvamentos e leads por post.
- **Newsletter**: peça "monta a newsletter". Sai como rascunho (LinkedIn ou e-mail) — nada é enviado sem você.

---

## Sua rotina semanal (cerca de 1 hora)

| Dia | Você | Agente |
|---|---|---|
| Segunda, 7h | Escolhe 3 das 5 pautas (5 min) | Entrega as pautas |
| Segunda | Revisa e responde APROVADO (20 min) | Escreve tudo e gera as artes |
| Segunda | Agenda no Business Suite (10 min) — automático na Fase 3 | — |
| Quarta | Grava o reel (15 min) | Entrega roteiro e, na Fase 4, edita |
| Sexta | Lê o relatório (10 min) | Relatório + newsletter |

## Expectativas realistas

- **Consistência vence volume**: 3 posts por semana durante 90 dias valem mais que 10 posts numa semana e depois nada.
- No B2B do agro, a conta cresce mais devagar que perfis de entretenimento, mas **cada seguidor vale mais**. Acompanhe salvamentos, compartilhamentos, DMs e leads — não só seguidores.
- Comece pelos **cases e pelos conteúdos de dor** (pilares 2 e 3): é o que faz um gestor pensar "isso é para mim".
- O agente **nunca inventa números nem cases**. Quanto mais cases reais você colocar em `config.md`, melhor o conteúdo.

## Custos

| Item | Custo |
|---|---|
| Claude (pesquisa, texto, artes, publicação) | Seu plano atual |
| Meta Business Suite (agendar) e API do Instagram | Gratuito |
| ManyChat (DM automática) | Gratuito para começar |
| CapCut | Gratuito (Submagic / Descript são opcionais e pagos) |
