import React from 'react'
import PropTypes from 'prop-types'

import COLORS from './colors'
import SIZES from './sizes'


const GalioTheme = {
  COLORS,
  SIZES,
};

export default GalioTheme;

// creating the GalioTheme context
const GalioContext = React.createContext();


export function withGalio(Component, styles) {
  return class extends React.Component {
    render() {
      const { props } = this;
      return (
        <GalioContext.Consumer>
          {theme => (
            <Component
              {...props}
              theme={{ ...GalioTheme, ...theme }}
              styles={styles && styles({ ...GalioTheme, ...theme })}
            />
          )}
        </GalioContext.Consumer>
      );
    }
  };
}

export class GalioProvider extends React.Component {
  static defaultProps = {
    children: null,
    theme: {},
  };

  render() {
    const { theme, children } = this.props;
    const { COLORS: CUSTOM_COLORS, SIZES: CUSTOM_SIZES, customTheme } = theme;

    const providerTheme = {
      COLORS: { ...GalioTheme.COLORS, ...CUSTOM_COLORS },
      SIZES: { ...GalioTheme.SIZES, ...CUSTOM_SIZES },
      ...customTheme
    };

    return (
      <GalioContext.Provider value={providerTheme}>
        {children}
      </GalioContext.Provider>
    );
  }
}

GalioProvider.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
};