// src/utils/dependencyUtils.js

import { getValueByPath } from './pathUtils'; // Make sure this function exists or define it

export const isDisabled = (item, data) => {
  if (!item.dependsOn || item.dependsOn.mode !== "enabled") return false;
  const dependentValue = getValueByPath(data, item.dependsOn.path);
  return !dependentValue; // disable if falsy
};

export const shouldRenderField = (item, data) => {
  if (!item.dependsOn || item.dependsOn.mode !== "visible") return true;

  const actualValue = getValueByPath(data, item.dependsOn.path);
  const expectedValues = item.dependsOn.expectedValues;

  if (!expectedValues) return !!actualValue;

  return Array.isArray(expectedValues)
    ? expectedValues.includes(actualValue)
    : actualValue === expectedValues;
};
