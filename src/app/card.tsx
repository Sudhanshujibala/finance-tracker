// src/components/ui/card.tsx
import React from 'react';

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="card">{children}</div>;
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="card-header">{children}</div>;
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="card-content">{children}</div>;
};

export const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="card-title">{children}</h3>;
};
