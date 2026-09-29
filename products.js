/* Catálogo demonstrativo da Vale Frio.
   Para trocar uma foto, altere o código correspondente em PHOTOS
   ou aponte "img" para um arquivo local em assets/img/. */
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=720&q=70`;

const PHOTOS = {
  cervejaLata: unsplash("1584225064785-c62a8b43d148"),
  cervejaGarrafa: unsplash("1608270586620-248524c67de9"),
  cervejaCopo: unsplash("1535958636474-b021ee887b13"),
  refriLata: unsplash("1622483767028-3f66f32aef97"),
  refriGarrafa: unsplash("1629203851122-3726ecdf080e"),
  aguaGarrafa: unsplash("1548839140-29a749e1cf4d"),
  aguaCopo: unsplash("1523362628745-0c100150b504"),
  energetico: unsplash("1622543925917-763c34d1a86e"),
  sucoLaranja: unsplash("1600271886742-f049cd451bba"),
  sucoVariado: unsplash("1622597467836-f3285f2131b8"),
  destilados: unsplash("1569529465841-dfecdab7503b"),
  destiladoBar: unsplash("1527281400683-1aae777175f8"),
  gelo: unsplash("1470337458703-46ad1756a187"),
  vinho: unsplash("1510812431401-41d2bd2722f3"),
};

const CATEGORIES = [
  "Cervejas", "Refrigerantes", "Águas", "Energéticos",
  "Sucos", "Sem álcool", "Destilados", "Gelo", "Outros",
];

const PRODUCTS = [
  { name: "Cerveja Pilsen Lata 350 ml", category: "Cervejas", img: PHOTOS.cervejaLata, featured: true,
    desc: "Leve, refrescante e gelada. A campeã de bares e churrascos.", info: ["Fardo com 12 unidades", "Atacado e varejo"] },
  { name: "Cerveja Long Neck 355 ml", category: "Cervejas", img: PHOTOS.cervejaGarrafa,
    desc: "Garrafa long neck para servir direto do gargalo ou no copo.", info: ["Caixa com 24 unidades", "Retornável sob consulta"] },
  { name: "Cerveja Premium Puro Malte 600 ml", category: "Cervejas", img: PHOTOS.cervejaCopo,
    desc: "Sabor encorpado e espuma cremosa para compartilhar à mesa.", info: ["Garrafa 600 ml", "Servir bem gelada"] },

  { name: "Refrigerante Cola 2 L", category: "Refrigerantes", img: PHOTOS.refriGarrafa, featured: true,
    desc: "O clássico de todas as festas, sempre em estoque.", info: ["Fardo com 6 unidades", "Garrafa PET"] },
  { name: "Refrigerante Guaraná 2 L", category: "Refrigerantes", img: PHOTOS.refriGarrafa,
    desc: "Sabor brasileiro que combina com qualquer refeição.", info: ["Fardo com 6 unidades", "Garrafa PET"] },
  { name: "Refrigerante em Lata 350 ml", category: "Refrigerantes", img: PHOTOS.refriLata,
    desc: "Praticidade para lanchonetes, eventos e geladeiras de escritório.", info: ["Fardo com 12 unidades", "Vários sabores"] },

  { name: "Água Mineral sem Gás 500 ml", category: "Águas", img: PHOTOS.aguaGarrafa,
    desc: "Água mineral leve e pura para o dia a dia e para eventos.", info: ["Fardo com 12 unidades", "Sem gás"] },
  { name: "Água Mineral com Gás 500 ml", category: "Águas", img: PHOTOS.aguaCopo,
    desc: "Refrescante e borbulhante, ótima para acompanhar refeições.", info: ["Fardo com 12 unidades", "Com gás"] },
  { name: "Galão de Água Mineral 20 L", category: "Águas", img: PHOTOS.aguaGarrafa,
    desc: "Abastecimento para casa, escritório e comércio.", info: ["Galão de 20 litros", "Entrega recorrente"] },

  { name: "Energético 473 ml", category: "Energéticos", img: PHOTOS.energetico, featured: true,
    desc: "Lata grande para quem precisa de energia no trabalho, no treino ou na balada.", info: ["Fardo com 6 unidades", "Servir gelado"] },
  { name: "Energético 250 ml", category: "Energéticos", img: PHOTOS.energetico,
    desc: "Formato individual, prático para carregar e vender no balcão.", info: ["Fardo com 24 unidades", "Atacado"] },

  { name: "Suco de Laranja Integral 1 L", category: "Sucos", img: PHOTOS.sucoLaranja,
    desc: "Suco de fruta com sabor natural, ideal para café da manhã e cardápios.", info: ["Caixa com 6 unidades", "Manter refrigerado"] },
  { name: "Néctar de Uva 1 L", category: "Sucos", img: PHOTOS.sucoVariado,
    desc: "Doce na medida, agrada crianças e adultos em qualquer ocasião.", info: ["Caixa com 6 unidades", "Serve com gelo"] },

  { name: "Cerveja Zero Álcool 350 ml", category: "Sem álcool", img: PHOTOS.cervejaLata,
    desc: "O sabor de cerveja para quem dirige ou prefere ficar sem álcool.", info: ["Fardo com 12 unidades", "0,0% de álcool"] },
  { name: "Isotônico 500 ml", category: "Sem álcool", img: PHOTOS.aguaGarrafa,
    desc: "Reposição de líquidos e sais minerais para esporte e calor.", info: ["Fardo com 12 unidades", "Vários sabores"] },

  { name: "Vodka 900 ml", category: "Destilados", img: PHOTOS.destiladoBar, featured: true,
    desc: "Destilado neutro e versátil para drinks, caipirinhas e coquetéis.", info: ["Garrafa 900 ml", "Maiores de 18 anos"] },
  { name: "Whisky 1 L", category: "Destilados", img: PHOTOS.destilados,
    desc: "Para servir puro, com gelo ou em drinks clássicos.", info: ["Garrafa 1 litro", "Maiores de 18 anos"] },
  { name: "Cachaça Artesanal 700 ml", category: "Destilados", img: PHOTOS.destiladoBar,
    desc: "Cachaça de alambique com aroma suave, boa para caipirinha ou dose pura.", info: ["Garrafa 700 ml", "Maiores de 18 anos"] },

  { name: "Gelo em Cubos 5 kg", category: "Gelo", img: PHOTOS.gelo,
    desc: "Gelo filtrado embalado, pronto para drinks, cervejas e caixas térmicas.", info: ["Pacote de 5 kg", "Entrega refrigerada"] },
  { name: "Gelo Filtrado 2 kg", category: "Gelo", img: PHOTOS.gelo,
    desc: "Pacote menor para o dia a dia de casa e pequenos comércios.", info: ["Pacote de 2 kg", "Pronto para uso"] },

  { name: "Vinho Tinto Suave 750 ml", category: "Outros", img: PHOTOS.vinho,
    desc: "Vinho de mesa suave para almoços em família e confraternizações.", info: ["Garrafa 750 ml", "Maiores de 18 anos"] },
  { name: "Copos Descartáveis 300 ml", category: "Outros", img: PHOTOS.cervejaCopo,
    desc: "Pacote com 100 unidades para festas, eventos e delivery.", info: ["Pacote com 100 unidades", "Atacado"] },
];
