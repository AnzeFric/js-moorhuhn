interface MobType {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  reward?: number;
  hit?: boolean;
  sprite?: {
    image?: any;
    spriteUrl: string;
    frameIndex: number;
    totalFrames: number;
    frameRate: number;
    lastUpdate?: number;
    mirror?: boolean;
  };
}
export default MobType;
