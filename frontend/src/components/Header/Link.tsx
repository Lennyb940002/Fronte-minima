interface LinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export function Link({ href, children, active }: LinkProps) {
  return (
    <a
      href={href}
      className={`px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-white ${
        active ? 'bg-white text-black border border-white' : 'text-white'
      }`}
    >
      {children}
    </a>
  );
}