# minifyall

Recursively compress and replace images. Optimizes jpg, png, gif, and svg filetypes.

**Note:** This is a destructive action. Original files will be completely replaced by their optimized copies. Use with caution.

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