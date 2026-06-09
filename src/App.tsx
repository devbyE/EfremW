import { useCallback, useState } from 'react'
import './App.css'
import CursorTrail, { type TrailColorMode } from './components/CursorTrail'
import CursorTrailPreview from './components/CursorTrailPreview'
import ThemeQuiz from './components/ThemeQuiz'
import {
  type ThemeName,
  themeDescriptions,
  themeLabels,
} from './data/themeQuiz'

const THEME_STORAGE_KEY = 'portfolio-theme'

type ProjectLink = {
  label: string
  icon: 'external' | 'github'
  ariaLabel: string
  tooltip: string
  href?: string
  action?: 'themeQuiz'
}

type Project = {
  title: string
  description: string
  tech: string[]
  status: string
  image?: string
  imageAlt?: string
  links?: ProjectLink[]
}

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

const projects: Project[] = [
  {
    title: 'Developer Portfolio',
    description:
      'My primary web presence, built to reflect how I actually work. Dark UI, TypeScript throughout, interactive details, and a project showcase with real deployment links.',
    tech: ['React', 'TypeScript', 'CSS', 'Vite'],
    status: 'Featured',
    links: [
      {
        label: 'Live Demo',
        href: '#top',
        icon: 'external',
        ariaLabel: 'Open Developer Portfolio preview',
        tooltip: 'Live Demo',
      },
      {
        label: 'GitHub',
        href: '#',
        icon: 'github',
        ariaLabel: 'View Developer Portfolio source repository',
        tooltip: 'GitHub Repo',
      },
    ],
  },
  {
    title: '404 Arcade Game',
    description:
      'A playful 404 page that turns a missing route into a small browser game, complete with scoring, lives, and keyboard controls.',
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
      'A short personality quiz that restyles the entire site to match the visitor\'s answers. Four themes, one design system, zero page reloads.',
    tech: ['React', 'State Management', 'CSS'],
    status: 'Interactive',
    links: [
      {
        label: 'Live Demo',
        icon: 'external',
        ariaLabel: 'Open Personality Theme Quiz',
        tooltip: 'Open Personality Theme Quiz',
        action: 'themeQuiz',
      },
    ],
  },
  {
    title: 'Cursor Trail Art',
    description:
      'An interactive canvas effect where your cursor paints a glowing particle trail. Try it right here on the card.',
    tech: ['JavaScript', 'Canvas', 'Animation'],
    status: 'Interactive',
  },
]

const themeNames: ThemeName[] = ['ocean', 'arcade', 'minimal', 'cyber']
const trailColorLabels: Record<TrailColorMode, string> = {
  blue: 'Blue',
  white: 'White',
}

const isThemeName = (value: string | null): value is ThemeName =>
  themeNames.includes(value as ThemeName)

const experience = [
  {
    role: 'Application Developer',
    description:
      'I build and maintain internal front-end tools in React and TypeScript, working in GitLab from branch to deploy.',
  },
  {
    role: 'Graduate Student, Georgetown University',
    description:
      'M.S. in Computer Science, with coursework in systems programming and deep learning for computer vision.',
  },
]

function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeName | null>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeName(savedTheme) ? savedTheme : null
  })
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [quizInstance, setQuizInstance] = useState(0)
  const [isTrailSupported, setIsTrailSupported] = useState(false)
  const [isTrailEnabled, setIsTrailEnabled] = useState(false)
  const [trailColorMode, setTrailColorMode] = useState<TrailColorMode>('blue')

  const applyTheme = (theme: ThemeName) => {
    setActiveTheme(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  const openThemeQuiz = () => {
    setQuizInstance((currentInstance) => currentInstance + 1)
    setIsQuizOpen(true)
  }

  const resetTheme = () => {
    setActiveTheme(null)
    localStorage.removeItem(THEME_STORAGE_KEY)
  }

  const handleTrailSupportChange = useCallback((nextIsSupported: boolean) => {
    setIsTrailSupported(nextIsSupported)

    if (!nextIsSupported) {
      setIsTrailEnabled(false)
    }
  }, [])

  const toggleTrail = () => {
    setIsTrailEnabled((currentValue) => !currentValue)
  }

  const activateTrail = (colorMode: TrailColorMode) => {
    if (isTrailEnabled && trailColorMode === colorMode) {
      setIsTrailEnabled(false)
      return
    }

    setTrailColorMode(colorMode)
    setIsTrailEnabled(true)
  }

  return (
    <main className="page" data-theme={activeTheme ?? undefined}>
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
          {isTrailSupported && (
            <button
              aria-label={`${isTrailEnabled ? 'Disable' : 'Enable'} red cursor trail`}
              aria-pressed={isTrailEnabled}
              className="cursor-trail-nav-toggle"
              onClick={toggleTrail}
              type="button"
            >
              <span
                className={`cursor-trail-toggle-dot cursor-trail-toggle-dot-${trailColorMode}`}
                aria-hidden="true"
              />
              <span>Trail</span>
            </button>
          )}
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            Application Developer &middot; React &middot; TypeScript &middot; Python
          </p>

          <h2>
            Building clear, practical software for real problems.
          </h2>

          <p className="hero-text">
            Hi, I&apos;m Efrem. I&apos;m an application developer focused on front-end
            work, problem-solving, and turning messy information into software
            people actually want to use.
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
  const focus = 'solve real problems'

  return (
    <Portfolio
      name="Efrem Wilkerson"
      stack={['React', 'TypeScript', 'Python']}
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
              I like building software that feels organized, intentional, and
              easy to understand.
            </h2>

            <p className="section-text">
              I&apos;m an application developer focused on front-end development and
              practical software systems. I&apos;m currently pursuing my Master&apos;s in
              Computer Science at Georgetown University, where I&apos;m deepening my
              foundation in systems programming and machine learning. A little
              more about my work:
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
                ) : project.title === 'Developer Portfolio' ? (
                  <div
                    className="portfolio-preview"
                    aria-label="Branded preview card for Efrem Wilkerson"
                  >
                    <div className="portfolio-brand-mark" aria-hidden="true">
                      EW
                    </div>

                    <div className="portfolio-preview-identity">
                      <span>Application Developer</span>
                      <strong>Efrem Wilkerson</strong>
                      <p>React &middot; TypeScript &middot; Python</p>
                    </div>

                    <div className="portfolio-preview-signals" aria-hidden="true">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : project.title === 'Personality Theme Quiz' ? (
                  <div className="theme-preview-grid" aria-label="Theme previews">
                    {themeNames.map((theme) => (
                      <div
                        className={`theme-preview-block theme-preview-${theme}`}
                        key={theme}
                      >
                        <span aria-hidden="true"></span>
                        <strong>{themeLabels[theme]}</strong>
                      </div>
                    ))}
                  </div>
                ) : project.title === 'Cursor Trail Art' ? (
                  <CursorTrailPreview />
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

                {project.title === 'Cursor Trail Art' && isTrailSupported && (
                  <div className="project-card-actions">
                    {(['blue', 'white'] as TrailColorMode[]).map((colorMode) => {
                      const isActive =
                        isTrailEnabled && trailColorMode === colorMode

                      return (
                        <button
                          aria-pressed={isActive}
                          className={`project-action-button project-action-button-${colorMode}`}
                          key={colorMode}
                          onClick={() => activateTrail(colorMode)}
                          type="button"
                        >
                          {isActive
                            ? `${trailColorLabels[colorMode]} Active`
                            : `Try ${trailColorLabels[colorMode]}`}
                        </button>
                      )
                    })}
                  </div>
                )}

                {project.links && (
                  <div className="project-links">
                    {project.links.map((link) => {
                      const icon =
                        link.icon === 'external' ? (
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M14 5h5v5" />
                            <path d="M10 14L19 5" />
                            <path d="M19 14v5H5V5h5" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 3.5a8.6 8.6 0 0 0-2.7 16.8c.4.1.6-.2.6-.4v-1.5c-2.3.5-2.8-1-2.8-1-.4-.9-.9-1.2-.9-1.2-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.8 1.3 2 1 2.4.8.1-.6.3-1 .5-1.2-1.8-.2-3.8-.9-3.8-4.1 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9.7-.2 1.4-.3 2.1-.3.7 0 1.4.1 2.1.3 1.6-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.5.6.9 1.4.9 2.3 0 3.2-1.9 3.9-3.8 4.1.3.3.6.8.6 1.6v2.4c0 .2.1.5.6.4A8.6 8.6 0 0 0 12 3.5z" />
                          </svg>
                        )

                      const tooltip = (
                        <span className="project-link-tooltip" aria-hidden="true">
                          {link.tooltip}
                        </span>
                      )

                      if (link.action === 'themeQuiz') {
                        return (
                          <button
                            aria-label={link.ariaLabel}
                            key={link.ariaLabel}
                            onClick={openThemeQuiz}
                            title={link.tooltip}
                            type="button"
                          >
                            {icon}
                            {tooltip}
                          </button>
                        )
                      }

                      if (!link.href) {
                        return null
                      }

                      return (
                        <a
                          href={link.href}
                          key={link.href}
                          target="_blank"
                          aria-label={link.ariaLabel}
                          rel="noreferrer"
                          title={link.tooltip}
                        >
                          {icon}
                          {tooltip}
                        </a>
                      )
                    })}
                  </div>
                )}

                {project.title === 'Personality Theme Quiz' && activeTheme && (
                  <div className="theme-result-note">
                    <span title={themeDescriptions[activeTheme]}>
                      Applied: {themeLabels[activeTheme]}
                    </span>
                    <button onClick={resetTheme} type="button">
                      Reset theme
                    </button>
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

      <ThemeQuiz
        isOpen={isQuizOpen}
        key={quizInstance}
        onApplyTheme={applyTheme}
        onClose={() => setIsQuizOpen(false)}
      />
      <CursorTrail
        colorMode={trailColorMode}
        isEnabled={isTrailEnabled}
        onSupportChange={handleTrailSupportChange}
      />
    </main>
  )
}

export default App
