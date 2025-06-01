
import { supabase } from '../lib/supabase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
  token?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      if (data.user) {
        return {
          success: true,
          message: 'Login successful',
          user: {
            id: data.user.id,
            email: data.user.email || '',
            role: data.user.user_metadata?.role || 'Security Analyst',
          },
          token: data.session?.access_token,
        };
      }

      return {
        success: false,
        message: 'Login failed',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            role: credentials.role || 'Security Analyst',
          },
        },
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      if (data.user) {
        return {
          success: true,
          message: 'Account created successfully',
          user: {
            id: data.user.id,
            email: data.user.email || '',
            role: data.user.user_metadata?.role || 'Security Analyst',
          },
          token: data.session?.access_token,
        };
      }

      return {
        success: false,
        message: 'Signup failed',
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  checkAuth: async (): Promise<AuthResponse> => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return { 
          success: false, 
          message: 'No authenticated user' 
        };
      }

      return {
        success: true,
        message: 'User authenticated',
        user: {
          id: user.id,
          email: user.email || '',
          role: user.user_metadata?.role || 'Security Analyst',
        },
      };
    } catch (error) {
      console.error('Auth check error:', error);
      return {
        success: false,
        message: 'Authentication check failed',
      };
    }
  },
};
