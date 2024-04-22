
const levels = {
    level1: {
        background: 'red',
        backgroundImg: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6c51f729954925.564d4513c43d7.png',
        mobs: [
            {
                x: 100, y: 100, size: 50, speed: 30, color: 'red',
                sprite: {
                    spriteUrl: "bird.png",
                    frameIndex: 0,
                    totalFrames: 3,
                    frameRate: 10
                }
            },
            {
                x: 150, y: 200, size: 40, speed: 20, color: 'blue',
            },
            {
                x: 250, y: 250, size: 30, speed: 10, color: 'red',
                sprite: {
                    spriteUrl: "bird.png",
                    frameIndex: 0,
                    totalFrames: 3,
                    frameRate: 15
                }
            },
            {
                x: 400, y: 600, size: 30, speed: 5, color: 'green',
                sprite: {
                    spriteUrl: "bird.png",
                    frameIndex: 0,
                    totalFrames: 3,
                    frameRate: 5
                }
            }

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