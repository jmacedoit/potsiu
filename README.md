# Potsiu! - Post transformation string index updater

Potsiu! is a simple utility function that allows you to update indexes of specific positions on a string after you apply some transformation to it. It is quite handy if you have data in which string indexes are specified, but for some reason you want to process the strings from which they were calculated and need to keep them in sync.

## Usage

```js
import { calculateNewIndex } from 'potsiu';

const originalString = 'Hey! John! Where are you going... is Sarah going with you?';
const transformedString = 'Hey John Where are you going is Sarah going with you';
const originalIndex = 37;

// Outputs: "Hey! John! Where are you going... is >Sarah going with you?"
console.log(originalString.slice(0, originalIndex) + '>' + originalString.slice(originalIndex, originalString.length));

const newIndex = calculateNewIndex(originalString, transformedString, originalIndex);

// Outputs: "Hey John Where are you going is >Sarah going with you"
console.log(transformedString.slice(0, newIndex) + '>' + transformedString.slice(newIndex, originalString.length));

```


## Motivation

Suppose you have some string mentioning person names:
```
Hey! John! Where are you going... is Sarah going with you?
     ^ (5)                           ^ (37)

```


You determined that the names start on indexes *5* (John) and *37* (Sarah).
Now, if for some reason you need to remove punctuation from your string...

```
Hey John Where are you going is Sarah going with you
     ^ (5)                           ^ (37)
```


...the indexes you have no longer match the names positions. This is a problem, for instance, when one needs to process the sentences/texts on named entity recognition (NER) datasets, which are often tagged manually, while keeping the indexes matching the entities positions. It is often quite complex to update these indexes, since different transformations can replace, remove, or add any amount of characters.

## How it works

Potsiu! finds the index, on the transformed string, for which the surroundings best match the surroundings of the original index in the original string using levenshtein distance.

It is quite capable of handling aggressive transformations:

```
<intro>Hey!</intro><b> Let's tell John to <i>remove</i> some tags!</b>/tags>
                                  ^ (34)

Hey Let's tell John to remove some tags!
               ^ (15)
```
```
dude, oporto is sick yo.
      ^ (6)

D00D 0p0R70 12 51CK Y0
     ^ (5)
```

### Precautions

Potsiu! tends to give you the expected results. However extremely aggressive transformations may render the transformed string so different from the original that Potsiu! can no longer track the surroundings of the original index:

```
MA_DUDE_OPORTO_IS_SOOOO_SICK
        ^ (8)

dude oporto is sick
^ (0)
```

In these case feeding Potsiu! both sentences in lowercase would have allowed it to keep track of the index:

```
ma_dude_oporto_is_soooo_sick
        ^ (8)

dude oporto is sick
     ^ (5)
```

## Contributing

You are welcome to come up with suggestions and pull requests. Please try to be consistent with the remaining code base in terms of code style.

Also pull requests adding tests would be much appreciated!

## License
MIT - see [LICENSE.md](https://github.com/jmacedoit/potsiu/blob/master/LICENSE)
