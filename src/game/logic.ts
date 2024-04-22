import MobType from "../types/mobType";
import LevelType from "../types/levelType";

type Listener = (mobs: MobType[], background: string) => void;

class Game {
  public mobs: MobType[];
  private listeners: Listener[];
  private background: string;

  constructor() {
    this.mobs = [];
    this.listeners = [];
    this.background = "white";
  }

  spawnMob(mob: MobType): void {
    if (mob.sprite) {
      this.loadMobSprite(mob);
    }
    this.mobs.push(mob);
    this.notify();
  }

  updateMobs(deltaTime: number): void {
    this.mobs = this.mobs.map((mob: MobType) => {
      const updatedMob = {
        ...mob,
        x: mob.x + mob.speed * deltaTime,
        y: mob.y,
      };

      if (mob.sprite) {
        // this.updateAnimationFrame(mob.sprite, deltaTime);
      }
      return updatedMob;
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
    image.src = mob.sprite.spriteUrl;
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.mobs, this.background));
  }

  removeListener(callback: Listener): void {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }
}

export default Game;
