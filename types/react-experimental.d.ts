import 'react';

declare module 'react' {
  export const unstable_ViewTransition: React.FC<{
    name?: string;
    children: React.ReactNode;
  }>;
}
