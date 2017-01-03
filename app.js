#!/usr/bin/env node
'use strict'
const fs = require('fs')
const glob = require('glob')
const meow = require('meow')
const imagemin = require('imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')
const gifsicle = require('imagemin-gifsicle')
const svgo = require('imagemin-svgo')


// CLI
const cli = meow(`
	Usage
		$ cd "/path/to/files" && minifyall
		$ minifyall -i "/path/to/files" -e "jpg,png"
	Options
		-i, --input          Input directory
		-e, --extensions     List of extensions seperated by comma
`, {
	alias: {
		i: 'input',
		e: 'extensions'
	}
})


// Options
let input = cli.flags.input || process.env.PWD
let fileTypes = cli.flags.extensions || 'gif,jpg,jpeg,png,svg'


// Recursively find files
function compressFiles(src, cb){
	glob(`${src}/**/*.{${fileTypes}}`, (err, files) => {
		if(err) cb(err)
		else{
			iterate(files, cb)
		}
	})
}
// Compress each file
function iterate(files, cb, prog = 0){
	if(prog >= files.length){
		return cb()
	}
	try{
		imagemin([files[prog]], {
			plugins: [
				mozjpeg(),
				pngquant({ quality: '65-80' }),
				gifsicle(),
				svgo()
			]
		})
		.then(file => {
			fs.writeFile(files[prog], file[0].data, err => {
				if(err) cb(err)
				else{
					console.log(`Compressed "${files[prog]}"`)
					iterate(files, cb, prog + 1)
				}
			})
		})
	}
	catch(e){
		console.log(`Error on "${files[prog]}"`)
		console.error(e)
		iterate(files, cb, prog + 1)
	}
}



// Go!
console.log(`Compressing "${input}"`)
compressFiles(input, err => {
	if(err) console.error(err)
	else console.log('Done!')
})








