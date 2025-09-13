import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";
import { Vector } from "../core/Vector";

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
    
    const u = new Vector([2, 3]);
    const v = new Vector([5, 7]);
    
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
};

