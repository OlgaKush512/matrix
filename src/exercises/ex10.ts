import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";


/**
 * Row Echelon Form
 * 
 * Converts a matrix to row-echelon form using Gaussian elimination.
 * Each pivot element is the largest absolute value in its column, rows
 * are swapped if needed, and pivot rows are normalized to 1. All entries
 * below (or above, for full elimination) the pivot are zeroed. Formula:
 * R_i → R_i - (a_ij / a_jj) * R_j. Useful for solving linear systems,
 * computing rank, or finding inverses.
 */

/**
 * Computes the absolute value of a number without Math.abs
 */
const abs = (x: number): number => {
    return x < 0 ? -x : x;
};

/**
 * Finds the maximum value in an array without Math.max
 */
const findMaxIndex = (arr: number[], start: number): number => {
    let maxIndex = start;
    let maxValue = abs(arr[start]);
    
    for (let i = start + 1; i < arr.length; i++) {
        const currentAbs = abs(arr[i]);
        if (currentAbs > maxValue) {
            maxValue = currentAbs;
            maxIndex = i;
        }
    }
    return maxIndex;
};

/**
 * Computes the row-echelon form of a matrix using Gaussian elimination
 * @param matrix Input matrix
 * @returns Matrix in row-echelon form
 */
export const rowEchelon = <K = Scalar>(matrix: Matrix<K>): Matrix<K> => {
    // Create a copy of the matrix to avoid modifying the original
    const result = new Matrix(matrix.data.map(row => [...row]), matrix.rows, matrix.cols);
    const rows = result.rows;
    const cols = result.cols;
    
    let pivotRow = 0;
    let pivotCol = 0;
    
    while (pivotRow < rows && pivotCol < cols) {
        // Extract current column as numbers for pivot search
        const currentColumn: number[] = [];
        for (let i = pivotRow; i < rows; i++) {
            currentColumn.push(result.data[i][pivotCol] as number);
        }
        
        // Find the pivot row (row with largest absolute value in current column)
        const maxIndex = findMaxIndex(currentColumn, 0);
        const maxRow = pivotRow + maxIndex;
        const pivotValue = result.data[maxRow][pivotCol] as number;
        
        // If the pivot element is zero (within tolerance), move to next column
        if (abs(pivotValue) < 1e-10) {
            pivotCol++;
            continue;
        }
        
        // Swap the current row with the pivot row
        if (maxRow !== pivotRow) {
            const temp = result.data[pivotRow];
            result.data[pivotRow] = result.data[maxRow];
            result.data[maxRow] = temp;
        }
        
        const pivotElement = result.data[pivotRow][pivotCol] as number;
        
        // Normalize the pivot row (make pivot element 1)
        for (let j = pivotCol; j < cols; j++) {
            result.data[pivotRow][j] = (result.data[pivotRow][j] as number) / pivotElement as K;
        }
        
        // Eliminate other rows
        for (let i = 0; i < rows; i++) {
            if (i === pivotRow) continue;
            
            const factor = result.data[i][pivotCol] as number;
            for (let j = pivotCol; j < cols; j++) {
                const valueToSubtract = factor * (result.data[pivotRow][j] as number);
                result.data[i][j] = (result.data[i][j] as number) - valueToSubtract as K;
            }
        }
        
        pivotRow++;
        pivotCol++;
    }
    
    return result;
};

// Test function for exercise 10
export const ex10 = (): void => {
    console.log('\n=== Exercise 10 - Row Echelon Form ===');
    
    // Test case 1: Identity matrix
    console.log('\n--- Test 1: Identity matrix ---');
    const identity = new Matrix([
        [1., 0., 0.],
        [0., 1., 0.],
        [0., 0., 1.]
    ]);
    
    console.log('Original matrix:'); identity.print();
    const ref1 = rowEchelon(identity);
    console.log('Row echelon form:'); ref1.print();
    
    // Test case 2: 2x2 invertible matrix
    console.log('\n--- Test 2: 2x2 invertible matrix ---');
    const matrix2x2 = new Matrix([
        [1., 2.],
        [3., 4.]
    ]);
    
    console.log('Original matrix:'); matrix2x2.print();
    const ref2 = rowEchelon(matrix2x2);
    console.log('Row echelon form:'); ref2.print();
    
    // Test case 3: Singular matrix
    console.log('\n--- Test 3: Singular matrix ---');
    const singular = new Matrix([
        [1., 2.],
        [2., 4.]
    ]);
    
    console.log('Original matrix:'); singular.print();
    const ref3 = rowEchelon(singular);
    console.log('Row echelon form:'); ref3.print();
    
    // Test case 4: Complex example from exercise
    console.log('\n--- Test 4: Complex example ---');
    const complexMatrix = new Matrix([
        [8., 5., -2., 4., 28.],
        [4., 2.5, 20., 4., -4.],
        [8., 5., 1., 4., 17.]
    ]);
    
    console.log('Original matrix:'); complexMatrix.print();
    const ref4 = rowEchelon(complexMatrix);
    console.log('Row echelon form:'); ref4.print();
    
    // Test case 5: Zero matrix
    console.log('\n--- Test 5: Zero matrix ---');
    const zeroMatrix = new Matrix([
        [0., 0., 0.],
        [0., 0., 0.],
        [0., 0., 0.]
    ]);
    
    console.log('Original matrix:'); zeroMatrix.print();
    const ref5 = rowEchelon(zeroMatrix);
    console.log('Row echelon form:'); ref5.print();
    

    const testMatrices: number[][][] = [
        [[0, 0], [0, 0]],
        [[1, 0], [0, 1]],
        [[4, 2], [2, 1]],
        [[-7, 2], [4, 8]],
        [[1, 2], [4, 8]]
    ];

    for (const arr of testMatrices) {
        const matrix = new Matrix(arr);
        console.log('Original matrix:'); matrix.print();
        const ref = rowEchelon(matrix);
        console.log('Row echelon form:'); ref.print();
        console.log('-------------------------');
    }

    console.log('✓ Exercise 10 completed successfully');
};