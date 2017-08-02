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

  that.update = function () {
    tickCount += 1;

    if (tickCount > ticksPerFrame) {
      tickCount = 0;

      // If the current frame index is in range
      if (frameIndex < numberOfFrames - 1) {
        // Go to the next frame
        frameIndex += 1;
      } else {
        frameIndex = 0;
      }
    }
  };

  that.render = function () {
    // Draw the animation
    // image, sx, sy, sWitdh, sHeight, dx, dy, dWidth, dHeight
    that.ctx.drawImage(
      that.image,
      frameIndex * that.width,
      0,
      that.width,
      that.height,
      100,
      100,
      that.width,
      that.height
    );
  };

  return that;
};

export default sprite;
