# Casa Bem Otto — landing page premium de conversão

## Resultado
Construir uma landing page mobile-first, acolhedora e sofisticada para gerar pedidos de orçamento, catálogo e atendimento. A página usará exclusivamente os materiais reais adequados encontrados no Drive: 35 fotos do showroom/produtos e a marca oficial. O Drive já foi desconectado após o download, conforme solicitado.

## Direção visual
- Verde principal `#00583A`, off-white quente, areia, madeira, cinza-esverdeado e grafite suave.
- Tipografia editorial elegante nos títulos e sans-serif muito legível nos textos.
- Composição de revista de interiores: grandes recortes fotográficos, assimetria equilibrada e bastante respiro.
- Liquid glass restrito à navegação, formulário do topo, indicadores e pequenos elementos flutuantes.
- Imagens do showroom apresentadas com enquadramentos que preservem móveis e detalhes; nenhuma imagem genérica será adicionada.
- Movimento discreto por CSS e Intersection Observer, com redução automática para quem prefere menos animação.

## Estrutura da página
1. **Navegação:** marca real, links por seção, seção ativa durante a rolagem, transformação progressiva em barra sticky clara e menu móvel acessível com bloqueio de fundo.
2. **Abertura:** imagem real, mensagem principal fornecida, benefícios, prova dos 42 anos/+40 mil clientes, dois CTAs e formulário de catálogo/atendimento.
3. **Conceito Casa Bem Otto:** composição editorial com fotos reais, filosofia e três pilares.
4. **Categorias:** cinco categorias com imagens reais; grid editorial em telas grandes e carrossel com scroll snap e progresso no celular.
5. **Comparativo:** tabela clara no desktop e cartões verticais no celular, com os seis critérios fornecidos.
6. **Confiança:** números reais, depoimentos identificados visualmente como conteúdo provisório, sem inventar nomes ou avaliações, e galeria de inspirações reais.
7. **Pós-venda:** bloco curto e forte sobre acompanhamento e assistência.
8. **Conversão final:** formulário completo em fundo verde e CTA para consultoria.
9. **Rodapé:** marca, links, Instagram, razão social disponível e ano atual; sem endereço, telefone, CNPJ ou horário inventados.
10. **Privacidade:** banner de cookies com aceitar, recusar e gerenciar; páginas próprias de Política de Privacidade e Política de Cookies em português.

## Conversão e funcionamento
- Todos os CTAs terão destino real: formulário correspondente; ações de WhatsApp também irão ao formulário enquanto não houver número configurado.
- Formulários com validação acessível, máscara brasileira de WhatsApp, estados de envio/sucesso e captura de UTMs na sessão do formulário.
- Envios funcionarão como demonstração local segura, sem armazenar dados e sem prometer contato efetivo; a estrutura ficará preparada para integração futura com WhatsApp, CRM ou e-mail.
- CTAs de catálogo e orçamento selecionarão automaticamente a intenção correta no formulário.
- Banner de cookies salvará apenas a preferência essencial no navegador; nenhum rastreador não essencial será carregado.

## Materiais e performance
- Selecionar as melhores imagens por seção após inspeção visual do acervo.
- Gerar versões AVIF/WebP responsivas para celular, tablet e desktop, mantendo JPEG somente como fallback quando necessário.
- Priorizar a imagem principal; aplicar lazy loading no restante; definir dimensões e proporções para evitar deslocamentos.
- Hospedar os materiais otimizados no fluxo de assets do projeto.
- Evitar bibliotecas pesadas: ícones leves, animações CSS e observadores nativos.

## Acessibilidade e SEO
- Estrutura semântica, uma única H1, ordem correta de títulos, labels visíveis, mensagens de erro associadas e foco evidente.
- Menu operável por teclado, fechamento por Escape, retorno de foco e áreas de toque confortáveis.
- Metadados próprios para a página inicial e para as duas políticas, incluindo title, description, Open Graph, canonical e Twitter Card.
- Favicon derivado da marca real.

## Validação final
- Testar visualmente em 320, 375, 390, 430, 768, 1024, 1280 e 1440 px, além de tela ampla.
- Verificar navegação sticky, indicador de seção, menu móvel, âncoras, CTAs, ambos os formulários, validações, sucesso, preferências de cookies e páginas legais.
- Confirmar ausência de rolagem horizontal, sobreposições, cortes ruins, conteúdo dependente de hover e erros no navegador.
- Confirmar prioridade/lazy loading das imagens, estabilidade visual e comportamento com redução de movimento.
