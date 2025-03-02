import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast, Toaster } from "react-hot-toast";
import { LogIn, CheckCircle } from "lucide-react";
import "./authStyle.css"

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      
      // Show success toast with custom styling
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Login Successful!
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Welcome back! Redirecting to dashboard...
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        { duration: 3000 }
      );
      
      // Delay navigation slightly to allow the user to see the success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login Error:", error);
      
      switch (error.code) {
        case "auth/user-not-found":
          setErrors({...errors, email: "No account found with this email"});
          toast.error("No account found with this email");
          break;
        case "auth/wrong-password":
          setErrors({...errors, password: "Incorrect password"});
          toast.error("Incorrect password");
          break;
        case "auth/invalid-email":
          setErrors({...errors, email: "Invalid email address"});
          toast.error("Invalid email address");
          break;
        case "auth/too-many-requests":
          toast.error("Too many failed attempts. Try again later.");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Please check your connection");
          break;
        default:
          toast.error("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container page-transition">
      {/* Toast container */}
      <Toaster position="top-right" />
      
      <div className="auth-logo">
        <img className="h-20 w-auto dark:hidden" alt="Logo" />
        <img className="h-20 w-auto hidden dark:block" alt="Logo" />
      </div>
      
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-title">
            <LogIn className="h-6 w-6 text-primary" />
            <h3 className="auth-title-text">Sign In</h3>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-input ${errors.password ? 'input-error' : ''}`}
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          
          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={() => navigate("/signup")} 
                className="auth-link"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;