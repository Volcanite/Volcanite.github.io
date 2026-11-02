import { Link } from 'react-router';
import LogoMark from '../assets/LogoMark.png';

const navigationItems = [
  { label: 'Notre équipe', path: '/about' },
  { label: 'Actualités', path: '/News' },
];

type NavbarProps = {
  compact: boolean;
};

function Navbar({ compact }: NavbarProps) {
  const linkSize = compact
    ? 'text-[clamp(0.75rem,0.95vw,0.9rem)] px-[clamp(0.2rem,0.6vw,0.6rem)] py-1'
    : 'text-[clamp(0.875rem,1.1vw,1rem)] px-[clamp(0.25rem,0.8vw,0.75rem)] py-2';

  return (
    <nav
      aria-label="Navigation principale"
      className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[clamp(0.25rem,1vw,0.75rem)]"
    >
      <div className="flex items-center justify-start gap-[clamp(0.25rem,1vw,0.75rem)] sm:gap-[clamp(0.75rem,2vw,1.5rem)]">
        {compact && (
          <Link
            to="/"
            className={`${linkSize} whitespace-nowrap font-semibold text-neutral-600 transition-colors hover:text-neutral-800 motion-reduce:transition-none`}
          >
            Navelys
          </Link>
        )}
        {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${linkSize} whitespace-nowrap text-neutral-600 transition-[font-size,padding,color] duration-300 hover:text-neutral-800 motion-reduce:transition-none hidden sm:inline`}
            >
              {item.label}
            </Link>
        ))}
      </div>

      <Link
        to="/"
        aria-label="Navelys, accueil"
        className="flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-tight"
      >
        <img
          src={LogoMark}
          alt=""
          aria-hidden="true"
          className={`shrink-0 object-contain transition-[width,height] duration-300 motion-reduce:transition-none ${
            compact ? 'h-8 w-8' : 'h-10 w-10'
          }`}
        />
        {!compact && (
          <span className="text-[clamp(1.25rem,1.6vw,1.5rem)]">
            Navelys
          </span>
        )}
      </Link>

      <div className="flex items-center justify-end gap-[clamp(0.25rem,1vw,0.75rem)] sm:gap-[clamp(0.75rem,2vw,1.5rem)]">
        <Link
          to="/contact"
          className={`${linkSize} whitespace-nowrap text-neutral-600 transition-[font-size,padding,color] duration-300 hover:text-neutral-800 motion-reduce:transition-none`}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
