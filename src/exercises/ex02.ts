import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";
import { Vector } from "../core/Vector";

export const lerp = <T extends Scalar | Vector<Scalar> | Matrix<Scalar>>(
    u: T,
    v: T,
    t: number
): T => {
    if (t < 0 || t > 1) {
        console.warn('Warning: t parameter should be between 0 and 1 for proper interpolation');
    }

    if (typeof u === 'number' && typeof v === 'number') {
        return (u + t * (v - u)) as T;
    }

    if (u instanceof Vector && v instanceof Vector) {
        if (u.size !== v.size) {
            throw new Error('Vectors must have the same size for interpolation');
        }

        const resultData: number[] = [];
        for (let i = 0; i < u.size; i++) {
            resultData.push(u.data[i] + t * (v.data[i] - u.data[i]));
        }
        return new Vector(resultData) as T;
    }

    if (u instanceof Matrix && v instanceof Matrix) {
        if (u.rows !== v.rows || u.cols !== v.cols) {
            throw new Error('Matrices must have the same dimensions for interpolation');
        }

        const resultData: number[][] = [];
        for (let i = 0; i < u.rows; i++) {
            const row: number[] = [];
            for (let j = 0; j < u.cols; j++) {
                row.push(u.data[i][j] + t * (v.data[i][j] - u.data[i][j]));
            }
            resultData.push(row);
        }
        return new Matrix(resultData, u.rows, u.cols) as T;
    }

    throw new Error('Unsupported types for interpolation');
};

export const ex02 = (): void => {
    console.log('\n=== Exercise 02 - Linear Interpolation ===');
    
    console.log('\n--- Test 1: Scalar interpolation ---');
    console.log(`lerp(0., 1., 0.) = ${lerp(0, 1, 0)}`);
    console.log(`lerp(0., 1., 1.) = ${lerp(0, 1, 1)}`);
    console.log(`lerp(0., 1., 0.5) = ${lerp(0, 1, 0.5)}`);
    console.log(`lerp(21., 42., 0.3) = ${lerp(21, 42, 0.3)}`);
    
    console.log('\n--- Test 2: Vector interpolation ---');
    const vec1 = new Vector([2., 1.]);
    const vec2 = new Vector([4., 2.]);
    
    console.log('Vector 1:'); vec1.print();
    console.log('Vector 2:'); vec2.print();
    
    const vecResult = lerp(vec1, vec2, 0.3);
    console.log('lerp(vector1, vector2, 0.3):'); vecResult.print();
    
    console.log('\n--- Test 3: Matrix interpolation ---');
    const mat1 = new Matrix([[2., 1.], [3., 4.]]);
    const mat2 = new Matrix([[20., 10.], [30., 40.]]);
    
    console.log('Matrix 1:'); mat1.print();
    console.log('Matrix 2:'); mat2.print();
    
    const matResult = lerp(mat1, mat2, 0.5);
    console.log('lerp(matrix1, matrix2, 0.5):'); matResult.print();
    
    console.log('\n--- Test 4: Edge cases ---');
    console.log(`t = 0: ${lerp(10, 20, 0)}`); 
    console.log(`t = 1: ${lerp(10, 20, 1)}`);
    console.log(`t = 0.5: ${lerp(10, 20, 0.5)}`); 
    
    console.log('\n--- Test 5: Error handling ---');
    try {
        const wrongSizeVector = new Vector([1, 2, 3]);
        lerp(vec1, wrongSizeVector, 0.5);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }
    
    try {
        const wrongSizeMatrix = new Matrix([[1, 2]]);
        lerp(mat1, wrongSizeMatrix, 0.5);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }
    
    console.log('✓ Exercise 02 completed successfully');
};