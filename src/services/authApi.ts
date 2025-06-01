
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      return data;
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
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('authToken');
  },

  checkAuth: async (): Promise<AuthResponse> => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return { success: false, message: 'No token found' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!data.success) {
        localStorage.removeItem('authToken');
      }
      
      return data;
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('authToken');
      return {
        success: false,
        message: 'Authentication check failed',
      };
    }
  },
};
