// Three test-case generators per spec: generateSequential (0..2n-1 repeated twice),
// generateMidRepeatReverse (0..n-1, 0..2n-1 twice, then n-1..0, 2n-1..0 twice),
// generateRandom (64 pseudo-random addresses in [0,1023], optionally seeded).

// Sequential Sequence Generator
// Generates a sequence of numbers from 0 to n-1, repeated twice.
export function generateSequential(n: number): number[] {
    const sequence: number[] = [];
    for (let i = 0; i < n; i++) {
        sequence.push(i);
    }
    for (let i = 0; i < n; i++) {
        sequence.push(i);
    }
    return sequence;
}

// Mid-Repeat Reverse Sequence Generator
// Generates a sequence of numbers from 0 to n-1, then from 0 to 2n-1 twice, then from n-1 to 0, then from 2n-1 to 0 twice.
export function generateMidRepeatReverse(n: number): number[] {
    const sequence: number[] = [];
    for (let i = 0; i < n; i++) {
        sequence.push(i);
    }
    for (let i = 0; i < 2 * n; i++) {
        sequence.push(i);
    }
    for (let i = n - 1; i >= 0; i--) {
        sequence.push(i);
    }
    for (let i = 2 * n - 1; i >= 0; i--) {
        sequence.push(i);
    }
    return sequence;
}

// Random Sequence Generator
// Generates a sequence of 64 pseudo-random addresses in the range [0, 1023], optionally seeded.
export function generateRandom(seed?: number): number[] {
    const sequence: number[] = [];
    const random = seed !== undefined ? mulberry32(seed) : Math.random;
    for (let i = 0; i < 64; i++) {
        sequence.push(Math.floor(random() * 1024));
    }
    return sequence;
}

// Mulberry32 pseudo-random number generator (PRNG) for reproducible random numbers
// 32-bit integer seed, returns a function that generates pseudo-random numbers in [0, 1).
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function mulberry32(a: number): () => number {
    return function () {
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
