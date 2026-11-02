import { Component, type ErrorInfo, type ReactNode } from "react";
import { isChunkLoadError, reloadOnce } from "../lib/chunkReload";

interface Props {
  children: ReactNode;
}
interface State {
  failed: boolean;
}

/**
 * Without a boundary, any render error or failed lazy chunk unmounts the whole
 * React tree, leaving only the black body until a manual refresh.
 */
export default class RouteErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("Route error:", error, info.componentStack);
    if (isChunkLoadError(error)) reloadOnce();
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center text-white">
        <p className="text-xs font-header font-bold tracking-[0.3em] uppercase text-white/60">
          Something went wrong loading this page
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border border-white/30 rounded-full text-xs font-header font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
          >
            Reload
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-white/30 rounded-full text-xs font-header font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
          >
            Home
          </a>
        </div>
      </div>
    );
  }
}
