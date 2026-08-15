import {useEffect, useRef} from 'react';
import {Link} from 'react-router';

/**
 * Full-viewport WebGL glitch slideshow used as the homepage hero.
 *
 * The underlying slideshow.js does DOM/WebGL work at module scope, so it
 * is only ever loaded client-side via dynamic import inside useEffect —
 * never at SSR time, and never as a static import (which Vite would
 * otherwise try to include in the server bundle).
 */
export default function GlitchSlideshow() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let destroy: (() => void) | undefined;
    let cancelled = false;

    import('./slideshow.js').then(({initSlider, destroySlider}) => {
      if (cancelled) return;
      initSlider();
      destroy = destroySlider;
    });

    return () => {
      cancelled = true;
      // Tears down the WebGL renderer, GSAP tweens, the Tweakpane panel,
      // and every window/document listener the slideshow registered, so
      // nothing leaks or hijacks input after navigating to another route.
      destroy?.();
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="image-slider glitch-slideshow"
      role="region"
      aria-label="Image carousel"
      data-image-slider-init
    >
      <canvas className="webgl-canvas" data-webgl-canvas aria-hidden="true"></canvas>

      <Link
        to="/collections/all"
        className="corner-text corner-text-top-right corner-text-button"
      >
        <div>MADNESS</div>
        <div>RISES</div>
      </Link>

      <Link
        to="/collections/all"
        className="corner-text corner-text-bottom-right corner-text-button"
      >
        <div>ELDRITCH</div>
        <div>AWAKENS</div>
      </Link>

      <aside className="corner-text corner-text-center" aria-hidden="true">
        <div>R'LYEH</div>
        <div></div>
        <div>FHTAGN</div>
        <div></div>
        <div></div>
        <div></div>
        <div>CTHULHU</div>
        <div></div>
        <div>THE</div>
        <div>SLEEPER</div>
        <div>STIRS</div>
      </aside>

      <section className="featured-image" data-featured-image>
        <div className="featured-image-wrapper" data-featured-wrapper>
          <img src="https://assets.codepen.io/7558/horror-01.jpg" alt="Awakening Abyss" />
        </div>
      </section>

      <header className="slide-text" data-slide-text>
        <div className="slide-number" data-slide-number>
          <span>∅1</span>
        </div>
        <div className="slide-title" data-slide-title>
          <h1>Awakening Abyss</h1>
        </div>
        <div className="slide-description" data-slide-description>
          <p>Eldritch Emergence</p>
        </div>
      </header>

      <div className="slide-paragraph" data-slide-paragraph>
        <div className="slide-paragraph-line" data-paragraph-line-1>
          <span>Archived VHS documentary footage captures the moment</span>
        </div>
        <div className="slide-paragraph-line" data-paragraph-line-2>
          <span>an ancient cosmic entity ruptures frozen silence.</span>
        </div>
      </div>
    </main>
  );
}
