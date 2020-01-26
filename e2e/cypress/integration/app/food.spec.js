describe('Food page', () => {
  it('displays lunchtime choices');
  it('displays available slots for each choice');
  it('displays a countdown timer until time is up');
  it('becomes unavailable when time is up');
  it('allows choosing 2 food stalls');
  it('allows choosing 1 restaurant');
  it('asks user to sign in when selecting a choice, if unauthenticated');
  it('lets user customize a menu when selecting a choice, if authenticated');
});
describe('Customization section', () => {
  it('lets user select a customization option');
  it('allows confirming if not fully booked');
  it('prevents confirming if fully booked');
  it('allows changing choice');
});
describe('Customization section', () => {
  it('displays the selected restaurant');
  it('displays directions to the restaurant');
  it('displays the selected customizations');
  it('lets user view the menu should they need to make changes');
  it('lets user re-customize their selection within timeframe');
  it('lets user delete their selection within timeframe');
});
