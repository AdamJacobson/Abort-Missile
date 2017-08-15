// Code heavily based on http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

const sprite = (options) => {
  let that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

  that.ctx = options.ctx;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.x = options.x;
  that.y = options.y;
  that.repeat = options.repeat;
  that.done = false;

  that.update = function () {
    tickCount += 1;

    if (tickCount > ticksPerFrame) {
      tickCount = 0;

      if (frameIndex < numberOfFrames - 1) {
        frameIndex += 1;
      } else {
        if (that.repeat) {
          frameIndex = 0;
        } else {
          that.done = true;
        }
      }
    }
  };

  that.render = function () {
    // image, sx, sy, sWitdh, sHeight, dx, dy, dWidth, dHeight
    that.ctx.drawImage(
      that.image,
      frameIndex * that.width,
      0,
      that.width,
      that.height,
      that.x,
      that.y,
      that.width,
      that.height
    );
  };

  return that;
};

export default sprite;
