import { useEffect, useMemo, useState } from "react";

const services = [
  {
    id: "landing",
    label: "Landing",
    title: "Landing pages empresariales orientadas a conversion",
    summary:
      "Desarrollo paginas enfocadas en presentar con claridad los servicios del negocio, generar confianza y facilitar el contacto comercial.",
    bullets: [
      "Estructura profesional y enfocada en resultados",
      "Copy comercial claro y directo",
      "Llamados a la accion conectados a canales reales",
    ],
  },
  {
    id: "corporate",
    label: "Corporate",
    title: "Sitios web corporativos para negocios y empresas",
    summary:
      "Construyo sitios institucionales para empresas, marcas personales y negocios que necesitan una presencia digital solida y bien presentada.",
    bullets: [
      "Arquitectura de informacion clara",
      "Diseno moderno con tono profesional",
      "Presentacion alineada con la imagen del negocio",
    ],
  },
  {
    id: "crud",
    label: "CRUD",
    title: "Sistemas CRUD basicos para apoyar procesos internos",
    summary:
      "Desarrollo interfaces funcionales para registrar, consultar, editar y organizar informacion de manera simple y util.",
    bullets: [
      "Flujos practicos para operacion diaria",
      "Interfaz limpia y facil de usar",
      "Base preparada para futuras mejoras",
    ],
  },
];

const projects = [
  {
    id: "case-1",
    tag: "Caso 01",
    type: "Landing empresarial",
    title: "Landing comercial para una consultora de servicios profesionales",
    description:
      "Una propuesta enfocada en presentar servicios de alto valor con claridad, autoridad visual y llamados a la accion bien ubicados.",
    results: ["Mas confianza", "Mayor percepcion de valor", "Mas oportunidades de contacto"],
  },
  {
    id: "case-2",
    tag: "Caso 02",
    type: "Sitio corporativo",
    title: "Sitio institucional para una empresa de servicios tecnicos",
    description:
      "Un sitio corporativo pensado para comunicar trayectoria, servicios, proceso de trabajo y canales de contacto con una imagen ordenada y profesional.",
    results: ["Imagen mas solida", "Mensaje mas claro", "Mejor presentacion comercial"],
  },
  {
    id: "case-3",
    tag: "Caso 03",
    type: "CRUD basico",
    title: "Panel administrativo para gestionar clientes y registros",
    description:
      "Una interfaz funcional para apoyar tareas operativas, centralizar informacion importante y aportar mas orden al negocio.",
    results: ["Mayor control", "Uso mas simple", "Base lista para crecer"],
  },
];

const principles = [
  "Diseno con criterio comercial",
  "Imagen profesional y actual",
  "Estructura clara para vender mejor",
  "Cada accion debe tener utilidad real",
];

const process = [
  {
    step: "01",
    title: "Analisis del negocio",
    text: "Identifico que necesita comunicar tu negocio, a que tipo de cliente quieres llegar y que imagen debes proyectar.",
  },
  {
    step: "02",
    title: "Estructura y propuesta",
    text: "Defino secciones, recorrido del usuario y enfoque visual para construir una presentacion clara y profesional.",
  },
  {
    step: "03",
    title: "Desarrollo",
    text: "Construyo la web o el sistema con una base moderna, funcional y alineada con los objetivos del negocio.",
  },
  {
    step: "04",
    title: "Entrega y ajustes",
    text: "Reviso detalles finales, optimizo la experiencia y dejo la solucion lista para presentar o publicar.",
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
    "Hola Sebastian Ramirez Acevedo, quiero solicitar una propuesta para mi negocio.",
    "",
    `Negocio: ${form.businessName || "No especificado"}`,
    `Contacto: ${form.contactName || "No especificado"}`,
    `Email: ${form.email || "No especificado"}`,
    `Servicio: ${form.service}`,
    `Tiempo estimado: ${form.timeline}`,
    "",
    "Objetivo:",
    form.objective || "Quiero una web profesional que me ayude a presentar mejor mi negocio y captar clientes.",
  ].join("\n");
}

function App() {
  const [activeService, setActiveService] = useState(services[0].id);
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
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const serviceDetail = useMemo(
    () => services.find((service) => service.id === activeService) ?? services[0],
    [activeService]
  );

  const projectDetail = useMemo(
    () => projects.find((project) => project.id === selectedProject) ?? projects[0],
    [selectedProject]
  );

  const draftMessage = useMemo(() => buildMessage(form), [form]);
  const whatsappHref = `https://wa.me/573002791360?text=${encodeURIComponent(draftMessage)}`;
  const mailHref = `mailto:sebastianacevedo123.sra@gmail.com?subject=${encodeURIComponent(
    `Solicitud de propuesta web - ${form.businessName || "Nuevo negocio"}`
  )}&body=${encodeURIComponent(draftMessage)}`;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function selectService(serviceName) {
    setForm((current) => ({
      ...current,
      service: serviceName,
    }));
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function prefillFromProject(project) {
    const mappedService =
      project.type === "Landing empresarial"
        ? "Landing page empresarial"
        : project.type === "Sitio corporativo"
          ? "Sitio web corporativo"
          : "Sistema CRUD basico";

    setSelectedProject(project.id);
    setForm((current) => ({
      ...current,
      service: mappedService,
      objective: `Quiero una propuesta inspirada en "${project.title}" para presentar mejor mi negocio y captar mas clientes.`,
    }));

    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="hero" id="inicio">
        <nav className="topbar" data-reveal>
          <a className="brand" href="#inicio">
            <span className="brand-mark">S</span>
            <span className="brand-copy">
              <strong>Sebastian Ramirez Acevedo</strong>
              <small>Desarrollo web freelance para negocios y empresas</small>
            </span>
          </a>

          <div className="topbar-links">
            <a href="#servicios">Servicios</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>

        <section className="hero-layout">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Portafolio profesional de desarrollo web freelance</p>
            <h1>
              Desarrollo soluciones web claras y profesionales
              <span> para negocios que quieren verse mejor y vender con mas confianza.</span>
            </h1>
            <p className="hero-text">
              Ayudo a negocios, marcas personales y empresas pequenas a tener una presencia digital mas solida
              mediante landing pages, sitios corporativos y sistemas CRUD funcionales, con un enfoque visual actual y
              orientado a resultados.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contacto">
                Solicitar propuesta
              </a>
              <a className="button button-secondary" href="#proyectos">
                Ver proyectos
              </a>
            </div>

            <div className="hero-points">
              <span>Imagen profesional</span>
              <span>Estructura orientada a conversion</span>
              <span>Contacto conectado a canales reales</span>
            </div>
          </div>

          <aside className="hero-board" data-reveal>
            <div className="hero-card hero-card-large">
              <p className="card-kicker">Propuesta de valor</p>
              <h2>Tu sitio web debe ayudarte a generar confianza, comunicar mejor y facilitar nuevas oportunidades.</h2>
              <p>
                Mi enfoque combina presentacion visual, claridad comercial y funcionalidad para que tu negocio tenga
                una presencia digital mas fuerte.
              </p>
            </div>

            <div className="hero-card-row">
              <div className="hero-card accent-card">
                <p className="card-kicker">Servicios</p>
                <strong>Landing pages, sitios corporativos y CRUDs basicos</strong>
                <span>Soluciones pensadas para mejorar la imagen y utilidad digital del negocio.</span>
              </div>
              <div className="hero-card mini-card">
                <p className="card-kicker">Ubicacion</p>
                <strong>Medellin, Colombia</strong>
              </div>
            </div>
          </aside>
        </section>

        <div className="ticker" data-reveal>
          <div className="ticker-track">
            <span>Landing pages</span>
            <span>Sitios corporativos</span>
            <span>Sistemas CRUD</span>
            <span>Desarrollo web freelance</span>
            <span>Landing pages</span>
            <span>Sitios corporativos</span>
            <span>Sistemas CRUD</span>
            <span>Desarrollo web freelance</span>
          </div>
        </div>
      </header>

      <main>
        <section className="section manifesto" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Enfoque</p>
            <h2>Una presencia digital bien construida mejora la forma en que tu negocio es percibido antes del primer contacto.</h2>
          </div>

          <div className="manifesto-grid">
            <article className="statement-card">
              <h3>Mas confianza</h3>
              <p>Una web bien presentada transmite seriedad y ayuda a que el cliente valore mejor tus servicios.</p>
            </article>
            <article className="statement-card">
              <h3>Mas claridad</h3>
              <p>La estructura correcta permite explicar mejor lo que haces, para quien trabajas y como pueden contratarte.</p>
            </article>
            <article className="statement-card">
              <h3>Mas oportunidades</h3>
              <p>Cuando el sitio guia al usuario hacia una accion concreta, aumenta la posibilidad de generar conversaciones reales.</p>
            </article>
          </div>
        </section>

        <section className="section services-section" id="servicios" data-reveal>
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Servicios</p>
              <h2>Desarrollo soluciones web pensadas para negocios que necesitan una presentacion profesional y funcional.</h2>
            </div>
            <p className="support-copy">
              Selecciona una linea de servicio y mira el tipo de solucion que puedo desarrollar.
            </p>
          </div>

          <div className="service-stage">
            <div className="service-tabs">
              {services.map((service) => (
                <button
                  key={service.id}
                  className={`service-tab ${service.id === activeService ? "service-tab-active" : ""}`}
                  type="button"
                  onClick={() => setActiveService(service.id)}
                >
                  <span>{service.label}</span>
                  <strong>{service.title}</strong>
                </button>
              ))}
            </div>

            <div className="service-preview">
              <p className="card-kicker">Servicio seleccionado</p>
              <h3>{serviceDetail.title}</h3>
              <p>{serviceDetail.summary}</p>
              <ul className="bullet-list">
                {serviceDetail.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <button className="button button-primary" type="button" onClick={() => selectService(serviceDetail.title)}>
                Solicitar este servicio
              </button>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="proyectos" data-reveal>
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Proyectos</p>
              <h2>Referencias del tipo de soluciones que puedo desarrollar para negocios, marcas personales y empresas.</h2>
            </div>
            <p className="support-copy">Cada propuesta esta enfocada en mejorar presentacion, claridad y conversion.</p>
          </div>

          <div className="projects-grid">
            <div className="project-list">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className={`project-card ${project.id === selectedProject ? "project-card-active" : ""}`}
                >
                  <div className="project-meta">
                    <span>{project.tag}</span>
                    <small>{project.type}</small>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-actions">
                    <button className="button button-secondary" type="button" onClick={() => setSelectedProject(project.id)}>
                      Ver detalle
                    </button>
                    <button className="button button-ghost" type="button" onClick={() => prefillFromProject(project)}>
                      Solicitar algo similar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="project-spotlight">
              <p className="card-kicker">Proyecto destacado</p>
              <h3>{projectDetail.title}</h3>
              <p>{projectDetail.description}</p>
              <div className="result-grid">
                {projectDetail.results.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a className="button button-primary" href="#contacto">
                Llevar esta idea a mi negocio
              </a>
            </aside>
          </div>
        </section>

        <section className="section values-section" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Criterios de trabajo</p>
            <h2>Cada proyecto busca equilibrio entre presentacion profesional, claridad comercial y funcionalidad real.</h2>
          </div>

          <div className="principles-wrap">
            {principles.map((principle) => (
              <span key={principle} className="principle-pill">
                {principle}
              </span>
            ))}
          </div>
        </section>

        <section className="section process-section" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Proceso</p>
            <h2>Un proceso claro para desarrollar soluciones web utiles, ordenadas y listas para presentar.</h2>
          </div>

          <div className="process-grid">
            {process.map((item) => (
              <article key={item.step} className="process-card">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contacto" data-reveal>
          <div className="contact-shell">
            <div className="contact-copy">
              <p className="eyebrow">Contacto</p>
              <h2>Si tu negocio necesita una presencia digital mas profesional, podemos trabajar en una solucion adecuada.</h2>
              <p>
                Completa el formulario y envia tu solicitud directamente por WhatsApp, correo o copia el brief para compartirlo.
              </p>

              <div className="contact-data">
                <span>Sebastian Ramirez Acevedo</span>
                <span>Medellin, Colombia</span>
                <a href="mailto:sebastianacevedo123.sra@gmail.com">sebastianacevedo123.sra@gmail.com</a>
                <a href="https://www.linkedin.com/in/sebastian-ramirez-acevedo-2580ab2a5/" target="_blank" rel="noreferrer">
                  LinkedIn profesional
                </a>
              </div>

              <div className="contact-links">
                <a className="button button-secondary" href={whatsappHref} target="_blank" rel="noreferrer">
                  Escribir por WhatsApp
                </a>
                <a className="button button-ghost" href={mailHref}>
                  Enviar por correo
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
                  placeholder="Nombre del negocio"
                />
              </label>

              <label>
                Nombre de contacto
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  placeholder="Nombre de contacto"
                />
              </label>

              <label>
                Correo
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="correo@negocio.com"
                />
              </label>

              <label>
                Tipo de proyecto
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
                  <option>Solo estoy explorando</option>
                </select>
              </label>

              <label>
                Objetivo del proyecto
                <textarea
                  name="objective"
                  value={form.objective}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe brevemente que necesitas y que objetivo quieres lograr."
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
