import { StyleSheet } from 'react-native';
import { palette } from './palette';
import { styleVariables } from './stylevariables';
import { em } from './em';
export const Styles = StyleSheet.create({
  p10: {
    padding: 16,
  },
  p5: {
    padding: 8,
  },
  button: {
    height: styleVariables.buttonHeight,
  },

  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    // fontWeight: styleVariables.buttonFontWeight,
    fontFamily: styleVariables.buttonFontFamily,
    backgroundColor: 'transparent',
    color: 'white',
  },

  buttonIcon: {
    fontSize: em(1),
    color: 'white',
    marginRight: 10,
  },

  buttonIconRight: {
    marginLeft: 10,
    marginRight: 0,
  },

  buttonGroupPressed: {
    backgroundColor: palette.primaryPressed,
  },

  buttonGroupSecondaryPressed: {
    backgroundColor: palette.secondaryPressed,
  },

  buttonGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.primary,
    height: styleVariables.buttonHeight,
  },

  buttonGroupLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  buttonGroupRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
