import PropTypes from 'prop-types';

export const albumShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  // custom validator function takes three arguments
  releaseDate: (props, propName, componentName) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(props[propName])) {
      // format YYYY-MM-DD
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      );
    }
  },
  averageRating: (props, propName, componentName) => {
    if (
      typeof props[propName] !== 'number' ||
      props[propName] < 1 ||
      props[propName] > 5
    ) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      );
    }
  },
});
