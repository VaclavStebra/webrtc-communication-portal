import * as Colors from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default () => {
  const overwrites = {
    palette: {
      primary1Color: Colors.grey700,
      accent1Color: Colors.green800,
      primary2Color: Colors.grey500,
      primary3Color: Colors.brown300,
      accent3Color: Colors.brown400
    }
  };
  return getMuiTheme(baseTheme, overwrites);
};
