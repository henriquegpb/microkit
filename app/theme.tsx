"use client";

import { Moon, Sun } from "lucide";
import { MorphIcon } from "morphicons/react";
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

/** Lido pelo script inline do layout e por este módulo, que têm de concordar. */
export const THEME_STORAGE_KEY = "microkit-theme";

/*
 * O tema vive num atributo do <html>, não no estado do React.
 *
 * Quem faz o trabalho é o CSS — `:root[data-theme="light"]` redefine os mesmos
 * tokens — então o atributo é a verdade e o React apenas o lê para desenhar o
 * ícone certo. É também o que permite ao script inline do layout acertar o tema
 * antes da primeira pintura, sem esperar a hidratação.
 *
 * Daí `useSyncExternalStore` em vez de `useState` com um efeito: o valor não
 * nasce no React, e um efeito que o copia para dentro do estado é uma cópia que
 * pode divergir da fonte.
 */
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/* No servidor não há preferência a consultar. Escuro é o valor do `:root`, e o
 * script inline corrige antes da primeira pintura se for o caso. */
const getServerSnapshot = (): Theme => "dark";

export const useTheme = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

function commit(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Sem localStorage — janela privada, armazenamento bloqueado — o tema vale
    // para esta visita e a próxima volta à preferência do sistema.
  }
  // Notificação síncrona: é o que faz o `flushSync` abaixo ter efeito.
  for (const listener of listeners) listener();
}

/*
 * A varredura diagonal, copiada do GradesInteli.
 *
 * Os keyframes e os pseudo-elementos vivem no globals.css; aqui fica o que
 * precisa de JavaScript. Dois detalhes que a implementação original explicita e
 * que continuam valendo:
 *
 * 1. O atributo de direção vai no <html> antes de a transição começar, porque é
 *    ele que escolhe de que canto o tema novo entra — cada um vem do lado do
 *    seu próprio ícone.
 * 2. O callback do `startViewTransition` precisa devolver o DOM já atualizado.
 *    O render do React é assíncrono, então sem `flushSync` o snapshot "novo"
 *    sairia com o ícone antigo.
 */
const DIRECTION_ATTR = "data-theme-to";

export function toggleTheme(current: Theme) {
  const next: Theme = current === "dark" ? "light" : "dark";
  const root = document.documentElement;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (typeof document.startViewTransition !== "function" || reduced) {
    commit(next);
    return;
  }

  root.setAttribute(DIRECTION_ATTR, next);
  const transition = document.startViewTransition(() => flushSync(() => commit(next)));

  /* `finished` rejeita quando a transição é pulada — outra começa por cima, ou
   * a aba vai para segundo plano. O atributo tem de sair nos dois casos. */
  void transition.finished.catch(() => {}).finally(() => root.removeAttribute(DIRECTION_ATTR));
}

export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => toggleTheme(theme)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {/*
       * O ícone mostra o tema para onde o clique leva, não o atual: no escuro
       * ele é um sol, e clicar acende a luz. `MorphIcon` recebe os dados do
       * pacote `lucide` — não os componentes do `lucide-react`, que ele não
       * consome — e é a troca da prop que dispara o morph.
       */}
      <MorphIcon icon={theme === "dark" ? Sun : Moon} size={16} strokeWidth={2} />
    </button>
  );
}
