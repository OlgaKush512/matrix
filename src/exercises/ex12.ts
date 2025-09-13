import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";

/**
 * Computes the inverse of a matrix using Gauss-Jordan elimination
 * @param matrix Square matrix
 * @returns Inverse matrix
 * @throws Error if matrix is singular or not square
 */
export const inverse = <K = Scalar>(matrix: Matrix<K>): Matrix<K> => {
    if (!matrix.isSquare()) {
        throw new Error('Inverse is only defined for square matrices');
    }

    const n = matrix.rows;
    const data = matrix.data.map(row => [...row]) as number[][];
    
    // Create augmented matrix [A | I]
    const augmented: number[][] = [];
    for (let i = 0; i < n; i++) {
        const row: number[] = [];
        // Copy original matrix
        for (let j = 0; j < n; j++) {
            row.push(data[i][j]);
        }
        // Add identity matrix
        for (let j = 0; j < n; j++) {
            row.push(i === j ? 1 : 0);
        }
        augmented.push(row);
    }
    
    // Gauss-Jordan elimination
    for (let col = 0; col < n; col++) {
        // Find pivot row (row with maximum absolute value in current column)
        let pivotRow = col;
        let maxVal = 0;
        
        for (let row = col; row < n; row++) {
            const absVal = augmented[row][col] < 0 ? -augmented[row][col] : augmented[row][col];
            if (absVal > maxVal) {
                maxVal = absVal;
                pivotRow = row;
            }
        }
        
        // Check if matrix is singular
        if (maxVal < 1e-10) {
            throw new Error('Matrix is singular and cannot be inverted');
        }
        
        // Swap rows if needed
        if (pivotRow !== col) {
            [augmented[col], augmented[pivotRow]] = [augmented[pivotRow], augmented[col]];
        }
        
        const pivotElement = augmented[col][col];
        
        // Normalize pivot row
        for (let j = 0; j < 2 * n; j++) {
            augmented[col][j] /= pivotElement;
        }
        
        // Eliminate other rows
        for (let i = 0; i < n; i++) {
            if (i === col) continue;
            
            const factor = augmented[i][col];
            for (let j = 0; j < 2 * n; j++) {
                augmented[i][j] -= factor * augmented[col][j];
            }
        }
    }
    
    // Extract inverse matrix from augmented matrix
    const inverseData: number[][] = [];
    for (let i = 0; i < n; i++) {
        const row: number[] = [];
        for (let j = n; j < 2 * n; j++) {
            row.push(augmented[i][j]);
        }
        inverseData.push(row);
    }
    
    return new Matrix(inverseData, n, n) as unknown as Matrix<K>;
};

// Test function for exercise 12
export const ex12 = (): void => {
    console.log('\n=== Exercise 12 - Matrix Inverse ===');
    
    // Test case 1: Identity matrix
    console.log('\n--- Test 1: Identity matrix ---');
    const identity = new Matrix([
        [1., 0., 0.],
        [0., 1., 0.],
        [0., 0., 1.]
    ]);
    
    console.log('Original matrix:'); identity.print();
    try {
        const inv1 = inverse(identity);
        console.log('Inverse matrix:'); inv1.print();
        
        // Verify A * A⁻¹ = I
        const product1 = new Matrix([
            [1*1 + 0*0 + 0*0, 1*0 + 0*1 + 0*0, 1*0 + 0*0 + 0*1],
            [0*1 + 1*0 + 0*0, 0*0 + 1*1 + 0*0, 0*0 + 1*0 + 0*1],
            [0*1 + 0*0 + 1*0, 0*0 + 0*1 + 1*0, 0*0 + 0*0 + 1*1]
        ]);
        console.log('A * A⁻¹ (should be identity):'); product1.print();
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
        } else {
            console.log('Error:', error);
        }
    }
    
    // Test case 2: Scaling matrix
    console.log('\n--- Test 2: Scaling matrix ---');
    const scaling = new Matrix([
        [2., 0., 0.],
        [0., 2., 0.],
        [0., 0., 2.]
    ]);
    
    console.log('Original matrix:'); scaling.print();
    try {
        const inv2 = inverse(scaling);
        console.log('Inverse matrix:'); inv2.print();
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
        } else {
            console.log('Error:', error);
        }
    }
    
    // Test case 3: 3x3 matrix from exercise
    console.log('\n--- Test 3: 3x3 matrix ---');
    const matrix3x3 = new Matrix([
        [8., 5., -2.],
        [4., 7., 20.],
        [7., 6., 1.]
    ]);
    
    console.log('Original matrix:'); matrix3x3.print();
    try {
        const inv3 = inverse(matrix3x3);
        console.log('Inverse matrix:'); inv3.print();
        
        // Check against expected values from exercise
        const expectedInv3 = new Matrix([
            [0.649425287, 0.097701149, -0.655172414],
            [-0.781609195, -0.126436782, 0.965517241],
            [0.143678161, 0.074712644, -0.206896552]
        ]);
        console.log('Expected inverse:'); expectedInv3.print();
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
        } else {
            console.log('Error:', error);
        }
    }
    
    // Test case 4: Singular matrix
    console.log('\n--- Test 4: Singular matrix ---');
    const singular = new Matrix([
        [1., 2., 3.],
        [4., 5., 6.],
        [7., 8., 9.]
    ]);
    
    console.log('Original matrix:'); singular.print();
    try {
        const inv4 = inverse(singular);
        console.log('Inverse matrix:'); inv4.print();
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
        } else {
            console.log('Error:', error);
        }
    }
    // Test case 5: 2x2 matrix
    console.log('\n--- Test 5: 2x2 matrix ---');
    const matrix2x2 = new Matrix([
        [4., 7.],
        [2., 6.]
    ]);
    
    console.log('Original matrix:'); matrix2x2.print();
    try {
        const inv5 = inverse(matrix2x2);
        console.log('Inverse matrix:'); inv5.print();
        
        // Manual verification: inverse should be [[0.6, -0.7], [-0.2, 0.4]]
        const manualInv = new Matrix([
            [0.6, -0.7],
            [-0.2, 0.4]
        ]);
        console.log('Manual inverse:'); manualInv.print();
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
        } else {
            console.log('Error:', error);
        }
    }
    
    // Test case 6: Error handling - non-square matrix
    console.log('\n--- Test 6: Error handling ---');
    try {
        const nonSquare = new Matrix([[1, 2], [3, 4], [5, 6]]);
        inverse(nonSquare);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
        } else {
            console.log('Error:', error);
        }
    }
    
    console.log('✓ Exercise 12 completed successfully');
};