import blog from "../imgs/banner2.png";
import b1 from "../imgs/blog/1.png";
import b2 from "../imgs/blog/2.png";
import b3 from "../imgs/blog/3.png";
import b4 from "../imgs/blog/4.png";

const articles = [
  {
    id: 1,
    date: "15 de março de 2023",
    author: "João Afonso Katombela",
    title: "A Importância do Feedback na Melhoria Contínua",
    coverImage: blog,
    tags: ["Feedback", "MelhoriaContínua", "Empresas"],
    content: `
      Em um mundo empresarial cada vez mais competitivo, a busca por excelência é constante. Neste artigo, exploramos a importância do feedback na melhoria contínua das empresas. Discutimos como ouvir as opiniões dos clientes pode ser uma ferramenta poderosa para aprimorar produtos, serviços e a experiência geral do cliente. Destacamos também casos de sucesso em que empresas transformaram críticas construtivas em oportunidades para inovação.
    `,
  },
  {
    id: 2,
    date: "22 de março de 2023",
    author: "João Afonso Katombela",
    title:
      "Desmistificando Avaliações: Como Interpretar Classificações Empresariais",
    coverImage: b1,
    tags: ["Avaliações", "Empresas", "Interpretação"],
    content: `
      Com a proliferação de plataformas de avaliações online, entender as classificações empresariais tornou-se crucial. Este artigo tem como objetivo desmistificar as avaliações, fornecendo insights sobre como interpretar classificações e comentários. Exploramos a influência das avaliações nas decisões dos consumidores e oferecemos dicas práticas para empresas gerenciarem e melhorarem sua reputação online.
    `,
  },
  {
    id: 3,
    date: "5 de abril de 2023",
    author: "João Afonso Katombela",
    title: "O Impacto das Avaliações na Decisão de Compra do Consumidor",
    coverImage: b2,
    tags: ["Avaliações", "Consumidores", "Compras"],
    content: `
      No cenário atual, as decisões de compra dos consumidores são fortemente influenciadas por avaliações online. Neste artigo, analisamos como as avaliações afetam o comportamento do consumidor durante o processo de compra. Abordamos a confiança nas avaliações, a importância das respostas às críticas e estratégias que as empresas podem adotar para construir uma reputação sólida e positiva.
    `,
  },
  {
    id: 4,
    date: "18 de abril de 2023",
    author: "João Afonso Katombela",
    title:
      "Inovações em Atendimento ao Cliente: Tendências para Empresas em 2023",
    coverImage: b3,
    tags: ["AtendimentoAoCliente", "Inovação", "Empresas"],
    content: `
      O atendimento ao cliente é um diferencial competitivo fundamental. Neste artigo, exploramos as tendências de inovação em atendimento ao cliente para empresas em 2023. Discutimos tecnologias emergentes, como chatbots e inteligência artificial, e como elas estão moldando a forma como as empresas interagem com os clientes. Além disso, destacamos casos de sucesso que demonstram a implementação bem-sucedida dessas inovações.
    `,
  },
  {
    id: 5,
    date: "2 de maio de 2023",
    author: "João Afonso Katombela",
    title: "Construindo uma Reputação Empresarial Sólida: Estratégias Práticas",
    coverImage: b4,
    tags: ["ReputaçãoEmpresarial", "Estratégias", "Empresas"],
    content: `
      A reputação de uma empresa desempenha um papel crucial em seu sucesso a longo prazo. Neste artigo, fornecemos estratégias práticas para construir e manter uma reputação empresarial sólida. Exploramos a importância da transparência, da responsabilidade social corporativa e da gestão proativa da reputação. Com insights valiosos, ajudamos empresas a entender como construir a confiança dos clientes e se destacar em um mercado competitivo.
    `,
  },
  // Adicione mais artigos conforme necessário
];

export default articles;
