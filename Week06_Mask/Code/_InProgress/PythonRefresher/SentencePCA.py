
import re
import numpy as np
from sklearn.decomposition import PCA


num_sentences =      100
chars_per_sentence = 1000	# original dimensions
num_components =     100	# pca dimensions


# read in all of text into a single string
print 'loading text...'
text = ''
with open('LordOfTheRings_JRRTolkien.txt') as f:
	for line in f:
		line = re.sub('\n|\r', '', line)
		text += line


# convert all characters to chars, cut off for even training
chars = [ ord(c) for c in text ]
print '- found ' + str(len(chars)) + ' chars'
chars = chars[0 : num_sentences*chars_per_sentence]


# load as a numpy array and reshape into a grid
chars = np.array(chars)
chars = chars.reshape( (num_sentences, chars_per_sentence))
print chars.shape


print 'reducing dimensions...'
# pca = PCA(n_components=num_components, svd_solver='randomized', whiten=True)
pca = PCA(n_components=num_components, svd_solver='randomized', whiten=False)
pca.fit(chars)
compressed = pca.transform(chars)
print compressed.shape


# print 'reconstructing into sentences...'
# reconstructed = pca.inverse_transform(compressed)
# print reconstructed.shape

rand = np.random.normal(size=num_components)
reconstructed = pca.inverse_transform(rand)

sentence = ''
# for c in reconstructed[0][0:200]:
for c in reconstructed[0:200]:
	if c < 45:
		c = ' '
	else:
		c = chr(int(c))
	sentence += c
print sentence






