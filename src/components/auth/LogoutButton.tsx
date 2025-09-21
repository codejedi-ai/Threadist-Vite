import React from "react";
import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

interface LogoutButtonProps {
  children?: React.ReactNode;
  variant?: string;
  colorScheme?: string;
  size?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  children = "Log Out", 
  variant = "ghost",
  colorScheme,
  size
}) => {
  const { logout } = useAuth0();

  return (
    <Button 
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      variant={variant}
      colorScheme={colorScheme}
      size={size}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;