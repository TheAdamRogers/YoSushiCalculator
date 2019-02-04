const { reloadApp } = require('detox-expo-helpers');

describe('Example', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should show main screen', async () => {
    await expect(element(by.id('mainScreen'))).toBeVisible();
  });

  // it('should add bowl to basket', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.label('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.label('World!!!'))).toBeVisible();
  // });
});