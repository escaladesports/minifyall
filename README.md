# minifyall

Recursively compress and replace images. Optimizes jpg, png, gif, and svg filetypes.

## Install

```
$ npm install -global minifyall
```

## Usage

Optimize all images in the current directory:

```
$ cd "/path/to/images"
$ minifyall
```
Or optimize some filetypes in a different directory:

```
$ minifyall --input "/path/to/images" --extensions "png,jpg"
```