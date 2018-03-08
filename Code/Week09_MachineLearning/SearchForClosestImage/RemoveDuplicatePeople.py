
from glob import glob
import os

for f in glob('faces/*.jpg'):
	if '0001' not in f:
		os.remove(f)
