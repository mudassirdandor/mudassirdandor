import { Component, ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside Executive Platform:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          id="error-boundary-screen"
          className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 font-sans selection:bg-blue-500/30 selection:text-white"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Header ambient line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div 
                className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400"
                aria-hidden="true"
              >
                <AlertOctagon className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-display">
                  System Level Exception
                </h1>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  PLATFORM ERROR CAUGHT
                </p>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
                  An unexpected error occurred during execution of the decision intelligence module. The container state remains healthy, but the user view crashed.
                </p>
              </div>

              {this.state.error && (
                <div className="w-full bg-slate-900/50 border border-slate-800/80 rounded-lg p-3.5 text-left">
                  <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Error Diagnostic Trace
                  </span>
                  <p className="font-mono text-[10px] text-red-300 leading-normal break-all line-clamp-3">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <button
                  id="reload-btn"
                  onClick={this.handleReset}
                  className="w-full sm:flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-750 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-blue-500"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
                  <span>Reload Session</span>
                </button>
                <button
                  id="home-btn"
                  onClick={this.handleGoHome}
                  className="w-full sm:flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-xs font-semibold text-white rounded-lg shadow-md shadow-blue-900/20 transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-blue-500"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Go to Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
