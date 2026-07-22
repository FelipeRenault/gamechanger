import { useLayoutEffect, useRef } from 'react'
import type { RuntimePlayer, WinnerConfig } from '../config/types'

type Props = {
  slideIndex: number
  slides: string[]
  hasCover: boolean
  coverLoaded: boolean | null
  coverSrc: string | null
  winnerEnabled: boolean
  winnerConfig: WinnerConfig
  players: RuntimePlayer[]
  slideButtonsVisible: boolean
  settingsButtonVisible: boolean
  onPrevious: () => void
  onNext: () => void
  onOpenSettings: () => void
}

function textSlideOffset(hasCover: boolean): number {
  return hasCover ? 1 : 0
}

const MAX_SLIDE_FONT_SIZE = 15
const MIN_SLIDE_FONT_SIZE = 4.5

function SlideText({ text }: { text: string }) {
  const textRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = textRef.current
    const container = element?.parentElement
    if (!element || !container) return

    const fits = () => {
      const containerStyle = getComputedStyle(container)
      const availableWidth = container.clientWidth
        - parseFloat(containerStyle.paddingLeft)
        - parseFloat(containerStyle.paddingRight)
      const availableHeight = container.clientHeight
        - parseFloat(containerStyle.paddingTop)
        - parseFloat(containerStyle.paddingBottom)

      return element.scrollWidth <= availableWidth + 1
        && element.scrollHeight <= availableHeight + 1
    }

    const fitText = () => {
      element.style.fontSize = `${MAX_SLIDE_FONT_SIZE}vmin`
      if (!text || fits()) return

      let smallest = MIN_SLIDE_FONT_SIZE
      let largest = MAX_SLIDE_FONT_SIZE

      for (let attempt = 0; attempt < 12; attempt += 1) {
        const candidate = (smallest + largest) / 2
        element.style.fontSize = `${candidate}vmin`

        if (fits()) smallest = candidate
        else largest = candidate
      }

      element.style.fontSize = `${smallest}vmin`
    }

    fitText()
    const resizeObserver = new ResizeObserver(fitText)
    resizeObserver.observe(container)

    let active = true
    void document.fonts.ready.then(() => {
      if (active) fitText()
    })

    return () => {
      active = false
      resizeObserver.disconnect()
    }
  }, [text])

  return (
    <div ref={textRef} className="slide-text" style={{ fontSize: `${MAX_SLIDE_FONT_SIZE}vmin` }}>
      {text}
    </div>
  )
}

function WinnerScreen({ players, winnerConfig }: { players: RuntimePlayer[]; winnerConfig: WinnerConfig }) {
  const eligible = players.filter((player) => player.canWin)
  if (eligible.length === 0) {
    return <div className="winner-title">NO ELIGIBLE WINNERS</div>
  }

  const highestScore = Math.max(...eligible.map((player) => player.score))
  const winners = eligible.filter((player) => player.score === highestScore).map((player) => player.name)

  let title = winnerConfig.single.title
  let names = winners[0]
  let score = winnerConfig.single.scoreText.replace('{score}', String(highestScore))

  if (winners.length > 1) {
    title = winnerConfig.multiple.title
    score = winnerConfig.multiple.scoreText.replace('{score}', String(highestScore))
    const separator = winnerConfig.multiple.separator
    names = winners.length === 2
      ? `${winners[0]} ${separator} ${winners[1]}`
      : `${winners.slice(0, -1).join(', ')} ${separator} ${winners[winners.length - 1]}`
  }

  return (
    <div className="winner-screen">
      <div className="winner-title">{title}</div>
      <div className="winner-names">{names}</div>
      <div className="winner-score">{score}</div>
    </div>
  )
}

export function SlideView({
  slideIndex,
  slides,
  hasCover,
  coverLoaded,
  coverSrc,
  winnerEnabled,
  winnerConfig,
  players,
  slideButtonsVisible,
  settingsButtonVisible,
  onPrevious,
  onNext,
  onOpenSettings,
}: Props) {
  const offset = textSlideOffset(hasCover)
  const isCoverSlide = hasCover && slideIndex === 0
  const winnerIndex = slides.length + offset
  const isWinnerSlide = winnerEnabled && slideIndex === winnerIndex
  const textIndex = slideIndex - offset
  const currentSlide = textIndex >= 0 && textIndex < slides.length ? slides[textIndex] : ''
  const maxSlide = (winnerEnabled ? slides.length : slides.length - 1) + offset

  return (
    <main className={`slide-card ${isCoverSlide ? 'cover-slide' : ''}`}>
      {coverLoaded !== false && (
        <img
          className="cover-preload"
          src={coverSrc ?? ''}
          alt=""
          onLoad={() => undefined}
        />
      )}

      {isCoverSlide ? (
        coverSrc ? <img className="cover-image" src={coverSrc} alt="Cover" /> : null
      ) : isWinnerSlide ? (
        <WinnerScreen players={players} winnerConfig={winnerConfig} />
      ) : (
        <SlideText text={currentSlide} />
      )}

      <div className="slide-navigation">
        <div className="slide-nav-left">
          {slideIndex > 0 ? (
            <button className={slideButtonsVisible ? 'game-button' : 'hidden-button'} onClick={onPrevious}>
              <span className="game-button-icon">←</span>
            </button>
          ) : (
            <button className={settingsButtonVisible ? 'game-button' : 'hidden-button'} onClick={onOpenSettings}>
              <span className="game-button-icon">⚙️</span>
            </button>
          )}
        </div>
        <div className="slide-nav-right">
          {slideIndex < maxSlide && (
            <button className={slideButtonsVisible ? 'game-button' : 'hidden-button'} onClick={onNext}>
              <span className="game-button-icon">→</span>
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
