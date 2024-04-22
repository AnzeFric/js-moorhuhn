interface MobType {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  sprite?: {
    image?: any;
    spriteUrl: string;
    frameIndex: number;
    totalFrames: number;
    frameRate: number;
    lastUpdate?: number;
  };
}
export default MobType;
