import MobType from "../types/mobType";
export default class MobFactory {
  static createMob(type: string): MobType | null {
    const yRange = { min: 0, max: 650 };
    const sizeRange = { min: 50, max: 150 };
    const xRange = { min: 0, max: 1920 };
    const randomInRange = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const calculateReward = (size: number): number => {
      if (size < 65) return 30;
      if (size < 100) return 20;
      return 10;
    };

    switch (type) {
      case "chicken": {
        const sizeChicken = randomInRange(sizeRange.min, sizeRange.max);
        return {
          x: -40,
          y: randomInRange(yRange.min, yRange.max),
          size: sizeChicken,
          speed: randomInRange(30, 150),
          color: "red",
          reward: calculateReward(sizeChicken),
          fallSpeed: -1,
          sprite: {
            spriteUrl: "chicken/64x64.png",
            frameIndex: 0,
            totalFrames: 12,
            frameRate: 24,
            mirror: true,
            continuous: true,
          },
          spriteShot: {
            spriteUrl: "chicken/shot/64x64.png",
            frameIndex: 0,
            totalFrames: 12,
            frameRate: 6,
            mirror: true,
            continuous: false,
          },
          hit: false,
        };
      }
      case "hedgehog":
        return {
          x: randomInRange(yRange.min, 1920),
          y: randomInRange(500, 800),
          size: randomInRange(yRange.min, 40),
          speed: 0,
          color: "red",
          reward: -10,
          fallSpeed: -1,
          sprite: {
            spriteUrl: "hedgehog/128x128.png",
            frameIndex: 0,
            totalFrames: 1,
            frameRate: 0,
            mirror: true,
            continuous: false,
          },
          spriteShot: {
            spriteUrl: "hedgehog/shot/128x128.png",
            frameIndex: 0,
            totalFrames: 12,
            frameRate: 6,
            mirror: true,
            continuous: false,
          },
          hit: false,
        };
      case "bigChicken":
        return {
          x: randomInRange(xRange.min, xRange.max - 50),
          y: randomInRange(yRange.max - 300, yRange.max - 50),
          size: randomInRange(100, 300),
          speed: 0,
          color: "red",
          reward: 10,
          fallSpeed: -1,
          durationToHide: 6000,
          sprite: {
            spriteUrl: "chicken_front/256x256.png",
            frameIndex: 11,
            totalFrames: 12,
            frameRate: 0,
            mirror: true,
            continuous: false,
          },

          hit: false,
        };
      case "ballon":
        return {
          x: 0,
          y: randomInRange(yRange.min, yRange.max - 200),
          size: randomInRange(10, 150),
          speed: 30,
          color: "red",
          reward: -30,
          fallSpeed: 30,
          sprite: {
            spriteUrl: "balloon/128x128.png",
            frameIndex: 0,
            totalFrames: 1,
            frameRate: 0,
            mirror: true,
            continuous: false,
          },
          spriteShot: {
            spriteUrl: "balloon/shot/128x128.png",
            frameIndex: 0,
            totalFrames: 1,
            frameRate: 0,
            mirror: true,
            continuous: false,
          },

          hit: false,
        };
      default:
        return null;
    }
  }
}
