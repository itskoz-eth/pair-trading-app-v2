const points = require('../../services/points');

describe('points service', () => {
  it('adds points and tracks streak', () => {
    const userId = 123;
    const before = points.getUserPoints(userId);
    points.addPoints(userId, 10);
    const after = points.getUserPoints(userId);
    expect(after - before).toBe(10);
    points.recordWin(userId);
    expect(points.getUserStreak(userId)).toBeGreaterThanOrEqual(1);
  });
});


