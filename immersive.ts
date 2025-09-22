import { registerPlugin } from '@capacitor/core';

type ImmersivePlugin = {
  enter(): Promise<void>;
  exit(): Promise<void>;
};

export const Immersive = registerPlugin<ImmersivePlugin>('Immersive');
