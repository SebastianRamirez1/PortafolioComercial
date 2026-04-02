import { useEffect, useMemo, useState } from "react";

const services = [
  {
    id: "landing",
    badge: "Mas solicitado",
    title: "Landing page empresarial",
    description:
      "Paginas enfocadas en captar clientes, presentar tu oferta con claridad y dar una imagen seria desde el primer vistazo.",
    bullets: [
      "Copy comercial y estructura orientada a conversion",
      "Diseno adaptable para desktop y mobile",
      "CTA claros hacia contacto, WhatsApp o correo",
    ],
  },
  {
    id: "corporativo",
    title: "Sitio web corporativo",
    description:
      "Presencia digital profesional para empresas que necesitan explicar servicios, diferenciales y casos de trabajo.",
    bullets: [
      "Arquitectura clara para negocio real",
      "Secciones de autoridad, confianza y proceso",
      "Base visual consistente para crecer despues",
    ],
  },
  {
    id: "crud",
    title: "Sistema CRUD basico",
    description:
      "Herramientas sencillas para gestionar clientes, inventario, registros o procesos internos con una interfaz limpia.",
    bullets: [
      "Operaciones de crear, editar, consultar y eliminar",
      "Flujos practicos para pequenas empresas",
      "Pensado para control, orden y escalabilidad futura",
    ],
  },
];

const projects = [
  {
    id: "proyecto-1",
    category: "Landing B2B",
    title: "Web comercial para consultora financiera",
    summary:
      "Una landing de alto impacto para presentar servicios premium, transmitir confianza y facilitar solicitudes de asesoria.",
    scope: [
      "Hero con propuesta de valor y CTA principal",
      "Seccion de servicios, beneficios y testimonios",
      "Formulario orientado a reuniones comerciales",
    ],
  },
  {
    id: "proyecto-2",
    category: "Sitio corporativo",
    title: "Pagina institucional para empresa de mantenimiento",
    summary:
      "Un sitio con enfoque empresarial para mostrar experiencia, cobertura, procesos y credenciales a clientes potenciales.",
    scope: [
      "Paginas de servicios y sectores atendidos",
      "Bloques de confianza para contratos empresariales",
      "Contacto rapido para cotizaciones",
    ],
  },
  {
    id: "proyecto-3",
    category: "CRUD operacional",
    title: "Panel basico para gestion de clientes",
    summary:
      "Una interfaz funcional para centralizar registros, editar datos y apoyar procesos administrativos del negocio.",
    scope: [
      "Listado con busqueda y estados",
      "Formulario de alta y edicion de clientes",
      "Base lista para crecer con autenticacion despues",
    ],
  },
];

const faqs = [
  {
    question: "Que tipo de clientes pueden contratarte?",
    answer:
      "Trabajo bien con negocios locales, profesionales independientes, pequenas empresas y marcas que necesitan una presencia digital seria sin entrar aun en desarrollos complejos.",
  },
  {
    question: "Que entregas en un proyecto?",
    answer:
      "Entrego una solucion clara, funcional y pensada para negocio: estructura, interfaz, copy, llamadas a la accion y una experiencia consistente en desktop y mobile.",
  },
  {
    question: "Puedo pedir algo parecido a uno de tus proyectos demo?",
    answer:
      "Si. Cada demo incluye un acceso rapido para precargar el formulario con ese tipo de proyecto y acelerar la conversacion.",
  },
];

const initialForm = {
  businessName: "",
  contactName: "",
  email: "",
  service: "Landing page empresarial",
  objective: "",
  timeline: "Lo antes posible",
};

function buildMessage(form) {
  return [
    "Hola Sebastian, quiero solicitar una propuesta para mi negocio.",
    "",
    `Negocio: ${form.businessName || "No especificado"}`,
    `Contacto: ${form.contactName || "No especificado"}`,
    `Email: ${form.email || "No especificado"}`,
    `Servicio de interes: ${form.service}`,
    `Tiempo estimado: ${form.timeline}`,
    "",
    "Objetivo del proyecto:",
    form.objective || "Quiero mejorar mi presencia digital y captar mas clientes.",
  ].join("\n");
}

function App() {
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [form, setForm] = useState(initialForm);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    const items = document.querySelectorAll("[data-reveal]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === selectedProject) ?? projects[0],
    [selectedProject]
  );

  const draftMessage = useMemo(() => buildMessage(form), [form]);
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(draftMessage)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(
    `Solicitud de propuesta - ${form.businessName || "Nuevo negocio"}`
  )}&body=${encodeURIComponent(draftMessage)}`;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function prefillFromProject(project) {
    const serviceMap = {
      "Landing B2B": "Landing page empresarial",
      "Sitio corporativo": "Sitio web corporativo",
      "CRUD operacional": "Sistema CRUD basico",
    };

    setSelectedProject(project.id);
    setForm((current) => ({
      ...current,
      service: serviceMap[project.category] ?? current.service,
      objective: `Quiero un proyecto similar a "${project.title}" para mejorar la presencia digital de mi negocio.`,
    }));

    const section = document.getElementById("contacto");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function copyBrief() {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(draftMessage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="page-shell">
      <header className="hero" id="inicio">
        <nav className="topbar" data-reveal>
          <a className="brand" href="#inicio">
            <span className="brand-mark">S</span>
            <span className="brand-copy">
              <strong>Sebastian</strong>
              <small>Desarrollo web empresarial freelance</small>
            </span>
          </a>

          <div className="topbar-links">
            <a href="#servicios">Servicios</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#proceso">Proceso</a>
            <a className="button button-secondary" href="#contacto">
              Solicitar propuesta
            </a>
          </div>
        </nav>

        <section className="hero-content">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Portafolio empresarial para captar clientes freelance</p>
            <h1>Construyo paginas web que hacen ver a tu negocio mas serio, mas claro y mas listo para vender.</h1>
            <p className="hero-text">
              Desarrollo soluciones web basicas con apariencia premium para negocios que necesitan una landing page,
              un sitio corporativo o un sistema CRUD funcional sin caer en una imagen improvisada.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contacto">
                Quiero una propuesta
              </a>
              <a className="button button-ghost" href="#proyectos">
                Ver proyectos demo
              </a>
            </div>

            <ul className="hero-trust">
              <li>Presentacion corporativa</li>
              <li>Enfoque comercial</li>
              <li>Interfaz funcional y lista para mostrar</li>
            </ul>
          </div>

          <aside className="hero-panel" data-reveal>
            <div className="panel-card">
              <p className="panel-label">Lo que resuelvo</p>
              <h2>Tu pagina deja de ser un adorno y se convierte en una herramienta para ganar confianza.</h2>
              <div className="metric-grid">
                <article>
                  <strong>Landing pages</strong>
                  <span>Para vender servicios con una estructura directa y profesional.</span>
                </article>
                <article>
                  <strong>Sitios corporativos</strong>
                  <span>Para negocios que necesitan presencia formal frente a clientes y aliados.</span>
                </article>
                <article>
                  <strong>CRUDs basicos</strong>
                  <span>Para ordenar procesos, registros y operaciones sin complicar la tecnologia.</span>
                </article>
              </div>
            </div>
          </aside>
        </section>
      </header>

      <main>
        <section className="section section-light" id="problema" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Problema</p>
            <h2>Muchos negocios pierden ventas porque su presencia digital no transmite la seriedad que si tienen en la vida real.</h2>
          </div>

          <div className="problem-grid">
            <article className="info-card">
              <h3>Se ven improvisados</h3>
              <p>Cuando la web no comunica orden, el cliente duda antes de escribir, llamar o cotizar.</p>
            </article>
            <article className="info-card">
              <h3>Explican mal lo que hacen</h3>
              <p>Sin una estructura clara, tus servicios se perciben como comunes y no como una solucion seria.</p>
            </article>
            <article className="info-card">
              <h3>No convierten visitas en oportunidades</h3>
              <p>Si no hay CTA claros, formulario util y jerarquia visual, la pagina no aporta al negocio.</p>
            </article>
          </div>
        </section>

        <section className="section" id="servicios" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Servicios</p>
            <h2>Soluciones web basicas, pero presentadas con el nivel visual y comercial que espera un cliente empresarial.</h2>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article key={service.id} className={`service-card ${service.badge ? "featured" : ""}`}>
                {service.badge ? <span className="badge">{service.badge}</span> : null}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <button
                  className="button button-inline"
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      service: service.title,
                    }))
                  }
                >
                  Usar este servicio en el formulario
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="proyectos" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Proyectos demo</p>
            <h2>Muestras estrategicas para que un cliente entienda rapido el tipo de trabajo que puede encargarte.</h2>
          </div>

          <div className="portfolio-layout">
            <div className="project-list">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className={`project-card ${selectedProject === project.id ? "project-card-active" : ""}`}
                >
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-actions">
                    <button
                      className="button button-inline"
                      type="button"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      Ver alcance
                    </button>
                    <button
                      className="button button-inline button-inline-accent"
                      type="button"
                      onClick={() => prefillFromProject(project)}
                    >
                      Quiero algo similar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="project-detail">
              <p className="panel-label">Detalle del proyecto</p>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.summary}</p>
              <ul className="detail-list">
                {activeProject.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="button button-primary" href="#contacto">
                Llevar esta idea a mi negocio
              </a>
            </aside>
          </div>
        </section>

        <section className="section section-band" id="diferencial" data-reveal>
          <div className="section-heading narrow">
            <p className="eyebrow">Diferencial</p>
            <h2>No compito por hacer paginas baratas. Compito por ayudar a que un negocio se vea confiable y listo para crecer.</h2>
          </div>

          <div className="value-grid">
            <article>
              <h3>Vision de negocio</h3>
              <p>La estructura y el copy se piensan para que un potencial cliente entienda tu valor y te tome en serio.</p>
            </article>
            <article>
              <h3>Diseno con intencion</h3>
              <p>El lenguaje visual busca autoridad, claridad y una sensacion corporativa moderna, no una plantilla generica.</p>
            </article>
            <article>
              <h3>Trabajo util desde ya</h3>
              <p>Todo lo que ves en esta pagina funciona: navegacion, acciones, formulario y flujos de contacto.</p>
            </article>
          </div>
        </section>

        <section className="section" id="proceso" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Proceso</p>
            <h2>Un flujo simple para que el cliente sepa que estas trabajando con metodo, no improvisando.</h2>
          </div>

          <div className="timeline">
            <article className="timeline-item">
              <span>01</span>
              <div>
                <h3>Entiendo el negocio</h3>
                <p>Recojo contexto, necesidades, tono de marca y objetivo comercial del proyecto.</p>
              </div>
            </article>
            <article className="timeline-item">
              <span>02</span>
              <div>
                <h3>Propongo estructura</h3>
                <p>Defino secciones, mensajes clave y CTA segun el tipo de web que necesita el cliente.</p>
              </div>
            </article>
            <article className="timeline-item">
              <span>03</span>
              <div>
                <h3>Desarrollo la solucion</h3>
                <p>Construyo una interfaz limpia, profesional y funcional para que tu negocio pueda mostrarse con confianza.</p>
              </div>
            </article>
            <article className="timeline-item">
              <span>04</span>
              <div>
                <h3>Ajustamos y lanzamos</h3>
                <p>Refinamos detalles, revisamos acciones de contacto y dejamos el proyecto listo para usar o presentar.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section section-light" id="faq" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Respuestas clave para bajar objeciones antes de la primera conversacion.</h2>
          </div>

          <div className="faq-list">
            {faqs.map((item) => (
              <article key={item.question} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section cta" id="contacto" data-reveal>
          <div className="cta-card">
            <div>
              <p className="eyebrow">Formulario funcional</p>
              <h2>Prepara una solicitud profesional y enviala por el canal que prefieras.</h2>
              <p>
                Este formulario arma un brief comercial que puedes enviar por WhatsApp, correo o copiar al portapapeles.
              </p>

              <div className="contact-quick-actions">
                <a className="button button-secondary" href={whatsappHref} target="_blank" rel="noreferrer">
                  Abrir WhatsApp con mensaje
                </a>
                <a className="button button-ghost" href={mailHref}>
                  Abrir correo con propuesta
                </a>
              </div>
            </div>

            <form className="lead-form" onSubmit={(event) => event.preventDefault()}>
              <label>
                Nombre del negocio
                <input
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder="Ejemplo: Grupo Atlas"
                />
              </label>

              <label>
                Nombre de contacto
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
              </label>

              <label>
                Correo del cliente
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="cliente@empresa.com"
                />
              </label>

              <label>
                Servicio de interes
                <select name="service" value={form.service} onChange={handleChange}>
                  <option>Landing page empresarial</option>
                  <option>Sitio web corporativo</option>
                  <option>Sistema CRUD basico</option>
                </select>
              </label>

              <label>
                Tiempo estimado
                <select name="timeline" value={form.timeline} onChange={handleChange}>
                  <option>Lo antes posible</option>
                  <option>Este mes</option>
                  <option>En 1 a 2 meses</option>
                  <option>Solo estoy explorando opciones</option>
                </select>
              </label>

              <label>
                Objetivo del proyecto
                <textarea
                  name="objective"
                  value={form.objective}
                  onChange={handleChange}
                  placeholder="Describe lo que quieres lograr con tu pagina o sistema."
                  rows="5"
                />
              </label>

              <div className="form-actions">
                <a className="button button-primary" href={whatsappHref} target="_blank" rel="noreferrer">
                  Enviar por WhatsApp
                </a>
                <button className="button button-secondary" type="button" onClick={copyBrief}>
                  {copied ? "Brief copiado" : "Copiar brief"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

