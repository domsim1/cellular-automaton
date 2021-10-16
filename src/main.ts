// 129
(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const rule = Number(urlParams.get('rule') || 30);
    const canvas = document.createElement('canvas');
    const scale =  Number(urlParams.get('scale') || 1);
    const randomCells = Number(urlParams.get('random') || 0);
    const width = window.innerWidth / scale;
    const height = window.innerHeight / scale;
    canvas.width =  width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        throw new Error('Woops, could not get 2d context!');
    }
    if (rule > 255) {
        throw new Error('Rule must be below 255');
    }
    let nextRow = [];
    let currentRow = [];
    if (randomCells === 0) {
        currentRow[Math.floor(width/2)] = 1;
        ctx.rect(Math.floor(width/2) * scale, 0, scale, scale);
    } else {
        for (let r = 0; r <= randomCells; r++) {
            const num = Math.floor(Math.random() * width);
            currentRow[num] = 1;
            ctx.rect(num * scale, 0, scale, scale);
        }
    }
    ctx.fillStyle = '#000000';
    for (let h = 1; h < height; h++) {
        if (h + 1 >= height) {
            break;
        }
        for (let w = 0; w < width; w++) {
            let match = 0b000
            if (w - 1 > -1) {
                if (currentRow[w-1]) {
                    match |= 0b100
                }
            }
            if(currentRow[w]) {
                match |= 0b010;
            }
            if (w + 1 < width) {
                if (currentRow[w+1]) {
                    match |= 0b001;
                }
            }
            switch (match) {
                case 0b000: {
                    nextRow[w] = 0b00000001 & rule;
                    if (nextRow[w]) {
                        ctx.rect(w * scale, h * scale, scale, scale)
                    }
                    break;
                }
                case 0b001: {
                    nextRow[w] = 0b00000010 & rule;
                    if (nextRow[w]) {
                        ctx.rect(w * scale, h * scale, scale, scale)
                    }
                    break;
                }
                case 0b010: {
                    nextRow[w] = 0b00000100 & rule;
                    if (nextRow[w]) {
                        ctx.rect(w * scale, h * scale, scale, scale)
                    }
                    break;
                }
                case 0b011: {
                    nextRow[w] = 0b00001000 & rule;
                    if (nextRow[w]) {
                        ctx.rect(w * scale, h * scale, scale, scale)
                    }
                    break;
                }
                case 0b100: {
                    nextRow[w] = 0b00010000 & rule;
                    if (nextRow[w]) {
                        ctx.rect(w * scale, h * scale, scale, scale)
                    }
                    break;
                }
                case 0b101: {
                    nextRow[w] = 0b00100000 & rule;
                    if (nextRow[w]) {
                        ctx.rect(w * scale, h * scale, scale, scale)
                    }
                    break;
                }
                case 0b110: {
                    nextRow[w] = 0b01000000 & rule;
                    if (nextRow[w]) {
                        ctx.rect(w * scale, h * scale, scale, scale)
                    }
                    break;
                }
                case 0b111: {
                    nextRow[w] = 0b10000000 & rule;
                    if (nextRow[w]) {
                        ctx.rect(w * scale, h * scale, scale, scale)
                    }
                    break;
                }
            }
        }
        currentRow = nextRow;
        nextRow = [];
    }
    ctx.fill();
    document.body.appendChild(canvas);
})();
