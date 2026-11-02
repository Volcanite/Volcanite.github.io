import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const TOP_THRESHOLD = 24;
const HIDE_THRESHOLD = 120;
const SHOW_THRESHOLD = 8;

function MainLayout() {
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== 'undefined' && window.scrollY > TOP_THRESHOLD,
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let scrollDirection = 0;
    let accumulatedScroll = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;
      previousScrollY = currentScrollY;

      if (currentScrollY <= TOP_THRESHOLD) {
        setIsCompact(false);
        setIsVisible(true);
        scrollDirection = 0;
        accumulatedScroll = 0;
        return;
      }

      setIsCompact(true);

      if (scrollDelta === 0) return;

      const nextDirection = Math.sign(scrollDelta);
      if (nextDirection !== scrollDirection) {
        scrollDirection = nextDirection;
        accumulatedScroll = 0;
      }
      accumulatedScroll += Math.abs(scrollDelta);

      if (scrollDirection > 0 && accumulatedScroll >= HIDE_THRESHOLD) {
        setIsVisible(false);
        accumulatedScroll = 0;
      } else if (scrollDirection < 0 && accumulatedScroll >= SHOW_THRESHOLD) {
        setIsVisible(true);
        accumulatedScroll = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <header
        inert={!isVisible}
        className={`fixed inset-x-0 top-0 z-50 flex items-center border-b border-neutral-200/50 bg-[var(--color-bg)]/90 px-4 backdrop-blur-md transition-[height,transform] duration-300 ease-out motion-reduce:transition-none sm:px-6 ${
          isCompact ? 'h-16' : 'h-24'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="mx-auto w-full max-w-7xl">
          <Navbar compact={isCompact} />
        </div>
      </header>

      <div aria-hidden="true" className="h-24" />

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-neutral-200 px-6 py-8">
        <div className="mx-auto max-w-7xl text-sm text-neutral-500">
          © {new Date().getFullYear()} Navelys. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;