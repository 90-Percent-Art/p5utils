/**
 * Lerps betweeen all corresponding elements in 
 * two equal length arrays of numbers
 * @param  {number[]} start  Starting array of numbers
 * @param  {number[]} end Ending array of numbers
 * @param  {number} percent    Percentage of lerp (0-1)
 * @return {number[]}        The lerped array between start and end
 */
function arrayLerp(start, end, percent){

  const result = [];

  for(k=0; k<start.length; k++){
    result.push(start[k]*(1-percent) + end[k]*percent);
  }

  return(result);
}

/**
 * Given a CMY vector, get the complementary CMY color vector
 * @param  {number[]} cmy       The input CMY color
 * @param  {boolean} normalize Do you want to normalize saturation
 * @return {number[]}           The complementary CMY
 */
function getComplement(cmy, normalize){

  const complement = cmy.map((color) => (100-color));

  if(normalize){
    const cmy_len = computeMagnitude(cmy);
    const comp_len = computeMagnitude(complement);

    complement = complement.map(x => x*cmy_len/comp_len);
  }

  return(complement)
}

/**
 * Get the magnitude of a vector of numbers
 * @param  {number[]} vec Input vector
 * @return {number}     Magnitude of the vector
 */
function computeMagnitude(vec){
  return sqrt(vec.map(c => c**2).reduce((prev, next) => prev+next));
}

exports.arrayLerp = arrayLerp;
exports.getComplement = getComplement;
exports.computeMagnitude = computeMagnitude;