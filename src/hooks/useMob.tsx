import { useRef, useCallback } from 'react';

interface Mob {
    x: number;
    y: number;
    size: number;
    speed: number;
    color: string;
}

const useMobs = (initialMobs: Mob[] = []) => {
    const mobsRef = useRef<Mob[]>(initialMobs);

    const spawnMob = useCallback((mob: Mob) => {
        mobsRef.current = [...mobsRef.current, mob];
    }, []);

    const updateMobs = useCallback((deltaTime: number) => {
        const updatedMobs = mobsRef.current.map(mob => ({
            ...mob,
            x: mob.x + mob.speed * deltaTime / 1000,
            y: mob.y
        }));
        mobsRef.current = updatedMobs;
        // console.log('Mobs updated', mobsRef.current);
    }, []);

    const loadLevel = useCallback((mobs: Mob[]) => {
        mobsRef.current = mobs;
    }, []);

    return { mobs: mobsRef.current, spawnMob, updateMobs, loadLevel };
};

export default useMobs;
