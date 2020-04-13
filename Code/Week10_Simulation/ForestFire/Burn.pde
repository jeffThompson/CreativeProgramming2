
void burn(int x, int y) {
  
  // if already not burned yet, skip
  // (since it's not on fire!)
  if (forest[y][x] != burned) {
    return;
  }
  
  // otherwise, burn this pixel's neighbors...
  
  // neighbor to the left
  if (x-1 >= 0 && forest[y][x-1] == tree) {
    forest[y][x-1] = burned;
  }
  
  // right
  if (x+1 < width && forest[y][x+1] == tree) {
    forest[y][x+1] = burned;
  }
  
  // up
  if (y-1 >= 0 && forest[y-1][x] == tree) {
    forest[y-1][x] = burned;
  }
  
  // down
  if (y+1 < height && forest[y+1][x] == tree) {
    forest[y+1][x] = burned;
  }
}
