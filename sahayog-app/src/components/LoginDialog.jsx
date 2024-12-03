import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  Button,
  Alert
} from "@mui/material";
import { Lock, User, AlertTriangle } from "lucide-react";

const LoginDialog = ({ 
  open, 
  onClose, 
  onLogin, 
  credentials, 
  setCredentials 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(credentials);
    if (!success) {
      setLoginError(true);
    }
  };

  const handleCloseError = () => {
    setLoginError(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "20px",
          padding: "16px",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          maxWidth: "450px",
          width: "100%",
        },
      }}
    >
      <DialogTitle className="text-center">
        <div className="flex justify-center items-center mb-4">
          <Lock 
            size={48} 
            className="text-blue-600 mr-3 animate-pulse"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Secure Login
          </h2>
        </div>
      </DialogTitle>
      <DialogContent>
        {loginError && (
          <Alert 
            icon={<AlertTriangle size={24} />}
            severity="error"
            onClose={handleCloseError}
            sx={{
              marginBottom: 2,
              borderRadius: '12px',
              backgroundColor: '#fee2e2',
              color: '#7f1d1d',
              '& .MuiAlert-icon': {
                color: '#ef4444'
              }
            }}
          >
            Invalid credentials. Please try again.
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              value={credentials.username}
              onChange={(e) => 
                setCredentials({ 
                  ...credentials, 
                  username: e.target.value 
                })
              }
              InputProps={{
                startAdornment: (
                  <User 
                    size={20} 
                    className="text-blue-500 mr-2" 
                  />
                ),
                sx: {
                  borderRadius: "12px",
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563eb',
                  },
                },
              }}
              className="mb-4"
            />
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              label="Password"
              value={credentials.password}
              onChange={(e) => 
                setCredentials({ 
                  ...credentials, 
                  password: e.target.value 
                })
              }
              InputProps={{
                startAdornment: (
                  <Lock 
                    size={20} 
                    className="text-blue-500 mr-2" 
                  />
                ),
                sx: {
                  borderRadius: "12px",
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563eb',
                  },
                },
              }}
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              className="mr-2"
              sx={{
                borderRadius: "12px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              sx={{
                borderRadius: "12px",
                background: "linear-gradient(to right, #3b82f6, #2563eb)",
                transition: "all 0.3s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                boxShadow: isHovered 
                  ? "0 10px 15px -3px rgba(59, 130, 246, 0.4)" 
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              Login
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;