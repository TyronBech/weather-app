/**
 * Custom TypeScript declarations for non-code assets like SVGs.
 * This allows us to import SVG files as React components with proper typing.
 */
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}