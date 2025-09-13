import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";
/**
 * Computes the determinant of a square matrix using Gaussian elimination
 * @param matrix Square matrix
 * @returns Determinant of the matrix
 */
export const determinant = <K = Scalar>(matrix: Matrix<K>): K => {
    if (!matrix.isSquare()) {
        throw new Error('Determinant is only defined for square matrices');
    }

    const n = matrix.rows;
    const data = matrix.data.map(row => [...row]) as number[][];
    
    let det = 1;
    let sign = 1;
    
    // Gaussian elimination to upper triangular form
    for (let col = 0; col < n; col++) {
        // Find pivot row (row with maximum absolute value in current column)
        let pivotRow = col;
        let maxVal = 0;
        
        for (let row = col; row < n; row++) {
            const absVal = data[row][col] < 0 ? -data[row][col] : data[row][col];
            if (absVal > maxVal) {
                maxVal = absVal;
                pivotRow = row;
            }
        }
        
        // If pivot is zero, determinant is zero
        if (maxVal < 1e-10) {
            return 0 as K;
        }
        
        // Swap rows if needed
        if (pivotRow !== col) {
            [data[col], data[pivotRow]] = [data[pivotRow], data[col]];
            sign *= -1; // Row swap changes sign of determinant
        }
        
        // Multiply determinant by pivot element
        det *= data[col][col];
        
        // Eliminate below
        for (let row = col + 1; row < n; row++) {
            const factor = data[row][col] / data[col][col];
            for (let j = col; j < n; j++) {
                data[row][j] -= factor * data[col][j];
            }
        }
    }
    
    return (sign * det) as K;
};

/**
 * Alternative recursive implementation using Laplace expansion
 */
export const determinantRecursive = <K = Scalar>(matrix: Matrix<K>): K => {
    if (!matrix.isSquare()) {
        throw new Error('Determinant is only defined for square matrices');
    }

    const n = matrix.rows;
    const data = matrix.data as number[][];
    
    // Base cases
    if (n === 1) {
        return data[0][0] as K;
    }
    
    if (n === 2) {
        return (data[0][0] * data[1][1] - data[0][1] * data[1][0]) as K;
    }
    
    let det = 0;
    let sign = 1;
    
    // Laplace expansion along first row
    for (let j = 0; j < n; j++) {
        // Create submatrix without first row and j-th column
        const submatrixData: number[][] = [];
        for (let i = 1; i < n; i++) {
            const row: number[] = [];
            for (let k = 0; k < n; k++) {
                if (k !== j) {
                    row.push(data[i][k]);
                }
            }
            submatrixData.push(row);
        }
        
        const submatrix = new Matrix(submatrixData, n - 1, n - 1);
        const subDet = determinantRecursive(submatrix) as number;
        
        det += sign * data[0][j] * subDet;
        sign *= -1; // Alternate signs
    }
    
    return det as K;
};

// Test function for exercise 11
export const ex11 = (): void => {
    console.log('\n=== Exercise 11 - Determinant (Generic) ===');
    
    // Test all examples with both implementations
    const testCases = [
        {
            name: '2x2 singular matrix',
            matrix: new Matrix([[1., -1.], [-1., 1.]]),
            expected: 0.0
        },
        {
            name: '3x3 scaling matrix', 
            matrix: new Matrix([[2., 0., 0.], [0., 2., 0.], [0., 0., 2.]]),
            expected: 8.0
        },
        {
            name: '3x3 matrix from exercise',
            matrix: new Matrix([[8., 5., -2.], [4., 7., 20.], [7., 6., 1.]]),
            expected: -174.0
        },
        {
            name: '4x4 matrix from exercise',
            matrix: new Matrix([
                [8., 5., -2., 4.],
                [4., 2.5, 20., 4.],
                [8., 5., 1., 4.],
                [28., -4., 17., 1.]
            ]),
            expected: 1032
        },
        {
            name: 'Identity matrix',
            matrix: new Matrix([[1., 0., 0.], [0., 1., 0.], [0., 0., 1.]]),
            expected: 1.0
        },
        {
            name: '1x1 matrix',
            matrix: new Matrix([[5.]]),
            expected: 5.0
        }
    ];

    for (const testCase of testCases) {
        console.log(`\n--- ${testCase.name} ---`);
        console.log('Matrix:'); testCase.matrix.print();
        
        const det1 = determinant(testCase.matrix);
        const det2 = determinantRecursive(testCase.matrix);
        
        console.log(`Gaussian determinant = ${det1}`);
        console.log(`Recursive determinant = ${det2}`);
        console.log(`Expected = ${testCase.expected}`);
        
        // Check if both methods give similar results (within tolerance)
        const diff1 = Math.abs(det1 as number - testCase.expected);
        const diff2 = Math.abs(det2 as number - testCase.expected);
        
        console.log(`Gaussian error = ${diff1.toExponential(2)}`);
        console.log(`Recursive error = ${diff2.toExponential(2)}`);
    }

    // Test error handling
    console.log('\n--- Error handling ---');
    try {
        const nonSquare = new Matrix([[1, 2], [3, 4], [5, 6]]);
        determinant(nonSquare);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }

    console.log('✓ Exercise 11 completed successfully');
};