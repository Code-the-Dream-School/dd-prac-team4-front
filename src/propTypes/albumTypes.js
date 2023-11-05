import PropTypes from 'prop-types';

export const albumShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  // custom validator function takes three arguments
  releaseDate: (props, propName, componentName) => {
    if (props[propName]) {
      if (
        !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(props[propName])
      ) {
        // YYYY-MM-DD[T]HH:MM:SS.MS[Z] # formatted as a date-time string in UTC timezone.
        return new Error(
          `Invalid prop ${propName} supplied to ${componentName}. 
          Validation failed. Please provide the date in the format YYYY-MM-DD.`
        );
      }
    }
  },
  averageRating: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== 'number') {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. 
        Validation failed. Please provide a valid number for averageRating.`
      );
    }
    if (value < 0 || value > 5) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. 
        Validation failed. Please provide a valid averageRating between 0 and 5.`
      );
    }
  },
});
