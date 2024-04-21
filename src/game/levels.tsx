
const levels = {
    level1: {
        background: 'red',
        backgroundImg: 'https://www.transparenttextures.com/patterns/45-degree-fabric-light.png',
        mobs: [
            { x: 100, y: 100, size: 30, speed: 30, color: 'red' },
            { x: 150, y: 200, size: 40, speed: 20, color: 'blue' },
            { x: 250, y: 250, size: 20, speed: 5, color: 'red' },
            { x: 250, y: 600, size: 20, speed: 5, color: 'green' }

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