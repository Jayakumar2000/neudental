// neudental v1 - in-app links. <Link to="/treatments/braces"> renders a real
// <a href> (what crawlers follow) and, inside the app, switches page without
// a reload. Plain left clicks only: ctrl/cmd/middle clicks open a new tab as
// usual. A `to` with a #section on the home page ("/#booking-section")
// scrolls to that section.
import React, { createContext, useContext } from 'react';
import { inAppClick } from './routes';

type Navigate = (to: string) => void;

const NavigationContext = createContext<Navigate | null>(null);

export const NavigationProvider = NavigationContext.Provider;

export function useNavigate(): Navigate {
  const navigate = useContext(NavigationContext);
  return navigate ?? ((to: string) => { window.location.href = to; });
}

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const navigate = useContext(NavigationContext);
  const go = inAppClick(() => navigate?.(to));
  return (
    <a
      {...rest}
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (navigate) go(e);
      }}
    >
      {children}
    </a>
  );
}
