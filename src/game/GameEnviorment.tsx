import React, { useRef, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts'
import levels from './levels';
import Game from './logic';
import LevelType from '../types/levelType';
import MobType from '../types/mobType';
import { useCountdown } from 'usehooks-ts'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const GameEnvironment = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const MAX_BULLETS = 5
    const { width = 0, height = 0 } = useWindowSize()
    const [background, setbackground] = useState<any>({
        color: "white",
        image: null
    });
    const crosshairImage = useRef(new Image());  // Ref to hold the crosshair image
    const [points, setPoints] = useState(0);
    const pointsRef = useRef(0);
    const [reloading, setReloading] = useState(false);
    const [count, { startCountdown/*, stopCountdown, resetCountdown*/ }] =
        useCountdown({
            countStart: 60,
            intervalMs: 1000,
        })

    const [bulletCount, setBulletCount] = useState(5);
    const bulletCountRef = useRef(5);
    // const { mobs, spawnMob, updateMobs, loadLevel } = useMobs(); 
    const mousePosition = useRef({ x: 0, y: 0 });  // Using ref to hold the latest mouse position for access during animation frame

    const gameRef = useRef(new Game());
    function reloadGun() {
        setBulletCount(MAX_BULLETS);
        bulletCountRef.current = MAX_BULLETS;
        setReloading(true);
        setTimeout(() => {
            setReloading(false);
        }, 5000);
    }

    function drawSprite(ctx: CanvasRenderingContext2D, mob: MobType) {
        const now = performance.now();

        if (mob.sprite && mob.sprite.image) {
            const sprite = mob.sprite;
            const frameWidth = sprite.image.width / sprite.totalFrames;
            const frameHeight = sprite.image.height;

            if (!sprite.lastUpdate) sprite.lastUpdate = now;

            if (sprite.frameRate > 0) {
                const frameDelay = 1000 / sprite.frameRate;

                if (now - sprite.lastUpdate > frameDelay) {
                    sprite.frameIndex = (sprite.frameIndex + 1) % sprite.totalFrames;
                    sprite.lastUpdate = now;
                }
            }
            const frameX = sprite.frameIndex * frameWidth;


            if (sprite.mirror) {
                ctx.save(); // Save the current context state
                ctx.translate(mob.x + mob.size, mob.y); // Move to mob position and offset by its size to mirror around its center
                ctx.scale(-1, 1); // Mirror horizontally
                ctx.drawImage(
                    sprite.image,
                    frameX, 0,
                    frameWidth, frameHeight,
                    0, 0, // Draw at the translated origin
                    mob.size, mob.size
                );
                ctx.restore(); // Restore the context state
            } else {
                ctx.drawImage(
                    sprite.image,
                    frameX, 0,
                    frameWidth, frameHeight,
                    mob.x, mob.y,
                    mob.size, mob.size
                );
            }
        }
    }

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function drawCrosshair(ctx: CanvasRenderingContext2D, x: number, y: number) {
        if (crosshairImage.current.complete && crosshairImage.current.naturalWidth !== 0) {
            ctx.drawImage(
                crosshairImage.current,
                x - crosshairImage.current.width / 2,  // Center the crosshair on the cursor
                y - crosshairImage.current.height / 2
            );
        }
    }

    function handleMouseMove(event: { clientX: number; clientY: number; }) {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosition.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }


    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const game = gameRef.current;
        crosshairImage.current.src = 'crosshair.png';
        // game.onStateChange(setMobs);
        const selectedLevel: LevelType = levels.level1;
        game.loadLevel(selectedLevel);

        setbackground({
            color: selectedLevel.background,
            image: selectedLevel.backgroundImg
        });


        let frameCount = 0;
        let fps = 0;
        let lastFpsUpdate = performance.now();
        let lastFrameTime = 0;

        canvas.addEventListener('mousemove', handleMouseMove);

        canvas.addEventListener('contextmenu', event => event.preventDefault()); // Prevent default context menu
        canvas.addEventListener('mousedown', handleRightClick);
        canvas.addEventListener('mousedown', handleLeftClick);
        startCountdown();

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
                //če ima kokoš grafiko jo izrišem in animiram
                if (mob.sprite) {
                    drawSprite(ctx, mob);
                }
                //če nima grafike jo izrišem kot kvadrat z barvo
                else {
                    ctx.fillStyle = mob.color;
                    ctx.fillRect(mob.x, mob.y, mob.size, mob.size);
                }
            });

            drawCrosshair(ctx, mousePosition.current.x, mousePosition.current.y);


            // izračunam FPS vsako sekundo
            if (now - lastFpsUpdate >= 1000) {
                fps = frameCount;
                frameCount = 0;
                lastFpsUpdate = now;
            }




            requestAnimationFrame(gameLoop);

        };

        //redefiniram velikost kanvasa
        canvas.width = width;
        canvas.height = height;

        const rafId = requestAnimationFrame(gameLoop);
        return () => {
            cancelAnimationFrame(rafId);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('contextmenu', event => event.preventDefault());
            canvas.removeEventListener('mousedown', handleRightClick);
            canvas.removeEventListener('mousedown', handleLeftClick);

        };
    }, []);

    function handleLeftClick(event: { clientX: number; clientY: number; }) {
        if (bulletCountRef.current === 0 && reloading) return;  // Prevent shooting if no bullets left

        const rect = canvasRef?.current?.getBoundingClientRect();
        const x = event.clientX - (rect?.left || 0);
        const y = event.clientY - (rect?.top || 0);

        gameRef.current.mobs.forEach(mob => {
            if (x >= mob.x && x <= mob.x + mob.size && y >= mob.y && y <= mob.y + mob.size) {
                mob.hit = true; // kokos zadeta
                pointsRef.current += mob.revard ?? 0;
            }
        });

        setPoints(pointsRef.current);
        bulletCountRef.current = Math.max(0, bulletCountRef.current - 1);
        setBulletCount(bulletCountRef.current);
    }

    function handleRightClick(event: { button: number; preventDefault: () => void; }) {
        if (event.button === 2) {  // Check if the right mouse button was clicked
            event.preventDefault();  // Prevent the context menu
            reloadGun();
        }
    }
    return (
        <>
            {reloading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '24px',
                    zIndex: 1000
                }}>
                    Reladam...
                </div>
            )}
            <div className="fixed top-5 left-5 text-white text-5xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,0.8)]">
                {formatTime(count)}
            </div>
            <div className="fixed bottom-10 right-10 selection-none ">
                {[...Array(bulletCount)].map((_, i) => (

                    <img key={i} height={200} className={classNames(" h-[150px]  w-[80px] inline-block object-cover bg-center")} src="bullet/128x128.png" alt="Bullet" />

                ))}

            </div>
            <div className="fixed top-10 right-10  text-yellow-500 text-6xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,0.8)]">
                {points}
            </div>
            <canvas ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'none',
                    backgroundColor: background.image ? "transparent" : background.color,
                    backgroundImage: background.image ? `url(${background.image})` : 'none',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'

                }}></canvas>
        </>
    );
}

export default GameEnvironment;
