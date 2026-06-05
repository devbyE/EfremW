import './App.css'

const technologies = [
  'React',
  'TypeScript',
  'JavaScript',
  'Python',
  'Git / GitLab',
  'HTML',
  'CSS',
  'Vite',
]

const projects = [
  {
    title: 'Developer Portfolio',
    description:
      'A responsive personal portfolio built to showcase my software development work, technical skills, and resume.',
    tech: ['React', 'TypeScript', 'Vite'],
    status: 'In Progress',
  },
  {
    title: '404 Arcade Game',
    description:
      'A playful 404 page that turns a missing route into a small browser game with scoring and keyboard controls.',
    tech: ['React', 'TypeScript', 'Game Logic'],
    status: 'Planned',
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

function App() {
  return (
    <main className="page">
      <nav className="navbar">
        <a href="#top" className="logo">
          EW
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            Application Developer · React · TypeScript · Python
          </p>

          <h1>
            Building practical software with clean design and real-world purpose.
          </h1>

          <p className="hero-text">
            Hi, I&apos;m Efrem Wilkerson — an application developer focused on
            front-end development, problem-solving, and building useful tools
            that make information easier to manage.
          </p>

          <div className="hero-actions">
            <a href="#projects">View Projects</a>
            <a href="#contact" className="secondary-link">
              Contact Me
            </a>
          </div>
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
              I&apos;m currently an application developer working with modern
              front-end tools and practical software systems. I enjoy turning
              ideas into clean, usable applications and improving how people
              interact with information.
            </p>

            <p className="section-text">
              Here are some technologies I&apos;ve been working with:
            </p>
          </div>

          <ul className="tech-list">
            {technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="projects" className="section">
        <p className="section-label">/ projects</p>

        <div className="section-heading-row">
          <h2>Selected work</h2>
          <p>Finished projects and interactive builds will live here.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
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
            </article>
          ))}
        </div>
      </section>

      <section id="resume" className="section resume-section">
        <p className="section-label">/ resume</p>

        <h2>Want the quick version?</h2>

        <p className="section-text">
          My resume includes my professional experience, education, technical
          skills, and software development background.
        </p>

        <a
          className="resume-button"
          href="/Efrem-Wilkerson-Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Open Resume
        </a>
      </section>

      <footer id="contact" className="contact-footer">
        <a href="mailto:efremlwilkerson@gmail.com">Email</a>
        <a href="https://github.com/efremlwilkerson" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="/Efrem-Wilkerson-Resume.pdf" target="_blank" rel="noreferrer">
          Resume
        </a>
      </footer>
    </main>
  )
}

export default App