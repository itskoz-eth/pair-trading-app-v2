const { mainMenuMarkup } = require('../../keyboards/main');

describe('Keyboards', () => {
  it('mainMenuMarkup returns inline keyboard with 4 buttons', () => {
    const markup = mainMenuMarkup();
    expect(markup).toBeDefined();
    expect(markup.reply_markup.inline_keyboard).toHaveLength(4);
  });
});
