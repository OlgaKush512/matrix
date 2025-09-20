import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";
import { Vector } from "../core/Vector";



/**
 * Basic linear algebra operations.
 *
 * Vectors:
 *  u = (u1, u2, ..., un), v = (v1, v2, ..., vn)
 *  u + v = (u1+v1, u2+v2, ..., un+vn)
 *  u - v = (u1-v1, u2-v2, ..., un-vn)
 *  a·u   = (a·u1, a·u2, ..., a·un)
 *
 * Matrices:
 *  U = [uᵢⱼ], V = [vᵢⱼ]
 *  U + V = [uᵢⱼ+vᵢⱼ],  U - V = [uᵢⱼ-vᵢⱼ],  a·U = [a·uᵢⱼ]
 */


export const vectorAdd = <K = Scalar>(u: Vector<K>, v: Vector<K>): Vector<K> => {
    if (u.size !== v.size) {
        throw new Error('Vectors must have the same size for addition');
    }
    
    const resultData: K[] = [];
    for (let i = 0; i < u.size; i++) {
        resultData.push((u.data[i] as any) + (v.data[i] as any) as K);
    }
    
    return new Vector(resultData);
};

export const vectorSub = <K = Scalar>(u: Vector<K>, v: Vector<K>): Vector<K> => {
    if (u.size !== v.size) {
        throw new Error('Vectors must have the same size for subtraction');
    }
    
    const resultData: K[] = [];
    for (let i = 0; i < u.size; i++) {
        resultData.push((u.data[i] as any) - (v.data[i] as any) as K);
    }
    
    return new Vector(resultData);
};

export const vectorScl = <K = Scalar>(u: Vector<K>, a: K): Vector<K> => {
    const resultData: K[] = [];
    for (let i = 0; i < u.size; i++) {
        resultData.push((u.data[i] as any) * (a as any) as K);
    }
    
    return new Vector(resultData);
};

export const matrixAdd = <K = Scalar>(u: Matrix<K>, v: Matrix<K>): Matrix<K> => {
    if (u.rows !== v.rows || u.cols !== v.cols) {
        throw new Error('Matrices must have the same dimensions for addition');
    }
    
    const resultData: K[][] = [];
    for (let i = 0; i < u.rows; i++) {
        const row: K[] = [];
        for (let j = 0; j < u.cols; j++) {
            row.push((u.data[i][j] as any) + (v.data[i][j] as any) as K);
        }
        resultData.push(row);
    }
    
    return new Matrix(resultData, u.rows, u.cols);
};

export const matrixSub = <K = Scalar>(u: Matrix<K>, v: Matrix<K>): Matrix<K> => {
    if (u.rows !== v.rows || u.cols !== v.cols) {
        throw new Error('Matrices must have the same dimensions for subtraction');
    }
    
    const resultData: K[][] = [];
    for (let i = 0; i < u.rows; i++) {
        const row: K[] = [];
        for (let j = 0; j < u.cols; j++) {
            row.push((u.data[i][j] as any) - (v.data[i][j] as any) as K);
        }
        resultData.push(row);
    }
    
    return new Matrix(resultData, u.rows, u.cols);
};

export const matrixScl = <K = Scalar>(u: Matrix<K>, a: K): Matrix<K> => {
    const resultData: K[][] = [];
    for (let i = 0; i < u.rows; i++) {
        const row: K[] = [];
        for (let j = 0; j < u.cols; j++) {
            row.push((u.data[i][j] as any) * (a as any) as K);
        }
        resultData.push(row);
    }
    
    return new Matrix(resultData, u.rows, u.cols);
};

export const ex00 = (): void =>  {
    console.log('=== Testing Vector Operations ===');
    
    const u = new Vector([1, 0]);
    const v = new Vector([0, 1]);
    
    console.log('Vector u:'); u.print();
    console.log('Vector v:'); v.print();
    
    const addedVector = vectorAdd(u, v);
    console.log('u + v:'); addedVector.print();
    
    const subtractedVector = vectorSub(u, v);
    console.log('u - v:'); subtractedVector.print();
    
    const scaledVector = vectorScl(u, 2);
    console.log('u * 2:'); scaledVector.print();
    
    console.log('\n=== Testing Matrix Operations ===');
    
    const matU = new Matrix([
        [1, 2],
        [3, 4]
    ]);
    const matV = new Matrix([
        [7, 4],
        [-2, 2]
    ]);
    
    console.log('Matrix u:'); matU.print();
    console.log('Matrix v:'); matV.print();
    
    const addedMatrix = matrixAdd(matU, matV);
    console.log('u + v:'); addedMatrix.print();
    
    const subtractedMatrix = matrixSub(matU, matV);
    console.log('u - v:'); subtractedMatrix.print();
    
    const scaledMatrix = matrixScl(matU, 2);
    console.log('u * 2:'); scaledMatrix.print();

    // === Extra Tests ===
    console.log('\n=== Extra Vector Addition Tests ===');
    const vectorAddTests: [number[], number[]][] = [
        [[0, 0], [0, 0]],
        [[1, 0], [0, 1]],
        [[1, 1], [1, 1]],
        [[21, 21], [21, 21]],
        [[-21, 21], [21, -21]],
        [[0,1,2,3,4,5,6,7,8,9], [9,8,7,6,5,4,3,2,1,0]]
    ];
    vectorAddTests.forEach(([a, b], idx) => {
        const va = new Vector(a);
        const vb = new Vector(b);
        const result = vectorAdd(va, vb);
        console.log(`Vector Add Test ${idx+1}:`);
        console.log('a:'); va.print();
        console.log('b:'); vb.print();
        console.log('a + b:'); result.print();
    });

    console.log('\n=== Extra Matrix Addition Tests ===');
    const matrixAddTests: [number[][], number[][]][] = [
        [[[0,0],[0,0]], [[0,0],[0,0]]],
        [[[1,0],[0,1]], [[0,0],[0,0]]],
        [[[1,1],[1,1]], [[1,1],[1,1]]],
        [[[21,21],[21,21]], [[21,21],[21,21]]]
    ];
    matrixAddTests.forEach(([a, b], idx) => {
        const ma = new Matrix(a);
        const mb = new Matrix(b);
        const result = matrixAdd(ma, mb);
        console.log(`Matrix Add Test ${idx+1}:`);
        console.log('a:'); ma.print();
        console.log('b:'); mb.print();
        console.log('a + b:'); result.print();
    });

    console.log('\n=== Extra Vector Subtraction Tests ===');
    const vectorSubTests: [number[], number[]][] = [
        [[0, 0], [0, 0]],
        [[1, 0], [0, 1]],
        [[1, 1], [1, 1]],
        [[21, 21], [21, 21]],
        [[-21, 21], [21, -21]],
        [[0,1,2,3,4,5,6,7,8,9], [9,8,7,6,5,4,3,2,1,0]]
    ];
    vectorSubTests.forEach(([a, b], idx) => {
        const va = new Vector(a);
        const vb = new Vector(b);
        const result = vectorSub(va, vb);
        console.log(`Vector Sub Test ${idx+1}:`);
        console.log('a:'); va.print();
        console.log('b:'); vb.print();
        console.log('a - b:'); result.print();
    });

    console.log('\n=== Extra Matrix Subtraction Tests ===');
    const matrixSubTests: [number[][], number[][]][] = [
        [[[0,0],[0,0]], [[0,0],[0,0]]],
        [[[1,0],[0,1]], [[0,0],[0,0]]],
        [[[1,1],[1,1]], [[1,1],[1,1]]],
        [[[21,21],[21,21]], [[21,21],[21,21]]]
    ];
    matrixSubTests.forEach(([a, b], idx) => {
        const ma = new Matrix(a);
        const mb = new Matrix(b);
        const result = matrixSub(ma, mb);
        console.log(`Matrix Sub Test ${idx+1}:`);
        console.log('a:'); ma.print();
        console.log('b:'); mb.print();
        console.log('a - b:'); result.print();
    });

    console.log('\n=== Extra Vector Scaling Tests ===');
    const vectorSclTests: [number[], number][] = [
        [[0,0], 1],
        [[1,0], 1],
        [[1,1], 2],
        [[21,21], 2],
        [[42,42], 0.5]
    ];
    vectorSclTests.forEach(([a, k], idx) => {
        const va = new Vector(a);
        const result = vectorScl(va, k);
        console.log(`Vector Scl Test ${idx+1}:`);
        console.log('a:'); va.print();
        console.log(`scalar: ${k}`);
        console.log('a * scalar:'); result.print();
    });

    console.log('\n=== Extra Matrix Scaling Tests ===');
    const matrixSclTests: [number[][], number][] = [
        [[[0,0],[0,0]], 0],
        [[[1,0],[0,1]], 1],
        [[[1,2],[3,4]], 2],
        [[[21,21],[21,21]], 0.5]
    ];
    matrixSclTests.forEach(([a, k], idx) => {
        const ma = new Matrix(a);
        const result = matrixScl(ma, k);
        console.log(`Matrix Scl Test ${idx+1}:`);
        console.log('a:'); ma.print();
        console.log(`scalar: ${k}`);
        console.log('a * scalar:'); result.print();
    });
};
