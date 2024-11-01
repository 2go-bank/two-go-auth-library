// Components
export { default as Login } from './pages/Login.tsx';
export { default as ForgotPassword } from './pages/ForgotPassword.tsx';
export { default as ValidateOTP } from './pages/ValidateOTP.tsx';
export { default as ResetPassword } from './pages/ResetPassword.tsx';
export { default as Settings } from './pages/Settings.tsx';
export { default as Stats } from './pages/Stats.tsx';

// Layout Components
export { default as Header } from './components/layout/Header.tsx';
export { default as Footer } from './components/layout/Footer.tsx';
export { default as UserProfileWidget } from './components/layout/UserProfileWidget.tsx';

// Auth Components
export { default as ProtectedRoute } from './components/auth/ProtectedRoute.tsx';

// Utils
export { apiService } from './services/api.ts';
export { isAuthenticated } from './utils/auth.ts';
export { cn } from './lib/utils.ts';

// Store
export { store } from './store/store.ts';
export { default as authReducer } from './store/authSlice.ts';
export type { RootState, AppDispatch } from './store/store.ts';

// UI Components
export {
    Button,
    Input,
    Label,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Toast,
    Toaster,
    useToast,
} from './components/ui';