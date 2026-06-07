import './App.css'

const technologies = [
  'React',
  'TypeScript',
  'JavaScript',
  'Python',
  'C',
  'Git / GitLab',
  'HTML',
  'CSS',
  'Vite',
]

const projects = [
  {
    title: '404 Arcade Game',
    description:
      'A playful 404 page that turns a missing route into a small browser game with scoring, keyboard controls, and a live deploy.',
    tech: ['React', 'TypeScript', 'Game Logic'],
    status: 'Live',
    image: '/projects/404-arcade-game.png',
    imageAlt: '404 Arcade Game gameplay screenshot',
    links: [
      {
        label: 'Live Demo',
        href: 'https://404-arcade-game.vercel.app',
        icon: 'external',
        ariaLabel: 'Open 404 Arcade Game live demo',
        tooltip: 'Live Demo',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/devbyE/404-arcade-game',
        icon: 'github',
        ariaLabel: 'View 404 Arcade Game GitHub repository',
        tooltip: 'GitHub Repo',
      },
    ],
  },
  {
    title: 'Personality Theme Quiz',
    description:
      'An interactive quiz that changes the site’s visual theme based on a visitor’s answers.',
    tech: ['React', 'State Management', 'CSS'],
    status: 'Planned',
  },
  {
    title: 'Cursor Trail Art',
    description:
      'A subtle interactive visual effect where the cursor creates a glowing particle trail across the page.',
    tech: ['JavaScript', 'Canvas', 'Animation'],
    status: 'Planned',
  },
]

const experience = [
  {
    role: 'Application Developer',
    description:
      'Front-end development, React/TypeScript, internal tools, GitLab workflows, and application maintenance.',
  },
  {
    role: 'Software Development / CS Background',
    description:
      'Computer Science foundation, systems programming in C, Python/C++, React projects, and graduate coursework.',
  },
]

function App() {
  return (
    <main className="page">
      <nav className="navbar">
        <a href="#top" className="logo">
          Efrem Wilkerson
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a
            href="/Efrem-Wilkerson-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            Application Developer &middot; React &middot; TypeScript &middot; Python
          </p>

          <h2>
            Building useful software with clear design and practical purpose.
          </h2>

          <p className="hero-text">
            Hi, I&apos;m Efrem. I&apos;m an application developer focused on front-end
            development, problem-solving, and building useful tools that make
            information easier to manage.
          </p>

        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="code-window">
            <div className="window-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <pre>
{`function Developer() {
  const focus = 'build useful tools'

  return (
    <Portfolio
      name="Efrem Wilkerson"
      stack={['React', 'TypeScript']}
      goal={focus}
    />
  )
}`}
            </pre>
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <p className="section-label">/ about me</p>

        <div className="about-grid">
          <div>
            <h2>
              I like building software that feels useful, organized, and easy to
              understand.
            </h2>

            <p className="section-text">
              I&apos;m an application developer focused on front-end development,
              practical software systems, and turning ideas into clean, usable
              applications. I&apos;m pursuing my Master&apos;s in Computer Science at
              Georgetown University, where I&apos;m continuing to strengthen my
              foundation in software development and problem-solving.
            </p>

            <p className="section-text">
              A little more about my work:
            </p>
          </div>

          <ul className="tech-list">
            {technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experience" className="section">
        <p className="section-label">/ experience</p>

        <div className="section-heading-row">
          <h2>Experience</h2>
        </div>

        <div className="experience-grid">
          {experience.map((item) => (
            <article className="experience-item" key={item.role}>
              <h3>{item.role}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <p className="section-label">/ projects</p>

        <div className="section-heading-row">
          <h2>Selected work</h2>
          <p>Interactive builds with practical front-end structure and polished details.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-preview">
                {project.image && project.imageAlt ? (
                  <img src={project.image} alt={project.imageAlt} />
                ) : (
                  <div className="project-placeholder" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>

              <div className="project-content">
                <div className="project-card-top">
                  <span className="project-status">{project.status}</span>
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                {project.links && (
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a
                        href={link.href}
                        key={link.href}
                        target="_blank"
                        aria-label={link.ariaLabel}
                        rel="noreferrer"
                      >
                        {link.icon === 'external' ? (
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M14 5h5v5" />
                            <path d="M10 14L19 5" />
                            <path d="M19 14v5H5V5h5" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 3.5a8.6 8.6 0 0 0-2.7 16.8c.4.1.6-.2.6-.4v-1.5c-2.3.5-2.8-1-2.8-1-.4-.9-.9-1.2-.9-1.2-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.8 1.3 2 1 2.4.8.1-.6.3-1 .5-1.2-1.8-.2-3.8-.9-3.8-4.1 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9.7-.2 1.4-.3 2.1-.3.7 0 1.4.1 2.1.3 1.6-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.5.6.9 1.4.9 2.3 0 3.2-1.9 3.9-3.8 4.1.3.3.6.8.6 1.6v2.4c0 .2.1.5.6.4A8.6 8.6 0 0 0 12 3.5z" />
                          </svg>
                        )}
                        <span className="project-link-tooltip" aria-hidden="true">
                          {link.tooltip}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="contact-footer">
        <svg
          className="contact-kicker-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M5 3l14 8-6 2.2 2.4 5.7-2.8 1.1-2.3-5.6L5 19V3z" />
        </svg>

        <div className="contact-heading">
          <h2>Connect with me</h2>
          <p>
            Reach out by email or find me on LinkedIn and GitHub.
          </p>
        </div>

        <div className="contact-grid">
          <article className="contact-card">
            <svg className="contact-card-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16v12H4V6z" />
              <path d="M4 7l8 6 8-6" />
            </svg>
            <span>Email</span>
            <a href="mailto:efremwilkerson@gmail.com">
              efremwilkerson@gmail.com
            </a>
          </article>

          <article className="contact-card">
            <svg className="contact-card-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M16 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              <path d="M3.5 19a4.5 4.5 0 0 1 9 0" />
              <path d="M13.5 18a3.5 3.5 0 0 1 7 0" />
            </svg>
            <span>Socials</span>
            <div className="social-links">
              <a
                className="social-icon-link"
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.8 9.3v9.5H3.7V9.3h3.1z" />
                  <path d="M5.2 5a1.8 1.8 0 1 1 0 3.6A1.8 1.8 0 0 1 5.2 5z" />
                  <path d="M10 9.3h3v1.3c.4-.7 1.4-1.5 3-1.5 3.2 0 3.8 2.1 3.8 4.8v4.9h-3.1v-4.4c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4v4.5H10V9.3z" />
                </svg>
              </a>
              <a
                className="social-icon-link"
                href="https://github.com/efremlwilkerson"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3.5a8.6 8.6 0 0 0-2.7 16.8c.4.1.6-.2.6-.4v-1.5c-2.3.5-2.8-1-2.8-1-.4-.9-.9-1.2-.9-1.2-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.8 1.3 2 1 2.4.8.1-.6.3-1 .5-1.2-1.8-.2-3.8-.9-3.8-4.1 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9.7-.2 1.4-.3 2.1-.3.7 0 1.4.1 2.1.3 1.6-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.5.6.9 1.4.9 2.3 0 3.2-1.9 3.9-3.8 4.1.3.3.6.8.6 1.6v2.4c0 .2.1.5.6.4A8.6 8.6 0 0 0 12 3.5z" />
                </svg>
              </a>
            </div>
          </article>
        </div>

        <p className="copyright">
          &copy; 2026 Efrem Wilkerson. All rights reserved.
        </p>
      </footer>
    </main>
  )
}

export default App
