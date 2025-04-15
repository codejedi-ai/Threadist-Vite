import React from 'react';
import {
  Card as ChakraCard,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Box,
  CardProps as ChakraCardProps,
} from "@chakra-ui/react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  footer?: React.ReactNode;
} & ChakraCardProps;

export default function Card({ children, title, footer, ...props }: CardProps) {
  return (
    <ChakraCard {...props}>
      {title && <CardHeader><Heading size="md">{title}</Heading></CardHeader>}
      <CardBody>
        {children}
      </CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </ChakraCard>
  );
}