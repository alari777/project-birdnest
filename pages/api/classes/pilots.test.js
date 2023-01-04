import { Pilots } from './Pilots.class';

describe('testing function bootstrap()', () => {
  it('bootstrap working', async () => {
    const instance = new Pilots();
    const result = await instance.bootstrap();
    expect(result).toEqual({
      pilots: [],
      atr_snapshotTimestamp: '',
    });
  });
});
