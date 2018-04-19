import * as React from 'react';
import { shallow } from 'enzyme';
import * as moment from 'moment';
import './../../enzymeAdapter';

import { SettingsModal } from './SettingsModal';
import { SettingsInterface } from './../../reducers';

const settings: SettingsInterface = {
  from: moment().startOf('month').toDate().getTime(),
  to: moment().toDate().getTime(),
  roundingValue: 0,
  currency: 'USD',
};
const wrapper = shallow(
  // tslint:disable-next-line:no-empty
  <SettingsModal settings={settings} updateSettings={() => {}} history={null} />
);

describe('Testing <SettingsModal />', () => {
  it('renders the element', () => {
    expect(wrapper.type()).toEqual(React.Fragment);
  });
  it('sets correct roundingvalue state', () => {
    expect(wrapper.find('input.modal-input').props().value).toEqual(0);
    wrapper.setState({ roundingValue: 10 });
    expect(wrapper.find('input.modal-input').props().value).toEqual(10);
  });
});