import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";
import { rowEchelon } from './ex10';

/**
 * Matrix Rank
 * 
 * Computes the rank of a matrix by reducing it to row echelon form
 * and counting the number of non-zero rows. The rank represents 
 * the dimension of the vector space spanned by the rows (or columns) 
 * of the matrix.
 * 
 * Two methods are provided:
 * 1. `rank`: Uses row echelon form and counts non-zero rows.
 * 2. `rankByPivots`: Performs Gaussian elimination with pivoting 
 *    and counts the number of pivot elements (non-zero leading entries).
 */


/**
 * Computes the rank of a matrix by counting non-zero rows in row echelon form
 * @param matrix Input matrix
 * @returns Rank of the matrix
 */
export const rank = <K = Scalar>(matrix: Matrix<K>): number => {
    // Convert to row echelon form
    const ref = rowEchelon(matrix);
    const rows = ref.rows;
    const cols = ref.cols;
    
    let rank = 0;
    
    // Count non-zero rows in row echelon form
    for (let i = 0; i < rows; i++) {
        let isNonZeroRow = false;
        
        for (let j = 0; j < cols; j++) {
            const value = ref.data[i][j] as number;
            // Check if value is significantly non-zero
            const absValue = value < 0 ? -value : value;
            if (absValue > 1e-10) {
                isNonZeroRow = true;
                break;
            }
        }
        
        if (isNonZeroRow) {
            rank++;
        }
    }
    
    return rank;
};

/**
 * Alternative method using Gaussian elimination with pivot counting
 */
export const rankByPivots = <K = Scalar>(matrix: Matrix<K>): number => {
    const data = matrix.data.map(row => [...row]) as number[][];
    const rows = matrix.rows;
    const cols = matrix.cols;
    
    let rank = 0;
    let pivotCol = 0;
    
    for (let pivotRow = 0; pivotRow < rows && pivotCol < cols; pivotRow++) {
        // Find pivot in current column
        let pivotFound = false;
        let maxRow = pivotRow;
        let maxVal = 0;
        
        for (let i = pivotRow; i < rows; i++) {
            const absVal = data[i][pivotCol] < 0 ? -data[i][pivotCol] : data[i][pivotCol];
            if (absVal > maxVal) {
                maxVal = absVal;
                maxRow = i;
            }
        }
        
        // If pivot found, eliminate and count rank
        if (maxVal > 1e-10) {
            pivotFound = true;
            rank++;
            
            // Swap rows if needed
            if (maxRow !== pivotRow) {
                [data[pivotRow], data[maxRow]] = [data[maxRow], data[pivotRow]];
            }
            
            // Eliminate below
            const pivot = data[pivotRow][pivotCol];
            for (let i = pivotRow + 1; i < rows; i++) {
                const factor = data[i][pivotCol] / pivot;
                for (let j = pivotCol; j < cols; j++) {
                    data[i][j] -= factor * data[pivotRow][j];
                }
            }
            
            pivotCol++;
        } else {
            // Move to next column if no pivot in current column
            pivotCol++;
            pivotRow--; // Stay on same row
        }
    }
    
    return rank;
};

// Test function for exercise 13
export const ex13 = (): void => {
    console.log('\n=== Exercise 13 - Matrix Rank ===');
    
    // Test case 1: Full rank matrix
    console.log('\n--- Test 1: Full rank matrix ---');
    const fullRank = new Matrix([
        [1., 0., 0.],
        [0., 1., 0.],
        [0., 0., 1.]
    ]);
    
    console.log('Matrix:'); fullRank.print();
    const rank1 = rank(fullRank);
    const rank1Alt = rankByPivots(fullRank);
    console.log(`Rank = ${rank1}`);
    console.log(`Rank (pivot method) = ${rank1Alt}`);
    // Expected: 3
    
    // Test case 2: Rank deficient matrix
    console.log('\n--- Test 2: Rank deficient matrix ---');
    const rankDeficient = new Matrix([
        [1., 2., 0., 0.],
        [2., 4., 0., 0.],
        [-1., 2., 1., 1.]
    ]);
    
    console.log('Matrix:'); rankDeficient.print();
    const rank2 = rank(rankDeficient);
    const rank2Alt = rankByPivots(rankDeficient);
    console.log(`Rank = ${rank2}`);
    console.log(`Rank (pivot method) = ${rank2Alt}`);
    // Expected: 2
    
    // Test case 3: Another example
    console.log('\n--- Test 3: Another example ---');
    const matrix3 = new Matrix([
        [8., 5., -2.],
        [4., 7., 20.],
        [7., 6., 1.],
        [21., 18., 7.]
    ]);
    
    console.log('Matrix:'); matrix3.print();
    const rank3 = rank(matrix3);
    const rank3Alt = rankByPivots(matrix3);
    console.log(`Rank = ${rank3}`);
    console.log(`Rank (pivot method) = ${rank3Alt}`);
    // Expected: 3
    
    // Test case 4: Zero matrix
    console.log('\n--- Test 4: Zero matrix ---');
    const zeroMatrix = new Matrix([
        [0., 0., 0.],
        [0., 0., 0.],
        [0., 0., 0.]
    ]);
    
    console.log('Matrix:'); zeroMatrix.print();
    const rank4 = rank(zeroMatrix);
    const rank4Alt = rankByPivots(zeroMatrix);
    console.log(`Rank = ${rank4}`);
    console.log(`Rank (pivot method) = ${rank4Alt}`);
    // Expected: 0
    
    // Test case 5: Single row matrix
    console.log('\n--- Test 5: Single row matrix ---');
    const singleRow = new Matrix([[1., 2., 3.]]);
    
    console.log('Matrix:'); singleRow.print();
    const rank5 = rank(singleRow);
    const rank5Alt = rankByPivots(singleRow);
    console.log(`Rank = ${rank5}`);
    console.log(`Rank (pivot method) = ${rank5Alt}`);
    // Expected: 1
    
    // Test case 6: Linearly dependent columns
    console.log('\n--- Test 6: Linearly dependent columns ---');
    const dependentCols = new Matrix([
        [1., 2., 3.],
        [2., 4., 6.], // 2 * first column
        [3., 6., 9.]  // 3 * first column
    ]);
    
    console.log('Matrix:'); dependentCols.print();
    const rank6 = rank(dependentCols);
    const rank6Alt = rankByPivots(dependentCols);
    console.log(`Rank = ${rank6}`);
    console.log(`Rank (pivot method) = ${rank6Alt}`);
    // Expected: 1
    
  const testMatrices: number[][][] = [
        [[0, 0], [0, 0]],
        [[1, 0], [0, 1]],
        [[2, 0], [0, 2]],
        [[1, 1], [1, 1]],
        [[0, 1], [1, 0]],
        [[1, 2], [3, 4]],
        [[-7, 5], [4, 6]],
        [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    ];

    testMatrices.forEach((matrixData, index) => {
        const mat = new Matrix(matrixData);
        const r1 = rank(mat);
        const r2 = rankByPivots(mat);

        console.log(`\nTest ${index + 1}: Matrix =`);
        mat.print();
        console.log(`rank() = ${r1}`);
        console.log(`rankByPivots() = ${r2}`);
    });


    console.log('✓ Exercise 13 completed successfully');
};