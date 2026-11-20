// REFERENCED FROM THIS GUY https://www.bentasker.co.uk/posts/blog/general/making-part-of-an-image-track-the-mouse-position.html LIKE A LOT OBVI

"use client";

import { useEffect, useRef } from "react";

export function MerpEyes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(function () {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const lookat = {x: 30, y: 15};
    const eye = {
      radius: 6,
      iris: 4,
      limMin: -0.1,
      limMax: 1.1,
    };

    const onMouseMove = (e: MouseEvent) => {

        const bounds = canvas.getBoundingClientRect();
        lookat.x = e.pageX - bounds.left;// - scrollX;
        lookat.y = e.pageY - bounds.top;// - scrollY;

        ctx.clearRect(0, 0, 60, 30);
        drawEyes(lookat);
    };
    addEventListener("mousemove", onMouseMove);


    drawEyes(lookat);
    function drawEyes(lookat: { x: number; y: number }) {
      let {x,y} = lookat;

      x /= canvas.width;
      y /= canvas.height;

      x = x < eye.limMin ? eye.limMin : x > eye.limMax ? eye.limMax : x;
      y = y < eye.limMin ? eye.limMin : y > eye.limMax ? eye.limMax : y;

      x -= 0.5;
      y -= 0.5;

      const range = (eye.radius - eye.iris) * 2;

      x *= range;
      y *= range;



      ctx.beginPath();
      ctx.arc(13, 13, eye.radius, 0, Math.PI * 2, false);
      ctx.moveTo(49 + eye.radius, 13);
      ctx.arc(49, 13, eye.radius, 0, Math.PI * 2, false);
      ctx.stroke();

      ctx.save();
      ctx.clip();


      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(13 + x, 13 + y, eye.iris, 0, Math.PI * 2, false);
      ctx.moveTo(49 + x + eye.iris, 13 + y);
      ctx.arc(49 + x, 13 + y, eye.iris, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(13 + x, 13 + y, 2, 0, Math.PI * 2, false);
      ctx.moveTo(49 + x + 2, 13 + y);
      ctx.arc(49 + x, 13 + y, 2, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.restore();
    }

    return function () {
      removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div id="image_wrap">
      <img src="/eyelessMerp.png" />
      <canvas ref={canvasRef} id="canvas" width="60" height="30"></canvas>
    </div>
  );
}