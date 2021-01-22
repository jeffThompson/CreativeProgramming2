
'''
EXTRACT FEATURES: BETTER
Jeff Thompson | 2018 | jeffreythompson.org

In this example, instead of using *all* pixel data we use a common machine-
learning technique called 'dimensionality reduction'. If each dimension in
the data is something that describes the item (in this case pixels), even a small
16x16-pixel image with RGB values would have 16x16x256 = 65,536 dimensions!

Using an algorithm called Principle Component Analysis (PCA), we can keep only
those dimensions in our data that are most important, essentially generating
new data from the images we trained our system on. The result is essentially a
highly compressed version on the images that also converges on the most 
representative parts of those images, kind of an opposite of the average
of them all. More info on how PCA works here (with a math warning):
https://en.wikipedia.org/wiki/Principal_component_analysis

This idea dates back to facial recognition work in the 1990s and the compressed
average is called an "eigenface". You can read lots more about that here:
https://en.wikipedia.org/wiki/Eigenface

Also very cool: we can then ask PCA to reconstruct the original images from this
compressed version, which gives us mutated-looking images. We can also feed in
random pixels, or pixels from a different image, and see how the system tries
to make sense of the data.

This tutorial is inspired by this one from Gene Kogan:
https://github.com/ml4a/ml4a-guides/blob/master/notebooks/eigenfaces.ipynb

DATASET
+ You'll need a corpus of face images to load - you can use the one provided
  last week in class, or the 'Labeled Faces in the Wild' one from here:
  http://vis-www.cs.umass.edu/lfw/lfw-funneled.tgz

CHALLENGES
+ These reduced vectors will be much better for finding similar faces than
  our method in Processing. That's because PCA only keeps the features of our
  full vectors that are most important. If you compare the distance between
  two of these reduced vectors it will ignore things like 2D placement and 
  local details. Can you implement a measure of cosine similarity between
  two of the reduced vectors here?
+ This method of training a model and generating images from it using random
  values as the input works ok, but if you're interested in this, a good next
  step would be to research Generative Adversarial Networks, a neurla network
  technique that can make some really stunning images. The downside: the code
  gets more complex and the libraries can be hard to install. See this tutorial
  as a good starting point: https://www.safaribooksonline.com/oriole/
  saf-generative-adversarial-networks-for-beginners

'''

from glob import glob					# getting a list of jpg files
from PIL import Image 					# image import and manipulation
import numpy as np 						# for all our vector/matrix stuff
from sklearn.decomposition import PCA 	# dimensionality reduction of our model
import os 								# create output directories
from math import sqrt 					# for output dimensions


# auto-load images from this directory
directory = '../FaceImages/10kFaces'

# how many images to use in the model?
# (generally, more is better but slower)
num_images = 10000

# resize input images (we can keep them larger than the Processing 
# version, since we'll be doing dimensionality reduction)
w = h = 100

# how many dimensions to reduce the model to after processing?
# must be square number (like 16, 64, 100, etc) - to be accurate for
# recognizing faces, a value between 100-144 is best, but don't let
# that stop you from hacking at this with really low numbers :)
num_components = 64

# what size should the output images be?
out_w = out_h = 400


# get all jpg files in the source folder using the glob library
print 'searching director for image files...'
labels = []
for path in glob(directory + '/*.jpg'):
	labels.append(path)
print '- found ' + str(len(labels)) + ' faces'

# if we specified fewer images than were found, only keep those
# (this is helpful for testing without long processing times)
if num_images < len(labels):
	labels = labels[:num_images]

# how many face images did we load?
num_faces = len(labels)
print '- kept ' + str(num_faces) + ' faces'


# load each image, extract its pixel data and add to an array
print 'loading pixel data...'
faces = np.empty( (num_faces, w*h*3) )	# empty array to load pixels into
for i, path in enumerate(labels):

	# update us periodically
	if i%1000 == 0:
		print '- ' + str(i) + '/' + str(num_faces)
	
	# load the image and resize, ignoring original proportions
	img = Image.open(path)
	img = img.resize( (w,h) )

	# extract the pixels as a list and add to the faces array
	pixels = list(img.getdata())
	pixels = np.array(pixels)
	pixels =  pixels.flatten()	# make RGB data just 1D
	faces[i] = pixels	

# the resulting array will be 2D:
# - one entry for each image...
# 	- and each one of those containing the data for every pixel
# 100x100 pixels * rgb means each image has 30,000 dimensions!
print '- shape:', faces.shape


# since 30k dimensions is way overkill and won't help us, we can reduce
# that to only include the most important ones
# there are lots of ways to do that, but we'll use Principle Component Analysis
# or PCA, a fast and fairly good-quality method
print 'reducing dimensions of data...'
pca = PCA(n_components=num_components, svd_solver='randomized', whiten=True)
pca.fit(faces)

# next, apply PCA to our original data, basically turning the original images
# into N-value compressed representations of their most important features
compressed = pca.transform(faces)
print '- shape:', compressed.shape		# same # of elements, but only 100 features each!


# let's take a look at one of these compressed representations
print 'creating image from pca data...'

# first, what will the square dimensions of our reduced components be?
sq_dims = int(sqrt(num_components))

# then convert it to an image and save
example = compressed[0]							# get the data using its index
example *= 255.0								# convert back to 0-255 range
example = example.astype('uint8')				# convert to integers (for pixel values)
example = example.reshape( (sq_dims,sq_dims) )	# resize to a square instead of 1D
output = Image.fromarray(example)				# create an image from that array
output = output.resize( (out_w,out_h) )			# make it larger so we can see it
output.save('ExamplePCA.jpg')					# and save to file

# notice that this doesn't look anything like a face!
# that's because pca has kept only information that is most relevant across our
# dataset, which might not correspond to the image the way we see it


# but, super cool: we can 'project' this reduced space back into the original
# and create versions of the image that are shifted closer to the average
# representation found in the dataset
print 'reconstructing data back into images...'
reconstructed = pca.inverse_transform(compressed)	# run on the entire dataset
reconstructed = np.clip(reconstructed, 0, 255)		# make sure data stays 0-255 range

# then we can export a random selection of the result, plus their original image

# create an output folder, if it doesn't yet exist
if not os.path.exists('pairs'):
	os.mkdir('pairs')

# create a list of 20 random indices, iterate through those images
indices = np.random.randint(num_faces, size=20)
for i in indices:

	# convert float array to ints and make 2D, in the same
	# dimensions as our input image
	orig = faces[i].astype('uint8')
	orig = orig.reshape( (w,h,3) )

	# do the same for the result
	result = reconstructed[i].astype('uint8')
	result = result.reshape( (w,h,3) )

	# combine the two image arrays along axis #1 (side-by-side)
	pair = np.concatenate( [orig, result], axis=1)
	
	# create an image from the array, make it bigger (smooth using bicubic
	# interpolation), and save to file
	output = Image.fromarray(pair)
	output = output.resize((out_w*2,out_h), resample=Image.BICUBIC)
	output.save('pairs/Pair-' + str(i) + '_' + str(num_components) + 'Components.jpg')


# also super cool: instead of sending the face data back into our model, we can 
# send random pixels and see how the model interprets them!

# make an output directory for these too
if not os.path.exists('random'):
	os.mkdir('random')

# make ten images...
for i in range(20):

	# create an array of random values
	rand_px = np.random.normal(size=num_components)
	
	# transform those back into the training set
	result = pca.inverse_transform(rand_px)
	result = np.clip(result, 0,255)
	result = result.astype('uint8').reshape( (w,h,3) )
	
	# convert to an image
	output = Image.fromarray(result)
	output = output.resize((out_w,out_h), resample=Image.BICUBIC)
	output.save('random/RandomPx-' + str(i) + '_' + str(num_components) + 'Components.jpg')


# finally, instead of random data let's send a different image in!
def image_to_face(input_path, output_filename):
	img = Image.open(input_path)
	img = img.convert('L')
	img = img.resize( (sq_dims,sq_dims) )

	# get the pixels as floating point values, convert to 0-1 range
	pixels = list(img.getdata())
	pixels = np.array(pixels).astype(np.float32)
	pixels -= pixels.min()
	pixels /= pixels.max()

	# send it to the pca model we made, just like above
	result = pca.inverse_transform(pixels)
	result = np.clip(result, 0,255)
	result = result.astype('uint8').reshape( (w,h,3) )

	# and save it to an image
	output = Image.fromarray(result)
	output = output.resize((out_w,out_h), resample=Image.BICUBIC)
	output.save(output_filename)

# run it on some images :)
image_to_face('input/dog.jpg', 'DogFace.jpg')
image_to_face('input/cat.jpg', 'CatFace.jpg')
image_to_face('input/hippo.jpg', 'HippoFace.jpg')
image_to_face('input/cheese.jpg', 'CheeseFace.jpg')

