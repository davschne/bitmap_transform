The main program, transform_cli.js, reads a bitmap file, transforms it in some way, and then writes a new bitmap file from the transformation. Commandline arguments are:

 (1) path/name of the file to read
 (2) path/name of the file to write
 (3) transform name
 (4+) any additional arguments the specific transform needs to do its work (see below)

The transforms are:

 - identity  : passes the image unchanged

 - grayscale : replaces RGB values for each pixel with their average

 - scale     : scales each color channel by a value
               (1 arg: scaling factor)

 - scaleRGB  : scales RGB values independently
               (3 args: scaleR, scaleG, scaleB)

 - rotateCCW : rotates the image 90 degrees counter-clockwise

Examples:

 - Making a grayscale image:

   node transform_cli source.bmp dest.bmp grayscale

 - Scaling red by 2, green by 1, and blue by 3:

   node transform_cli source.bmp dest.bmp scaleRGB 2 1 3
