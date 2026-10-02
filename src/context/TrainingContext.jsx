import { createContext, useContext, useReducer, useEffect } from 'react';

const TrainingContext = createContext(null);

const STORAGE_KEY = 'blockchain-training-state';

const initialState = {
  modules: {
    explorer: { completed: false, score: 0, maxScore: 20 },
    build: { completed: false, score: 0, maxScore: 20 },
    tamper: { completed: false, score: 0, maxScore: 25 },
    smartContract: { completed: false, score: 0, maxScore: 20 },
    caseStudy: { completed: false, score: 0, maxScore: 15 },
  },
  instructorMode: false,
  instructorUnlocked: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_MODULE':
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.module]: {
            ...state.modules[action.module],
            completed: true,
            score: action.score,
          },
        },
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.module]: {
            ...state.modules[action.module],
            score: action.score,
          },
        },
      };
    case 'TOGGLE_INSTRUCTOR':
      return {
        ...state,
        instructorMode: !state.instructorMode,
      };
    case 'UNLOCK_INSTRUCTOR':
      return {
        ...state,
        instructorUnlocked: true,
        instructorMode: true,
      };
    case 'RESET':
      return { ...initialState };
    case 'LOAD':
      return { ...initialState, ...action.state };
    default:
      return state;
  }
}

export function TrainingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...init, ...parsed };
      }
    } catch (e) {
      // ignore
    }
    return init;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state]);

  const totalScore = Object.values(state.modules).reduce((sum, m) => sum + m.score, 0);
  const maxTotal = Object.values(state.modules).reduce((sum, m) => sum + m.maxScore, 0);
  const completedCount = Object.values(state.modules).filter((m) => m.completed).length;
  const totalModules = Object.keys(state.modules).length;
  const progress = Math.round((completedCount / totalModules) * 100);
  const allComplete = completedCount === totalModules;

  const value = {
    ...state,
    totalScore,
    maxTotal,
    completedCount,
    totalModules,
    progress,
    allComplete,
    dispatch,
  };

  return (
    <TrainingContext.Provider value={value}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining() {
  const ctx = useContext(TrainingContext);
  if (!ctx) throw new Error('useTraining must be used within TrainingProvider');
  return ctx;
}
