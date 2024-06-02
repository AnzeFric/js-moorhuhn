import MobType from "../types/mobType";
import LevelType from "../types/levelType";
import MobFactory from "./MobFactory";
type Listener = (mobs: MobType[], background: string) => void;

class Game {
  public mobs: MobType[];
  private listeners: Listener[];
  private background: string;
  private mobGenerator?: any;

  constructor() {
    this.mobs = [];
    this.listeners = [];
    this.background = "white";
  }

  spawnMob(type: string): void {
    const mob = MobFactory.createMob(type);
    if (mob) {
      if (mob.sprite) {
        this.loadMobSprite(mob);
      }
      mob.creationTime = performance.now() || 0;
      this.mobs.push(mob);
      this.notify();
    }
  }

  /*updateMobs(deltaTime: number, ctx: CanvasRenderingContext2D): void {
    const currentTime = performance.now();
    const canvasHeight = ctx.canvas.height;
    // Filter out hit mobs before updating positions
    this.mobs = this.mobs
      .filter(
        (mob) =>
          (!mob.hit || (mob.hit && mob.isFalling)) &&
          ((mob.durationToHide ?? -1) < 0 ||
            currentTime - (mob.creationTime ?? 0) < (mob.durationToHide ?? 0))
      )
      .map((mob) => {
        return {
          ...mob,
          x: mob.x + mob.speed * deltaTime, // update position based on speed and delta time
        };
      });

    this.notify();
  }*/

  updateMobs(deltaTime: number, ctx: CanvasRenderingContext2D): void {
    const currentTime = performance.now();
    const canvasHeight = ctx.canvas.height;

    this.mobs = this.mobs.filter((mob) => {
      if (
        mob.durationToHide &&
        currentTime - (mob.creationTime ?? 0) > mob.durationToHide
      ) {
        return false;
      }
      if (mob.hit && !mob.isFalling && mob.fallSpeed !== -1) {
        mob.isFalling = true;
        mob.fallSpeed = 60; // Initial falling speed
      }
      if (mob.isFalling) {
        mob.fallSpeed = (mob.fallSpeed ?? 0) + 9.81 * deltaTime;
        mob.y = mob.y + mob.fallSpeed * deltaTime;
        if (mob.y > canvasHeight) {
          return false;
        }
        return true;
      }
      if (mob.hit) {
        const shotDone =
          mob.spriteShot?.frameIndex === (mob.spriteShot?.totalFrames ?? 0) - 1;
        if (!mob.spriteShot?.continuous && shotDone) {
          return false;
        }
        return true;
      }
      mob.x += mob.speed * deltaTime;
      return true;
    });

    this.notify();
  }

  onStateChange(callback: Listener): void {
    this.listeners.push(callback);
  }

  loadLevel(level: LevelType): void {
    this.background = level.background;
    this.mobs = level.mobs.map((mob: MobType) => {
      this.loadMobSprite(mob);
      return mob;
    });
    this.notify();
  }

  private loadMobSprite(mob: MobType): void {
    if (!mob.sprite?.spriteUrl) return;
    const image = new Image();
    image.onload = () => {
      if (mob.sprite) {
        mob.sprite.image = image;
      }
    };
    if (mob.spriteShot?.spriteUrl) {
      const imageShot = new Image();
      imageShot.onload = () => {
        if (mob.spriteShot) {
          mob.spriteShot.image = imageShot;
        }
      };
      imageShot.src = mob.spriteShot.spriteUrl;
    }
    image.src = mob.sprite.spriteUrl;
  }

  startMobGenerator(interval: number = 2000): void {
    this.mobGenerator = setInterval(() => {
      const mobs = [
        { type: "chicken", weight: 50 },
        { type: "ballon", weight: 10 },
        { type: "hedgehog", weight: 0 },
        { type: "bigChicken", weight: 15 },
      ];
      const totalWeight = mobs.reduce((total, mob) => total + mob.weight, 0);
      let random = Math.random() * totalWeight;
      let selectedType = "chicken";

      for (const mob of mobs) {
        if (random < mob.weight) {
          selectedType = mob.type;
          break;
        }
        random -= mob.weight;
      }

      this.spawnMob(selectedType);
    }, interval);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.mobs, this.background));
  }

  removeListener(callback: Listener): void {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }
}

export default Game;
