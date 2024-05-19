import MobType from "../types/mobType";
export default class MobFactory {
  static createMob(type: string): MobType | null {
    const yRange = { min: 0, max: 650 };
    const sizeRange = { min: 50, max: 150 };
    const speedRange = { min: 0, max: 30 };

    const randomInRange = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    switch (type) {
      case "chicken":
        return {
          x: -40,
          y: randomInRange(yRange.min, yRange.max),
          size: randomInRange(sizeRange.min, sizeRange.max),
          speed: randomInRange(yRange.min, yRange.max),
          color: "red",
          reward: 10,
          sprite: {
            spriteUrl: "chicken/64x64.png",
            frameIndex: 0,
            totalFrames: 12,
            frameRate: 24,
            mirror: true,
          },
          hit: false,
        };
      case "hedgehog":
        return {
          x: randomInRange(yRange.min, 1920),
          y: randomInRange(500, 800),
          size: randomInRange(yRange.min, 40),
          speed: 0,
          color: "red",
          reward: -10,
          sprite: {
            spriteUrl: "hedgehog/128x128.png",
            frameIndex: 0,
            totalFrames: 1,
            frameRate: 0,
            mirror: true,
          },
          hit: false,
        };
      case "bigChicken":
        return {
          x: randomInRange(yRange.min, 1920),
          y: randomInRange(500, 800),
          size: randomInRange(60, 200),
          speed: 0,
          color: "red",
          reward: 10,
          sprite: {
            spriteUrl: "chicken_front/128x128.png",
            frameIndex: 0,
            totalFrames: 17,
            frameRate: 0,
            mirror: true,
          },
          hit: false,
        };
      default:
        return null;
    }
  }
}
