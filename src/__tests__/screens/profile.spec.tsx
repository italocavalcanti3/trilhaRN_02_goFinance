import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile', () => {
  it('Should be placeholder correctly input user name', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();

  });

  it('Should be loaded user data', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Italo');
    expect(inputSurname.props.value).toEqual('Cavalcanti');

  });

  it('Should exist title correctly', () => {
    const { getByTestId } = render(<Profile />);
    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Perfil');

  });
});