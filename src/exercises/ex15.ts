import { Matrix } from "../core/Matrix";
import { Vector } from "../core/Vector";


// Complex number type
interface Complex {
    re: number;
    im: number;
}

// Complex number operations
const ComplexOps = {
    // Create complex number
    create: (re: number, im: number): Complex => ({ re, im }),
    
    // Addition
    add: (a: Complex, b: Complex): Complex => ({
        re: a.re + b.re,
        im: a.im + b.im
    }),
    
    // Subtraction
    sub: (a: Complex, b: Complex): Complex => ({
        re: a.re - b.re,
        im: a.im - b.im
    }),
    
    // Multiplication
    mul: (a: Complex, b: Complex): Complex => ({
        re: a.re * b.re - a.im * b.im,
        im: a.re * b.im + a.im * b.re
    }),
    
    // Division
    div: (a: Complex, b: Complex): Complex => {
        const denominator = b.re * b.re + b.im * b.im;
        return {
            re: (a.re * b.re + a.im * b.im) / denominator,
            im: (a.im * b.re - a.re * b.im) / denominator
        };
    },
    
    // Conjugate
    conj: (a: Complex): Complex => ({
        re: a.re,
        im: -a.im
    }),
    
    // Absolute value (modulus)
    abs: (a: Complex): number => Math.sqrt(a.re * a.re + a.im * a.im),
    
    // Equality check
    equals: (a: Complex, b: Complex, epsilon: number = 1e-10): boolean => {
        return Math.abs(a.re - b.re) < epsilon && Math.abs(a.im - b.im) < epsilon;
    },
    
    // String representation
    toString: (a: Complex): string => {
        if (a.im === 0) return a.re.toString();
        if (a.re === 0) return `${a.im}i`;
        return `${a.re} ${a.im > 0 ? '+' : '-'} ${Math.abs(a.im)}i`;
    }
};

// Complex vector operations
const ComplexVector = {
    // Create complex vector
    create: (data: Complex[]): Vector<Complex> => new Vector(data),
    
    // Addition
    add: (u: Vector<Complex>, v: Vector<Complex>): Vector<Complex> => {
        if (u.size !== v.size) throw new Error('Vectors must have same size');
        const result: Complex[] = [];
        for (let i = 0; i < u.size; i++) {
            result.push(ComplexOps.add(u.data[i], v.data[i]));
        }
        return new Vector(result);
    },
    
    // Subtraction
    sub: (u: Vector<Complex>, v: Vector<Complex>): Vector<Complex> => {
        if (u.size !== v.size) throw new Error('Vectors must have same size');
        const result: Complex[] = [];
        for (let i = 0; i < u.size; i++) {
            result.push(ComplexOps.sub(u.data[i], v.data[i]));
        }
        return new Vector(result);
    },
    
    // Scaling
    scl: (u: Vector<Complex>, a: Complex): Vector<Complex> => {
        const result: Complex[] = [];
        for (let i = 0; i < u.size; i++) {
            result.push(ComplexOps.mul(u.data[i], a));
        }
        return new Vector(result);
    },
    
    // Dot product (complex conjugate of first vector)
    dot: (u: Vector<Complex>, v: Vector<Complex>): Complex => {
        if (u.size !== v.size) throw new Error('Vectors must have same size');
        let result: Complex = { re: 0, im: 0 };
        for (let i = 0; i < u.size; i++) {
            const term = ComplexOps.mul(ComplexOps.conj(u.data[i]), v.data[i]);
            result = ComplexOps.add(result, term);
        }
        return result;
    },
    
    // Norm (using complex dot product)
    norm: (u: Vector<Complex>): number => {
        const dotProduct = ComplexVector.dot(u, u);
        return Math.sqrt(dotProduct.re); // dot product with itself is real
    }
};

// Complex matrix operations
const ComplexMatrix = {
    // Create complex matrix
    create: (data: Complex[][]): Matrix<Complex> => new Matrix(data),
    
    // Addition
    add: (A: Matrix<Complex>, B: Matrix<Complex>): Matrix<Complex> => {
        if (A.rows !== B.rows || A.cols !== B.cols) {
            throw new Error('Matrices must have same dimensions');
        }
        const result: Complex[][] = [];
        for (let i = 0; i < A.rows; i++) {
            const row: Complex[] = [];
            for (let j = 0; j < A.cols; j++) {
                row.push(ComplexOps.add(A.data[i][j], B.data[i][j]));
            }
            result.push(row);
        }
        return new Matrix(result);
    },
    
    // Multiplication
    mul: (A: Matrix<Complex>, B: Matrix<Complex>): Matrix<Complex> => {
        if (A.cols !== B.rows) throw new Error('Incompatible matrix dimensions');
        const result: Complex[][] = [];
        for (let i = 0; i < A.rows; i++) {
            const row: Complex[] = [];
            for (let j = 0; j < B.cols; j++) {
                let sum: Complex = { re: 0, im: 0 };
                for (let k = 0; k < A.cols; k++) {
                    const product = ComplexOps.mul(A.data[i][k], B.data[k][j]);
                    sum = ComplexOps.add(sum, product);
                }
                row.push(sum);
            }
            result.push(row);
        }
        return new Matrix(result);
    },
    
    // Transpose with conjugate (Hermitian transpose)
    hermitianTranspose: (A: Matrix<Complex>): Matrix<Complex> => {
        const result: Complex[][] = [];
        for (let j = 0; j < A.cols; j++) {
            const row: Complex[] = [];
            for (let i = 0; i < A.rows; i++) {
                row.push(ComplexOps.conj(A.data[i][j]));
            }
            result.push(row);
        }
        return new Matrix(result);
    }
};

// Test function for exercise 15
export const ex15 = (): void => {
    console.log('\n=== Exercise 15 - Complex Vector Spaces ===');
    
    // Test complex number operations
    console.log('\n--- Complex Number Operations ---');
    const c1 = ComplexOps.create(3, 4);
    const c2 = ComplexOps.create(1, 2);
    
    console.log(`c1 = ${ComplexOps.toString(c1)}`);
    console.log(`c2 = ${ComplexOps.toString(c2)}`);
    console.log(`c1 + c2 = ${ComplexOps.toString(ComplexOps.add(c1, c2))}`);
    console.log(`c1 * c2 = ${ComplexOps.toString(ComplexOps.mul(c1, c2))}`);
    console.log(`conj(c1) = ${ComplexOps.toString(ComplexOps.conj(c1))}`);
    console.log(`|c1| = ${ComplexOps.abs(c1)}`);
    
    // Test complex vector operations
    console.log('\n--- Complex Vector Operations ---');
    const v1 = ComplexVector.create([
        ComplexOps.create(1, 2),
        ComplexOps.create(3, 4)
    ]);
    
    const v2 = ComplexVector.create([
        ComplexOps.create(5, 6),
        ComplexOps.create(7, 8)
    ]);
    
    console.log('Vector v1:'); v1.print();
    console.log('Vector v2:'); v2.print();
    
    const vSum = ComplexVector.add(v1, v2);
    console.log('v1 + v2:'); vSum.print();
    
    const dotProduct = ComplexVector.dot(v1, v2);
    console.log(`v1 · v2 = ${ComplexOps.toString(dotProduct)}`);
    
    // Test complex matrix operations
    console.log('\n--- Complex Matrix Operations ---');
    const A = ComplexMatrix.create([
        [ComplexOps.create(1, 2), ComplexOps.create(3, 4)],
        [ComplexOps.create(5, 6), ComplexOps.create(7, 8)]
    ]);
    
    const B = ComplexMatrix.create([
        [ComplexOps.create(9, 10), ComplexOps.create(11, 12)],
        [ComplexOps.create(13, 14), ComplexOps.create(15, 16)]
    ]);
    
    console.log('Matrix A:'); A.print();
    console.log('Matrix B:'); B.print();
    
    const AB = ComplexMatrix.mul(A, B);
    console.log('A * B:'); AB.print();
    
    const AHer = ComplexMatrix.hermitianTranspose(A);
    console.log('Aᴴ (Hermitian transpose):'); AHer.print();
    
    // Test quantum mechanics example (simplified)
    console.log('\n--- Quantum Mechanics Example ---');
    // Qubit state: α|0⟩ + β|1⟩
    const alpha = ComplexOps.create(1/Math.sqrt(2), 0);
    const beta = ComplexOps.create(0, 1/Math.sqrt(2));
    
    const qubit = ComplexVector.create([alpha, beta]);
    console.log('Qubit state:'); qubit.print();
    
    // Check normalization: |α|² + |β|² should be 1
    const normSquared = ComplexOps.add(
        ComplexOps.mul(ComplexOps.conj(alpha), alpha),
        ComplexOps.mul(ComplexOps.conj(beta), beta)
    );
    console.log(`|α|² + |β|² = ${ComplexOps.toString(normSquared)}`);


const testComplexNumbers = (): void => {
    console.log("\n=== Test Complex Numbers ===");

    const a = ComplexOps.create(3, 2);
    const b = ComplexOps.create(1, 4);

    console.log(`a = ${ComplexOps.toString(a)}`);
    console.log(`b = ${ComplexOps.toString(b)}`);
    console.log(`a + b = ${ComplexOps.toString(ComplexOps.add(a, b))}`);
    console.log(`a - b = ${ComplexOps.toString(ComplexOps.sub(a, b))}`);
    console.log(`a * b = ${ComplexOps.toString(ComplexOps.mul(a, b))}`);
    console.log(`a / b = ${ComplexOps.toString(ComplexOps.div(a, b))}`);
    console.log(`conj(a) = ${ComplexOps.toString(ComplexOps.conj(a))}`);
    console.log(`|a| = ${ComplexOps.abs(a)}`);
};

const testComplexVectors = (): void => {
    console.log("\n=== Test Complex Vectors ===");

    const v1 = ComplexVector.create([
        ComplexOps.create(1, 2),
        ComplexOps.create(3, 4)
    ]);

    const v2 = ComplexVector.create([
        ComplexOps.create(5, -1),
        ComplexOps.create(-2, 3)
    ]);

    console.log("v1 =", v1.data.map(c => ComplexOps.toString(c)));
    console.log("v2 =", v2.data.map(c => ComplexOps.toString(c)));

    console.log("v1 + v2 =", ComplexVector.add(v1, v2).data.map(c => ComplexOps.toString(c)));
    console.log("v1 - v2 =", ComplexVector.sub(v1, v2).data.map(c => ComplexOps.toString(c)));
    console.log("2 * v1 (scaled) =", ComplexVector.scl(v1, ComplexOps.create(2, 0)).data.map(c => ComplexOps.toString(c)));
    console.log("v1 · v2 =", ComplexOps.toString(ComplexVector.dot(v1, v2)));
    console.log("|v1| =", ComplexVector.norm(v1));
};

const testComplexMatrices = (): void => {
    console.log("\n=== Test Complex Matrices ===");

    const A = ComplexMatrix.create([
        [ComplexOps.create(1, 1), ComplexOps.create(2, -1)],
        [ComplexOps.create(0, 3), ComplexOps.create(-1, 0)]
    ]);

    const B = ComplexMatrix.create([
        [ComplexOps.create(2, 0), ComplexOps.create(0, 1)],
        [ComplexOps.create(1, -1), ComplexOps.create(1, 2)]
    ]);

    console.log("Matrix A =", A.data.map(row => row.map(c => ComplexOps.toString(c))));
    console.log("Matrix B =", B.data.map(row => row.map(c => ComplexOps.toString(c))));

    console.log("A + B =", ComplexMatrix.add(A, B).data.map(row => row.map(c => ComplexOps.toString(c))));
    console.log("A * B =", ComplexMatrix.mul(A, B).data.map(row => row.map(c => ComplexOps.toString(c))));
    console.log("Hermitian transpose of A =", ComplexMatrix.hermitianTranspose(A).data.map(row => row.map(c => ComplexOps.toString(c))));
};

const testQuantumExample = (): void => {
    console.log("\n=== Test Quantum Mechanics Example ===");

    const alpha = ComplexOps.create(1 / Math.sqrt(2), 0);
    const beta = ComplexOps.create(0, 1 / Math.sqrt(2));
    const qubit = ComplexVector.create([alpha, beta]);

    console.log("Qubit state =", qubit.data.map(c => ComplexOps.toString(c)));

    const normSquared = ComplexOps.add(
        ComplexOps.mul(ComplexOps.conj(alpha), alpha),
        ComplexOps.mul(ComplexOps.conj(beta), beta)
    );

    console.log("|α|² + |β|² =", ComplexOps.toString(normSquared));
};

testComplexNumbers();
testComplexVectors();
testComplexMatrices();
testQuantumExample();
};