
'''
NUMPY BASICS
Jeff Thompson | 2018 | jeffreythompson.org

Of all the Python libraries, numpy ("number python") is by far
the most widely-used. It handles massive lists of data very quickly,
and is the backbone of many machine learning libraries.

It's syntax can take a little getting used to, but you'll need to
at least understand the basics to do any machine learning.

RESOURCES
Lots of more info on Numpy here:
+ http://cs231n.github.io/python-numpy-tutorial
+ https://docs.scipy.org/doc/numpy-dev/user/quickstart.html

'''

# numpy doesn't come pre-installed with Python, and it needs
# to be explicitly imported for each script!
import numpy as np

# the basic unit in numpy is an array
# we can make an array several ways, but here we create
# one made up of 6 numbers (note we pass it as a list!)
a = np.array( [ 1, 2, 3, 4, 5, 6 ] )

# an array's 'shape' is a list of its dimensions
# our array has 6 separate elements
print a.shape

# it's unlikely we'd use numpy to create normal 1D lists
# more often, we'd have an array of arrays, each one
# containing data describing an image or object
# we could have declared our array like this:
a = np.array( [[ 1, 2, 3, 4, 5, 6 ]] )
print a.shape

# one of the powerful things numpy can do it 'reshape' an
# array, moving it's elements into a different structure
a = a.reshape(3,2)
print a

# it may be useful to make arrays that are all zeros...
b = np.zeros( (3,2) )
print b

# or of random numbers!
c = np.random.random( (3,2) )	# arguments are dimensions, values always 0-1
c *= 10							# we can do math to the entire array!
print c 						# (this is called scalar multiplication)

# query the array
print c.min(), c.max()

# convert to another data type
# int and float from Python are available, but also more specific
# types like np.int16 and np.float32
c = c.astype(int)	
print c

