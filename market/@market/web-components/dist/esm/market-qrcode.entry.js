import { r as registerInstance, h, H as Host } from './index-e03cb5c3.js';

const ALIGNMENT_PATTERN_LOCATIONS = Object.freeze([
  [],
  [4, 16],
  [4, 20],
  [4, 24],
  [4, 28],
  [4, 32],
  [4, 20, 36],
  [4, 22, 40],
  [4, 24, 44],
  [4, 26, 48],
  [4, 28, 52],
  [4, 30, 56],
  [4, 32, 60],
  [4, 24, 44, 64],
  [4, 24, 46, 68],
  [4, 24, 48, 72],
  [4, 28, 52, 76],
  [4, 28, 54, 80],
  [4, 28, 56, 84],
  [4, 32, 60, 88],
  [4, 26, 48, 70, 92],
  [4, 24, 48, 72, 96],
  [4, 28, 52, 76, 100],
  [4, 26, 52, 78, 104],
  [4, 30, 56, 82, 108],
  [4, 28, 56, 84, 112],
  [4, 32, 60, 88, 116],
  [4, 24, 48, 72, 96, 120],
  [4, 28, 52, 76, 100, 124],
  [4, 24, 50, 76, 102, 128],
  [4, 28, 54, 80, 106, 132],
  [4, 32, 58, 84, 110, 136],
  [4, 28, 56, 84, 112, 140],
  [4, 32, 60, 88, 116, 144],
  [4, 28, 52, 76, 100, 124, 148],
  [4, 22, 48, 74, 100, 126, 152],
  [4, 26, 52, 78, 104, 130, 156],
  [4, 30, 56, 82, 108, 134, 160],
  [4, 24, 52, 80, 108, 136, 164],
  [4, 28, 56, 84, 112, 140, 168],
]);
const DATA_CAPACITY = Object.freeze({
  LOW: [
    19, 34, 55, 80, 108, 136, 156, 194, 232, 274, 324, 370, 428, 461, 523, 589, 647, 721, 795, 861, 932, 1006, 1094,
    1174, 1276, 1370, 1468, 1531, 1631, 1735, 1843, 1955, 2071, 2191, 2306, 2434, 2566, 2702, 2812, 2956,
  ],
  MEDIUM: [
    16, 28, 44, 64, 86, 108, 124, 154, 182, 216, 254, 290, 334, 365, 415, 453, 507, 563, 627, 669, 714, 782, 860, 914,
    1000, 1062, 1128, 1193, 1267, 1373, 1455, 1541, 1631, 1725, 1812, 1914, 1992, 2102, 2216, 2334,
  ],
  QUARTER: [
    13, 22, 34, 48, 62, 76, 88, 110, 132, 154, 180, 206, 244, 261, 295, 325, 367, 397, 445, 485, 512, 568, 614, 664,
    718, 754, 808, 871, 911, 985, 1033, 1115, 1171, 1231, 1286, 1354, 1426, 1502, 1582, 1666,
  ],
  HIGH: [
    9, 16, 26, 36, 46, 60, 66, 86, 100, 122, 140, 158, 180, 197, 223, 253, 283, 313, 341, 385, 406, 442, 464, 514, 538,
    596, 628, 661, 701, 745, 793, 845, 901, 961, 986, 1054, 1096, 1142, 1222, 1276,
  ],
});
const ENCODING = Object.freeze({
  NUMERIC: 'NUMERIC',
  ALPHANUMERIC: 'ALPHANUMERIC',
  KANJI: 'KANJI',
  BYTE: 'BYTE',
});
const ERROR_CORRECTION = Object.freeze({
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  QUARTER: 'QUARTER',
  HIGH: 'HIGH',
});

/**
 * CLASS BitWriter
 * A internal class for writing bits to an Uint8Array for QRCode encoding.
 */
class BitWriter {
  constructor(length) {
    this.length = length;
    this.content = new Uint8Array(length);
    this.byte = 0;
    this.bit = 0;
  }

  get bitsLeft() {
    return (this.length - this.byte) * 8 - this.bit;
  }

  get bytesLeft() {
    return this.bit === 0 ? this.length - this.byte : this.length - this.byte - 1;
  }

  codeForAlphaNUMERICal(char) {
    const lookIn = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
    for (let index = 0; index < lookIn.length; index++) {
      if (lookIn[index] === char) return index;
    }
  }

  completeByte() {
    if (this.bit === 0) return;
    this.bit = 0;
    this.byte++;
  }

  nextPutAlphaNUMERIC(string) {
    // Two ALPHANUMERICal characters at a time.
    for (let last = 1; last < string.length; last += 2) {
      this.nextPutBits(
        this.codeForAlphaNUMERICal(string[last - 1]) * 45 + this.codeForAlphaNUMERICal(string[last]),
        11
      );
    }
    if (string.length % 2 === 1) {
      this.nextPutBits(this.codeForAlphaNUMERICal(string[string.length - 1]), 6);
    }
  }

  nextPutBits(int, bits) {
    if (bits === 0) return;
    let amount = this.bit + bits;
    if (amount < 8) {
      this.content[this.byte] = this.content[this.byte] | (int << (8 - amount));
      this.bit += bits;
    } else if (amount === 8) {
      this.content[this.byte] = this.content[this.byte] | int;
      this.byte++;
      this.bit = 0;
    } else {
      amount -= 8;
      let shift = int >> amount;
      this.content[this.byte] = this.content[this.byte] | shift;
      shift = int - (shift << amount);
      this.byte++;
      this.bit = 0;
      this.nextPutBits(shift, amount);
    }
  }

  nextPutByte(byteArray) {
    byteArray.forEach((byte) => {
      this.nextPutBits(byte, 8);
    });
  }

  nextPutCompleteByte(byte) {
    this.completeByte();
    this.content[this.byte] = byte;
    this.byte++;
  }

  nextPutKanji(string) {
    for (let index = 0; index < string.length; index++) {
      let charCode = string.charCodeAt(index);
      if (charCode <= 0x9ffc) {
        // in the range 0x8140 to 0x9FFC
        charCode -= 0x8140;
      } else {
        // in the range 0xE040 to 0xEBBF
        charCode -= 0xc140;
      }
      let lByte = charCode % 256;
      let bByte = (charCode - lByte) / 256;
      this.nextPutBits(bByte * 0xc0 + lByte, 13);
    }
  }

  nextPutNumeric(string) {
    const asNumbers = [];
    for (let index = 0; index < string.length; index++) {
      asNumbers.push(string.charCodeAt(index) - 48);
    }
    // Three NUMERICal characters at a time.
    for (let last = 2; last < string.length; last += 3) {
      this.nextPutBits(asNumbers[last - 2] * 100 + asNumbers[last - 1] * 10 + asNumbers[last], 10);
    }
    switch (string.length % 3) {
      case 0:
        break;
      case 1:
        this.nextPutBits(asNumbers[string.length - 1], 4);
        break;
      case 2:
        this.nextPutBits(asNumbers[string.length - 2] * 10 + asNumbers[string.length - 1], 7);
        break;
    }
  }
}

/**
 * CLASS Matrix
 * A class for manipulating a 2D array.
 */
class Matrix$1 {
  static withAll(width, height, fill) {
    const content = [];
    if (fill === undefined) {
      for (let row = 0; row < height; row++) {
        content.push(new Array(width));
      }
    } else {
      for (let row = 0; row < height; row++) {
        content.push(new Array(width).fill(fill));
      }
    }
    return new this(content);
  }

  constructor(content) {
    this.content = content;
  }

  at(x, y) {
    return this.content[y][x];
  }

  copy() {
    return new this.constructor(this.content.map((row) => row.slice()));
  }

  fill(x, y, width, height, value) {
    for (let top = y; top < y + height; top++) {
      let row = this.content[top];
      for (let col = x; col < x + width; col++) {
        row[col] = value;
      }
    }
  }

  get height() {
    return this.content.length;
  }

  put(x, y, value) {
    return (this.content[y][x] = value);
  }

  get width() {
    return this.content[0].length;
  }
}

/**
 * CLASS BooleanMatrix
 * A class for keeping and manipulating 2D boolean data.
 */
class BooleanMatrix extends Matrix$1 {
  static forIntegerArray(width, height, array) {
    const content = [];
    for (let y = 0; y < height; y++) {
      let rowInteger = array[y];
      const row = [];
      for (let x = width - 1; x >= 0; x--) {
        if (rowInteger % 2 === 1) {
          row.unshift(true);
          rowInteger--;
        } else {
          row.unshift(false);
        }
        rowInteger = rowInteger / 2;
      }
      content.push(row);
    }
    return new this(content);
  }

  asIntegerArray() {
    return this.content.map((row) => {
      let integer = 0;
      row.forEach((bool) => {
        integer *= 2;
        if (bool === true) integer++;
      });
      return integer;
    });
  }

  bitAt(x, y) {
    return this.at(x, y) ? 1 : 0;
  }

  fillAlignmentPatternAt(x, y) {
    for (let size = 0; size < 4; size++) {
      this.content[y][x + size] = true;
      this.content[y + 4][x + size + 1] = true;
      this.content[y + 1 + size][x] = true;
      this.content[y + size][x + 4] = true;
    }
    this.content[y + 2][x + 2] = true;
  }

  fillFinderPatternAt(x, y) {
    for (let size = 0; size < 6; size++) {
      this.content[y][x + size] = true;
      this.content[y + 6][x + size + 1] = true;
      this.content[y + 1 + size][x] = true;
      this.content[y + size][x + 6] = true;
    }
    this.fill(x + 2, y + 2, 3, 3, true);
  }
}

/**
 * CLASS QRCodeMap
 * An instance holds the mapping for a QR code at a version and level of error correction.
 * The instances are cached so they can be reused. The map has the responsibility for adding
 * error correction to the codewords, positioning those codewords as data into a boolean
 * matrix, and masking that matrix. Instances are cached so this can be used as a service.
 */
class QRCodeMap extends Matrix$1 {
  // CHUNKING
  static chunkingAt(errorCorrection, version) {
    return {
      LOW: [
        [[1, 26, 19]],
        [[1, 44, 34]],
        [[1, 70, 55]],
        [[1, 100, 80]],
        [[1, 134, 108]],
        [[2, 86, 68]],
        [[2, 98, 78]],
        [[2, 121, 97]],
        [[2, 146, 116]],
        [
          [2, 86, 68],
          [2, 87, 69],
        ],
        [[4, 101, 81]],
        [
          [2, 116, 92],
          [2, 117, 93],
        ],
        [[4, 133, 107]],
        [
          [3, 145, 115],
          [1, 146, 116],
        ],
        [
          [5, 109, 87],
          [1, 110, 88],
        ],
        [
          [5, 122, 98],
          [1, 123, 99],
        ],
        [
          [1, 135, 107],
          [5, 136, 108],
        ],
        [
          [5, 150, 120],
          [1, 151, 121],
        ],
        [
          [3, 141, 113],
          [4, 142, 114],
        ],
        [
          [3, 135, 107],
          [5, 136, 108],
        ],
        [
          [4, 144, 116],
          [4, 145, 117],
        ],
        [
          [2, 139, 111],
          [7, 140, 112],
        ],
        [
          [4, 151, 121],
          [5, 152, 122],
        ],
        [
          [6, 147, 117],
          [4, 148, 118],
        ],
        [
          [8, 132, 106],
          [4, 133, 107],
        ],
        [
          [10, 142, 114],
          [2, 143, 115],
        ],
        [
          [8, 152, 122],
          [4, 153, 123],
        ],
        [
          [3, 147, 117],
          [10, 148, 118],
        ],
        [
          [7, 146, 116],
          [7, 147, 117],
        ],
        [
          [5, 145, 115],
          [10, 146, 116],
        ],
        [
          [13, 145, 115],
          [3, 146, 116],
        ],
        [[17, 145, 115]],
        [
          [17, 145, 115],
          [1, 146, 116],
        ],
        [
          [13, 145, 115],
          [6, 146, 116],
        ],
        [
          [12, 151, 121],
          [7, 152, 122],
        ],
        [
          [6, 151, 121],
          [14, 152, 122],
        ],
        [
          [17, 152, 122],
          [4, 153, 123],
        ],
        [
          [4, 152, 122],
          [18, 153, 123],
        ],
        [
          [20, 147, 117],
          [4, 148, 118],
        ],
        [
          [19, 148, 118],
          [6, 149, 119],
        ],
      ],
      HIGH: [
        [[1, 26, 9]],
        [[1, 44, 16]],
        [[2, 35, 13]],
        [[4, 25, 9]],
        [
          [2, 33, 11],
          [2, 34, 12],
        ],
        [[4, 43, 15]],
        [
          [4, 39, 13],
          [1, 40, 14],
        ],
        [
          [4, 40, 14],
          [2, 41, 15],
        ],
        [
          [4, 36, 12],
          [4, 37, 13],
        ],
        [
          [6, 43, 15],
          [2, 44, 16],
        ],
        [
          [3, 36, 12],
          [8, 37, 13],
        ],
        [
          [7, 42, 14],
          [4, 43, 15],
        ],
        [
          [12, 33, 11],
          [4, 34, 12],
        ],
        [
          [11, 36, 12],
          [5, 37, 13],
        ],
        [
          [11, 36, 12],
          [7, 37, 13],
        ],
        [
          [3, 45, 15],
          [13, 46, 16],
        ],
        [
          [2, 42, 14],
          [17, 43, 15],
        ],
        [
          [2, 42, 14],
          [19, 43, 15],
        ],
        [
          [9, 39, 13],
          [16, 40, 14],
        ],
        [
          [15, 43, 15],
          [10, 44, 16],
        ],
        [
          [19, 46, 16],
          [6, 47, 17],
        ],
        [[34, 37, 13]],
        [
          [16, 45, 15],
          [14, 46, 16],
        ],
        [
          [30, 46, 16],
          [2, 47, 17],
        ],
        [
          [22, 45, 15],
          [13, 46, 16],
        ],
        [
          [33, 46, 16],
          [4, 47, 17],
        ],
        [
          [12, 45, 15],
          [28, 46, 16],
        ],
        [
          [11, 45, 15],
          [31, 46, 16],
        ],
        [
          [19, 45, 15],
          [26, 46, 16],
        ],
        [
          [23, 45, 15],
          [25, 46, 16],
        ],
        [
          [23, 45, 15],
          [28, 46, 16],
        ],
        [
          [19, 45, 15],
          [35, 46, 16],
        ],
        [
          [11, 45, 15],
          [46, 46, 16],
        ],
        [
          [59, 46, 16],
          [1, 47, 17],
        ],
        [
          [22, 45, 15],
          [41, 46, 16],
        ],
        [
          [2, 45, 15],
          [64, 46, 16],
        ],
        [
          [24, 45, 15],
          [46, 46, 16],
        ],
        [
          [42, 45, 15],
          [32, 46, 16],
        ],
        [
          [10, 45, 15],
          [67, 46, 16],
        ],
        [
          [20, 45, 15],
          [61, 46, 16],
        ],
      ],
      MEDIUM: [
        [[1, 26, 16]],
        [[1, 44, 28]],
        [[1, 70, 44]],
        [[2, 50, 32]],
        [[2, 67, 43]],
        [[4, 43, 27]],
        [[4, 49, 31]],
        [
          [2, 60, 38],
          [2, 61, 39],
        ],
        [
          [3, 58, 36],
          [2, 59, 37],
        ],
        [
          [4, 69, 43],
          [1, 70, 44],
        ],
        [
          [1, 80, 50],
          [4, 81, 51],
        ],
        [
          [6, 58, 36],
          [2, 59, 37],
        ],
        [
          [8, 59, 37],
          [1, 60, 38],
        ],
        [
          [4, 64, 40],
          [5, 65, 41],
        ],
        [
          [5, 65, 41],
          [5, 66, 42],
        ],
        [
          [7, 73, 45],
          [3, 74, 46],
        ],
        [
          [10, 74, 46],
          [1, 75, 47],
        ],
        [
          [9, 69, 43],
          [4, 70, 44],
        ],
        [
          [3, 70, 44],
          [11, 71, 45],
        ],
        [
          [3, 67, 41],
          [13, 68, 42],
        ],
        [[17, 68, 42]],
        [[17, 74, 46]],
        [
          [4, 75, 47],
          [14, 76, 48],
        ],
        [
          [6, 73, 45],
          [14, 74, 46],
        ],
        [
          [8, 75, 47],
          [13, 76, 48],
        ],
        [
          [19, 74, 46],
          [4, 75, 47],
        ],
        [
          [22, 73, 45],
          [3, 74, 46],
        ],
        [
          [3, 73, 45],
          [23, 74, 46],
        ],
        [
          [21, 73, 45],
          [7, 74, 46],
        ],
        [
          [19, 75, 47],
          [10, 76, 48],
        ],
        [
          [2, 74, 46],
          [29, 75, 47],
        ],
        [
          [10, 74, 46],
          [23, 75, 47],
        ],
        [
          [14, 74, 46],
          [21, 75, 47],
        ],
        [
          [14, 74, 46],
          [23, 75, 47],
        ],
        [
          [12, 75, 47],
          [26, 76, 48],
        ],
        [
          [6, 75, 47],
          [34, 76, 48],
        ],
        [
          [29, 74, 46],
          [14, 75, 47],
        ],
        [
          [13, 74, 46],
          [32, 75, 47],
        ],
        [
          [40, 75, 47],
          [7, 76, 48],
        ],
        [
          [18, 75, 47],
          [31, 76, 48],
        ],
      ],
      QUARTER: [
        [[1, 26, 13]],
        [[1, 44, 22]],
        [[2, 35, 17]],
        [[2, 50, 24]],
        [
          [2, 33, 15],
          [2, 34, 16],
        ],
        [[4, 43, 19]],
        [
          [2, 32, 14],
          [4, 33, 15],
        ],
        [
          [4, 40, 18],
          [2, 41, 19],
        ],
        [
          [4, 36, 16],
          [4, 37, 17],
        ],
        [
          [6, 43, 19],
          [2, 44, 20],
        ],
        [
          [4, 50, 22],
          [4, 51, 23],
        ],
        [
          [4, 46, 20],
          [6, 47, 21],
        ],
        [
          [8, 44, 20],
          [4, 45, 21],
        ],
        [
          [11, 36, 16],
          [5, 37, 17],
        ],
        [
          [5, 54, 24],
          [7, 55, 25],
        ],
        [
          [15, 43, 19],
          [2, 44, 20],
        ],
        [
          [1, 50, 22],
          [15, 51, 23],
        ],
        [
          [17, 50, 22],
          [1, 51, 23],
        ],
        [
          [17, 47, 21],
          [4, 48, 22],
        ],
        [
          [15, 54, 24],
          [5, 55, 25],
        ],
        [
          [17, 50, 22],
          [6, 51, 23],
        ],
        [
          [7, 54, 24],
          [16, 55, 25],
        ],
        [
          [11, 54, 24],
          [14, 55, 25],
        ],
        [
          [11, 54, 24],
          [16, 55, 25],
        ],
        [
          [7, 54, 24],
          [22, 55, 25],
        ],
        [
          [28, 50, 22],
          [6, 51, 23],
        ],
        [
          [8, 53, 23],
          [26, 54, 24],
        ],
        [
          [4, 54, 24],
          [31, 55, 25],
        ],
        [
          [1, 53, 23],
          [37, 54, 24],
        ],
        [
          [15, 54, 24],
          [25, 55, 25],
        ],
        [
          [42, 54, 24],
          [1, 55, 25],
        ],
        [
          [10, 54, 24],
          [35, 55, 25],
        ],
        [
          [29, 54, 24],
          [19, 55, 25],
        ],
        [
          [44, 54, 24],
          [7, 55, 25],
        ],
        [
          [39, 54, 24],
          [14, 55, 25],
        ],
        [
          [46, 54, 24],
          [10, 55, 25],
        ],
        [
          [49, 54, 24],
          [10, 55, 25],
        ],
        [
          [48, 54, 24],
          [14, 55, 25],
        ],
        [
          [43, 54, 24],
          [22, 55, 25],
        ],
        [
          [34, 54, 24],
          [34, 55, 25],
        ],
      ],
    }[errorCorrection][version - 1];
  }

  // GALOIS FIELD POLYNOMIALS
  static fromGF256Alpha(index) {
    return [
      1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6,
      12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20,
      40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60,
      120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17,
      34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151,
      51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164,
      85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246,
      241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7,
      14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9,
      18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131,
      27, 54, 108, 216, 173, 71, 142,
    ][index];
  }

  static polynomial(size) {
    // cache the polynomials
    if (this.polynomials.length >= size) {
      return this.polynomials[size - 1];
    }
    let polynomial = this.polynomials[this.polynomials.length - 1];
    for (let multiplier = this.polynomials.length; multiplier < size; multiplier++) {
      let factor = new Uint8Array(2);
      factor[1] = multiplier;
      polynomial = this.product(polynomial, factor);
      this.polynomials.push(polynomial);
    }
    return polynomial;
  }

  static product(first, second) {
    let product = new Uint8Array(first.length + second.length - 1);
    first.forEach((firstValue, firstIndex) => {
      second.forEach((secondValue, secondIndex) => {
        let productIndex = firstIndex + secondIndex;
        product[productIndex] = this.fromGF256Alpha((firstValue + secondValue) % 255) ^ product[productIndex];
      });
    });
    return product.map((entry) => this.toGF256Alpha(entry));
  }

  static quotient(dividend, divisor) {
    let quotient = new Uint8Array(dividend.length + divisor.length - 1);
    for (let index = 0; index < dividend.length; index++) quotient[index] = dividend[index];
    for (let dividendIndex = 0; dividendIndex < dividend.length; dividendIndex++) {
      let startEntry = quotient[dividendIndex];
      if (startEntry !== 0) {
        startEntry = this.toGF256Alpha(startEntry);
        divisor.forEach((alpha, divisorIndex) => {
          let quotientIndex = dividendIndex + divisorIndex;
          quotient[quotientIndex] = this.fromGF256Alpha((startEntry + alpha) % 255) ^ quotient[quotientIndex];
        });
      }
    }
    return quotient.slice(quotient.length - divisor.length + 1);
  }

  static toGF256Alpha(index) {
    return [
      0, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105,
      248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125,
      106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16,
      145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72,
      126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243,
      167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184,
      180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252,
      190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164,
      118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90,
      203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232,
      116, 214, 244, 234, 168, 80, 88, 175,
    ][index];
  }

  // MASKS
  static get masks() {
    if (this.maskArray.length === 0) {
      [
        (x, y) => (x + y) % 2 === 0,
        (x, y) => y % 2 === 0,
        (x) => x % 3 === 0,
        (x, y) => (x + y) % 3 === 0,
        (x, y) => ((y - (y % 2)) / 2 + (x - (x % 3)) / 3) % 2 === 0,
        (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
        (x, y) => (x * y + ((x * y) % 3)) % 2 === 0,
        (x, y) => (((x * y) % 3) + x + y) % 2 === 0,
      ].forEach((generator) => {
        const content = [];
        for (let y = 0; y < 12; y++) {
          const row = [];
          for (let x = 0; x < 12; x++) {
            row.push(generator(x, y));
          }
          content.push(row);
        }
        this.maskArray.push(new BooleanMatrix(content));
      });
    }
    return this.maskArray;
  }

  // INSTANCE CREATION
  static for(errorCorrection, version) {
    // cache the instances
    let instance = this.instances[errorCorrection + version];
    if (instance === undefined) {
      const dimension = version * 4 + 17;
      const content = [];
      for (let row = 0; row < dimension; row++) {
        content.push(new Array(dimension).fill(this.AVAILABLE));
      }
      instance = new this(content, errorCorrection, version);
      this.instances[errorCorrection + version] = instance;
    }
    return instance;
  }

  // INSTANCE
  // chunking
  // chunkingOffsets          where each chunk can be found in the data
  // errorCorrection
  // errorCorrectionCapacity  the number of codewords that can be messed up
  //                          (1x for erasure, 2x for miscoding) per chunk
  // version
  constructor(content, errorCorrection, version) {
    super(content);
    this.errorCorrection = errorCorrection;
    this.version = version;
    this.initialize();
  }

  initialize() {
    // calculate misdecodeProtectionCodewords
    let misdecodeProtectionCodewords = 0;
    if (this.errorCorrection === ERROR_CORRECTION.LOW) {
      if (this.version === 1) {
        misdecodeProtectionCodewords = 3;
      } else if (this.version === 2) {
        misdecodeProtectionCodewords = 2;
      } else if (this.version === 3) {
        misdecodeProtectionCodewords = 1;
      }
    } else if (this.version === 1) {
      if (this.errorCorrection === ERROR_CORRECTION.MEDIUM) {
        misdecodeProtectionCodewords = 2;
      } else {
        misdecodeProtectionCodewords = 1;
      }
    }
    // get data and errorCorrection
    this.chunking = this.constructor.chunkingAt(this.errorCorrection, this.version);
    const data = [];
    const errorCorrection = [];
    let dataWidth = 0;
    let errorCorrectionWidth = 0;
    const errorCorrectionCapacity = [];
    const chunkingOffsets = [];
    let chunkingOffset = 0;
    let chunk = 0;
    this.chunking.forEach((arr) => {
      for (let i = 0; i < arr[0]; i++) {
        let byte = 0;
        chunkingOffsets.push(chunkingOffset * 8);
        chunkingOffset += arr[1];
        const dataI = [];
        const numberOfDataCodewords = arr[2];
        for (let j = 0; j < numberOfDataCodewords; j++) {
          dataI.push({ chunk, byte });
          byte++;
        }
        data.push(dataI);
        dataWidth = Math.max(dataWidth, dataI.length);
        const errorCorrectionI = [];
        const numberOfErrorCorrectionCodewords = arr[1] - numberOfDataCodewords;
        for (let j = 0; j < numberOfErrorCorrectionCodewords; j++) {
          errorCorrectionI.push({ chunk, byte });
          byte++;
        }
        errorCorrection.push(errorCorrectionI);
        errorCorrectionWidth = Math.max(errorCorrectionWidth, errorCorrectionI.length);
        errorCorrectionCapacity.push(numberOfErrorCorrectionCodewords - misdecodeProtectionCodewords);
        chunk++;
      }
    });
    this.chunkingOffsets = chunkingOffsets;
    this.errorCorrectionCapacity = errorCorrectionCapacity;
    // combine the data and errorCorrection
    const combined = [];
    for (let column = 0; column < dataWidth; column++) {
      data.forEach((row) => {
        if (row.length > column) combined.push(row[column]);
      });
    }
    for (let column = 0; column < errorCorrectionWidth; column++) {
      errorCorrection.forEach((row) => {
        if (row.length > column) combined.push(row[column]);
      });
    }
    // create the pixels
    const pixels = [];
    combined.forEach((byteAndChunk) => {
      const byte = byteAndChunk.byte;
      const chunk = byteAndChunk.chunk;
      for (let bit = 0; bit < 8; bit++) {
        pixels.push({ chunk, byte, bit });
      }
    });
    // finder patterns & format information
    const dimension = this.width;
    this.fill(0, 0, 9, 9, this.constructor.AVOID);
    this.fill(dimension - 8, 0, 8, 9, this.constructor.AVOID);
    this.fill(0, dimension - 8, 9, 8, this.constructor.AVOID);
    // version information
    if (this.version > 6) {
      this.fill(dimension - 11, 0, 3, 6, this.constructor.AVOID);
      this.fill(0, dimension - 11, 6, 3, this.constructor.AVOID);
    }
    // timing patterns
    this.fill(9, 6, dimension - 17, 1, this.constructor.AVOID);
    this.fill(6, 9, 1, dimension - 17, this.constructor.AVOID);
    // alignment patterns
    for (const position of QRCode$1.alignmentPatternPositions(this.version)) {
      this.fill(position.x, position.y, 5, 5, this.constructor.AVOID);
    }
    // fill the pixels
    let x = dimension - 2;
    let y = dimension;
    pixels.forEach((pixel) => {
      // get next position
      do {
        let shift;
        let halfOdd = ((x - (x % 2)) / 2) % 2 === 1;
        if (x === 6) {
          shift = false;
          x = 5;
        } else if (x < 6) {
          shift = x % 2 === 1;
        } else {
          shift = x % 2 === 0;
        }
        if (shift) {
          x--;
        } else if (halfOdd) {
          if (y === 0) {
            x--;
          } else {
            x++;
            y--;
          }
        } else {
          if (y + 1 === dimension) {
            x--;
          } else {
            x++;
            y++;
          }
        }
      } while (this.at(x, y) === this.constructor.AVOID && x > -1);
      // place the bit
      this.put(x, y, pixel);
    });
  }

  codewordsFor(codewords) {
    let bytePosition = 0;
    const withErrorCorrection = [];
    this.chunking.forEach((arr) => {
      for (let i = 0; i < arr[0]; i++) {
        const data = codewords.slice(bytePosition, bytePosition + arr[2]);
        bytePosition += arr[2];
        const errorCorrection = this.constructor.quotient(data, this.constructor.polynomial(arr[1] - arr[2]));
        withErrorCorrection.push(...data);
        withErrorCorrection.push(...errorCorrection);
      }
    });
    return withErrorCorrection;
  }

  dataFor(codewords) {
    // convert to bits
    const bits = [];
    codewords.forEach((byte) => {
      let remainder = byte;
      [128, 64, 32, 16, 8, 4, 2, 1].forEach((subtract) => {
        if (remainder >= subtract) {
          bits.push(true);
          remainder -= subtract;
        } else {
          bits.push(false);
        }
      });
    });
    this.bits = bits;
    // place bits in matrix
    const dimension = this.content.length;
    const encodedData = BooleanMatrix.withAll(dimension, dimension, false);
    for (let y = 0; y < dimension; y++) {
      for (let x = 0; x < dimension; x++) {
        const pixel = this.at(x, y);
        if (this.isDataPixel(pixel)) {
          encodedData.put(x, y, bits[this.chunkingOffsets[pixel.chunk] + pixel.byte * 8 + pixel.bit]);
        }
      }
    }
    return encodedData;
  }

  isDataPixel(pixel) {
    return pixel !== this.constructor.AVOID && pixel !== this.constructor.AVAILABLE;
  }

  maskedDataFor(data) {
    const dimension = data.height;
    return this.constructor.masks.map((mask) => {
      const masked = BooleanMatrix.withAll(dimension, dimension);
      for (let x = 0; x < dimension; x++) {
        for (let y = 0; y < dimension; y++) {
          let value = data.at(x, y);
          if (this.at(x, y) !== QRCodeMap.AVOID) {
            if (mask.at(x % 12, y % 12)) value = !value;
          }
          masked.put(x, y, value);
        }
      }
      return masked;
    });
  }

  // TESTING
  asIntegerArray() {
    return this.content.map((row) => {
      let integer = 0;
      row.forEach((pixel) => {
        integer *= 2;
        if (this.isDataPixel(pixel)) integer++;
      });
      return integer;
    });
  }
}
// static variables
QRCodeMap.AVAILABLE = 'available';
QRCodeMap.AVOID = 'avoid';
QRCodeMap.GENERATOR_FUNCTIONS = [
  (x, y) => (x + y) % 2 === 0,
  (x, y) => y % 2 === 0,
  (x) => x % 3 === 0,
  (x, y) => (x + y) % 3 === 0,
  (x, y) => ((y - (y % 2)) / 2 + (x - (x % 3)) / 3) % 2 === 0,
  (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
  (x, y) => (x * y + ((x * y) % 3)) % 2 === 0,
  (x, y) => (((x * y) % 3) + x + y) % 2 === 0,
];
QRCodeMap.instances = {};
QRCodeMap.maskArray = [];
QRCodeMap.polynomials = [new Uint8Array(2)];

/**
 * CLASS QRCode
 * This represents an encoded QRCode based on the following:
 *   content         the string to encode
 *   options         an object with the options, such as the ECI integer and errorCorrection
 * An encoder generates the following:
 *   data            the BooleanMatrix of mapped data, along with the format and version information
 *   eci             (see above)
 *   encoding        'NUMERIC' | 'ALPHANUMERIC' | 'KANJI' | BYTE
 *   errorCorrection (see above)
 *   version         the QRCode version from 1 to 40.
 * It also provides pattern positions and derivative information.
 */
class QRCode$1 {
  static alignmentPatternPositions(version) {
    let locations = ALIGNMENT_PATTERN_LOCATIONS[version - 1];
    if (locations.length === 0) return [];
    const positions = [];
    // top and left
    const first = locations[0];
    locations.slice(1, locations.length - 1).forEach((location) => {
      positions.push({
        x: first,
        y: location,
      });
      positions.push({
        x: location,
        y: first,
      });
    });
    // others
    locations = locations.slice(1);
    locations.forEach((y) => {
      locations.forEach((x) => {
        positions.push({ x, y });
      });
    });
    return positions;
  }

  static finderPatternPositions(version) {
    const far = 4 * version + 10;
    return [
      { x: 0, y: 0 },
      { x: 0, y: far },
      { x: far, y: 0 },
    ];
  }

  static timingPatternPositions(version) {
    const positions = [];
    const far = 4 * version + 9;
    for (let position = 8; position < far; position += 2) {
      positions.push({ x: position, y: 6 });
      positions.push({ x: 6, y: position });
    }
    return positions;
  }

  constructor(content, options) {
    if (content === undefined || content.length === 0) throw 'no content to encode';
    this.content = content;
    this.options = options || {};
    if ('eci' in this.options) this.eci = this.options.eci;
    if ('errorCorrection' in this.options) this.errorCorrection = this.options.errorCorrection;
  }

  get alignmentPatternPositions() {
    return this.constructor.alignmentPatternPositions(this.version);
  }

  get dimension() {
    return this.version * 4 + 17;
  }

  get encoding() {
    return this._encoding;
  }

  set encoding(string) {
    this._encoding = string;
  }

  get finderPatternPositions() {
    return this.constructor.finderPatternPositions(this.version);
  }

  get hasEci() {
    return this.eci !== undefined && this.eci !== 3;
  }

  get hasAlignmentPattern() {
    return this.version > 1;
  }

  get timingPatternPositions() {
    return this.constructor.timingPatternPositions(this.version);
  }
}
// static variables
QRCode$1.MAX_VERSION = 40;

/**
 * CLASS QRCodeEncoder
 * This class does the encoding work for the QRCode class, hiding the algorithmic details and
 * intermediate step data. It populates the QRCode with encoding, version, errorCorrection, and data.
 * It is only exported to be used in tests.
 */
class QRCodeEncoder$1 {
  constructor(contents, options) {
    this.code = new QRCode$1(contents, options);
    this.encode();
  }

  encode() {
    this.initializeEncoding();
    this.initializeVersion();
    this.initializeCodewords();
    this.initializeMapping();
    this.initializeMasking();
  }

  initializeCodewords() {
    const writer = new BitWriter(DATA_CAPACITY[this.code.errorCorrection][this.code.version - 1]);
    switch (this.code.encoding) {
      case ENCODING.NUMERIC:
        // mode
        writer.nextPutBits(1, 4);
        // number of bits
        if (this.code.version < 10) {
          writer.nextPutBits(this.length, 10);
        } else if (this.code.version < 27) {
          writer.nextPutBits(this.length, 12);
        } else {
          writer.nextPutBits(this.length, 14);
        }
        // content
        writer.nextPutNumeric(this.code.content);
        break;
      case ENCODING.ALPHANUMERIC:
        // mode
        writer.nextPutBits(2, 4);
        // number of bits
        if (this.code.version < 10) {
          writer.nextPutBits(this.length, 9);
        } else if (this.code.version < 27) {
          writer.nextPutBits(this.length, 11);
        } else {
          writer.nextPutBits(this.length, 13);
        }
        // content
        writer.nextPutAlphaNUMERIC(this.code.content);
        break;
      case ENCODING.KANJI:
        // mode
        writer.nextPutBits(8, 8);
        // number of bits
        if (this.code.version < 10) {
          writer.nextPutBits(this.length, 8);
        } else if (this.code.version < 27) {
          writer.nextPutBits(this.length, 10);
        } else {
          writer.nextPutBits(this.length, 12);
        }
        // content
        writer.nextPutKanji(this.code.content);
        break;
      case ENCODING.BYTE:
        if (this.code.hasEci) {
          // specife ECI mode
          writer.nextPutBits(7, 4);
          // Add the ECI assignment number
          if (this.code.eci < 128) {
            writer.nextPutBits(0, 1);
            writer.nextPutBits(this.code.eci, 7);
          } else if (this.code.eci < 16384) {
            writer.nextPutBits(2, 2);
            writer.nextPutBits(this.code.eci, 14);
          } else {
            writer.nextPutBits(6, 3);
            writer.nextPutBits(this.code.eci, 21);
          }
        }
        // mode
        writer.nextPutBits(4, 4);
        // number of bits
        if (this.code.version < 10) {
          writer.nextPutBits(this.length, 8);
        } else {
          writer.nextPutBits(this.length, 16);
        }
        // content
        writer.nextPutByte(this.bytes);
        break;
    }
    // Terminate the sequence / Skip to next byte for error correction
    if (writer.bitsLeft > 3) writer.nextPutBits(0, 4);
    // Add error correction sequence, alternating between 11101100 and 00010001
    const bytesLeft = writer.bytesLeft;
    for (let index = 0; index < bytesLeft; index++) {
      writer.nextPutCompleteByte(index % 2 === 0 ? 236 : 17);
    }
    this.codewords = writer.content;
  }

  initializeEncoding() {
    if (this.code.hasEci) {
      this.code.encoding = ENCODING.BYTE;
      if (this.code.eci === 3) {
        // jis
        this.length = this.code.content.length;
        this.bytes = [];
        for (let i = 0; i < length; i++) {
          this.bytes.push(this.code.content.charCodeAt(i) % 128);
        }
      } else if (this.code.eci === 25) {
        // utf-16be
        this.bytes = this.toUtf16Bytes(this.code.content);
        this.length = this.bytes.length;
      } else if (this.code.eci === 26) {
        // utf-8
        this.bytes = this.toUtf8Bytes(this.code.content);
        this.length = this.bytes.length;
      } else {
        this.length = this.code.content.length;
        this.bytes = [];
        for (let i = 0; i < length; i++) {
          this.bytes.push(this.code.content.charCodeAt(i) % 256);
        }
      }
    } else if (/^\d*$/.test(this.code.content)) {
      this.code.encoding = ENCODING.NUMERIC;
      this.length = this.code.content.length;
    } else if (/^[A-Z\d\dA-Z $%*+-./:]+$/.test(this.code.content)) {
      this.code.encoding = ENCODING.ALPHANUMERIC;
      this.length = this.code.content.length;
    } else if (/^[\u8140-\u9ffc\ue040-\uebbf]+$/.test(this.code.content)) {
      this.code.encoding = ENCODING.KANJI;
      this.length = this.code.content.length;
    } else {
      this.code.encoding = ENCODING.BYTE;
      this.bytes = this.toUtf8Bytes(this.code.content);
      this.length = this.bytes.length;
      // use utf-8 encoding if it is needed, jis if that is sufficient
      this.code.eci = this.length === this.code.content.length ? 3 : 26;
    }
  }

  initializeMapping() {
    this.map = QRCodeMap.for(this.code.errorCorrection, this.code.version);
    this.mapCodewords = this.map.codewordsFor(this.codewords);
    this.mapData = this.map.dataFor(this.mapCodewords);
  }

  initializeMasking() {
    // Get the masked choices
    const choices = this.map.maskedDataFor(this.mapData);
    // Find the one with the lowest penalty
    let data;
    let dataIndex;
    let lowestPenalty = 1000000;
    choices.forEach((matrix, index) => {
      const penalty = this.penaltyForMatrix(matrix);
      if (penalty < lowestPenalty) {
        lowestPenalty = penalty;
        data = matrix;
        dataIndex = index;
      }
    });
    this.lowestPenalty = lowestPenalty;
    // Generate the format information
    let format = [1, 0, 3, 2][this.errorCorrections.indexOf(this.code.errorCorrection)];
    format = (8 * format + dataIndex) * 1024;
    let errorCorrection = format;
    for (let i = 14; i >= 10; i--) {
      if (errorCorrection >= Math.pow(2, i)) {
        errorCorrection = (Math.pow(2, i - 10) * 1335) ^ errorCorrection;
      }
    }
    format = (format + errorCorrection) ^ 21522;
    // Place the format information
    const dimension = this.code.dimension;
    [
      [8, 0, dimension - 1, 8],
      [8, 1, dimension - 2, 8],
      [8, 2, dimension - 3, 8],
      [8, 3, dimension - 4, 8],
      [8, 4, dimension - 5, 8],
      [8, 5, dimension - 6, 8],
      [8, 7, dimension - 7, 8],
      [8, 8, dimension - 8, 8],
      [7, 8, 8, dimension - 7],
      [5, 8, 8, dimension - 6],
      [4, 8, 8, dimension - 5],
      [3, 8, 8, dimension - 4],
      [2, 8, 8, dimension - 3],
      [1, 8, 8, dimension - 2],
      [0, 8, 8, dimension - 1],
    ].forEach((arr, index) => {
      if ((Math.pow(2, index) & format) > 0) {
        data.put(arr[0], arr[1], true);
        data.put(arr[2], arr[3], true);
      }
    });
    // Add dark module
    data.put(8, dimension - 8, true);
    // Version information
    if (this.code.version > 6) {
      // Generate the bitVersion information
      let bitVersion = this.code.version * 4096;
      errorCorrection = bitVersion;
      for (let i = 17; i >= 12; i--) {
        if (errorCorrection >= Math.pow(2, i)) {
          errorCorrection = (Math.pow(2, i - 12) * 7973) ^ errorCorrection;
        }
      }
      bitVersion += errorCorrection;
      // Place the bitVersion information
      let count = 0;
      for (let x = 0; x < 6; x++) {
        for (let y = dimension - 11; y <= dimension - 9; y++) {
          if ((Math.pow(2, count) & bitVersion) > 0) {
            data.put(x, y, true);
            data.put(y, x, true);
          }
          count++;
        }
      }
    }
    // finalize loading of QRCode
    this.code.data = data;
  }

  initializeVersion() {
    if (this.errorCorrections.includes(this.code.errorCorrection)) {
      // Error correction has already been specified
      let version = this.versionForLength(this.length, this.code.errorCorrection);
      if (version > QRCode$1.MAX_VERSION)
        throw 'This content is too long to be encoded for the specified error correction.';
      this.code.version = version;
    } else {
      // Choose the error correction that gets the smallest size but the highest error correction
      let versions = this.errorCorrections.map((errorCorrection) =>
        this.versionForLength(this.length, errorCorrection)
      );
      let version = versions[0];
      if (version > QRCode$1.MAX_VERSION) throw 'This string is too long to be encoded.';
      this.code.version = version;
      for (let index = 3; index >= 0; index--) {
        if (versions[index] === version) {
          this.code.errorCorrection = this.errorCorrections[index];
          return;
        }
      }
    }
  }

  capacity(encoding, errorCorrection) {
    return {
      NUMERIC: {
        LOW: [
          41, 77, 127, 187, 255, 322, 370, 461, 552, 652, 772, 883, 1022, 1101, 1250, 1408, 1548, 1725, 1903, 2061,
          2232, 2409, 2620, 2812, 3057, 3283, 3517, 3669, 3909, 4158, 4417, 4686, 4965, 5253, 5529, 5836, 6153, 6479,
          6743, 7089,
        ],
        MEDIUM: [
          34, 63, 101, 149, 202, 255, 293, 365, 432, 513, 604, 691, 796, 871, 991, 1082, 1212, 1346, 1500, 1600, 1708,
          1872, 2059, 2188, 2395, 2544, 2701, 2857, 3035, 3289, 3486, 3693, 3909, 4134, 4343, 4588, 4775, 5039, 5313,
          5596,
        ],
        QUARTER: [
          27, 48, 77, 111, 144, 178, 207, 259, 312, 364, 427, 489, 580, 621, 703, 775, 876, 948, 1063, 1159, 1224, 1358,
          1468, 1588, 1718, 1804, 1933, 2085, 2181, 2358, 2473, 2670, 2805, 2949, 3081, 3244, 3417, 3599, 3791, 3993,
        ],
        HIGH: [
          17, 34, 58, 82, 106, 139, 154, 202, 235, 288, 331, 374, 427, 468, 530, 602, 674, 746, 813, 919, 969, 1056,
          1108, 1228, 1286, 1425, 1501, 1581, 1677, 1782, 1897, 2022, 2157, 2301, 2361, 2524, 2625, 2735, 2927, 3057,
        ],
      },
      ALPHANUMERIC: {
        LOW: [
          25, 47, 77, 114, 154, 195, 224, 279, 335, 395, 468, 535, 619, 667, 758, 854, 938, 1046, 1153, 1249, 1352,
          1460, 1588, 1704, 1853, 1990, 2132, 2223, 2369, 2520, 2677, 2840, 3009, 3183, 3351, 3537, 3729, 3927, 4087,
          4296,
        ],
        MEDIUM: [
          20, 38, 61, 90, 122, 154, 178, 221, 262, 311, 366, 419, 483, 528, 600, 656, 734, 816, 909, 970, 1035, 1134,
          1248, 1326, 1451, 1542, 1637, 1732, 1839, 1994, 2113, 2238, 2369, 2506, 2632, 2780, 2894, 3054, 3220, 3391,
        ],
        QUARTER: [
          16, 29, 47, 67, 87, 108, 125, 157, 189, 221, 259, 296, 352, 376, 426, 470, 531, 574, 644, 702, 742, 823, 890,
          963, 1041, 1094, 1172, 1263, 1322, 1429, 1499, 1618, 1700, 1787, 1867, 1966, 2071, 2181, 2298, 2420,
        ],
        HIGH: [
          10, 20, 35, 50, 64, 84, 93, 122, 143, 174, 200, 227, 259, 283, 321, 365, 408, 452, 493, 557, 587, 640, 672,
          744, 779, 864, 910, 958, 1016, 1080, 1150, 1226, 1307, 1394, 1431, 1530, 1591, 1658, 1774, 1852,
        ],
      },
      KANJI: {
        LOW: [
          10, 20, 32, 48, 65, 82, 95, 118, 141, 167, 198, 226, 262, 282, 320, 361, 397, 442, 488, 528, 572, 618, 672,
          721, 784, 842, 902, 940, 1002, 1066, 1132, 1201, 1273, 1347, 1417, 1496, 1577, 1661, 1729, 1817,
        ],
        MEDIUM: [
          8, 16, 26, 38, 52, 65, 75, 93, 111, 131, 155, 177, 204, 223, 254, 277, 310, 345, 384, 410, 438, 480, 528, 561,
          614, 652, 692, 732, 778, 843, 894, 947, 1002, 1060, 1113, 1176, 1224, 1292, 1362, 1435,
        ],
        QUARTER: [
          7, 12, 20, 28, 37, 45, 53, 66, 80, 93, 109, 125, 149, 159, 180, 198, 224, 243, 272, 297, 314, 348, 376, 407,
          440, 462, 496, 534, 559, 604, 634, 684, 719, 756, 790, 832, 876, 923, 972, 1024,
        ],
        HIGH: [
          4, 8, 15, 21, 27, 36, 39, 52, 60, 74, 85, 96, 109, 120, 136, 154, 173, 191, 208, 235, 248, 270, 284, 315, 330,
          365, 385, 405, 430, 457, 486, 518, 553, 590, 605, 647, 673, 701, 750, 784,
        ],
      },
      BYTE: {
        LOW: [
          17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858, 929, 1003,
          1091, 1171, 1273, 1367, 1465, 1528, 1628, 1732, 1840, 1952, 2068, 2188, 2303, 2431, 2563, 2699, 2809, 2953,
        ],
        MEDIUM: [
          14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666, 711, 779, 857,
          911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989, 2099, 2213, 2331,
        ],
        QUARTER: [
          11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482, 509, 565, 611,
          661, 715, 751, 805, 868, 908, 982, 1030, 1112, 1168, 1228, 1283, 1351, 1423, 1499, 1579, 1663,
        ],
        HIGH: [
          7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382, 403, 439, 461, 511,
          535, 593, 625, 658, 698, 742, 790, 842, 898, 958, 983, 1051, 1093, 1139, 1219, 1273,
        ],
      },
    }[encoding][errorCorrection];
  }

  get errorCorrections() {
    return [ERROR_CORRECTION.LOW, ERROR_CORRECTION.MEDIUM, ERROR_CORRECTION.QUARTER, ERROR_CORRECTION.HIGH];
  }

  penaltyForMatrix(matrix) {
    /*
      Return the penalty score for the symbol, according to the following criteria:
      Penalty 1: A penalty (n-2) for each group of five or more same-colored modules in a row (or column)
      Penalty 2: A penalty (3) for each 2x2 area of same-colored modules
      Penalty 3: A penalty (40) if there are patterns that look similar to the finder patterns
      Penalty 4: A penalty based on the percentage of tiles that are black / white
    */
    let penalty = 0;
    const dimension = matrix.content.length;
    let current, last, run, runTest, finderPattern;
    for (let y = 0; y < dimension - 1; y++) {
      current = matrix.bitAt(0, y);
      last = current;
      run = 1;
      runTest = current;
      finderPattern = current;
      for (let x = 1; x < 10; x++) {
        current = matrix.bitAt(x, y);
        if (last === current) {
          if (matrix.bitAt(x, y + 1) === last && matrix.bitAt(x - 1, y + 1) === last) penalty += 3;
        } else {
          last = current;
        }
        if (runTest === current) {
          run++;
        } else {
          if (run > 4) penalty += run - 2;
          run = 1;
          runTest = current;
        }
        finderPattern = finderPattern * 2 + current;
      }
      for (let x = 10; x < dimension; x++) {
        current = matrix.bitAt(x, y);
        if (last === current) {
          if (matrix.bitAt(x, y + 1) === last && matrix.bitAt(x - 1, y + 1) === last) penalty += 3;
        } else {
          last = current;
        }
        if (runTest === current) {
          run++;
        } else {
          if (run > 4) penalty += run - 2;
          run = 1;
          runTest = current;
        }
        finderPattern = (finderPattern * 2 + current) % 2048;
        if (finderPattern === 1488 || finderPattern === 93) penalty += 40;
      }
      if (run > 4) penalty += run - 2;
    }
    // Process the last row without Penalty 2
    let lastY = dimension - 1;
    current = matrix.bitAt(0, lastY);
    run = 1;
    runTest = current;
    finderPattern = current;
    for (let x = 1; x < 10; x++) {
      current = matrix.bitAt(x, lastY);
      if (runTest === current) {
        run++;
      } else {
        if (run > 4) penalty += run - 2;
        run = 1;
        runTest = current;
      }
      finderPattern = finderPattern * 2 + current;
    }
    for (let x = 10; x < dimension; x++) {
      current = matrix.bitAt(x, lastY);
      if (runTest === current) {
        run++;
      } else {
        if (run > 4) penalty += run - 2;
        run = 1;
        runTest = current;
      }
      finderPattern = (finderPattern * 2 + current) % 2048;
      if (finderPattern === 1488 || finderPattern === 93) penalty += 40;
    }
    if (run > 4) penalty += run - 2;
    // Penalty 4
    let count = 0;
    for (let x = 0; x < dimension; x++) {
      current = matrix.bitAt(x, 0);
      count += current;
      run = 1;
      runTest = current;
      finderPattern = current;
      for (let y = 1; y < 10; y++) {
        current = matrix.bitAt(x, y);
        count += current;
        if (runTest === current) {
          run++;
        } else {
          if (run > 4) penalty += run - 2;
          run = 1;
          runTest = current;
        }
        finderPattern = finderPattern * 2 + current;
      }
      for (let y = 10; y < dimension; y++) {
        current = matrix.bitAt(x, y);
        count += current;
        if (runTest === current) {
          run++;
        } else {
          if (run > 4) penalty += run - 2;
          run = 1;
          runTest = current;
        }
        finderPattern = (finderPattern * 2 + current) % 2048;
        if (finderPattern === 1488 || finderPattern === 93) penalty += 40;
      }
      if (run > 4) penalty += run - 2;
    }
    penalty += Math.floor(Math.abs(count / (dimension * dimension) - 0.5) * 10);
    return penalty;
  }

  toUtf16Bytes(string) {
    const bytes = [];
    for (let i = 0; i < string.length; i++) {
      let code = string.charCodeAt(i);
      let remainder = code % 256;
      let quotient = (code - remainder) / 256;
      bytes.push(quotient);
      bytes.push(remainder);
    }
    return bytes;
  }

  toUtf8Bytes(string) {
    const bytes = [];
    let position = 0;
    for (let i = 0; i < string.length; i++) {
      let code = string.charCodeAt(i);
      if (code < 128) {
        bytes[position++] = code;
      } else if (code < 2048) {
        bytes[position++] = (code >> 6) | 192;
        bytes[position++] = (code & 63) | 128;
      } else if ((code & 0xfc00) == 0xd800 && i + 1 < string.length && (string.charCodeAt(i + 1) & 0xfc00) == 0xdc00) {
        // Surrogate Pair
        code = 0x10000 + ((code & 0x03ff) << 10) + (string.charCodeAt(++i) & 0x03ff);
        bytes[position++] = (code >> 18) | 240;
        bytes[position++] = ((code >> 12) & 63) | 128;
        bytes[position++] = ((code >> 6) & 63) | 128;
        bytes[position++] = (code & 63) | 128;
      } else {
        bytes[position++] = (code >> 12) | 224;
        bytes[position++] = ((code >> 6) & 63) | 128;
        bytes[position++] = (code & 63) | 128;
      }
    }
    return bytes;
  }

  versionForLength(length, errorCorrection) {
    let capacity;
    if (this.code.hasEci) {
      capacity = DATA_CAPACITY[errorCorrection];
    } else {
      capacity = this.capacity(this.code.encoding, errorCorrection);
    }
    let index = capacity.findIndex((allows) => allows >= length);
    if (index === -1) return 100;
    return index + 1;
  }
}

var qrcode = {
  ENCODING,
  ERROR_CORRECTION,
  BitWriter,
  Matrix: Matrix$1,
  BooleanMatrix,
  QRCodeMap,
  QRCode: QRCode$1,
  QRCodeEncoder: QRCodeEncoder$1,
};

const { QRCode, QRCodeEncoder } = qrcode;

/**
 * CLASS SquareQRCodeEncoder
 * While it can render an SVG, it mainly provides a base encoder for MarketQRCodeEncoder and EmbedQRCodeEncoder.
 * It adds these features to QRCodeEncoder:
 *   - svg rendering using the Turtle to edge trace data
 *   - hooks for adjusting the data for turtle rendering
 *   - using lowestPenalty calculation to make sure the code can be read
 *   - some base methods for SVG rendering
 * The following options can be specified:
 *   border          boolean (default false) whether to add a 4-pixel quiet zone
 *   invert          boolean (default false) light data on dark background when on
 *   styleBackground string to override style inserted in SVG background rectangle
 *   styleForeground string to override style inserted in SVG foreground data and patterns
 */
class SquareQRCodeEncoder$1 extends QRCodeEncoder {
  encode() {
    this.initializeEncoding();
    for (const errorCorrection of this.errorCorrections) {
      this.code.errorCorrection = errorCorrection;
      this.initializeVersion();
      if (this.code.version < this.minimumVersion) continue;
      this.initializeCodewords();
      this.initializeMapping();
      this.initializeMasking();
      if (this.lowestPenalty < this.constructor.PENALTY_FOR_NEGATIVE_CAPACITY) {
        this.initializeTurtleData();
        this.initializeSvg();
        return;
      }
    }
    // go up in version, keep H errorCorrection
    const start = Math.max(this.minimumVersion, this.code.version + 1);
    for (let version = start; version <= QRCode.MAX_VERSION; version++) {
      this.code.version = version;
      this.initializeCodewords();
      this.initializeMapping();
      this.initializeMasking();
      if (this.lowestPenalty < this.constructor.PENALTY_FOR_NEGATIVE_CAPACITY) {
        this.initializeTurtleData();
        this.initializeSvg();
        return;
      }
    }
  }

  initializeSvg() {
    const offset = this.svgOffset;
    const dimension = this.svgDimension;
    const foregroundStyle = this.svgForegroundStyle;
    const backgroundStyle = this.svgBackgroundStyle;
    const source = [];
    source.push(this.svgTag(dimension));
    source.push('<defs>');
    source.push(this.svgFinderPattern(foregroundStyle));
    source.push('</defs>');
    source.push(this.svgBackground(backgroundStyle, dimension, offset === 0 ? undefined : offset / 2));
    this.svgFinderPatterns(source, offset);
    this.svgTurtle(source, foregroundStyle, offset);
    source.push('</svg>');
    this.svg = source.join('');
  }

  initializeTurtleData() {
    // add timing and alignment patterns as data
    const data = this.code.data.copy();
    for (const point of this.code.timingPatternPositions) {
      data.put(point.x, point.y, true);
    }
    for (const point of this.code.alignmentPatternPositions) {
      data.fillAlignmentPatternAt(point.x, point.y);
    }
    this.turtleData = data;
  }

  get inverted() {
    const inverted = this.code.options.invert;
    if (inverted === undefined) return false;
    return inverted;
  }

  get hasBorder() {
    const hasBorder = this.code.options.border;
    if (hasBorder === undefined) return false;
    return hasBorder;
  }

  get minimumVersion() {
    return 1;
  }

  async png() {
    if (this._png !== undefined) return this._png;
    if (this.svg === undefined) throw 'no SVG to convert to PNG';
    const image = new Image();
    const imageBlob = new Blob([this.svg], { type: 'image/svg+xml;charset=utf-8' });
    image.src = URL.createObjectURL(imageBlob);
    await image.decode();
    const dimension = this.svgDimension;
    const canvas = document.createElement('canvas');
    canvas.width = dimension;
    canvas.height = dimension;
    canvas.getContext('2d').drawImage(image, 0, 0, dimension, dimension);
    this._png = canvas.toDataURL();
    return this._png;
  }

  svgBackground(style, dimension, cornerRadius) {
    if (style === '') return '';
    return cornerRadius === undefined
      ? `<rect ${style} x="0" y="0" width="${dimension}" height="${dimension}" />`
      : `<rect ${style} x="0" y="0" width="${dimension}" height="${dimension}" rx="${cornerRadius}" ry="${cornerRadius}" />`;
  }

  get svgBackgroundStyle() {
    const fromOptions = this.code.options.styleBackground;
    if (fromOptions !== undefined) return fromOptions;
    return this.inverted ? 'fill="black"' : 'fill="white"';
  }

  get svgDimension() {
    return 2 * this.svgOffset + 8 * this.code.dimension;
  }

  svgFinderPattern(style) {
    return `<path id="f" ${style} fill-rule="evenodd" d="M 0 10 a10,10 0 0 1 10,-10 h36 a10,10 0 0 1 10,10 v36 a10,10 0 0 1 -10,10 h-36 a10,10 0 0 1 -10,-10 Z M 8 10 a2,2 0 0 1 2,-2 h36 a2,2 0 0 1 2,2 v36 a2,2 0 0 1 -2,2 h-36 a2,2 0 0 1 -2,-2 Z M 16 18 a2,2 0 0 1 2,-2 h20 a2,2 0 0 1 2,2 v20 a2,2 0 0 1 -2,2 h-20 a2,2 0 0 1 -2,-2 Z" />`;
  }

  svgFinderPatterns(source, offset) {
    for (const point of this.code.finderPatternPositions) {
      source.push(`<use xlink:href="#f" x="${point.x * 8 + offset}" y="${point.y * 8 + offset}" />`);
    }
  }

  get svgForegroundStyle() {
    const fromOptions = this.code.options.styleForeground;
    if (fromOptions !== undefined) return fromOptions;
    return this.inverted ? 'fill="white"' : 'fill="black"';
  }

  get svgOffset() {
    return this.hasBorder ? 32 : 0;
  }

  svgTag(dimension) {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${dimension}" height="${dimension}" viewBox="0 0 ${dimension} ${dimension}">`;
  }

  svgTurtle(source, style, offset) {
    const dimension = this.code.dimension;
    for (let y = 0; y < dimension; y++) {
      for (let x = 0; x < dimension; x++) {
        if (this.turtleData.at(x, y)) {
          source.push(new Turtle(this.turtleData, style, offset, x, y).element);
        }
      }
    }
  }
}
// static variables
SquareQRCodeEncoder$1.PENALTY_FOR_LEFTOVER_CAPACITY = [32, 16, 8, 4, 2, 1];
SquareQRCodeEncoder$1.PENALTY_FOR_NEGATIVE_CAPACITY = 10000;

/**
 * CLASS Turtle
 * This is used to draw a path at a point, drawing both the outline and any cutouts.
 *   data            the BooleanMatrix of encoded data, along with the format and version information
 *   style           injected into the SVG element
 *   offset          how many SVG pixels to offset the topleft corner
 *   x               the x coordinate of the pixel to start from
 *   y               the y coordinate of the pixel to start from
 * It is only exported to be used in tests.
 */
class Turtle {
  constructor(data, style, offset, x, y) {
    this.data = data;
    this.dimension = data.width;
    this.style = style || '';
    this.offset = offset || 0;
    this.start = { x, y };
    this.visitedLocations = new Set();
    this.generateElement();
    this.clearVisited();
  }

  clearVisited() {
    this.visitedLocations.forEach((location) => {
      const point = this.fromLocation(location);
      this.data.put(point.x, point.y, false);
    });
  }

  get element() {
    return this._element;
  }

  fromLocation(location) {
    const x = location % this.dimension;
    const y = (location - x) / this.dimension;
    return { x, y };
  }

  generateElement() {
    // build outside edges
    const startX = this.start.x;
    const startY = this.start.y;
    const startEdge = 'left';
    let x = startX;
    let y = startY;
    const outsideEdges = [];
    outsideEdges.push(startEdge);
    let edge = 'top';
    const tops = new Set();
    const rights = new Set();
    const bottoms = new Set();
    const lefts = new Set();
    lefts.add(this.toLocation(x, y));
    while (!(x === startX && y === startY && edge === startEdge)) {
      outsideEdges.push(edge);
      const location = this.toLocation(x, y);
      this.visitLocation(location);
      switch (edge) {
        case 'top':
          tops.add(location);
          if (!this.hasPixelAtCoordinate(x + 1, y)) {
            edge = 'right';
          } else if (this.hasPixelAtCoordinate(x + 1, y - 1)) {
            x += 1;
            y -= 1;
            edge = 'left';
          } else {
            x += 1;
          }
          break;
        case 'right':
          rights.add(location);
          if (!this.hasPixelAtCoordinate(x, y + 1)) {
            edge = 'bottom';
          } else if (this.hasPixelAtCoordinate(x + 1, y + 1)) {
            x += 1;
            y += 1;
            edge = 'top';
          } else {
            y += 1;
          }
          break;
        case 'bottom':
          bottoms.add(location);
          if (!this.hasPixelAtCoordinate(x - 1, y)) {
            edge = 'left';
          } else if (this.hasPixelAtCoordinate(x - 1, y + 1)) {
            x -= 1;
            y += 1;
            edge = 'right';
          } else {
            x -= 1;
          }
          break;
        case 'left':
          lefts.add(location);
          if (!this.hasPixelAtCoordinate(x, y - 1)) {
            edge = 'top';
          } else if (this.hasPixelAtCoordinate(x - 1, y - 1)) {
            x -= 1;
            y -= 1;
            edge = 'bottom';
          } else {
            y -= 1;
          }
          break;
      }
    }
    // render outside edges
    if (outsideEdges.length === 4) {
      // if it only a single pixel, just make it a rectangle
      this._element = `<rect ${this.style} x="${startX * 8 + this.offset}" y="${
        startY * 8 + this.offset
      }" width="8" height="8" rx="2" ry="2" />`;
      return;
    }
    let d = [];
    d.push(`M${startX * 8 + this.offset + 1} ${startY * 8 + this.offset + 4}`);
    let next = outsideEdges[0];
    outsideEdges.push(next);
    let now;
    let length = 0;
    for (let i = 1; i < outsideEdges.length; i++) {
      now = next;
      next = outsideEdges[i];
      if (now === next) {
        length += 8;
      } else if (now === 'top' && next === 'right') {
        if (length !== 0) {
          d.push(`h${length}`);
          length = 0;
        }
        d.push('a3,3 0 0 1 3,3');
      } else if (now === 'right' && next === 'bottom') {
        if (length !== 0) {
          d.push(`v${length}`);
          length = 0;
        }
        d.push('a3,3 0 0 1 -3,3');
      } else if (now === 'bottom' && next === 'left') {
        if (length !== 0) {
          d.push(`h-${length}`);
          length = 0;
        }
        d.push('a3,3 0 0 1 -3,-3');
      } else if (now === 'left' && next === 'top') {
        if (length !== 0) {
          d.push(`v-${length}`);
          length = 0;
        }
        d.push('a3,3 0 0 1 3,-3');
      } else if (now === 'top' && next === 'left') {
        d.push(`h${length + 5}`);
        length = 5;
      } else if (now === 'right' && next === 'top') {
        d.push(`v${length + 5}`);
        length = 5;
      } else if (now === 'bottom' && next === 'right') {
        d.push(`h-${length + 5}`);
        length = 5;
      } else if (now === 'left' && next === 'bottom') {
        d.push(`v-${length + 5}`);
        length = 5;
      }
    }
    if (length > 0) d.push(`v-${length}`);
    d.push('z');
    // determine the interior pixels
    let interior = new Set();
    let process = new Set();
    this.visitedLocations.forEach((location) => {
      if (!tops.has(location)) process.add(location - this.dimension);
      if (!lefts.has(location)) process.add(location - 1);
      if (!bottoms.has(location)) process.add(location + this.dimension);
      if (!rights.has(location)) process.add(location + 1);
    });
    process = [...process].filter((location) => !this.hasVisitedLocation(location));
    while (process.length > 0) {
      let fanOutFrom = [];
      process.forEach((location) => {
        if (this.hasPixelAtLocation(location)) {
          this.visitLocation(location);
          fanOutFrom.push(location);
        } else {
          interior.add(location);
        }
      });
      process = new Set();
      fanOutFrom.forEach((location) => {
        process.add(location - this.dimension);
        process.add(location + this.dimension);
        process.add(location + 1);
        process.add(location - 1);
      });
      process = [...process].filter((location) => !this.hasVisitedLocation(location));
    }
    while (interior.size > 0) {
      // determine and move to the top right
      let topRight, topRightX, topRightY;
      interior.forEach((location) => {
        x = location % this.dimension;
        y = (location - x) / this.dimension;
        if (topRight === undefined || y < topRightY || (y === topRightY && x > topRightX)) {
          topRight = location;
          topRightX = x;
          topRightY = y;
        }
      });
      d.push(`M${topRightX * 8 + this.offset + 9} ${topRightY * 8 + this.offset - 1}`);
      // move counterclockwise to remove interior
      x = topRightX;
      y = topRightY;
      edge = 'top';
      let distance = 5;
      while (!(x === topRightX && y === topRightY && edge === 'right')) {
        const location = this.toLocation(x, y);
        interior.delete(location);
        switch (edge) {
          case 'top':
            if (!this.hasPixelAtCoordinate(x - 1, y - 1)) {
              if (distance > 0) d.push(`h-${distance}`);
              d.push('a3,3 0 0 1 -3,-3');
              distance = 0;
              edge = 'right';
              x--;
              y--;
            } else if (!this.hasPixelAtCoordinate(x - 1, y)) {
              distance += 8;
              x--;
            } else {
              d.push(`h-${distance + 5}`);
              distance = 5;
              edge = 'left';
            }
            break;
          case 'left':
            if (!this.hasPixelAtCoordinate(x - 1, y + 1)) {
              if (distance > 0) d.push(`v${distance}`);
              d.push('a3,3 0 0 1 -3,3');
              distance = 0;
              edge = 'top';
              x--;
              y++;
            } else if (!this.hasPixelAtCoordinate(x, y + 1)) {
              distance += 8;
              y++;
            } else {
              d.push(`v${distance + 5}`);
              distance = 5;
              edge = 'bottom';
            }
            break;
          case 'bottom':
            if (!this.hasPixelAtCoordinate(x + 1, y + 1)) {
              if (distance > 0) d.push(`h${distance}`);
              d.push('a3,3 0 0 1 3,3');
              distance = 0;
              edge = 'left';
              x++;
              y++;
            } else if (!this.hasPixelAtCoordinate(x + 1, y)) {
              distance += 8;
              x++;
            } else {
              d.push(`h${distance + 5}`);
              distance = 5;
              edge = 'right';
            }
            break;
          case 'right':
            if (!this.hasPixelAtCoordinate(x + 1, y - 1)) {
              if (distance > 0) d.push(`v-${distance}`);
              d.push('a3,3 0 0 1 3,-3');
              distance = 0;
              edge = 'bottom';
              x++;
              y--;
            } else if (!this.hasPixelAtCoordinate(x, y - 1)) {
              distance += 8;
              y--;
            } else {
              d.push(`v-${distance + 5}`);
              distance = 5;
              edge = 'top';
            }
            break;
        }
      }
      d.push(`v-${distance + 5}`);
      d.push('z');
    }
    this._element = `<path ${this.style} d="${d.join('')}" />`;
  }

  hasPixelAtCoordinate(x, y) {
    if (x >= this.dimension || x < 0 || y >= this.dimension || y < 0) return false;
    return this.data.at(x, y);
  }

  hasPixelAtLocation(location) {
    const x = location % this.dimension;
    const y = (location - x) / this.dimension;
    return this.data.at(x, y);
  }

  hasVisitedCoordinate(x, y) {
    return this.hasVisitedLocation(this.toLocation(x, y));
  }

  hasVisitedLocation(location) {
    return this.visitedLocations.has(location);
  }

  toLocation(x, y) {
    return this.dimension * y + x;
  }

  visitCoordinate(x, y) {
    this.visitLocation(this.toLocation(x, y));
  }

  visitLocation(location) {
    this.visitedLocations.add(location);
  }
}

var squareQrcode = { SquareQRCodeEncoder: SquareQRCodeEncoder$1, Turtle };

const { Matrix } = qrcode;
const { SquareQRCodeEncoder } = squareQrcode;

const JEWEL_VALUE = Object.freeze({
  AVAILABLE: 'AVAILABLE',
  FALSE: 'FALSE',
  TRUE: 'TRUE',
  UNDECIDED: 'UNDECIDED',
});

/**
 * CLASS MarketQRCodeEncoder
 * This is used to generate an SVG for a QR code with a Square logo embedded in the center.
 * Contact #qrcode-design for design specifics
 * The following options can be specified:
 *   border          boolean (default false) whether to add a 6-pixel quiet zone
 *   invert          boolean (default false) light data on dark background when on
 *   monochrome      boolean (default false) whether to make it all black and white
 *                   This is useful for things like thermal printers that only print black
 *   styleBackground string to override style inserted in SVG background rectangle
 *   styleForeground string to override style inserted in SVG foreground data and patterns
 *   styleLogo       string to override style inserted in SVG for Square jewel
 */
class MarketQRCodeEncoder extends SquareQRCodeEncoder {
  static getJewel() {
    if (this.jewel !== undefined) return this.jewel;
    const jewel = Matrix.withAll(9, 9, JEWEL_VALUE.UNDECIDED);
    // corners are available
    jewel.put(0, 0, JEWEL_VALUE.AVAILABLE);
    jewel.put(0, 8, JEWEL_VALUE.AVAILABLE);
    jewel.put(8, 0, JEWEL_VALUE.AVAILABLE);
    jewel.put(8, 8, JEWEL_VALUE.AVAILABLE);
    // forced false
    for (let offset = 0; offset < 7; offset++) {
      jewel.put(offset + 1, 0, JEWEL_VALUE.FALSE);
      jewel.put(offset + 1, 8, JEWEL_VALUE.FALSE);
      jewel.put(0, offset + 1, JEWEL_VALUE.FALSE);
      jewel.put(8, offset + 1, JEWEL_VALUE.FALSE);
    }
    jewel.put(3, 3, JEWEL_VALUE.FALSE);
    jewel.put(3, 5, JEWEL_VALUE.FALSE);
    jewel.put(5, 3, JEWEL_VALUE.FALSE);
    jewel.put(5, 5, JEWEL_VALUE.FALSE);
    // forced true
    for (let offset = 0; offset < 6; offset++) {
      jewel.put(1 + offset, 1, JEWEL_VALUE.TRUE);
      jewel.put(2 + offset, 7, JEWEL_VALUE.TRUE);
      jewel.put(7, 1 + offset, JEWEL_VALUE.TRUE);
      jewel.put(1, 2 + offset, JEWEL_VALUE.TRUE);
    }
    jewel.put(4, 4, JEWEL_VALUE.TRUE);
    this.jewel = jewel;
    return jewel;
  }

  initializeSvg() {
    // generate the SVG
    const offset = this.svgOffset;
    const dimension = this.svgDimension;
    const foregroundStyle = this.svgForegroundStyle;
    const logoStyle = this.svgLogoStyle;
    const source = [];
    source.push(this.svgTag(dimension));
    source.push('<defs>');
    source.push(this.svgFinderPattern(foregroundStyle));
    source.push(this.svgLogo(logoStyle));
    source.push('</defs>');
    source.push(this.svgBackground(this.svgBackgroundStyle, dimension, offset === 0 ? undefined : 16));
    this.svgFinderPatterns(source, offset);
    this.svgTurtle(source, foregroundStyle, offset);
    // Square logo
    const logoPosition = (this.code.dimension - 7) * 4 + offset;
    source.push(`<use xlink:href="#s" x="${logoPosition}" y="${logoPosition}" />`);
    // finish
    source.push('</svg>');
    this.svg = source.join('');
  }

  initializeTurtleData() {
    super.initializeTurtleData();
    // clear out middle for Square logo
    const start = (this.code.dimension - 9) / 2;
    this.turtleData.fill(start, start + 1, 9, 7, false);
    this.turtleData.fill(start + 1, start, 7, 1, false);
    this.turtleData.fill(start + 1, start + 8, 7, 1, false);
  }

  get isMonochrome() {
    const isMonochrome = this.code.options.monochrome;
    if (isMonochrome === undefined) return false;
    return isMonochrome;
  }

  get minimumVersion() {
    // if the code version is 1, then the jewel would cut out the timing patterns
    return 2;
  }

  penaltyForMatrix(matrix) {
    const errorCorrectionCapacity = this.map.errorCorrectionCapacity;
    const messedUpBytes = errorCorrectionCapacity.map(() => new Set());
    // figure out the messed up bytes based on putting the jewel in the center
    const jewel = this.constructor.getJewel();
    const start = (matrix.content.length - 9) / 2;
    for (let y = 0; y < 9; y++) {
      const yData = y + start;
      for (let x = 0; x < 9; x++) {
        const xData = x + start;
        const pixel = this.map.at(xData, yData);
        if (this.map.isDataPixel(pixel)) {
          switch (jewel.at(x, y)) {
            case JEWEL_VALUE.FALSE:
              if (matrix.at(xData, yData) !== false) messedUpBytes[pixel.chunk].add(pixel.byte);
              break;
            case JEWEL_VALUE.TRUE:
              if (matrix.at(xData, yData) !== true) messedUpBytes[pixel.chunk].add(pixel.byte);
              break;
            case JEWEL_VALUE.UNDECIDED:
              messedUpBytes[pixel.chunk].add(pixel.byte);
              break;
          }
        }
      }
    }
    // calculate penalty based on how many messed up bytes
    let penalty = 0;
    errorCorrectionCapacity.forEach((capacity, index) => {
      const leftoverCapacity = capacity - messedUpBytes[index].size * 2;
      if (leftoverCapacity < 0) {
        penalty += this.constructor.PENALTY_FOR_NEGATIVE_CAPACITY;
      } else if (leftoverCapacity < this.constructor.PENALTY_FOR_LEFTOVER_CAPACITY.length) {
        penalty += this.constructor.PENALTY_FOR_LEFTOVER_CAPACITY[leftoverCapacity];
      }
    });
    // add additional penalties on trying to have the corners be filled
    if (!matrix.at(start, start)) penalty++;
    if (!matrix.at(start, start + 8)) penalty++;
    if (!matrix.at(start + 8, start)) penalty++;
    if (!matrix.at(start + 8, start + 8)) penalty++;
    return penalty;
  }

  get svgForegroundStyle() {
    const fromOptions = this.code.options.styleForeground;
    if (fromOptions !== undefined) return fromOptions;
    if (this.inverted) {
      return this.isMonochrome ? 'fill="white"' : 'fill="white" fill-opacity="0.95"';
    } else {
      return this.isMonochrome ? 'fill="black"' : 'fill="black" fill-opacity="0.9"';
    }
  }

  get svgLogoStyle() {
    if (this.isMonochrome) return this.svgForegroundStyle;
    const fromOptions = this.code.options.styleLogo;
    if (fromOptions !== undefined) return fromOptions;
    return 'fill="#006AFF"';
  }

  svgLogo(style) {
    return `<path id="s" ${style} fill-rule="evenodd" d="M 0 9.8 C 0 3.92 3.92 0 9.8 0 L 46.2 0 C 52.08 0 56 3.92 56 9.8 L 56 46.2 C 56 52.08 52.08 56 46.2 56 L 9.8 56 C 3.92 56 0 52.08 0 46.2 Z M 11.2 14 C 11.2 12.32 12.32 11.2 14 11.2 L 42 11.2 C 43.68 11.2 44.8 12.32 44.8 14 L 44.8 42 C 44.8 43.68 43.68 44.8 42 44.8 L 14 44.8 C 12.32 44.8 11.2 43.68 11.2 42 Z M 21 22.4 C 21 21.7 21.7 21 22.4 21 L 33.6 21 C 34.3 21 35 21.7 35 22.4 L 35 33.6 C 35 34.3 34.3 35 33.6 35 L 22.4 35 C 21.7 35 21 34.3 21 33.6 Z" />`;
  }

  get svgOffset() {
    return this.hasBorder ? 48 : 0;
  }
}

var marketQrcode = { MarketQRCodeEncoder, JEWEL_VALUE };

var qrcodeEncoder = {
  ...marketQrcode,
  ...qrcode,
  ...squareQrcode,
};

const marketQrcodeCss = ":host{display:block}:host svg .foreground{fill:var(--qrcode-normal-variant-foreground-color)}:host svg .background{fill:var(--qrcode-normal-variant-background-color)}:host svg .logo{fill:var(--qrcode-normal-variant-icon-color)}:host([monochrome]) .foreground{fill:var(--qrcode-monochrome-variant-foreground-color)}:host([monochrome]) .background{fill:var(--qrcode-monochrome-variant-background-color)}:host([monochrome]) .logo{fill:var(--qrcode-monochrome-variant-icon-color)}:host([size]) svg{width:100%;height:100%}";
const MarketQrcodeStyle0 = marketQrcodeCss;

const MarketQrcode = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.content = '';
        this.size = undefined;
        this.border = false;
        this.monochrome = false;
    }
    render() {
        const encoder = this.content
            ? new qrcodeEncoder.MarketQRCodeEncoder(this.content, {
                border: this.border,
                styleBackground: this.border ? 'class="background"' : '',
                styleForeground: 'class="foreground"',
                styleLogo: 'class="logo"',
            })
            : null;
        const containerStyle = this.size !== undefined
            ? {
                height: `${this.size}px`,
                width: `${this.size}px`,
            }
            : null;
        return (h(Host, { key: '5045d27eb8bd396a873727da5ac09bdabb1dcde9', class: "market-qrcode", "aria-hidden": "true" }, h("div", { key: '661f296b07f7e0278fdeeab78fe6b734a05bcce4', innerHTML: encoder ? encoder.svg : '', style: containerStyle })));
    }
};
MarketQrcode.style = MarketQrcodeStyle0;

export { MarketQrcode as market_qrcode };

//# sourceMappingURL=market-qrcode.entry.js.map