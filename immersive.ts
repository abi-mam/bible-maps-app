import { registerPlugin } from '@capacitor/core';

type ImmersivePlugin = {
  enter(): Promise<{ status: string }>;
  exit(): Promise<{ status: string }>;
};

export const Immersive = registerPlugin<ImmersivePlugin>('Immersive');

