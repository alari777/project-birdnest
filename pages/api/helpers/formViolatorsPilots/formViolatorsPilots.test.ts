import { formViolatorsPilots } from './formViolatorsPilots';
import { Pilots } from '../../classes/Pilots.class';

describe('testing function formViolatorsPilots()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Map.prototype.delete = jest.fn();
  });

  it('return array: ViolatorType, is calling map.delete', () => {
    const instance = Pilots.init();
    const dateMock = String(new Date());
    instance.map.set('A-tKIx1XAwwU', {
      email: '',
      firstName: '',
      phoneNumber: '',
      pilotId: 'A-tKIx1XAwwU',
      atr_snapshotTimestamp: '2021-09-16T14:44:02.991Z',
    });
    instance.map.set('B-tKIx1XAwwU', {
      email: '',
      firstName: '',
      phoneNumber: '',
      pilotId: 'B-tKIx1XAwwU',
      atr_snapshotTimestamp: '2021-09-16T14:44:02.991Z',
    });
    instance.map.set('C-tKIx1XAwwU', {
      pilotId: 'C-tKIx1XAwwU',
      firstName: 'fsdf',
      phoneNumber: 'fdsfds',
      email: 'fdsfds',
      atr_snapshotTimestamp: dateMock,
    });
    const result = formViolatorsPilots();
    expect(result).toEqual([
      {
        pilotId: 'C-tKIx1XAwwU',
        firstName: 'fsdf',
        phoneNumber: 'fdsfds',
        email: 'fdsfds',
        atr_snapshotTimestamp: dateMock,
      },
    ]);
    expect(Map.prototype.delete).toHaveBeenCalledTimes(2);
  });
});
