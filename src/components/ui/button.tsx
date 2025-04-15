import React from 'react';
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react"

interface ButtonProps extends ChakraButtonProps {
  label: string;
}

export default function Button({
  label,
  children,
  ...props
}: ButtonProps) {
  return (
    <ChakraButton {...props}>
      {label || children}
    </ChakraButton>
  );
}