/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockData from '../../../mocks/mockData';
import { RequestPassword }
from '../../../../components/layout/home/password-update/RequestPassword';

/**
 * component function
 * creates a setup for RequestPassword component
 *
 * @return {function} shallow -
 * renders a component one level deep
 * 
 * @param {bool} loading 
 */
const component = (loading) => {
  const initialState = {
    errorMessage: '',
    email: ''
  };
  const props = {
    loader: loading,
    onRequestPassword: jest.fn(),
    onChange: mockData.func,
    onSubmit: mockData.func
  }
  return shallow(<RequestPassword {...props} />)
}
describe('<RequestPassword />: When component is mounted',
() => {
  it('should render self as expected', (done) => {
    const wrapper = component(false);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done()
  });
  it('should render children as expected', (done) => {
    const wrapper = component(false)
    expect(wrapper.find('Form').length).toBe(1);
    expect(wrapper.find('InputField').length).toBe(1);
    expect(wrapper.find('Button').length).toBe(1);
    done()
  });
  it('should call onFocus when InputField gain focus',
  (done) => {
    const wrapper = component(false)
    const onFocus = mockData.func;
    wrapper.find('#email').simulate('focus', onFocus());
    expect(onFocus.calledOnce).toBe(true);
    done();
  });
  it('should update state when the onChange method is called',
    (done) => {
      const wrapper = component(false)
      wrapper.find('#email').simulate('change', {
        target:
        { value: mockData.staticUser[0].email, id: 'email' }
      });
      expect(wrapper.state('email'))
      .toEqual(mockData.staticUser[0].email);
      done();
    });
  it('should have error message state if ' +
    'InputFields is empty',
    (done) => {
      const wrapper = component(false);
      const handleRequestPassword = mockData.func;
      const button = wrapper.find('#request-password');
      button.simulate('click', handleRequestPassword());
      wrapper.instance().handleRequestPassword({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage'))
        .toEqual('Error. email is required');
      done();
    });
  it('should clear error message state when input' +
    'field is in focus', (done) => {
    const wrapper = component(false);
    const onFocus = mockData.func;
    wrapper.find('#email').simulate('focus', onFocus());
    expect(wrapper.state('errorMessage')).toEqual('');
    done();
  });
  it('should have button with label "sending..." if user ' +
    'supplies correct passwords input',
    (done) => {
      const wrapper = component(true);
      const handleRequestPassword = mockData.func;
      const button = wrapper.find('#request-password');
      const password = 
        wrapper.find('#email').simulate('change', {
        target:
        { value: mockData.staticUser[0].email, id: 'email' }
      });
      button.simulate('click', handleRequestPassword());
      wrapper.instance().handleRequestPassword({ preventDefault: () => { } });
      expect(wrapper.state('errorMessage')).not
        .toEqual('Error. email is required');
      expect(button.props().name).toEqual('sending...');
      done()
  });
});