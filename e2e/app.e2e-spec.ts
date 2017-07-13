import { XmPlaylistFrontendPage } from './app.po';

describe('xm-playlist-frontend App', function() {
  let page: XmPlaylistFrontendPage;

  beforeEach(() => {
    page = new XmPlaylistFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
