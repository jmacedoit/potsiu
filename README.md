# Potsiu! - Post transformation string index updater

Potsiu! is a simple utility function that allows you to update indexes of specific positions on a string after you apply some transformation to it. It is quite handy if you have data in which string indexes are specified, but for some reason you want to process the strings from which they were calculated and need to keep them in sync.

## Usage

```js
import { calculateNewIndex } from 'potsiu';

const originalString = 'First sentence. Second sentence. Third sentence.';
const transformedString = 'First sentence Second sentence Third sentence';
const originalIndex = 33;

// Outputs: "First sentence. Second sentence. >Third sentence."
console.log(originalString.slice(0, originalIndex) + '>' + originalString.slice(originalIndex, originalString.length));

const newIndex = calculateNewIndex(originalString, transformedString, originalIndex);

// Outputs: "First sentence Second sentence >Third sentence."
console.log(transformedString.slice(0, newIndex) + '>' + transformedString.slice(newIndex, originalString.length));

```


## Motivation

Suppose you have some string where you've identified every term of foreign origin:
```
Hey! Do you like croissants?... Can you hand me that dossier?
                 ^ (17)                              ^ (53)

```


You determined that the terms start on indexes *17* (croissants) and *53* (dossier).
Now, if for some reason you need to remove punctuation from your string...

```
Hey Do you like croissants Can you hand me that dossier
                 ^ (17)                              ^ (53)
```


...the indexes you have no longer match the terms positions. It is often quite complex to reuse previously computed indexes after transformations since they can replace, remove, or add any amount of characters.

## How it works

Potsiu! finds the index, on the transformed string, for which the surroundings best match the surroundings of the original index in the original string using levenshtein distance.

It is quite capable of handling aggressive transformations:

```
<b> Let's <i>remove</i> some tags</b> and eat croissants
                                              ^ (46)

Let's remove some tags and eat croissants
                               ^ (31)
```
```
hey, the index will mark second sentence start. hey!
                                                ^ (48)

H3Y T3H 1nd3X W1ll m4rk 53c0nD 53NT3Nc3 5t4RT h3Y
                                              ^ (46)
```

### Precautions

Potsiu! tends to give you the expected results. However extremely aggressive transformations may render the transformed string so different from the original that Potsiu! can no longer track the surroundings of the original index:

```
MA_DUDE_SOUFFLE_IS_SOOOO_SICK
        ^ (8)

dude souffle is sick
^ (0)
```

In these case feeding Potsiu! both sentences in lowercase would have allowed it to keep track of the index:

```
ma_dude_souffle_is_soooo_sick
        ^ (8)

dude souffle is sick
     ^ (5)
```

## Contributing

You are welcome to come up with suggestions and pull requests. Please try to be consistent with the remaining code base in terms of code style.

Also pull requests adding tests would be much appreciated!

## License
MIT - see [LICENSE.md](https://github.com/jmacedoit/potsiu/blob/master/LICENSE)
