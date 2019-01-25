
'''
DIMENSIONALITY REDUCTION WITH TSNE
Jeff Thompson | 2017-18 | jeffreythompson.org

In our past examples, we loaded a bunch of images as vectors, then reduced them
to only the most important features. But even if we bring the number of features
down to 100, that means the 'vector space' is 100-dimensions - there's no way
we can visualize that!

We could use PCA to go all the way down to 2D, but the results aren't always so
great. Instead, we can use PCA for an initial pass, then an algorithm called
t-SNE (pronounced 'tee-snee') for the final reduction. t-SNE is very widely used
in machine learning, and though it does have some limitations, we can find some
very intersting things. For example, items that are nearby in the final reduced 
space can be seen as related to each other, even if we don't know exactly why!

You can read lots more about t-SNE all over the web, but here are a few good ones:
+ https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding
+ https://lvdmaaten.github.io/tsne
+ https://distill.pub/2016/misread-tsne

SETTINGS
The settings for t-SNE are a lot more complex than for PCA. But the scikit-learn
docs say that the settings fordon't make a ton of difference. You may find tweaking
them does make an impact depending on your input data, so try if you don't get the
results you were looking for. 

More on the settings here:
+ http://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html
+ http://scikit-learn.org/stable/modules/manifold.html#t-sne

OPTIONAL NEXT STEP!
After running this script, try running the VisualizeTSNE Processing sketch,
also included in this folder. It will place the image files in their final
2D location, letting you see the results of the t-SNE algorithm.

'''

from glob import glob								# for gathering images
from PIL import Image 								# image processing
import numpy as np 									# array handling
from sklearn.decomposition import IncrementalPCA	# inital reduction
from sklearn.manifold import TSNE 					# final reduction

# folder of images to work with - could be faces, or something else!
# see this fun dataset of over 8k images of various flowers:
# http://www.robots.ox.ac.uk/~vgg/data/flowers/102/index.html
directory = '../FlowerImages'

num_images =       2000		# how many images to use in our model
w = h = 		   100		# reduce them to this size first

# pca settings for the initial reduction
# see the resouce links above for more info
init_dimensions =  50		# num dimensions to reduce to before t-SNE

# tsne settings for final reduction
final_dimensions = 2		# final num dimensions (2D, 3D, etc)

learning_rate =    300      # 100-1000 usually good, shouldn't be higher (default = 1000)
						    # probably the most critical value to tune

perplexity = 	   30       # num of clusters t-SNE will try to fit to (default = 30)
						    # (larger datasets tend to require higher perplexity)

angle = 		   0.2      # 0-1 (default = 0.5)
						    # lower = more accurate fitting, higher = faster processing 


# load images from a folder, convert to vectors
# (see ExtractFeatures_Better.py for more info on this)
print 'searching director for image files...'
labels = []
for path in glob(directory + '/*.jpg'):
	labels.append(path)
print '- found ' + str(len(labels)) + ' images'

if num_images < len(labels):
	print '- keeping only ' + str(num_images)
	labels = labels[:num_images]

print 'loading pixel data...'
vectors = np.empty( (num_images, w*h*3) )
for i, path in enumerate(labels):
	img = Image.open(path)
	img = img.resize( (w,h) )
	pixels = list(img.getdata())
	pixels = np.array(pixels)
	pixels =  pixels.flatten()
	vectors[i] = pixels
print '- done'

# run an initial reduction using IncrementalPCA, which works with
# the data in stages, helping make sure we don't run out of RAM
# with large datasets
print 'reducing to ' + str(init_dimensions) + 'D using IncrementalPCA...'
ipca = IncrementalPCA(n_components=init_dimensions)		# create the pca object
ipca = ipca.fit(vectors)								# fit it to our vectors
vectors = ipca.transform(vectors)						# and run the reduction
print '- done'

# we'll periodically save our results, so we can go back later
# and don't have to run every step again (also useful for big
# datasets, where PCA might take hours or longer)
print '- saving as csv file...'
with open('Model_IPCA_' + str(init_dimensions) + 'D.csv', 'w') as f:
	
	# 'zip' merges two lists, so we can iterate them together
	for label, vector in zip(labels, vectors):
		vector = [ str(v) for v in vector ]		# convert values to floats
		vector = ','.join(vector)				# then into a comma-separated string
		f.write(label + ',' + vector + '\n')	# and write to the file

# now run the second round of dimensionality reduction using tsne
print 'reducing to ' + str(final_dimensions) + 'D using t-SNE...'
print '- may take a really, really (really) long time :)'

# first, convert the vectors to a numpy array 
# (required for the tsne implementation in sklearn)
vectors = np.asarray(vectors)

# create an instance of the tsne class, then run our vector array
# through if for the final reduction
# (the 'verbose' option here prints nothing of the tsne algorithm's
# progress - change to '1' for more info)
tsne = TSNE(n_components=final_dimensions, learning_rate=learning_rate, perplexity=perplexity, angle=angle, verbose=0)
vectors = tsne.fit_transform(vectors)	# fit the tsne object to the vectors and run reduction
print '- done'

# optionally, normalize the output to a range of -1 to 1
print 'normalizing vectors to -1 to 1...'
vectors -= vectors.min()		# make the lowest value 0
vectors /= vectors.max()/2		# div by 2 to get a range 0-2
vectors -= 1					# subtract 1 to get range of -1 to 1
print '- done'

# save the results to another csv file
print 'saving to csv file...'
with open('Model_tSNE_' + str(final_dimensions) + 'D.csv', 'w') as f:
	for label, vector in zip(labels, vectors):
		vector = [ str(v) for v in vector ]
		vector = ','.join(vector)
		f.write(label + ',' + vector + '\n')
print '- done'

