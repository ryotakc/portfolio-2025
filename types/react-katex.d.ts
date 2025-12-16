declare module "react-katex" {
  import * as React from "react";

  export interface KatexProps {
    math: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error | TypeError) => React.ReactNode;
    // biome-ignore lint/suspicious/noExplicitAny: Katex settings are complex
    settings?: any;
    // biome-ignore lint/suspicious/noExplicitAny: Polymorphic prop
    as?: string | React.ComponentType<any>;
    children?: React.ReactNode;
    className?: string;
  }

  export class InlineMath extends React.Component<KatexProps> {}
  export class BlockMath extends React.Component<KatexProps> {}
}
