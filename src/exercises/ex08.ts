import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";

/**
 * Computes the trace of a square matrix
 * @param matrix Square matrix
 * @returns Trace of the matrix
 */
export const trace = <K = Scalar>(matrix: Matrix<K>): K => {
    if (!matrix.isSquare()) {
        throw new Error('Trace is only defined for square matrices');
    }

    let result: any = 0;
    
    for (let i = 0; i < matrix.rows; i++) {
        result += matrix.data[i][i] as any;
    }
    
    return result as K;
};

// Test function for exercise 08
export const ex08 = (): void => {
    console.log('\n=== Exercise 08 - Matrix Trace ===');
    
    // Test case 1: Identity matrix
    console.log('\n--- Test 1: Identity matrix ---');
    const identity = new Matrix([
        [1., 0.],
        [0., 1.]
    ]);
    
    console.log('Matrix:'); identity.print();
    console.log(`trace = ${trace(identity)}`);
    
    // Test case 2: 3x3 matrix
    console.log('\n--- Test 2: 3x3 matrix ---');
    const matrix3x3 = new Matrix([
        [2., -5., 0.],
        [4., 3., 7.],
        [-2., 3., 4.]
    ]);
    
    console.log('Matrix:'); matrix3x3.print();
    console.log(`trace = ${trace(matrix3x3)}`);
    
    // Test case 3: Another 3x3 matrix with negatives
    console.log('\n--- Test 3: 3x3 matrix with negatives ---');
    const matrix3x3Neg = new Matrix([
        [-2., -8., 4.],
        [1., -23., 4.],
        [0., 6., 4.]
    ]);
    
    console.log('Matrix:'); matrix3x3Neg.print();
    console.log(`trace = ${trace(matrix3x3Neg)}`);
    
    // Test case 4: 1x1 matrix
    console.log('\n--- Test 4: 1x1 matrix ---');
    const matrix1x1 = new Matrix([[5.]]);
    
    console.log('Matrix:'); matrix1x1.print();
    console.log(`trace = ${trace(matrix1x1)}`);
    
    // Test case 5: 4x4 matrix
    console.log('\n--- Test 5: 4x4 matrix ---');
    const matrix4x4 = new Matrix([
        [1., 2., 3., 4.],
        [5., 6., 7., 8.],
        [9., 10., 11., 12.],
        [13., 14., 15., 16.]
    ]);
    
    console.log('Matrix:'); matrix4x4.print();
    console.log(`trace = ${trace(matrix4x4)}`);
    
    // Test case 6: Error handling - non-square matrix
    console.log('\n--- Test 6: Error handling ---');
    try {
        const nonSquareMatrix = new Matrix([
            [1., 2., 3.],
            [4., 5., 6.]
        ]);
        trace(nonSquareMatrix);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }
    
    // Test case 7: Zero matrix
    console.log('\n--- Test 7: Zero matrix ---');
    const zeroMatrix = new Matrix([
        [0., 0.],
        [0., 0.]
    ]);
    
    console.log('Matrix:'); zeroMatrix.print();
    console.log(`trace = ${trace(zeroMatrix)}`);
    
    // Test case 8: Diagonal matrix
    console.log('\n--- Test 8: Diagonal matrix ---');
    const diagonalMatrix = new Matrix([
        [3., 0., 0.],
        [0., 7., 0.],
        [0., 0., 2.]
    ]);
    
    console.log('Matrix:'); diagonalMatrix.print();
    console.log(`trace = ${trace(diagonalMatrix)}`);


    const testMatrices: number[][][] = [
        [[0, 0], [0, 0]],
        [[1, 0], [0, 1]],
        [[1, 2], [3, 4]],
        [[8, -7], [4, 2]],
        [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    ];

    for (const arr of testMatrices) {
        const matrix = new Matrix(arr);
        console.log('Matrix:'); matrix.print();
        console.log('trace =', trace(matrix));
        console.log('-------------------------');
    }

    
    console.log('✓ Exercise 08 completed successfully');
};