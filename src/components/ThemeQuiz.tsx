import { useEffect, useMemo, useState } from 'react'
import {
  type ThemeName,
  themeDescriptions,
  themeLabels,
  themeQuizQuestions,
} from '../data/themeQuiz'

type ThemeQuizProps = {
  isOpen: boolean
  onClose: () => void
  onApplyTheme: (theme: ThemeName) => void
}

function ThemeQuiz({ isOpen, onClose, onApplyTheme }: ThemeQuizProps) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<ThemeName[]>([])

  const selectedTheme = answers[questionIndex]
  const isComplete = questionIndex >= themeQuizQuestions.length

  const resultTheme = useMemo(() => {
    const scores = answers.reduce(
      (totals, theme) => ({
        ...totals,
        [theme]: totals[theme] + 1,
      }),
      { ocean: 0, arcade: 0, minimal: 0, cyber: 0 } satisfies Record<
        ThemeName,
        number
      >,
    )

    return (Object.entries(scores) as [ThemeName, number][]).sort(
      ([themeA, scoreA], [themeB, scoreB]) => {
        if (scoreA !== scoreB) {
          return scoreB - scoreA
        }

        return answers.indexOf(themeA) - answers.indexOf(themeB)
      },
    )[0][0]
  }, [answers])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const currentQuestion = themeQuizQuestions[questionIndex]

  const selectAnswer = (theme: ThemeName) => {
    setAnswers((currentAnswers) => {
      const nextAnswers = [...currentAnswers]
      nextAnswers[questionIndex] = theme
      return nextAnswers
    })
  }

  const goToNextQuestion = () => {
    setQuestionIndex((currentIndex) => currentIndex + 1)
  }

  const retakeQuiz = () => {
    setQuestionIndex(0)
    setAnswers([])
  }

  const applyTheme = () => {
    onApplyTheme(resultTheme)
    onClose()
  }

  return (
    <div className="quiz-overlay" role="presentation">
      <div
        aria-labelledby="theme-quiz-title"
        aria-modal="true"
        className="quiz-modal"
        role="dialog"
      >
        <button
          aria-label="Close Personality Theme Quiz"
          className="quiz-close"
          onClick={onClose}
          type="button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
          </svg>
        </button>

        <div className="quiz-header">
          <p className="section-label">/ personality theme quiz</p>
          <h2 id="theme-quiz-title">
            {isComplete ? 'Your portfolio theme' : currentQuestion.prompt}
          </h2>
          <p>
            {isComplete
              ? themeDescriptions[resultTheme]
              : `Question ${questionIndex + 1} of ${themeQuizQuestions.length}`}
          </p>
        </div>

        {isComplete ? (
          <div className="quiz-result">
            <span>{themeLabels[resultTheme]}</span>
            <div className="quiz-actions">
              <button className="primary-button" onClick={applyTheme} type="button">
                Apply Theme
              </button>
              <button className="secondary-button" onClick={retakeQuiz} type="button">
                Retake quiz
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="quiz-options">
              {currentQuestion.answers.map((answer) => (
                <button
                  aria-pressed={selectedTheme === answer.theme}
                  className={selectedTheme === answer.theme ? 'selected' : ''}
                  key={answer.label}
                  onClick={() => selectAnswer(answer.theme)}
                  type="button"
                >
                  {answer.label}
                </button>
              ))}
            </div>

            <div className="quiz-actions">
              <button
                className="primary-button"
                disabled={!selectedTheme}
                onClick={goToNextQuestion}
                type="button"
              >
                {questionIndex === themeQuizQuestions.length - 1
                  ? 'See Result'
                  : 'Next'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ThemeQuiz
