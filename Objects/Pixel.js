module.exports = class Pixel {

    constructor(color, intensity) {
        this.color = color; //{r: xxx, g: xxx, b: xxx}
        this.intensity = intensity;
    }
    setGrayColor() {
        const gray = this.intensity > 0 ? Math.round(this.intensity * 255) : 0;
        this.color = {
            r: gray,
            g: gray,
            b: gray};
    }
    colorToString() {
        return `${this.color.r} ${this.color.g} ${this.color.b}`;
    }
    getConsoleColor() {
        if (this.intensity >= 0 && this.intensity < 0.2) {
            return '.';
        } else if (this.intensity >= 0.2 && this.intensity < 0.5) {
            return '*';
        } else if (this.intensity >= 0.5 && this.intensity < 0.8) {
            return 'O';
        } else if (this.intensity >= 0.8) {
            return '#';
        } else {
            return ' ';
        }
    }
}