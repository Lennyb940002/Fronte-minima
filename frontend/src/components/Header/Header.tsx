import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { TerminalText } from './TerminalText';

export function Header() {
  return (
    <header className="bg-black p-6 flex items-center justify-between">
      <Logo />
      <Navigation />
      <TerminalText />
    </header>
  );
}