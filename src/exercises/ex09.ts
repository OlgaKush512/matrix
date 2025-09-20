import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";

/**
 * Computes the transpose of a matrix
 * @param matrix Input matrix
 * @returns Transposed matrix
 */
export const transpose = <K = Scalar>(matrix: Matrix<K>): Matrix<K> => {
    const resultData: K[][] = [];
    
    // Create new matrix with swapped dimensions
    for (let j = 0; j < matrix.cols; j++) {
        const newRow: K[] = [];
        for (let i = 0; i < matrix.rows; i++) {
            newRow.push(matrix.data[i][j]);
        }
        resultData.push(newRow);
    }
    
    return new Matrix(resultData, matrix.cols, matrix.rows);
};

// Test function for exercise 09
export const ex09 = (): void => {
    console.log('\n=== Exercise 09 - Matrix Transpose ===');
    
    // Test case 1: Square matrix
    console.log('\n--- Test 1: Square matrix ---');
    const squareMatrix = new Matrix([
        [1., 2., 3.],
        [4., 5., 6.],
        [7., 8., 9.]
    ]);
    
    console.log('Original matrix:'); squareMatrix.print();
    const transposed1 = transpose(squareMatrix);
    console.log('Transposed matrix:'); transposed1.print();
    
    // Test case 2: Rectangular matrix (2x3)
    console.log('\n--- Test 2: Rectangular matrix (2x3) ---');
    const rectMatrix23 = new Matrix([
        [1., 2., 3.],
        [4., 5., 6.]
    ]);
    
    console.log('Original matrix (2x3):'); rectMatrix23.print();
    const transposed2 = transpose(rectMatrix23);
    console.log('Transposed matrix (3x2):'); transposed2.print();
    
    // Test case 3: Rectangular matrix (3x2)
    console.log('\n--- Test 3: Rectangular matrix (3x2) ---');
    const rectMatrix32 = new Matrix([
        [1., 4.],
        [2., 5.],
        [3., 6.]
    ]);
    
    console.log('Original matrix (3x2):'); rectMatrix32.print();
    const transposed3 = transpose(rectMatrix32);
    console.log('Transposed matrix (2x3):'); transposed3.print();
    
    // Test case 4: 1x1 matrix
    console.log('\n--- Test 4: 1x1 matrix ---');
    const matrix1x1 = new Matrix([[42.]]);
    
    console.log('Original matrix (1x1):'); matrix1x1.print();
    const transposed4 = transpose(matrix1x1);
    console.log('Transposed matrix (1x1):'); transposed4.print();
    
    // Test case 5: Row vector (1xn)
    console.log('\n--- Test 5: Row vector ---');
    const rowVector = new Matrix([[1., 2., 3., 4.]]);
    
    console.log('Row vector (1x4):'); rowVector.print();
    const transposed5 = transpose(rowVector);
    console.log('Transposed (column vector 4x1):'); transposed5.print();
    
    // Test case 6: Column vector (nx1)
    console.log('\n--- Test 6: Column vector ---');
    const colVector = new Matrix([
        [1.],
        [2.],
        [3.],
        [4.]
    ]);
    
    console.log('Column vector (4x1):'); colVector.print();
    const transposed6 = transpose(colVector);
    console.log('Transposed (row vector 1x4):'); transposed6.print();
    
    // Test case 7: Identity matrix (should remain unchanged)
    console.log('\n--- Test 7: Identity matrix ---');
    const identity = new Matrix([
        [1., 0., 0.],
        [0., 1., 0.],
        [0., 0., 1.]
    ]);
    
    console.log('Identity matrix:'); identity.print();
    const transposed7 = transpose(identity);
    console.log('Transposed identity matrix:'); transposed7.print();
    console.log('Identity matrix equals its transpose:', 
        identity.data.every((row, i) => row.every((val, j) => val === transposed7.data[i][j]))
    );
    
    // Test case 8: Symmetric matrix (should equal its transpose)
    console.log('\n--- Test 8: Symmetric matrix ---');
    const symmetricMatrix = new Matrix([
        [1., 2., 3.],
        [2., 4., 5.],
        [3., 5., 6.]
    ]);
    
    console.log('Symmetric matrix:'); symmetricMatrix.print();
    const transposed8 = transpose(symmetricMatrix);
    console.log('Transposed symmetric matrix:'); transposed8.print();
    console.log('Symmetric matrix equals its transpose:', 
        symmetricMatrix.data.every((row, i) => row.every((val, j) => val === transposed8.data[i][j]))
    );
    
    // Test case 9: Double transpose (should return original)
    console.log('\n--- Test 9: Double transpose ---');
    const originalMatrix = new Matrix([
        [1., 2.],
        [3., 4.],
        [5., 6.]
    ]);
    
    console.log('Original matrix:'); originalMatrix.print();
    const onceTransposed = transpose(originalMatrix);
    console.log('Once transposed:'); onceTransposed.print();
    const twiceTransposed = transpose(onceTransposed);
    console.log('Twice transposed:'); twiceTransposed.print();
    console.log('Double transpose equals original:', 
        originalMatrix.data.every((row, i) => row.every((val, j) => val === twiceTransposed.data[i][j]))
    );



     const testMatrices: number[][][] = [
        [[0, 0], [0, 0]],
        [[1, 0], [0, 1]],
        [[1, 2], [3, 4]],
        [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        [[1, 2], [3, 4], [5, 6]]
    ];

    for (const arr of testMatrices) {
        const matrix = new Matrix(arr);
        console.log('Original matrix:'); matrix.print();
        const transposed = transpose(matrix);
        console.log('Transposed matrix:'); transposed.print();
        console.log('-------------------------');
    }
    
    console.log('✓ Exercise 09 completed successfully');
};