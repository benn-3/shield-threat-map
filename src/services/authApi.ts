
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

// You'll need to replace this with your actual backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Login failed',
        };
      }

      // Store token in localStorage for future requests
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      return {
        success: true,
        message: 'Login successful',
        user: data.user,
        token: data.token,
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
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          role: credentials.role || 'Security Analyst',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Signup failed',
        };
      }

      // Store token in localStorage for future requests
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      return {
        success: true,
        message: 'Account created successfully',
        user: data.user,
        token: data.token,
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
      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('auth_token');
    }
  },

  checkAuth: async (): Promise<AuthResponse> => {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        return { 
          success: false, 
          message: 'No authentication token found' 
        };
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem('auth_token');
        return { 
          success: false, 
          message: 'Authentication check failed' 
        };
      }

      const data = await response.json();

      return {
        success: true,
        message: 'User authenticated',
        user: data.user,
      };
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('auth_token');
      return {
        success: false,
        message: 'Authentication check failed',
      };
    }
  },
};
