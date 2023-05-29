class WriterConsole {
    write(image) {
        for (let y = image.height - 1; y >= 0; y--) {
            for(let x = 0; x < image.width; x++) {
                process.stdout.write(image.pixels[y][x].getConsoleColor() + " ");
            }
            process.stdout.write("\n");
        }
    }
}

module.exports = new WriterConsole();