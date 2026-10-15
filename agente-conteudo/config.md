# Configuração do motor de conteúdo — Vanguard

Itens marcados com [PREENCHER] dependem do Christian. Enquanto estiverem vazios, o agente usa o padrão indicado e avisa.

## Empresa
- Nome: Vanguard
- Instagram: @vanguard.mt.br (também em `carrossel/marca.json`)
- Responsável / rosto da marca: Christian Borges da Costa
- Site / WhatsApp / link da bio: [PREENCHER]
- Cidade / região de atuação: [PREENCHER — ex.: Mato Grosso e todo o Brasil, atendimento remoto]
- Proposta em uma frase: software sob medida, automações com IA, BI e controladoria para a gestão de empresas — com raiz no agro e experiência para qualquer setor.
- Posicionamento: o agro é a origem e um dos focos, **não o único**. Varejo e franquias, indústria e distribuição, serviços e construção também são público. Quem fala entende ao mesmo tempo de contabilidade e controladoria e de tecnologia — esse é o diferencial.

## Quem é o Christian (autoridade e bastidores)
Fonte: texto "Eu Profissional" escrito por ele (out/2026). LinkedIn: https://www.linkedin.com/in/christianborgesdacosta [PREENCHER: exportar o perfil em PDF e anexar para completar experiências e datas].
- Formação: Ciências Contábeis e Ciência da Computação.
- Carreira: grandes empresas do agronegócio em Mato Grosso, do operacional ao gerencial. Hoje é gerente de TI de um grupo de engenharia e construção (não citar o nome do empregador nos posts).
- Conhecimento de controladoria: análise contábil (balancete, DRE, apuração de custo, ativo imobilizado, ativo biológico, cadeia produtiva, industrialização); planejamento orçamentário (análise de mercado, acompanhamento de resultados, desvio de gastos — orçado × realizado); planejamento financeiro (fluxo de caixa, análise de investimentos).
- Conhecimento de tecnologia: ciência de dados (extrair, organizar e usar dados para decidir); BI com visões estratégicas e acompanhamento em tempo real para departamentos e diretoria; planejamento de infraestrutura de TI (melhor equipamento pelo melhor custo); relatórios customizados; notificações automáticas para monitorar a operação; envio automático de relatórios para gestores e diretores.
- Processos: analisa e desenha procedimentos e cria a documentação (POP, termos, políticas) e as ferramentas de apoio.
- Gestão de pessoas: liderança pelo exemplo; se descreve como calmo e paciente.
- Vida pessoal e família: não usar nos posts, a menos que o Christian peça.

## Público-alvo (para quem escrevemos)
1. Donos e gestores de empresas do agro: fazendas, revendas de insumos, armazéns, cooperativas, transportadoras, empresas de engenharia rural.
2. Varejo e franquias com várias lojas: estoque por loja, validade, transferências, inventário, equipe com perfis diferentes.
3. Indústria, distribuição, construção e serviços de médio porte com processos manuais repetitivos.
4. Controllers, gerentes financeiros, administrativos e de operações que vivem em planilha, e-mail e WhatsApp.
Dores que eles reconhecem: informação espalhada, retrabalho, falta de controle de custos e de estoque, orçado que ninguém compara com o realizado, relatório que depende de alguém montar, pendência que ninguém cobra, sistema de prateleira que não se encaixa na operação, medo de "IA cara e complicada".
Equilíbrio de setores nas pautas: cerca de metade agro e metade outros setores; temas de gestão (custo, estoque, orçamento, BI) devem servir para qualquer empresa.

## Serviços (o que a Vanguard vende)
- Software personalizado, conforme a demanda do cliente (sistemas internos, apps instaláveis no celular, painéis).
- Automações com inteligência artificial (agentes que leem, classificam, resumem e preparam respostas ou documentos).
- Integrações por API entre sistemas que já existem (ERP, planilhas, e-mail, Microsoft 365, WhatsApp).
- BI e painéis de gestão, com relatórios e alertas automáticos para gestores e diretoria.
- Controladoria aplicada: orçamento (orçado × realizado), fluxo de caixa, apuração de custo, DRE gerencial.
- Desenho de processos e documentação (POP, políticas) com ferramenta de apoio.
- Diagnóstico de processos: onde a automação dá retorno primeiro.
- [PREENCHER: faixa de preço ou modelo de contratação, se quiser divulgar]

## Cases e provas (só use o que está aqui; nunca invente resultado)
Regra: nome de cliente, de pessoa, de marca, valores e prints só com autorização registrada aqui. Sem autorização, descreva o case de forma anônima ("uma empresa do agro em MT", "uma rede de lojas franqueadas").

1. **Agente de triagem de e-mails com IA (Microsoft 365)** — anônimo
   - O que faz: lê a caixa do gestor desde a última execução, cruza com a agenda dos próximos 2 dias, classifica por prioridade (crítica, alta, média, baixa) com as regras dele, resume, aponta prazo e próxima ação, lista o que ele cobrou e não responderam e deixa rascunhos no tom dele. Tem memória: aprende com as correções.
   - Segurança: somente leitura (não envia, não apaga, não encaminha); RH e jurídico só como aviso; alerta de golpe para remetente desconhecido; ignora instruções escondidas em e-mails.
   - Correções reais aprendidas (01/10/2026), para contar sem nomes: aviso de "regra de encaminhamento criada" numa caixa → baixa só para aquela caixa, porque quem criou foi o gestor; códigos de verificação de um serviço configurado pelo gestor → baixa, sem nunca repetir os códigos.
   - Números de resultado: [PREENCHER se tiver, ex.: tempo economizado por dia]
   - Divulgação: [CONFIRMAR: pode ser citado de forma anônima? sim/não]
2. **Este próprio motor de conteúdo** — pesquisa pautas, escreve roteiros e gera as artes da Vanguard com IA. Pode ser contado como bastidor ("a gente usa no nosso marketing o que vende para o cliente").
3. **Sistema de gestão de estoque multi-filial para uma franqueada do varejo de chocolates** — desenvolvido do zero pelo Christian (repositório `cbcfilho/gestao-estoque`)
   - Contexto: 5 lojas, uma delas com cafeteria. App web instalável no celular.
   - O que faz: saldo por filial → local (depósito, loja, cafeteria) → lote → validade; leitura de código de barras pelo celular; saída por FEFO (vence primeiro, sai primeiro); custo por média ponderada.
   - Transferências entre lojas com confirmação de recebimento: o saldo sai da origem no envio e só entra no destino quando alguém confirma — a diferença vira perda registrada e rastreável.
   - Inventário com contagem cega: quem conta não vê o saldo do sistema (a trava é no banco de dados, não só na tela); o gestor aprova e o ajuste é feito pela diferença apurada.
   - Contagem sem internet: no depósito sem sinal, as leituras ficam no aparelho e sobem quando a conexão volta.
   - Importação diária de planilha do sistema antigo com duas travas contra importar o mesmo arquivo duas vezes.
   - Quadro de atividades que abre tarefas sozinho: reposição abaixo do mínimo, produto vencendo, inventário mensal, fechamento de ponto. Relatório de vencimentos enviado automaticamente.
   - Segurança: 5 perfis de acesso configuráveis (franqueado, gerente de filial, operador, cafeteria, auditor), permissões aplicadas no banco de dados, verificação em duas etapas e trilha de auditoria.
   - Números de resultado: [PREENCHER se tiver, ex.: perda identificada, tempo de inventário antes e depois]
   - Divulgação: [CONFIRMAR: pode citar a marca da franquia? Padrão: anônimo — "uma franqueada com 5 lojas de chocolates"; nunca mostrar telas com dados reais]
4. **Automações por API** — [PREENCHER: lista dos projetos (o que integrava com o quê, o problema, o resultado, se pode citar)]
5. **Experiência como gestor** (não é case de cliente; serve para autoridade): BI em tempo real para diretoria, relatórios customizados, notificações automáticas e envio automático de relatórios para gestores, desenho de processos com POP e políticas.

## Pilares de conteúdo (rodízio semanal)
| Pilar | Objetivo | Exemplos de pauta |
|---|---|---|
| 1. IA na prática | Educar sem jargão | "O que é um agente de IA, explicado com um armazém de grãos" |
| 2. Gestão na prática (agro, varejo, indústria) | Mostrar que entendemos a dor: custo, estoque, orçamento, compras, caixa | "Inventário com contagem cega"; "Orçado × realizado"; "5 sinais de que sua empresa depende demais de planilha" |
| 3. Cases e bastidores | Provar que funciona | Antes e depois de uma automação; como um projeto foi feito |
| 4. Notícias e tendências | Autoridade e atualidade | Notícia da semana (agro, varejo, tributário, tecnologia) + "o que isso muda para o seu negócio" |
| 5. Quem faz | Confiança e conexão | O Christian: de contador a desenvolvedor, a rotina, erros e aprendizados |

Equilíbrio sugerido por mês: 25% pilar 1, 30% pilar 2, 25% pilar 3, 10% pilar 4, 10% pilar 5.

## Calendário inicial (ajustar com os números da conta)
- Frequência: 3 posts no feed por semana + stories nos dias úteis.
  - Segunda: carrossel educativo (pilar 1 ou 2)
  - Quarta: reel (case, bastidor ou dica rápida)
  - Sexta: carrossel de notícia comentada (pilar 4) ou case
- Horários iniciais para testar (horário de Brasília): 6h30–7h30 (o produtor acorda cedo), 12h–13h e 19h–20h30. Depois de 4 semanas, usar os horários que mais deram alcance na própria conta (estado.json → `aprendizados`).

## Captação de leads (o objetivo final de cada post)
- Palavra-chave de comentário por post (ex.: AGENTE, ESTOQUE, COTAÇÃO, DIAGNÓSTICO). Quem comenta recebe por DM o link do diagnóstico.
- Oferta de entrada: [PREENCHER — padrão: "Diagnóstico gratuito de 30 minutos: mostramos 3 processos da sua empresa que dá para automatizar". Enquanto não for confirmada, o CTA não promete gratuidade.]
- Isca digital (opcional): [PREENCHER — ex.: PDF "10 rotinas do escritório que dá para automatizar com IA"]
- Link de contato: [PREENCHER: WhatsApp com mensagem pronta ou formulário]

## Fontes de pesquisa (notícias e tendências)
Agro: Canal Rural, Globo Rural, Agrolink, Notícias Agrícolas, AgFeed, Forbes Agro, Embrapa, CNA, Conab, MAPA.
Varejo e franquias: ABF (Associação Brasileira de Franchising), SBVC, Mercado & Consumo, Exame PME, Sebrae.
Gestão, contabilidade e tributário: CFC, Receita Federal, portais de reforma tributária, Valor Econômico.
Tecnologia e IA: Startupi, Olhar Digital, Exame (tecnologia), MIT Technology Review Brasil, blogs oficiais de Microsoft, Google, Anthropic e OpenAI.
Dados de mercado: Radar Agtech Brasil, Cetic.br, Sebrae, IBGE, PwC, McKinsey.
Referências de perfis para observar (não copiar): [PREENCHER: perfis de concorrentes e de quem você admira]

## Hashtags base (escolher 5 a 10 por post)
Geral: #gestaoempresarial #inteligenciaartificial #automacao #agentesdeia #produtividade #softwarepersonalizado #transformacaodigital #bi #controladoria
Agro: #agronegocio #agro #gestaorural #agtech #tecnologianoagro
Varejo: #varejo #franquias #gestaodeestoque
Finanças: #fluxodecaixa #custos #planejamentofinanceiro

## Identidade visual
Cores, nome, @ e logo do carrossel ficam em `carrossel/marca.json`.
- Cores: tiradas da logo — azul-marinho (#0A1A2F fundo, #1C5D96 azul) e ciano (#3CC8E8 destaque).
- Logo: `carrossel/logo.png` (128 px, fundo transparente). Aparece no rodapé de todos os slides e no slide final. [PREENCHER: enviar versão em alta resolução (SVG ou PNG de 1000 px) para ficar mais nítida]
