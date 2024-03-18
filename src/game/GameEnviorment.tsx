import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'usehooks-ts'

const GameEnvironment = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { width = 0, height = 0 } = useWindowSize()

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = width;
                canvas.height = height;
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#000000';
                ctx.font = '48px serif';
                ctx.textAlign = 'center';
                ctx.fillText('moorhuhnXcitrusi', canvas.width / 2, canvas.height / 2);
            }
        }
    }, []);

    return (
        <canvas ref={canvasRef} ></canvas>
    );
}

export default GameEnvironment;
