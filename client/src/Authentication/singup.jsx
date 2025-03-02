import { auth, db } from "./firebase";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserPlus, CheckCircle } from "lucide-react";
import "./authStyle.css"
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    
    if (!fname.trim()) newErrors.fname = "First name is required";
    if (!lname.trim()) newErrors.lname = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        email.trim(), 
        password.trim()
      );
      const user = userCredential.user;
      
      // Then create the user document
      try {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          createdAt: new Date().toISOString(),
        });
        
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
                      Registration Successful!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Your account has been created. Redirecting to login...
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
          { duration: 5000 }
        );
        
        // Delay navigation slightly to allow the user to see the success message
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } catch (firestoreError) {
        console.error("Firestore Error:", firestoreError);
        toast.error("Account created but profile setup failed. Please contact support.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrors({...errors, email: "An account with this email already exists"});
          toast.error("An account with this email already exists");
          break;
        case "auth/invalid-email":
          setErrors({...errors, email: "Invalid email address"});
          toast.error("Invalid email address");
          break;
        case "auth/weak-password":
          setErrors({...errors, password: "Password is too weak"});
          toast.error("Password is too weak");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Please check your connection");
          break;
        default:
          toast.error(`Failed to create account: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container page-transition">
      {/* Toast container */}
      <Toaster position="top-right" />
      
      {/* Logo positioned above the box */}
      <div className="auth-logo">
        <img className="h-20 w-auto dark:hidden" alt="Logo" />
        <img className="h-20 w-auto hidden dark:block" alt="Logo" />
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-title">
            <UserPlus className="h-6 w-6 text-primary" />
            <h3 className="auth-title-text">Create Account</h3>
          </div>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className={`form-input ${errors.fname ? 'input-error' : ''}`}
            />
            {errors.fname && <div className="error-text">{errors.fname}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className={`form-input ${errors.lname ? 'input-error' : ''}`}
            />
            {errors.lname && <div className="error-text">{errors.lname}</div>}
          </div>

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
            disabled={loading}
            className="auth-button"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="auth-link"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;