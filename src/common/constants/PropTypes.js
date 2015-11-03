import { PropTypes } from 'react';

const {
  func,
  object,
  shape,
  number,
  string,
  arrayOf,
} = PropTypes;

const identifiable = {
  id: number.isRequired,
};

const image = shape({
  ...identifiable,
  width: number.isRequired,
  height: number.isRequired,
});

const images = arrayOf(image);

const category = shape({
  ...identifiable,
  parent: number,
  // segment: string.isRequired,
  // resource: shape({
  //   ...identifiable,
  //   type: string,
  // }),
  name: string.isRequired,
  // images: arrayOf(image),
});

export default {
  ...PropTypes,
  category,
  image,
  images,
};
