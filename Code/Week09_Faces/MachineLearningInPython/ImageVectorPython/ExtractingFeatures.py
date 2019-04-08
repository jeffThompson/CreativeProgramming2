
'''
EXTRACTING FEATURES
Jeff Thompson | 2018 | jeffreythompson.org

A simple example that recreates the one we built in Processing: load an image,
resize it and convert to grayscale, and create an array from the pixels.

In the 'Better' version next, we'll improve on this and feed it into some
machine learning algorithms to extract the most important features.

'''

from glob import glob		# for getting a list of image files
from PIL import Image 		# load and process image files
import numpy as np 			# numpy for all our vector needs

# size to make our vectors
width = height = 16


# get a list of jpg files in the 'images' folder using the glob library
print 'gathering image files...'
filenames = glob('input/*.jpg')
print '- found ' + str(len(filenames))


# we can create a function that takes a filename and width/height as
# an argument and converts it into a vector, just like in the Processing example
def image_to_vector(filename, w, h):
	img = Image.open(filename)			# open the image
	img = img.resize( (w,h) )			# resize it (note dims are in a 'tuple')
	img = img.convert('L')				# convert to grayscale (L = luminance)
	pixels = list(img.getdata())		# get its pixel values as a list
	pixels = np.array(pixels)			# convert that list into a numpy array
	pixels = pixels.astype('uint8')		# we don't need float data, so convert it to integers
	return pixels						# and send back the resulting array

# convert the first image into a vector
sample = image_to_vector(filenames[0], width, height)

print sample.shape		# print the dimensions of the vector
print sample[0:3]		# and print the first three values


# let's use this to load up all the images into an array
# first, create an empty array at the size we need
print 'creating array of image vectors...'
images = np.empty( [len(filenames), width*height] )

# then go though all the images, create vectors from them
# and add them to the array
for i, filename in enumerate(filenames):
	print '- ' + str(i+1) + '/' + str(len(filenames))
	px = image_to_vector(filename, width,height)
	px = px.astype(np.float32)		# convert back to float (since we'll normalize the data)
	images[i] = px 					# add it to our array

# normalize image data into a range of 0-1 (instead of 0-255)
images -= images.min()		# make the lowest value 0
images /= images.max()		# and divide by the max to make largest = 1
print images

