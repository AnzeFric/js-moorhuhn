import React, { useRef, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts'
import levels from './levels';
import Game from './logic';
import LevelType from '../types/levelType';


const GameEnvironment = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { width = 0, height = 0 } = useWindowSize()
    const [background, setbackground] = useState<any>({
        color: "white",
        image: null
    });
    // const { mobs, spawnMob, updateMobs, loadLevel } = useMobs(); // No need to provide initialMobs

    const gameRef = useRef(new Game());
    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const game = gameRef.current;
        const selectedLevel: LevelType = levels.level1;
        // game.onStateChange(setMobs);

        game.loadLevel(selectedLevel);

        setbackground({
            color: selectedLevel.background,
            image: selectedLevel.backgroundImg
        });


        let frameCount = 0;
        let fps = 0;
        let lastFpsUpdate = performance.now();
        let lastFrameTime = 0;


        const gameLoop = (timestamp: any) => {
            //resetiraj celoten kanvas (pobriši vse)
            ctx.clearRect(0, 0, width, height);


            const now = performance.now();
            const deltaTime = (timestamp - lastFrameTime) / 1000;
            lastFrameTime = now;
            frameCount++;


            //posodobi pozicije vseh kokoši
            game.updateMobs(deltaTime);


            //izriši vsako kokoš
            game.mobs.forEach((mob: any) => {
                ctx.fillStyle = mob.color;
                ctx.fillRect(mob.x, mob.y, mob.size, mob.size);
            });


            // izračunam FPS vsako sekundo
            if (now - lastFpsUpdate >= 1000) {
                fps = frameCount;
                frameCount = 0;
                lastFpsUpdate = now;
            }


            // Izrišem FPS vsak frame
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 100, 50);
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(`FPS: ${fps}`, 10, 30);


            requestAnimationFrame(gameLoop);

        };

        //redefiniram velikost kanvasa
        canvas.width = width;
        canvas.height = height;

        const rafId = requestAnimationFrame(gameLoop);
        return () => {
            cancelAnimationFrame(rafId);
        };
    }, []);




    return (
        <canvas ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: background.image ? "transparent" : background.color,
                backgroundImage: background.image ? `url(${background.image})` : 'none'

            }}></canvas>
    );
}

export default GameEnvironment;
