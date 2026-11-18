import type { Media } from "./media";
import { ref } from "./references";
import { l, type L } from "@/lib/i18n";

/**
 * CONTENIDO EDITORIAL: Manifesto, About, Journey, Safety, Testimonios, Prensa.
 * Nada de esto es un dato biográfico inventado: los campos marcados como
 * "[A COMPLETAR]" esperan información real.
 */

export const manifesto = {
  body: l(
    "El cuerpo es un territorio de expresión, transformación e identidad. Cada modificación representa una decisión, una historia y una forma de llevar el arte más allá de los límites convencionales.",
    "The body is a territory of expression, transformation and identity. Every modification represents a decision, a story and a way of taking art beyond conventional limits.",
    "O corpo é um território de expressão, transformação e identidade. Cada modificação representa uma decisão, uma história e uma forma de levar a arte além dos limites convencionais.",
  ),
  /** Palabras del texto que se destacan en rojo, por idioma. */
  highlight: {
    es: /transformación|identidad|límites/i,
    en: /transformation|identity|limits/i,
    pt: /transformação|identidade|limites/i,
  },
  statements: [
    { n: "I", text: l("La piel no es un límite. Es el punto de partida.", "Skin is not a limit. It is the starting point.", "A pele não é um limite. É o ponto de partida.") },
    {
      n: "II",
      text: l(
        "Cada transformación empieza con una conversación honesta.",
        "Every transformation starts with an honest conversation.",
        "Toda transformação começa com uma conversa honesta.",
      ),
    },
    { n: "III", text: l("Sin decisión propia no hay modificación.", "Without your own decision, there is no modification.", "Sem decisão própria não há modificação.") },
  ],
  fullQuote: "Transformation is a decision. Art is how you carry it.",
};

export const about = {
  lead: l(
    "Rou Viraca es la mente y las manos detrás de FROZZ BODYART: un proyecto dedicado al body modification como forma de arte, identidad y cultura.",
    "Rou Viraca is the mind and hands behind FROZZ BODYART: a project dedicated to body modification as a form of art, identity and culture.",
    "Rou Viraca é a mente e as mãos por trás da FROZZ BODYART: um projeto dedicado ao body modification como forma de arte, identidade e cultura.",
  ),
  paragraphs: [
    l("[A COMPLETAR] Origen y primeros pasos de Rou en el body modification.", "[TO COMPLETE] Rou's origins and first steps in body modification.", "[A COMPLETAR] Origem e primeiros passos de Rou no body modification."),
    l("[A COMPLETAR] Cómo evolucionó su lenguaje artístico y qué lo distingue.", "[TO COMPLETE] How the artistic language evolved and what sets it apart.", "[A COMPLETAR] Como sua linguagem artística evoluiu e o que a diferencia."),
    l("[A COMPLETAR] Su trabajo fuera de Argentina, eventos y convenciones.", "[TO COMPLETE] Work outside Argentina, events and conventions.", "[A COMPLETAR] Seu trabalho fora da Argentina, eventos e convenções."),
  ],
  pillars: [
    { label: l("Identidad", "Identity", "Identidade"), text: l("Cada modificación responde a quien la lleva.", "Every modification answers to the person who wears it.", "Cada modificação responde a quem a carrega.") },
    { label: l("Oficio", "Craft", "Ofício"), text: l("Técnica, higiene y criterio antes que impacto.", "Technique, hygiene and judgment before impact.", "Técnica, higiene e critério antes do impacto.") },
    {
      label: l("Cultura", "Culture", "Cultura"),
      text: l(
        "Body mod como comunidad, historia y conocimiento compartido.",
        "Body mod as community, history and shared knowledge.",
        "Body mod como comunidade, história e conhecimento compartilhado.",
      ),
    },
  ],
};

export type JourneyMilestone = { year: string; title: L; text: L; status: "done" | "next" };

export const journey: JourneyMilestone[] = [
  { year: "[AÑO]", title: l("Primeros pasos", "First steps", "Primeiros passos"), text: l("[A COMPLETAR] Cómo empezó todo.", "[TO COMPLETE] How it all began.", "[A COMPLETAR] Como tudo começou."), status: "done" },
  {
    year: "[AÑO]",
    title: l("Evolución artística", "Artistic evolution", "Evolução artística"),
    text: l("[A COMPLETAR] Desarrollo del estilo propio.", "[TO COMPLETE] Developing a personal style.", "[A COMPLETAR] Desenvolvimento do estilo próprio."),
    status: "done",
  },
  {
    year: "[AÑO]",
    title: l("Desarrollo profesional", "Professional growth", "Desenvolvimento profissional"),
    text: l("[A COMPLETAR] Estudio, especialización, FROZZ BODYART.", "[TO COMPLETE] Studio, specialization, FROZZ BODYART.", "[A COMPLETAR] Estúdio, especialização, FROZZ BODYART."),
    status: "done",
  },
  {
    year: "[AÑO]",
    title: l("Eventos internacionales", "International events", "Eventos internacionais"),
    text: l("Montevideo y São Paulo. [Completar fechas y eventos]", "Montevideo and São Paulo. [Add dates and events]", "Montevidéu e São Paulo. [Completar datas e eventos]"),
    status: "done",
  },
  {
    year: "[AÑO]",
    title: l("Conferencias", "Conferences", "Palestras"),
    text: l("[A COMPLETAR] Charlas y workshops realizados.", "[TO COMPLETE] Talks and workshops given.", "[A COMPLETAR] Palestras e workshops realizados."),
    status: "done",
  },
  {
    year: "2027",
    title: l("Próximos destinos", "Next destinations", "Próximos destinos"),
    text: l(
      "Japón — proyectado para marzo 2027, sujeto a confirmación.",
      "Japan — projected for March 2027, subject to confirmation.",
      "Japão — projetado para março de 2027, sujeito a confirmação.",
    ),
    status: "next",
  },
];

export const safety = {
  lead: l(
    "Una modificación corporal es permanente. Por eso el proceso importa tanto como el resultado: información clara, tiempo para decidir y acompañamiento real.",
    "A body modification is permanent. That's why the process matters as much as the result: clear information, time to decide and real support.",
    "Uma modificação corporal é permanente. Por isso o processo importa tanto quanto o resultado: informação clara, tempo para decidir e acompanhamento real.",
  ),
  pillars: [
    {
      n: "01",
      title: l("Evaluación previa", "Prior assessment", "Avaliação prévia"),
      text: l(
        "Cada caso empieza con una consulta. Se revisa salud, anatomía y expectativas antes de cualquier decisión.",
        "Every case starts with a consultation. Health, anatomy and expectations are reviewed before any decision.",
        "Cada caso começa com uma consulta. Saúde, anatomia e expectativas são revisadas antes de qualquer decisão.",
      ),
    },
    {
      n: "02",
      title: l("Higiene y bioseguridad", "Hygiene & biosafety", "Higiene e biossegurança"),
      text: l(
        "Material descartable o esterilizado, superficies preparadas y protocolos de bioseguridad en cada procedimiento.",
        "Disposable or sterilized materials, prepared surfaces and biosafety protocols in every procedure.",
        "Material descartável ou esterilizado, superfícies preparadas e protocolos de biossegurança em cada procedimento.",
      ),
    },
    {
      n: "03",
      title: l("Consentimiento informado", "Informed consent", "Consentimento informado"),
      text: l(
        "Riesgos, alternativas y cuidados explicados por escrito. Se firma sólo cuando todo está claro.",
        "Risks, alternatives and aftercare explained in writing. It is signed only when everything is clear.",
        "Riscos, alternativas e cuidados explicados por escrito. É assinado somente quando tudo está claro.",
      ),
    },
    {
      n: "04",
      title: l("Contraindicaciones", "Contraindications", "Contraindicações"),
      text: l(
        "Hay condiciones de salud, medicaciones o situaciones que pueden hacer que un procedimiento no sea recomendable. Se informan con honestidad.",
        "Some health conditions, medications or situations can make a procedure inadvisable. They are communicated honestly.",
        "Há condições de saúde, medicamentos ou situações que podem tornar um procedimento não recomendável. São informados com honestidade.",
      ),
    },
    {
      n: "05",
      title: l("Cuidados posteriores", "Aftercare", "Cuidados posteriores"),
      text: l(
        "Cada procedimiento tiene su propio protocolo de cuidados. Se entrega de forma personalizada, no genérica.",
        "Each procedure has its own aftercare protocol, delivered in a personalized way, not a generic one.",
        "Cada procedimento tem seu próprio protocolo de cuidados, entregue de forma personalizada, não genérica.",
      ),
    },
    {
      n: "06",
      title: l("Seguimiento", "Follow-up", "Acompanhamento"),
      text: l(
        "Canal directo durante la recuperación para resolver dudas y revisar la evolución.",
        "A direct channel during recovery to answer questions and check progress.",
        "Canal direto durante a recuperação para tirar dúvidas e acompanhar a evolução.",
      ),
    },
    {
      n: "07",
      title: l("Evaluación de riesgos", "Risk assessment", "Avaliação de riscos"),
      text: l(
        "Si un procedimiento no es viable o seguro para vos, se dice. Decir que no también es parte del oficio.",
        "If a procedure isn't feasible or safe for you, you'll be told. Saying no is part of the craft too.",
        "Se um procedimento não for viável ou seguro para você, isso é dito. Dizer não também faz parte do ofício.",
      ),
    },
  ],
  faq: [
    {
      q: l("¿Necesito ser mayor de edad?", "Do I need to be an adult?", "Preciso ser maior de idade?"),
      a: l(
        "Sí. Todos los procedimientos se realizan exclusivamente a personas mayores de 18 años, con documento.",
        "Yes. All procedures are performed exclusively on people over 18, with ID.",
        "Sim. Todos os procedimentos são realizados exclusivamente em pessoas maiores de 18 anos, com documento.",
      ),
    },
    {
      q: l("¿La primera consulta implica hacer el procedimiento?", "Does the first consultation mean doing the procedure?", "A primeira consulta implica fazer o procedimento?"),
      a: l(
        "No. La consulta es una instancia de evaluación e información. La decisión es tuya y puede tomarse después.",
        "No. The consultation is for assessment and information. The decision is yours and can be made later.",
        "Não. A consulta é uma etapa de avaliação e informação. A decisão é sua e pode ser tomada depois.",
      ),
    },
    {
      q: l("¿Qué pasa si tengo una condición de salud?", "What if I have a health condition?", "E se eu tiver uma condição de saúde?"),
      a: l(
        "Se informa en la consulta. Algunas condiciones pueden contraindicar un procedimiento o requerir aval de un profesional médico.",
        "Mention it at the consultation. Some conditions may contraindicate a procedure or require clearance from a medical professional.",
        "Informe na consulta. Algumas condições podem contraindicar um procedimento ou exigir aval de um profissional médico.",
      ),
    },
    {
      q: l("¿Los cuidados son iguales para todo?", "Is aftercare the same for everything?", "Os cuidados são iguais para tudo?"),
      a: l(
        "No. Cada procedimiento y cada persona tiene indicaciones específicas, que se entregan por escrito.",
        "No. Each procedure and each person has specific instructions, provided in writing.",
        "Não. Cada procedimento e cada pessoa tem orientações específicas, entregues por escrito.",
      ),
    },
    {
      q: l("¿Qué hago si algo no evoluciona como esperaba?", "What if something doesn't heal as expected?", "O que faço se algo não evoluir como esperado?"),
      a: l(
        "Contactá al artista de inmediato y, ante cualquier signo de alarma, consultá a un profesional de la salud.",
        "Contact the artist immediately and, at any warning sign, see a healthcare professional.",
        "Entre em contato com o artista imediatamente e, diante de qualquer sinal de alerta, procure um profissional de saúde.",
      ),
    },
  ],
  disclaimer: l(
    "La información de este sitio es general y no reemplaza una consulta profesional ni una evaluación médica. Cada procedimiento se evalúa de forma individual y se realiza sólo en condiciones profesionales adecuadas y conforme a la normativa vigente en cada lugar. No se garantizan resultados.",
    "The information on this site is general and does not replace a professional consultation or medical assessment. Each procedure is assessed individually and performed only under appropriate professional conditions and in accordance with local regulations. Results are not guaranteed.",
    "As informações deste site são gerais e não substituem uma consulta profissional nem uma avaliação médica. Cada procedimento é avaliado individualmente e realizado somente em condições profissionais adequadas e de acordo com a legislação vigente em cada local. Os resultados não são garantidos.",
  ),
};

export type Testimonial = {
  name: string;
  city: string;
  procedure: string;
  text: L;
  photo?: Media;
  /** true = contenido de demostración. Se muestra con etiqueta PLACEHOLDER. */
  placeholder: boolean;
};

const PH_TEXT = l(
  "Espacio reservado para un testimonio real de cliente. Reemplazar este texto por la opinión original, con su autorización.",
  "Reserved space for a real client testimonial. Replace this text with the original review, with the client's permission.",
  "Espaço reservado para um depoimento real de cliente. Substituir este texto pela opinião original, com autorização.",
);

export const testimonials: Testimonial[] = [
  { name: "—", city: "—", procedure: "Tongue Split", text: PH_TEXT, placeholder: true },
  { name: "—", city: "—", procedure: "Scarification", text: PH_TEXT, placeholder: true },
  { name: "—", city: "—", procedure: "Implants", text: PH_TEXT, placeholder: true },
  { name: "—", city: "—", procedure: "Ear Pointing", text: PH_TEXT, placeholder: true },
];

export type PressItem = {
  kind: L;
  outlet: string;
  title: L;
  date: string;
  url?: string;
  media?: Media;
  placeholder: boolean;
};

export const press: PressItem[] = [
  {
    kind: l("Entrevista", "Interview", "Entrevista"),
    outlet: "[MEDIO]",
    title: l("Espacio para entrevista destacada", "Space for a featured interview", "Espaço para entrevista em destaque"),
    date: "—",
    placeholder: true,
    media: { src: null, alt: "", hint: "Captura / foto de la entrevista", ref: ref("session-back-2") },
  },
  { kind: l("Podcast", "Podcast", "Podcast"), outlet: "[PODCAST]", title: l("Espacio para podcast", "Space for a podcast", "Espaço para podcast"), date: "—", placeholder: true },
  { kind: l("Revista", "Magazine", "Revista"), outlet: "[REVISTA]", title: l("Espacio para nota en revista", "Space for a magazine feature", "Espaço para matéria em revista"), date: "—", placeholder: true },
  {
    kind: l("Documental", "Documentary", "Documentário"),
    outlet: "[PRODUCCIÓN]",
    title: l("Espacio para documental o video", "Space for a documentary or video", "Espaço para documentário ou vídeo"),
    date: "—",
    placeholder: true,
  },
];
