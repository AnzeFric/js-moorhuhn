interface MobType {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  reward?: number;
  hit?: boolean;
  creationTime?: number;
  durationToHide?: number;
  isFalling?: boolean;
  fallSpeed?: number;
  sprite?: {
    image?: any;
    spriteUrl: string;
    frameIndex: number;
    totalFrames: number;
    frameRate: number;
    lastUpdate?: number;
    mirror?: boolean;
    continuous: boolean | true;
  };
  spriteShot?: {
    image?: any;
    spriteUrl: string;
    frameIndex: number;
    totalFrames: number;
    frameRate: number;
    lastUpdate?: number;
    mirror?: boolean;
    continuous: boolean | true;
  };
}
export default MobType;
