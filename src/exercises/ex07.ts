import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";
import { Vector } from "../core/Vector";

/**
 * Matrix and Vector Multiplication
 * 
 * Multiplies a matrix by a vector: y = A * x, where A is m×n and x is n×1, result y is m×1.
 * Multiplies two matrices: C = A * B, where A is m×n, B is n×p, result C is m×p.
 * Checks that dimensions match; throws error if incompatible.
 */

/**
 * Multiplies a matrix by a vector
 * @param matrix Matrix (m x n)
 * @param vector Vector (n)
 * @returns Resulting vector (m)
 */
export const mulVec = <K = Scalar>(matrix: Matrix<K>, vector: Vector<K>): Vector<K> => {
    if (matrix.cols !== vector.size) {
        throw new Error('Matrix columns must match vector size for multiplication');
    }

    const resultData: K[] = [];
    
    for (let i = 0; i < matrix.rows; i++) {
        let sum: any = 0;
        for (let j = 0; j < matrix.cols; j++) {
            // Using fused multiply-add: sum += matrix[i][j] * vector[j]
            sum += (matrix.data[i][j] as any) * (vector.data[j] as any);
        }
        resultData.push(sum as K);
    }
    
    return new Vector(resultData);
};

/**
 * Multiplies two matrices
 * @param matrixA Matrix (m x n)
 * @param matrixB Matrix (n x p)
 * @returns Resulting matrix (m x p)
 */
export const mulMat = <K = Scalar>(matrixA: Matrix<K>, matrixB: Matrix<K>): Matrix<K> => {
    if (matrixA.cols !== matrixB.rows) {
        throw new Error('Matrix A columns must match Matrix B rows for multiplication');
    }

    const resultData: K[][] = [];
    const m = matrixA.rows;
    const n = matrixA.cols;
    const p = matrixB.cols;
    
    for (let i = 0; i < m; i++) {
        const row: K[] = [];
        for (let j = 0; j < p; j++) {
            let sum: any = 0;
            for (let k = 0; k < n; k++) {
                // Using fused multiply-add: sum += A[i][k] * B[k][j]
                sum += (matrixA.data[i][k] as any) * (matrixB.data[k][j] as any);
            }
            row.push(sum as K);
        }
        resultData.push(row);
    }
    
    return new Matrix(resultData, m, p);
};

// Test function for exercise 07
export const ex07 = (): void => {
    console.log('\n=== Exercise 07 - Matrix Multiplication ===');
    
    // Test case 1: Identity matrix multiplication
    console.log('\n--- Test 1: Identity matrix * vector ---');
    const identity = new Matrix([
        [1., 0.],
        [0., 1.]
    ]);
    const vec1 = new Vector([4., 2.]);
    
    console.log('Matrix (identity):'); identity.print();
    console.log('Vector:'); vec1.print();
    
    const result1 = mulVec(identity, vec1);
    console.log('Matrix * Vector:'); result1.print();
    // Expected: [4., 2.]
    
    // Test case 2: Scaling matrix multiplication
    console.log('\n--- Test 2: Scaling matrix * vector ---');
    const scaling = new Matrix([
        [2., 0.],
        [0., 2.]
    ]);
    
    console.log('Matrix (scaling):'); scaling.print();
    console.log('Vector:'); vec1.print();
    
    const result2 = mulVec(scaling, vec1);
    console.log('Matrix * Vector:'); result2.print();
    // Expected: [8., 4.]
    
    // Test case 3: General matrix multiplication with vector
    console.log('\n--- Test 3: General matrix * vector ---');
    const generalMat = new Matrix([
        [2., -2.],
        [-2., 2.]
    ]);
    
    console.log('Matrix:'); generalMat.print();
    console.log('Vector:'); vec1.print();
    
    const result3 = mulVec(generalMat, vec1);
    console.log('Matrix * Vector:'); result3.print();
    // Expected: [4., -4.]
    
    // Test case 4: Identity matrix * identity matrix
    console.log('\n--- Test 4: Identity matrix * identity matrix ---');
    const identity2 = new Matrix([
        [1., 0.],
        [0., 1.]
    ]);
    
    console.log('Matrix A (identity):'); identity.print();
    console.log('Matrix B (identity):'); identity2.print();
    
    const result4 = mulMat(identity, identity2);
    console.log('Matrix A * Matrix B:'); result4.print();
    // Expected: [[1., 0.], [0., 1.]]
    
    // Test case 5: Identity matrix * general matrix
    console.log('\n--- Test 5: Identity matrix * general matrix ---');
    const generalMat2 = new Matrix([
        [2., 1.],
        [4., 2.]
    ]);
    
    console.log('Matrix A (identity):'); identity.print();
    console.log('Matrix B:'); generalMat2.print();
    
    const result5 = mulMat(identity, generalMat2);
    console.log('Matrix A * Matrix B:'); result5.print();
    // Expected: [[2., 1.], [4., 2.]]
    
    // Test case 6: General matrix multiplication
    console.log('\n--- Test 6: General matrix multiplication ---');
    const matA = new Matrix([
        [3., -5.],
        [6., 8.]
    ]);
    const matB = new Matrix([
        [2., 1.],
        [4., 2.]
    ]);
    
    console.log('Matrix A:'); matA.print();
    console.log('Matrix B:'); matB.print();
    
    const result6 = mulMat(matA, matB);
    console.log('Matrix A * Matrix B:'); result6.print();
    // Expected: [[-14., -7.], [44., 22.]]
    
    // Test case 7: 3x3 matrix multiplication
    console.log('\n--- Test 7: 3x3 matrix multiplication ---');
    const mat3x3A = new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);
    const mat3x3B = new Matrix([
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1]
    ]);
    
    console.log('Matrix A:'); mat3x3A.print();
    console.log('Matrix B:'); mat3x3B.print();
    
    const result7 = mulMat(mat3x3A, mat3x3B);
    console.log('Matrix A * Matrix B:'); result7.print();
    // Expected: [[30, 24, 18], [84, 69, 54], [138, 114, 90]]
    
    // Test case 8: Error handling
    console.log('\n--- Test 8: Error handling ---');
    try {
        const wrongSizeVector = new Vector([1, 2, 3]);
        mulVec(identity, wrongSizeVector);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }
    
    try {
        const wrongSizeMatrix = new Matrix([[1, 2, 3]]);
        mulMat(identity, wrongSizeMatrix);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }
    

    const testCasesVec: [number[][], number[]][] = [
        [[ [0, 0], [0, 0] ], [1, 2]],
        [[ [1, 0], [0, 1] ], [4, 2]],
        [[ [1, 1], [1, 1] ], [4, 2]],
        [[ [2, 0], [0, 2] ], [2, 1]],
        [[ [0.5, 0], [0, 0.5] ], [4, 2]],
    ];

    for (const [matrixArr, vectorArr] of testCasesVec) {
        const matrix = new Matrix(matrixArr);
        const vector = new Vector(vectorArr);
        const result = mulVec(matrix, vector);

        console.log('Matrix:'); matrix.print();
        console.log('Vector:'); vector.print();
        console.log('Matrix * Vector:'); result.print();
        console.log('-------------------------');
    }


    console.log('✓ Exercise 07 completed successfully');
};