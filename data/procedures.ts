import type { Media } from "./media";
import { ref } from "./references";
import { l, type L } from "@/lib/i18n";

/**
 * ESPECIALIDADES / PROCEDIMIENTOS
 *
 * - Cada procedimiento genera su página en /[idioma]/body-modification/[slug]
 *   y su opción en el sistema de reservas.
 * - Los textos son informativos y generales. Las indicaciones definitivas
 *   (riesgos, cuidados, tiempos) se dan SIEMPRE en la consulta individual.
 * - `offered: false` oculta el procedimiento si Rou deja de realizarlo.
 */

export type Procedure = {
  slug: string;
  number: string;
  name: string;
  fullName: string;
  kicker: L;
  short: L;
  intro: L[];
  offered: boolean;
  cover: Media;
  gallery: Media[];
  facts: { label: L; value: L }[];
  process: { title: L; text: L }[];
  considerations: L[];
  aftercare: L[];
  faq: { q: L; a: L }[];
};

const ph = (slug: string, n: number, hint: string, refKey?: Parameters<typeof ref>[0]): Media => ({
  src: null,
  alt: l(`Trabajo de ${slug.replace(/-/g, " ")} — ${n}`, `${slug.replace(/-/g, " ")} work — ${n}`, `Trabalho de ${slug.replace(/-/g, " ")} — ${n}`),
  hint,
  ref: refKey ? ref(refKey) : undefined,
});

// Hechos y pasos que se repiten
const F = {
  permanent: { label: l("Tipo", "Type", "Tipo"), value: l("Modificación permanente", "Permanent modification", "Modificação permanente") },
  evalRequired: { label: l("Evaluación previa", "Prior assessment", "Avaliação prévia"), value: l("Obligatoria", "Mandatory", "Obrigatória") },
  duration: {
    label: l("Duración / recuperación", "Duration / recovery", "Duração / recuperação"),
    value: l("Se define en la consulta según cada caso", "Defined at the consultation for each case", "Definida na consulta para cada caso"),
  },
  age: { label: l("Edad mínima", "Minimum age", "Idade mínima"), value: l("18 años", "18 years", "18 anos") },
  custom: { label: l("Diseño", "Design", "Design"), value: l("Personalizado", "Custom", "Personalizado") },
};

const P = {
  consult: (text: L) => ({ title: l("Consulta", "Consultation", "Consulta"), text }),
  consent: (text: L) => ({ title: l("Consentimiento", "Consent", "Consentimento"), text }),
  procedure: {
    title: l("Procedimiento", "Procedure", "Procedimento"),
    text: l(
      "Realizado en condiciones de higiene y bioseguridad profesionales.",
      "Performed under professional hygiene and biosafety conditions.",
      "Realizado em condições profissionais de higiene e biossegurança.",
    ),
  },
  session: {
    title: l("Sesión", "Session", "Sessão"),
    text: l(
      "Realizada en condiciones de higiene y bioseguridad profesionales.",
      "Performed under professional hygiene and biosafety conditions.",
      "Realizada em condições profissionais de higiene e biossegurança.",
    ),
  },
  follow: (text: L) => ({ title: l("Seguimiento", "Follow-up", "Acompanhamento"), text }),
  design: (text: L) => ({ title: l("Diseño", "Design", "Design"), text }),
};

const CONSENT_STD = l(
  "Información de riesgos, alternativas y cuidados. Firma de consentimiento informado.",
  "Information on risks, alternatives and aftercare. Signing of informed consent.",
  "Informação sobre riscos, alternativas e cuidados. Assinatura do consentimento informado.",
);
const CARE_CONTACT = l(
  "Consultar ante cualquier signo fuera de lo esperado.",
  "Get in touch at any sign that is not as expected.",
  "Entre em contato diante de qualquer sinal fora do esperado.",
);
const CARE_PROTOCOL = l(
  "Seguir el protocolo de limpieza indicado.",
  "Follow the cleaning protocol provided.",
  "Siga o protocolo de limpeza indicado.",
);
const PERMANENT_MARK = l("Es una modificación permanente.", "It is a permanent modification.", "É uma modificação permanente.");

export const procedures: Procedure[] = [
  {
    slug: "tongue-split",
    number: "01",
    name: "Tongue Split",
    fullName: "Tongue Splitting",
    kicker: l("Bifurcación de lengua", "Tongue bifurcation", "Bifurcação de língua"),
    short: l(
      "División de la lengua en dos partes independientes. Una de las modificaciones más icónicas de la cultura.",
      "Dividing the tongue into two independent halves. One of the most iconic modifications in the culture.",
      "Divisão da língua em duas partes independentes. Uma das modificações mais icônicas da cultura.",
    ),
    intro: [
      l(
        "El tongue split es la división longitudinal de la punta de la lengua, que da como resultado dos mitades capaces de moverse de forma independiente.",
        "Tongue splitting is the lengthwise division of the tip of the tongue, resulting in two halves that can move independently.",
        "O tongue split é a divisão longitudinal da ponta da língua, resultando em duas metades capazes de se mover de forma independente.",
      ),
      l(
        "Es una modificación permanente y de alto compromiso. Por eso cada caso empieza con una evaluación personal: anatomía, salud general, expectativas y el tiempo disponible para una recuperación tranquila.",
        "It is a permanent, high-commitment modification. That's why every case starts with a personal assessment: anatomy, general health, expectations and time available for a calm recovery.",
        "É uma modificação permanente e de alto compromisso. Por isso cada caso começa com uma avaliação pessoal: anatomia, saúde geral, expectativas e tempo disponível para uma recuperação tranquila.",
      ),
    ],
    offered: true,
    cover: ph("tongue-split", 0, "Tongue split · foto de resultado cicatrizado", "tongue-split-1"),
    gallery: [ph("tongue-split", 1, "Tongue split · resultado frontal", "tongue-split-2"), ph("tongue-split", 2, "Tongue split · detalle", "tongue-split-1")],
    facts: [F.permanent, F.evalRequired, F.duration, F.age],
    process: [
      P.consult(l(
        "Conversación sobre motivaciones, expectativas, historial de salud y contraindicaciones.",
        "A conversation about motivations, expectations, health history and contraindications.",
        "Conversa sobre motivações, expectativas, histórico de saúde e contraindicações.",
      )),
      {
        title: l("Evaluación", "Assessment", "Avaliação"),
        text: l(
          "Revisión anatómica y explicación detallada del procedimiento, riesgos y alternativas.",
          "Anatomical review and a detailed explanation of the procedure, risks and alternatives.",
          "Revisão anatômica e explicação detalhada do procedimento, riscos e alternativas.",
        ),
      },
      P.consent(l(
        "Firma de consentimiento informado, con tiempo para preguntas antes de decidir.",
        "Signing of informed consent, with time for questions before deciding.",
        "Assinatura do consentimento informado, com tempo para perguntas antes de decidir.",
      )),
      P.procedure,
      P.follow(l(
        "Acompañamiento durante la recuperación y canal directo para consultas.",
        "Support during recovery and a direct channel for questions.",
        "Acompanhamento durante a recuperação e canal direto para dúvidas.",
      )),
    ],
    considerations: [
      l(
        "Es irreversible: una posterior unión requiere otra intervención y no garantiza el estado original.",
        "It is irreversible: rejoining requires another procedure and does not guarantee the original state.",
        "É irreversível: uma posterior união exige outra intervenção e não garante o estado original.",
      ),
      l(
        "Puede haber inflamación, molestias y cambios temporales en el habla y la alimentación.",
        "There may be swelling, discomfort and temporary changes in speech and eating.",
        "Pode haver inchaço, desconforto e mudanças temporárias na fala e na alimentação.",
      ),
      l(
        "Como en toda modificación existen riesgos de sangrado, infección o cicatrización irregular; se explican en detalle en la consulta.",
        "As with any modification, there are risks of bleeding, infection or irregular healing; these are explained in detail at the consultation.",
        "Como em toda modificação, existem riscos de sangramento, infecção ou cicatrização irregular; são explicados em detalhe na consulta.",
      ),
      l(
        "Determinadas condiciones de salud o medicaciones pueden contraindicar el procedimiento.",
        "Certain health conditions or medications may contraindicate the procedure.",
        "Determinadas condições de saúde ou medicamentos podem contraindicar o procedimento.",
      ),
    ],
    aftercare: [
      l(
        "Seguir exclusivamente las indicaciones de higiene oral entregadas por escrito.",
        "Follow only the written oral hygiene instructions provided.",
        "Siga exclusivamente as orientações de higiene bucal entregues por escrito.",
      ),
      l(
        "Alimentación blanda y fresca los primeros días, según lo indicado.",
        "Soft, cool foods during the first days, as instructed.",
        "Alimentação macia e fresca nos primeiros dias, conforme indicado.",
      ),
      l(
        "Evitar tabaco, alcohol y comidas irritantes durante la recuperación.",
        "Avoid tobacco, alcohol and irritating foods during recovery.",
        "Evite tabaco, álcool e comidas irritantes durante a recuperação.",
      ),
      l(
        "Ante cualquier señal fuera de lo esperado, contactar al artista y a un profesional de la salud.",
        "At any sign that is not as expected, contact the artist and a healthcare professional.",
        "Diante de qualquer sinal fora do esperado, entre em contato com o artista e com um profissional de saúde.",
      ),
    ],
    faq: [
      {
        q: l("¿Voy a poder hablar normalmente?", "Will I be able to speak normally?", "Vou conseguir falar normalmente?"),
        a: l(
          "La mayoría de las personas recupera el habla habitual luego de un período de adaptación, que varía en cada caso. Se conversa en la consulta.",
          "Most people return to their usual speech after an adaptation period that varies from case to case. We talk about it at the consultation.",
          "A maioria das pessoas recupera a fala habitual após um período de adaptação, que varia em cada caso. Conversamos na consulta.",
        ),
      },
      {
        q: l("¿Es reversible?", "Is it reversible?", "É reversível?"),
        a: l(
          "No debe considerarse reversible. Por eso la decisión se toma con información completa y sin apuro.",
          "It should not be considered reversible. That's why the decision is made with full information and without rushing.",
          "Não deve ser considerado reversível. Por isso a decisão é tomada com informação completa e sem pressa.",
        ),
      },
      {
        q: l("¿Cómo empiezo?", "How do I start?", "Como começo?"),
        a: l(
          "Solicitando una consulta desde la sección de reservas. La primera instancia es siempre una evaluación.",
          "By requesting a consultation in the booking section. The first step is always an assessment.",
          "Pedindo uma consulta na seção de reservas. A primeira etapa é sempre uma avaliação.",
        ),
      },
    ],
  },
  {
    slug: "implants",
    number: "02",
    name: "Implants",
    fullName: "Subdermal Implants",
    kicker: l("Implantes subdérmicos", "Subdermal implants", "Implantes subdérmicos"),
    short: l(
      "Formas y relieves bajo la piel. Escultura corporal en tres dimensiones.",
      "Shapes and relief beneath the skin. Three-dimensional body sculpture.",
      "Formas e relevos sob a pele. Escultura corporal em três dimensões.",
    ),
    intro: [
      l(
        "Los implantes subdérmicos consisten en la colocación de piezas de material biocompatible debajo de la piel para crear relieves y formas.",
        "Subdermal implants involve placing pieces of biocompatible material beneath the skin to create relief and shapes.",
        "Os implantes subdérmicos consistem na colocação de peças de material biocompatível sob a pele para criar relevos e formas.",
      ),
      l(
        "El diseño, la ubicación y el material se definen de forma individual. No todas las zonas ni todas las pieles son aptas: la evaluación previa es la parte más importante del proceso.",
        "Design, placement and material are defined individually. Not every area or skin type is suitable: the prior assessment is the most important part of the process.",
        "O design, a localização e o material são definidos individualmente. Nem todas as regiões nem todas as peles são aptas: a avaliação prévia é a parte mais importante do processo.",
      ),
    ],
    offered: true,
    cover: ph("implants", 0, "Implantes subdérmicos · resultado cicatrizado", "horn-implants"),
    gallery: [
      ph("implants", 1, "Implante · vista lateral con relieve", "implant-head"),
      ph("implants", 2, "Implante · detalle de forma", "implant-beads"),
      ph("implants", 3, "Implante · composición", "eyeball-implant"),
    ],
    facts: [
      {
        label: l("Tipo", "Type", "Tipo"),
        value: l("Modificación permanente / removible por intervención", "Permanent / removable by a further procedure", "Permanente / removível por intervenção"),
      },
      {
        label: l("Materiales", "Materials", "Materiais"),
        value: l("Biocompatibles — se informan en la consulta", "Biocompatible — detailed at the consultation", "Biocompatíveis — informados na consulta"),
      },
      F.duration,
      F.age,
    ],
    process: [
      P.consult(l(
        "Definición de idea, forma, tamaño y zona. Revisión de historial de salud.",
        "Defining the idea, shape, size and area. Review of health history.",
        "Definição de ideia, forma, tamanho e região. Revisão do histórico de saúde.",
      )),
      P.design(l(
        "Selección de pieza y ubicación según anatomía y viabilidad.",
        "Choosing the piece and placement based on anatomy and feasibility.",
        "Seleção da peça e da localização segundo anatomia e viabilidade.",
      )),
      P.consent(CONSENT_STD),
      P.procedure,
      P.follow(l(
        "Controles durante la cicatrización y canal abierto para consultas.",
        "Check-ups during healing and an open channel for questions.",
        "Controles durante a cicatrização e canal aberto para dúvidas.",
      )),
    ],
    considerations: [
      l(
        "Pueden existir riesgos de rechazo, migración, infección o cicatrización irregular.",
        "There may be risks of rejection, migration, infection or irregular healing.",
        "Podem existir riscos de rejeição, migração, infecção ou cicatrização irregular.",
      ),
      l(
        "El resultado final depende de la anatomía, la piel y el cumplimiento de los cuidados.",
        "The final result depends on anatomy, skin and following the aftercare.",
        "O resultado final depende da anatomia, da pele e do cumprimento dos cuidados.",
      ),
      l(
        "Ciertas zonas no son aptas; la viabilidad se evalúa caso por caso.",
        "Some areas are not suitable; feasibility is assessed case by case.",
        "Certas regiões não são aptas; a viabilidade é avaliada caso a caso.",
      ),
      l("Retirar un implante requiere una nueva intervención.", "Removing an implant requires a new procedure.", "Retirar um implante exige uma nova intervenção."),
    ],
    aftercare: [
      l("Mantener la zona limpia según el protocolo entregado.", "Keep the area clean following the protocol provided.", "Mantenha a região limpa segundo o protocolo entregue."),
      l(
        "Evitar presión, golpes o roce sobre la zona durante la cicatrización.",
        "Avoid pressure, knocks or friction on the area while healing.",
        "Evite pressão, impactos ou atrito sobre a região durante a cicatrização.",
      ),
      l("Evitar piletas, mar y saunas hasta autorización.", "Avoid pools, the sea and saunas until cleared.", "Evite piscinas, mar e saunas até a liberação."),
      l(
        "Consultar de inmediato ante enrojecimiento, calor o dolor creciente.",
        "Get in touch immediately if there is redness, heat or increasing pain.",
        "Entre em contato imediatamente diante de vermelhidão, calor ou dor crescente.",
      ),
    ],
    faq: [
      {
        q: l("¿Se pueden retirar?", "Can they be removed?", "Podem ser retirados?"),
        a: l(
          "Sí, mediante otra intervención. Puede quedar marca o cicatriz; se conversa antes de decidir.",
          "Yes, through another procedure. A mark or scar may remain; we discuss it before deciding.",
          "Sim, por meio de outra intervenção. Pode ficar marca ou cicatriz; conversamos antes de decidir.",
        ),
      },
      {
        q: l("¿Qué formas son posibles?", "What shapes are possible?", "Que formas são possíveis?"),
        a: l(
          "Depende de la zona y de la viabilidad anatómica. En la consulta se definen opciones reales.",
          "It depends on the area and anatomical feasibility. Real options are defined at the consultation.",
          "Depende da região e da viabilidade anatômica. Na consulta são definidas opções reais.",
        ),
      },
    ],
  },
  {
    slug: "scarification",
    number: "03",
    name: "Scarification",
    fullName: "Scarification Art",
    kicker: l("Escarificación", "Scarification", "Escarificação"),
    short: l(
      "Diseños que la propia piel transforma en relieve. Arte que se completa con la cicatrización.",
      "Designs that the skin itself turns into relief. Art that is completed by healing.",
      "Desenhos que a própria pele transforma em relevo. Arte que se completa com a cicatrização.",
    ),
    intro: [
      l(
        "La escarificación es una técnica de arte corporal en la que un diseño se marca en la piel para que, al cicatrizar, forme una imagen permanente en relieve o textura.",
        "Scarification is a body art technique in which a design is marked on the skin so that, as it heals, it forms a permanent image in relief or texture.",
        "A escarificação é uma técnica de arte corporal em que um desenho é marcado na pele para que, ao cicatrizar, forme uma imagem permanente em relevo ou textura.",
      ),
      l(
        "Cada piel cicatriza de forma distinta: el resultado es único e imposible de replicar con exactitud. Esa imprevisibilidad es parte de la obra, y se explica con honestidad desde el primer encuentro.",
        "Every skin heals differently: the result is unique and impossible to replicate exactly. That unpredictability is part of the work, and it is explained honestly from the very first meeting.",
        "Cada pele cicatriza de forma diferente: o resultado é único e impossível de replicar com exatidão. Essa imprevisibilidade faz parte da obra e é explicada com honestidade desde o primeiro encontro.",
      ),
    ],
    offered: true,
    cover: ph("scarification", 0, "Escarificación · pieza cicatrizada", "scar-vine"),
    gallery: [
      ph("scarification", 1, "Escarificación · diseño geométrico", "scar-back"),
      ph("scarification", 2, "Escarificación · detalle de textura", "scar-tree"),
      ph("scarification", 3, "Escarificación · pieza grande", "scar-ornament"),
    ],
    facts: [
      F.permanent,
      F.custom,
      { label: F.duration.label, value: l("Variable según tamaño y zona", "Varies with size and area", "Variável segundo tamanho e região") },
      F.age,
    ],
    process: [
      P.consult(l(
        "Idea, simbolismo, zona y tamaño. Evaluación de la piel e historial de cicatrización.",
        "Idea, symbolism, area and size. Assessment of the skin and healing history.",
        "Ideia, simbolismo, região e tamanho. Avaliação da pele e do histórico de cicatrização.",
      )),
      P.design(l(
        "Desarrollo del diseño adaptado a la anatomía y a cómo cicatriza la piel.",
        "Developing a design adapted to the anatomy and to how the skin heals.",
        "Desenvolvimento do desenho adaptado à anatomia e a como a pele cicatriza.",
      )),
      P.consent(l(
        "Información de riesgos, variabilidad del resultado y cuidados.",
        "Information on risks, variability of the result and aftercare.",
        "Informação sobre riscos, variabilidade do resultado e cuidados.",
      )),
      P.session,
      P.follow(l(
        "Acompañamiento durante todo el proceso de cicatrización.",
        "Support throughout the entire healing process.",
        "Acompanhamento durante todo o processo de cicatrização.",
      )),
    ],
    considerations: [
      l(
        "El resultado final depende de la cicatrización individual y no puede garantizarse.",
        "The final result depends on individual healing and cannot be guaranteed.",
        "O resultado final depende da cicatrização individual e não pode ser garantido.",
      ),
      l(
        "Personas con tendencia a queloides u otras condiciones deben informarlo: puede contraindicarlo.",
        "People prone to keloids or other conditions must say so: it may contraindicate the procedure.",
        "Pessoas com tendência a queloides ou outras condições devem informar: pode contraindicar o procedimento.",
      ),
      l("Existe riesgo de infección si no se siguen los cuidados.", "There is a risk of infection if aftercare is not followed.", "Existe risco de infecção se os cuidados não forem seguidos."),
      l("Es una marca permanente.", "It is a permanent mark.", "É uma marca permanente."),
    ],
    aftercare: [
      l("Seguir el protocolo de limpieza indicado para tu pieza.", "Follow the cleaning protocol given for your piece.", "Siga o protocolo de limpeza indicado para sua peça."),
      l("Proteger la zona del sol durante y después de la cicatrización.", "Protect the area from the sun during and after healing.", "Proteja a região do sol durante e após a cicatrização."),
      l("No rascar ni retirar costras.", "Do not scratch or pick scabs.", "Não coce nem retire as cascas."),
      l("Consultar ante cualquier signo de infección.", "Get in touch at any sign of infection.", "Entre em contato diante de qualquer sinal de infecção."),
    ],
    faq: [
      {
        q: l("¿Puedo elegir cualquier diseño?", "Can I choose any design?", "Posso escolher qualquer desenho?"),
        a: l(
          "Se parte de tu idea y se adapta para que funcione al cicatrizar. Los detalles muy finos no siempre son viables.",
          "We start from your idea and adapt it so it works once healed. Very fine details are not always feasible.",
          "Partimos da sua ideia e a adaptamos para que funcione ao cicatrizar. Detalhes muito finos nem sempre são viáveis.",
        ),
      },
      {
        q: l("¿Queda igual que el diseño?", "Will it look exactly like the design?", "Fica igual ao desenho?"),
        a: l(
          "La cicatrización tiene variaciones naturales. Se conversa con transparencia en la consulta.",
          "Healing has natural variations. We discuss this openly at the consultation.",
          "A cicatrização tem variações naturais. Conversamos com transparência na consulta.",
        ),
      },
    ],
  },
  {
    slug: "ear-pointing",
    number: "04",
    name: "Ear Pointing",
    fullName: "Ear Pointing",
    kicker: l("Orejas en punta", "Pointed ears", "Orelhas pontudas"),
    short: l(
      "Modificación estética de la forma de la oreja hacia un contorno en punta.",
      "Aesthetic modification of the ear's shape into a pointed contour.",
      "Modificação estética do formato da orelha para um contorno pontudo.",
    ),
    intro: [
      l(
        "El ear pointing modifica el contorno superior de la oreja para darle una forma en punta.",
        "Ear pointing modifies the upper contour of the ear to give it a pointed shape.",
        "O ear pointing modifica o contorno superior da orelha para dar a ela um formato pontudo.",
      ),
      l(
        "Es una modificación permanente que requiere una evaluación de la anatomía de la oreja y una conversación clara sobre expectativas, riesgos y recuperación.",
        "It is a permanent modification that requires an assessment of the ear's anatomy and a clear conversation about expectations, risks and recovery.",
        "É uma modificação permanente que exige uma avaliação da anatomia da orelha e uma conversa clara sobre expectativas, riscos e recuperação.",
      ),
    ],
    offered: true,
    cover: ph("ear-pointing", 0, "Ear pointing · resultado cicatrizado de perfil", "ear-procedure"),
    gallery: [ph("ear-pointing", 1, "Ear pointing · perfil", "stretched-lobe"), ph("ear-pointing", 2, "Ear pointing · detalle")],
    facts: [F.permanent, F.evalRequired, F.duration, F.age],
    process: [
      P.consult(l(
        "Evaluación de la anatomía de la oreja, expectativas e historial de salud.",
        "Assessment of the ear's anatomy, expectations and health history.",
        "Avaliação da anatomia da orelha, expectativas e histórico de saúde.",
      )),
      P.design(l(
        "Definición de la forma posible en función de cada oreja.",
        "Defining the possible shape for each ear.",
        "Definição do formato possível em função de cada orelha.",
      )),
      P.consent(CONSENT_STD),
      P.procedure,
      P.follow(l(
        "Controles y acompañamiento durante la recuperación.",
        "Check-ups and support during recovery.",
        "Controles e acompanhamento durante a recuperação.",
      )),
    ],
    considerations: [
      l(
        "El resultado depende de la anatomía y de la cicatrización individual.",
        "The result depends on anatomy and individual healing.",
        "O resultado depende da anatomia e da cicatrização individual.",
      ),
      l("Puede haber asimetrías leves entre ambas orejas.", "There may be slight asymmetries between the ears.", "Pode haver leves assimetrias entre as orelhas."),
      l("Existen riesgos de infección o cicatrización irregular.", "There are risks of infection or irregular healing.", "Existem riscos de infecção ou cicatrização irregular."),
      PERMANENT_MARK,
    ],
    aftercare: [
      l("Seguir el protocolo de limpieza y protección indicado.", "Follow the cleaning and protection protocol provided.", "Siga o protocolo de limpeza e proteção indicado."),
      l("Evitar dormir sobre la zona durante la recuperación.", "Avoid sleeping on the area during recovery.", "Evite dormir sobre a região durante a recuperação."),
      l("No manipular la zona.", "Do not touch or handle the area.", "Não manipule a região."),
      CARE_CONTACT,
    ],
    faq: [
      {
        q: l("¿Se hacen ambas orejas en la misma sesión?", "Are both ears done in the same session?", "As duas orelhas são feitas na mesma sessão?"),
        a: l("Depende del caso. Se define en la consulta.", "It depends on the case. It is decided at the consultation.", "Depende do caso. É definido na consulta."),
      },
    ],
  },
  {
    slug: "lobuloplasty",
    number: "05",
    name: "Lobuloplasty",
    fullName: "Lobe Reconstruction",
    kicker: l("Lobuloplastia", "Lobe reconstruction", "Lobuloplastia"),
    short: l(
      "Reconstrucción y modificación estética del lóbulo de la oreja.",
      "Reconstruction and aesthetic modification of the earlobe.",
      "Reconstrução e modificação estética do lóbulo da orelha.",
    ),
    intro: [
      l(
        "Trabajos de reconstrucción y modificación estética del lóbulo, por ejemplo en lóbulos expandidos o dañados.",
        "Reconstruction and aesthetic modification of the earlobe, for example on stretched or damaged lobes.",
        "Trabalhos de reconstrução e modificação estética do lóbulo, por exemplo em lóbulos alargados ou danificados.",
      ),
      l(
        "Las opciones disponibles dependen de cada caso y de los procedimientos que el artista realiza efectivamente. La consulta define qué es posible y qué no.",
        "Available options depend on each case and on the procedures the artist actually performs. The consultation defines what is and isn't possible.",
        "As opções disponíveis dependem de cada caso e dos procedimentos que o artista efetivamente realiza. A consulta define o que é possível e o que não é.",
      ),
    ],
    offered: true,
    cover: ph("lobuloplasty", 0, "Lobuloplastia · antes / después (con consentimiento)", "stretched-lobe"),
    gallery: [ph("lobuloplasty", 1, "Lobuloplastia · resultado", "ear-procedure"), ph("lobuloplasty", 2, "Lobuloplastia · detalle")],
    facts: [
      { label: l("Tipo", "Type", "Tipo"), value: l("Reconstrucción / modificación", "Reconstruction / modification", "Reconstrução / modificação") },
      F.evalRequired,
      F.duration,
      F.age,
    ],
    process: [
      P.consult(l("Evaluación del estado del lóbulo y de los objetivos.", "Assessment of the lobe's condition and goals.", "Avaliação do estado do lóbulo e dos objetivos.")),
      { title: l("Plan", "Plan", "Plano"), text: l("Definición de la opción viable para tu caso.", "Defining the feasible option for your case.", "Definição da opção viável para o seu caso.") },
      P.consent(CONSENT_STD),
      P.procedure,
      P.follow(l("Acompañamiento durante la cicatrización.", "Support throughout healing.", "Acompanhamento durante a cicatrização.")),
    ],
    considerations: [
      l(
        "El resultado depende del estado del tejido y de la cicatrización.",
        "The result depends on the condition of the tissue and on healing.",
        "O resultado depende do estado do tecido e da cicatrização.",
      ),
      l("Puede quedar cicatriz visible.", "A visible scar may remain.", "Pode ficar uma cicatriz visível."),
      l(
        "Algunos casos pueden requerir derivación a un profesional médico.",
        "Some cases may require referral to a medical professional.",
        "Alguns casos podem exigir encaminhamento a um profissional médico.",
      ),
    ],
    aftercare: [
      CARE_PROTOCOL,
      l("No usar joyería en la zona hasta autorización.", "Do not wear jewelry in the area until cleared.", "Não use joias na região até a liberação."),
      CARE_CONTACT,
    ],
    faq: [
      {
        q: l("¿Puedo volver a expandir después?", "Can I stretch again afterwards?", "Posso alargar de novo depois?"),
        a: l(
          "Depende del caso y del tiempo de cicatrización. Se evalúa individualmente.",
          "It depends on the case and the healing time. It is assessed individually.",
          "Depende do caso e do tempo de cicatrização. É avaliado individualmente.",
        ),
      },
    ],
  },
  {
    slug: "tattoo-body-art",
    number: "06",
    name: "Tattoo & Body Art",
    fullName: "Tattoo & Body Art",
    kicker: l("Tatuaje y arte corporal", "Tattoo and body art", "Tatuagem e arte corporal"),
    short: l(
      "Tatuaje y expresiones artísticas sobre la piel, dentro del universo FROZZ.",
      "Tattoo and artistic expression on the skin, within the FROZZ universe.",
      "Tatuagem e expressões artísticas sobre a pele, dentro do universo FROZZ.",
    ),
    intro: [
      l(
        "Trabajos de tatuaje y otras expresiones de arte corporal que complementan las modificaciones.",
        "Tattoo work and other forms of body art that complement the modifications.",
        "Trabalhos de tatuagem e outras expressões de arte corporal que complementam as modificações.",
      ),
      l(
        "Disponibilidad y estilos a confirmar según la agenda y la oferta actual del artista.",
        "Availability and styles to be confirmed according to the artist's schedule and current offering.",
        "Disponibilidade e estilos a confirmar segundo a agenda e a oferta atual do artista.",
      ),
    ],
    offered: true,
    cover: ph("tattoo-body-art", 0, "Tatuaje / body art · pieza destacada", "tattoo-catrina"),
    gallery: [ph("tattoo-body-art", 1, "Tatuaje · pieza", "session-back-2"), ph("tattoo-body-art", 2, "Body art · detalle", "artists-sleeve")],
    facts: [
      { label: l("Tipo", "Type", "Tipo"), value: l("Arte corporal", "Body art", "Arte corporal") },
      F.custom,
      { label: l("Duración", "Duration", "Duração"), value: l("Según tamaño y complejidad", "Depends on size and complexity", "Segundo tamanho e complexidade") },
      F.age,
    ],
    process: [
      P.consult(l("Idea, zona, tamaño y referencias.", "Idea, area, size and references.", "Ideia, região, tamanho e referências.")),
      P.design(l("Desarrollo del diseño personalizado.", "Developing the custom design.", "Desenvolvimento do desenho personalizado.")),
      P.session,
      P.follow(l(
        "Indicaciones de cuidado y canal abierto para consultas.",
        "Aftercare instructions and an open channel for questions.",
        "Orientações de cuidado e canal aberto para dúvidas.",
      )),
    ],
    considerations: [
      l("Pueden existir reacciones a pigmentos; informá alergias conocidas.", "Reactions to pigments may occur; tell us about known allergies.", "Podem ocorrer reações a pigmentos; informe alergias conhecidas."),
      l("Es una marca permanente.", "It is a permanent mark.", "É uma marca permanente."),
    ],
    aftercare: [
      l("Seguir las indicaciones de limpieza e hidratación entregadas.", "Follow the cleaning and moisturizing instructions provided.", "Siga as orientações de limpeza e hidratação entregues."),
      l("Evitar sol, pileta y mar durante la cicatrización.", "Avoid sun, pools and the sea while healing.", "Evite sol, piscina e mar durante a cicatrização."),
      l("No rascar ni retirar costras.", "Do not scratch or pick scabs.", "Não coce nem retire as cascas."),
    ],
    faq: [
      {
        q: l("¿Qué estilos trabaja?", "What styles do you work in?", "Quais estilos trabalha?"),
        a: l("Consultá por mensaje con tu idea y referencias.", "Send a message with your idea and references.", "Envie uma mensagem com sua ideia e referências."),
      },
    ],
  },
];

export const offeredProcedures = procedures.filter((p) => p.offered);
export const getProcedure = (slug: string) => procedures.find((p) => p.slug === slug);
