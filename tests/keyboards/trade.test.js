const { tradeMenuMarkup } = require('../../keyboards/trade');

describe('trade keyboard', () => {
  it('contains ratio controls', () => {
    const markup = tradeMenuMarkup();
    const rows = markup.reply_markup.inline_keyboard;
    // Expect at least 5 rows: scanner, pair1, pair2, presets, +/- , back
    expect(rows.length).toBeGreaterThanOrEqual(5);
  });
});


