class DrawnEntity{

	/** Build this entity and do any setup */
	constructor(){}

	/**
	 * Draw yourself to canvas. Typically should
	 * begin with push() and end with pop(). Drawing
	 * instructions, styling and transformations go in between.
	 *
	 * Typically will be called once per frame for this entity. 
	 */
	draw(){}

	/**
	 * Update the state of this entity. Typically 
	 * called once per frame before draw. 
	 */
	update(){}

	/**
	 * Shorthand for calling update then draw on this entity. 
	 */
	updateDraw(){
		this.update();
		this.draw();
	}

}

class CMYKCircleOverlap extends DrawnEntity{
	
	/**
	 * Class to draw CMYK circle from lines 
	 * entity at a given location.
	 * @param  {number} x        X canvas location 
	 * @param  {number} y        Y canvas location
	 * @param  {number} diameter Diameter of circle in px
	 * @param  {number} numLines Integer max number of lines per fill color
	 * @param  {number[]} cmyk   Array of CMYK values in range [0-100]
	 * @param  {number} theta    Angle of fill lines (0-2*PI)
	 */
	constructor(x,y,diameter,numLines, cmyk, theta){
		super();
		
		// static
		this._CMYK_MAP = ['cyan', 'magenta', 'yellow', 'black'];

		// passed params
		this._x = x;
		this._y = y;
		this._diameter = diameter;
		this._numLines = numLines;
		this._cmyk = cmyk;
		this._theta = theta;

		//derived
		this._radius = this._diameter/2;
		this._stepSize = this._diameter/this._numLines;
		this._center = createVector(this._x, this._y);

	}

	/**
	 * Draws the circle
	 */
	draw(){
		push();
		translate(this._x, this._y);
		rotate(this._theta);
		for(let cmyk_ind=0; cmyk_ind < this._cmyk.length; cmyk_ind++){

			let color_amnt = this._cmyk[cmyk_ind];
			let line_amnt = floor(this._numLines*color_amnt/100);
			stroke(color(this._CMYK_MAP[cmyk_ind])); // set color 
			this.drawColor(line_amnt);

		}
		pop();
	}

	/**
	 * Draws a single set of color lines
	 * @param  {number} amnt the number of lines to draw
	 */
	drawColor(amnt){
		for(let l=1; l <= amnt; l++){
			let yloc = random(-this._radius, this._radius);
			let xloc = sqrt(this._radius**2 - yloc**2);
			line(-xloc, yloc,xloc,yloc);
		}

	}

	/**
	 * Checks for collisions with other CMYK circle elements
	 * @param  {CMYK} that the CMYK circle element to be compared to.
	 * @return {boolean}      True if there is a collision
	 */
	collidesWith(that){ // that is another cmyk circle object
		let collides = false;
		if(p5.Vector.dist(this.center, that.center) < this.radius + that.radius){
			collides = true;
		}
		return collides;
	}

	/**
	 * @return {number} the radius of the cirlce
	 */
	get radius(){
		return this._radius;
	}

	/**
	 * @return {p5.Vector} the center of the circle as a p5 vector
	 */
	get center(){
		return this._center;
	}
}

exports.DrawnEntity = DrawnEntity;
exports.CMYKCircleOverlap = CMYKCircleOverlap;