import React, { useRef, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts'
import levels from './levels';
import Game from './logic';
import LevelType from '../types/levelType';
import MobType from '../types/mobType';
import { useCountdown } from 'usehooks-ts'
import { useNavigate } from 'react-router-dom';
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const GameEnvironment = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const shotSound = useRef(new Audio('/sounds/gunshot.mp3')); 
    const themeSound = useRef(new Audio('/sounds/song.mp3'));
    const reload = useRef(new Audio('/sounds/reload.mp3'));
    const leyorJenkins = useRef(new Audio('/sounds/leroy.mp3'));
    const chickenSound = useRef(new Audio('/sounds/chicken.mp3'));
    const metalHitSound = useRef(new Audio('/sounds/metalHit.mp3'));

    leyorJenkins.current.volume = 1;
    themeSound.current.volume = 0.4;
    const audioInstances = useRef<any[]>([]);
    audioInstances.current.push(leyorJenkins.current);
    audioInstances.current.push(themeSound.current);

    audioInstances.current.push(chickenSound.current);
    const MAX_BULLETS = 9
    const { width = 0, height = 0 } = useWindowSize()
    const [background, setbackground] = useState<any>({
        color: "white",
        image: null
    });
    const navigate = useNavigate();
    const crosshairImage = useRef(new Image());
    const [points, setPoints] = useState(0);
    const pointsRef = useRef(0);
    const [reloading, setReloading] = useState(false);
    const [count, { startCountdown/*, stopCountdown, resetCountdown*/ }] =
        useCountdown({
            countStart: 60,
            intervalMs: 1000,
        })

    const [bulletCount, setBulletCount] = useState(MAX_BULLETS);
    const bulletCountRef = useRef(MAX_BULLETS);
    // const { mobs, spawnMob, updateMobs, loadLevel } = useMobs(); 
    const mousePosition = useRef({ x: 0, y: 0 });

    const gameRef = useRef(new Game());
    const [popupVisible, setPopupVisible] = useState(false);
    const [hitMob, setHitMob] = useState<MobType>();
    const [hitPosition, setHitPosition] = useState({ x: 0, y: 0 });
    const popupTimeoutRef = useRef<number | null>(null);

    function reloadGun() {
        reload.current.play();
        setBulletCount(MAX_BULLETS);
        bulletCountRef.current = MAX_BULLETS;
        setReloading(true);
        setTimeout(() => {
            setReloading(false);
        }, 1000);
    }

    useEffect(() => {
        if (count === 0) {
            navigate('/konec', { state: { points } });
        }
    }, [count]);

    function drawSprite(ctx: CanvasRenderingContext2D, mob: MobType) {
        const now = performance.now();
        const sprite = mob.hit ? mob.spriteShot : mob.sprite;

        if (sprite && sprite.image) {

            const frameWidth = sprite.image.width / sprite.totalFrames;
            const frameHeight = sprite.image.height;

            if (!sprite.lastUpdate) sprite.lastUpdate = now;

            if (sprite.frameRate > 0) {
                const frameDelay = 1000 / sprite.frameRate;
                if (now - sprite.lastUpdate > frameDelay) {
                    sprite.frameIndex++;
                    sprite.frameIndex = (sprite.frameIndex + 1) % sprite.totalFrames;
                    if (!sprite.continuous && sprite.frameIndex === 0) {
                        sprite.frameIndex = sprite.totalFrames - 1;
                    }
                    sprite.lastUpdate = now;
                }
            }
            const frameX = sprite.frameIndex * frameWidth;


            if (sprite.mirror) {
                ctx.save();
                ctx.translate(mob.x + mob.size, mob.y);
                ctx.scale(-1, 1);
                ctx.drawImage(
                    sprite.image,
                    frameX, 0,
                    frameWidth, frameHeight,
                    0, 0,
                    mob.size, mob.size
                );
                ctx.restore();
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

    //formatiram čas v format mm:ss
    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    //izris petelina
    function drawCrosshair(ctx: CanvasRenderingContext2D, x: number, y: number) {
        if (crosshairImage.current.complete && crosshairImage.current.naturalWidth !== 0) {
            ctx.drawImage(
                crosshairImage.current,
                x - crosshairImage.current.width / 2,
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


        themeSound.current.play();
        leyorJenkins.current.play();
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

        canvas.addEventListener('mousedown', handleRightClick);
        canvas.addEventListener('mousedown', handleLeftClick);


        startCountdown();
        game.startMobGenerator(2000);

        const gameLoop = (timestamp: any) => {
            //resetiraj celoten kanvas (pobriši vse)
            ctx.clearRect(0, 0, width, height);


            const now = performance.now();
            const deltaTime = (timestamp - lastFrameTime) / 1000;
            lastFrameTime = now;
            frameCount++;


            //posodobi pozicije vseh kokoši
            game.updateMobs(deltaTime, ctx);


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
            audioInstances.current.forEach(audio => {
                audio.pause();  // Pause the audio
                audio.currentTime = 0;  // Reset the playback position
            });
            cancelAnimationFrame(rafId);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('contextmenu', event => event.preventDefault());
            canvas.removeEventListener('mousedown', handleRightClick);
            canvas.removeEventListener('mousedown', handleLeftClick);

        };
    }, []);

    function handleLeftClick(event: { clientX: number; clientY: number; button: number }) {
        if (bulletCountRef.current === 0 || reloading || event.button != 0) return;  // če ni metkov ali se polnijo ne streljaj

        const rect = canvasRef?.current?.getBoundingClientRect();
        const x = event.clientX - (rect?.left || 0);
        const y = event.clientY - (rect?.top || 0);

        const audio = new Audio('/sounds/gunshot.mp3');
        audio.play();
        audioInstances.current.push(audio);

        gameRef.current.mobs.forEach(mob => {
            if (x >= mob.x && x <= mob.x + mob.size && y >= mob.y && y <= mob.y + mob.size && !mob.hit) {

                const audio = new Audio('/sounds/metalHit.mp3');
                audio.play();
                audioInstances.current.push(audio);

                mob.hit = true; // kokos zadeta

                pointsRef.current += mob.reward ?? 0;

                setHitMob(mob);
                setHitPosition({ x: mob.x, y: mob.y - 30 });
                setPopupVisible(true);

                if (popupTimeoutRef.current) {
                    clearTimeout(popupTimeoutRef.current);
                }
                popupTimeoutRef.current = setTimeout(() => {
                    setPopupVisible(false);
                }, 500); // skrij popup čez 500ms
            }
        });

        setPoints(pointsRef.current);
        bulletCountRef.current = Math.max(0, bulletCountRef.current - 1);
        setBulletCount(bulletCountRef.current);
    }

    function handleRightClick(event: { button: number; preventDefault: () => void; }) {
        event.preventDefault();
        if (event.button === 2) { // desni klik
            reloadGun();
        }
    }

    useEffect(() => {
        return () => {
            if (popupTimeoutRef.current) {
                clearTimeout(popupTimeoutRef.current);
            }
        };
    }, []);


    const HitInfoPopup = ({ position }: any) => (
        <div style={{
            left: `${position.x}px`,
            top: `${position.y}px`,

            zIndex: 50
        }} className="absolute rounded-md ">

            {hitMob && <p className="text-yellow-400 font-black text-5xl">{(hitMob.reward ?? 0) > 0 ? "+" + hitMob.reward : hitMob.reward}</p>}

        </div>
    );


    return (
        <div onContextMenu={(e) => e.preventDefault()}>
            {reloading && (
                <div
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                    className="cursor-not-allowed fixed inset-0 w-full h-full bg-black bg-opacity-50 text-white flex justify-center items-center text-2xl z-50
    ">
                    <div className="mt-6" aria-hidden="true">
                        <div className="w-[300px] rounded-full bg-gray-200">
                            <div className="h-5 bg-yellow-500 rounded-full reloading-bar" />
                        </div>
                    </div>
                </div>
            )}
            <div className="fixed top-5 left-5 pointer-events-none text-white text-5xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,0.8)]">
                {formatTime(count)}
            </div>
            <div className="fixed bottom-10 right-10 selection-none pointer-events-none">
                {[...Array(bulletCount)].map((_, i) => (

                    <img key={i} height={200} className={classNames(" h-[150px]  w-[80px] inline-block object-cover bg-center")} src="bullet/128x128.png" alt="Bullet" />

                ))}

            </div>
            <div className="fixed top-10 right-10 pointer-events-none  text-yellow-500 text-6xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,0.8)]">
                {points}
            </div>
            {popupVisible && <HitInfoPopup position={hitPosition} />}
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
        </div>
    );
}

export default GameEnvironment;
