import { DevsterLabTestPage } from './app.po';

describe('devster-lab-test App', function() {
  let page: DevsterLabTestPage;

  beforeEach(() => {
    page = new DevsterLabTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
