export const landingAnimConfig = Object.freeze({
  gridCell: 120,
  moveSpeed: 260,
  maxTrailPx: 200,
  exitCatchMult: 2.05,
  speedLowPerfMult: 0.72,
  maxDt: 0.032,
  maxDtLowPerf: 0.045,
  // 低性能判断阈值
  lowPerf: {
    maxHardwareConcurrency: 4,
    maxDeviceMemoryGb: 4,
  },
});

