
/**
 * Module dependencies.
 */

import levenshtein from 'fast-levenshtein';

/**
 * Calculate new index based on surroundings similarity.
 */

export function calculateNewIndex(originalString, transformedString, originalIndex) {
  // Get index surroundings in the originalString string
  const originalStringLeft = originalString.slice(0, originalIndex);
  const originalStringRight = originalString.slice(originalIndex, originalString.length);

  let minimumDistanceSoFar = Infinity;
  let minimumDistanceIndex = 0;

  for (var i = 0; i <= transformedString.length; i++) {
    // Get surroundings for index i on transformedString
    const transformedStringLeft = transformedString.slice(0, i);
    const transformedStringRight = transformedString.slice(i, transformedString.length);

    // Calculate surroundings match
    const distanceLeft = levenshtein.get(originalStringLeft, transformedStringLeft);
    const distanceRight = levenshtein.get(originalStringRight, transformedStringRight);

    // Keep index if surroundings match better than previous index's
    if (distanceLeft + distanceRight < minimumDistanceSoFar) {
        minimumDistanceSoFar = distanceLeft + distanceRight;
        minimumDistanceIndex = i;
    }
  }

  return minimumDistanceIndex;
}
