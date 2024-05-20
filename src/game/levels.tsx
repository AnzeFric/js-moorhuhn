
const levels = {
    level1: {
        background: 'red',
        backgroundImg: 'forest-big.png',
        mobs: [
            {
                x: 400,
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
                x: 700,
                y: 550,
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

        ]
    },

};

export default levels;