import React from "react";
import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

interface LoginButtonProps {
  children?: React.ReactNode;
  variant?: string;
  colorScheme?: string;
  size?: string;
  leftIcon?: React.ReactElement;
}

const LoginButton: React.FC<LoginButtonProps> = ({ 
  children = "Log In", 
  variant = "outline",
  colorScheme,
  size,
  leftIcon
}) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
      onClick={() => loginWithRedirect()}
      variant={variant}
      colorScheme={colorScheme}
      size={size}
      leftIcon={leftIcon}
    >
      {children}
    </Button>
  );
};

export default LoginButton;