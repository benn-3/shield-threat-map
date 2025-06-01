
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { login } from '../../store/slices/authSlice';
import { authApi, SignupCredentials } from '../../services/authApi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState<SignupCredentials>({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Security Analyst',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (credentials.password !== credentials.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    if (credentials.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const response = await authApi.signup(credentials);
      
      if (response.success && response.user) {
        dispatch(login({
          email: response.user.email,
          role: response.user.role,
        }));
        toast({
          title: "Account Created",
          description: "Welcome to CyberSec Dashboard!",
        });
      } else {
        toast({
          title: "Signup Failed",
          description: response.message || "Failed to create account",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Create Account</h2>
        <p className="text-slate-400 mt-2">Join the CyberSec platform</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
            className="bg-slate-800 border-slate-600 text-white"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-white">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={handleInputChange}
              required
              className="bg-slate-800 border-slate-600 text-white pr-10"
              placeholder="Create a password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={credentials.confirmPassword}
              onChange={handleInputChange}
              required
              className="bg-slate-800 border-slate-600 text-white pr-10"
              placeholder="Confirm your password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="role" className="text-white">Role</Label>
          <Input
            id="role"
            name="role"
            type="text"
            value={credentials.role}
            onChange={handleInputChange}
            className="bg-slate-800 border-slate-600 text-white"
            placeholder="Your role"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          {isLoading ? (
            "Creating account..."
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Create Account
            </>
          )}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-slate-400">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-red-400 hover:text-red-300 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
