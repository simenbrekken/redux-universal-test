export function getChildCategories(categories, parent) {
  return categories.order
    .map(id => categories.byId[id])
    .filter(category => category.parent === parent);
}

export function getAncestorCategories(categories, parent) {
  let ancestors = [];
  let ancestor = categories.byId[parent];

  while (ancestor) {
    ancestors = ancestors.concat(ancestor);
    ancestor = categories.byId[ancestor.parent];
  }

  return ancestors;
}

export function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
