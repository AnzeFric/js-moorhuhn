
const levels = {
    level1: {
        background: 'red',
        backgroundImg: 'forest-big.png',
        mobs: [
            {
                x: 100,
                y: 100,
                size: 100,
                speed: 30,
                color: 'red',
                reward: 10,
                sprite: {
                    spriteUrl: "chicken/64x64.png",
                    frameIndex: 0,
                    totalFrames: 12,
                    frameRate: 24,
                    mirror: true
                }
            },
            {
                x: 100,
                y: 600,
                size: 100,
                speed: 0,
                color: 'red',
                reward: -10,
                sprite: {
                    spriteUrl: "hedgehog/128x128.png",
                    frameIndex: 0,
                    totalFrames: 1,
                    frameRate: 0,
                    mirror: true
                }
            },
            {
                x: 300,
                y: 400,
                size: 300,
                speed: 0,
                color: 'red',
                reward: 10,
                sprite: {
                    spriteUrl: "chicken_front/256x256.png",
                    frameIndex: 0,
                    totalFrames: 17,
                    frameRate: 0,
                    mirror: false
                }
            },
            {
                x: 0,
                y: 300,
                size: 100,
                speed: 30,
                color: 'red',
                revard: 10,
                sprite: {
                    spriteUrl: "chicken/64x64.png",
                    frameIndex: 0,
                    totalFrames: 12,
                    frameRate: 24,
                    mirror: true
                }
            },
        ]
    },
    level2: {
        background: 'green',
        mobs: [

            { x: 100, y: 100, size: 30, speed: 30, color: 'red' },
            { x: 150, y: 200, size: 40, speed: 20, color: 'blue' },
            { x: 250, y: 250, size: 20, speed: 1, color: 'red' },
            { x: 250, y: 600, size: 20, speed: 1, color: 'green' }

        ]
    },
};

export default levels;