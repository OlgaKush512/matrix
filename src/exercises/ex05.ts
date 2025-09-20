import { Scalar } from '../core/types';
import { Vector } from '../core/Vector';
import { dot } from './ex03';
import { norm2 } from './ex04';

/**
 * Computes the cosine of the angle between two vectors
 * @param u First vector
 * @param v Second vector
 * @returns Cosine of the angle between u and v
 */
export const angleCos = <K = Scalar>(u: Vector<K>, v: Vector<K>): number => {
    if (u.size !== v.size) {
        throw new Error('Vectors must have the same dimension for cosine calculation');
    }

    // Check for zero vectors (undefined behavior per exercise)
    const uNorm = norm2(u);
    const vNorm = norm2(v);
    
    if (uNorm === 0 || vNorm === 0) {
        throw new Error('Cannot compute cosine for zero vectors (undefined behavior)');
    }

    // Cosine formula: cos(θ) = (u·v) / (||u|| * ||v||)
    const dotProduct = dot(u, v) as number;
    return dotProduct / (uNorm * vNorm);
};

// Test function for exercise 05
export const ex05 = (): void => {
    console.log('\n=== Exercise 05 - Cosine of Angle ===');
    
    // Test case 1: Same direction vectors
    console.log('\n--- Test 1: Same direction vectors ---');
    const u1 = new Vector([1., 0.]);
    const v1 = new Vector([1., 0.]);
    
    console.log('Vector u:'); u1.print();
    console.log('Vector v:'); v1.print();
    console.log(`angle_cos(u, v) = ${angleCos(u1, v1)}`);
    // Expected: 1.0
    
    // Test case 2: Orthogonal vectors
    console.log('\n--- Test 2: Orthogonal vectors ---');
    const u2 = new Vector([1., 0.]);
    const v2 = new Vector([0., 1.]);
    
    console.log('Vector u:'); u2.print();
    console.log('Vector v:'); v2.print();
    console.log(`angle_cos(u, v) = ${angleCos(u2, v2)}`);
    // Expected: 0.0
    
    // Test case 3: Opposite direction vectors
    console.log('\n--- Test 3: Opposite direction vectors ---');
    const u3 = new Vector([-1., 1.]);
    const v3 = new Vector([1., -1.]);
    
    console.log('Vector u:'); u3.print();
    console.log('Vector v:'); v3.print();
    console.log(`angle_cos(u, v) = ${angleCos(u3, v3)}`);
    // Expected: -1.0
    
    // Test case 4: Colinear vectors (scaled)
    console.log('\n--- Test 4: Colinear vectors ---');
    const u4 = new Vector([2., 1.]);
    const v4 = new Vector([4., 2.]); // v = 2 * u
    
    console.log('Vector u:'); u4.print();
    console.log('Vector v:'); v4.print();
    console.log(`angle_cos(u, v) = ${angleCos(u4, v4)}`);
    // Expected: 1.0
    
    // Test case 5: 3D vectors
    console.log('\n--- Test 5: 3D vectors ---');
    const u5 = new Vector([1., 2., 3.]);
    const v5 = new Vector([4., 5., 6.]);
    
    console.log('Vector u:'); u5.print();
    console.log('Vector v:'); v5.print();
    console.log(`angle_cos(u, v) = ${angleCos(u5, v5).toFixed(9)}`);
    // Expected: 0.974631846
    
    // Test case 6: Acute angle
    console.log('\n--- Test 6: Acute angle ---');
    const u6 = new Vector([1., 0.]);
    const v6 = new Vector([1., 1.]);
    
    console.log('Vector u:'); u6.print();
    console.log('Vector v:'); v6.print();
    console.log(`angle_cos(u, v) = ${angleCos(u6, v6).toFixed(6)}`);
    // Expected: cos(45°) = √2/2 ≈ 0.707107
    
    // Test case 7: Error handling
    console.log('\n--- Test 7: Error handling ---');
    try {
        const wrongSizeVector = new Vector([1, 2, 3]);
        angleCos(u1, wrongSizeVector);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught dimension error:', error.message);
        } else {
            console.log('✓ Correctly caught dimension error:', error);
        }
    }
    
    try {
        const zeroVector = new Vector([0., 0.]);
        angleCos(u1, zeroVector);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught zero vector error:', error.message);
        } else {
            console.log('✓ Correctly caught zero vector error:', error);
        }
    }

     const tests: [number[], number[]][] = [
        [[1, 0], [0, 1]],           
        [[8, 7], [3, 2]],           
        [[1, 1], [1, 1]],           
        [[4, 2], [1, 1]],           
        [[-7, 3], [6, 4]],          
    ];

    for (const [uArr, vArr] of tests) {
        const u = new Vector(uArr);
        const v = new Vector(vArr);

        const result1 = angleCos(u, v);
        const result2 = angleCos(v, u); 

        console.log(`angle_cos(${JSON.stringify(uArr)}, ${JSON.stringify(vArr)}) = ${result1}`);
        console.log(`angle_cos(${JSON.stringify(vArr)}, ${JSON.stringify(uArr)}) = ${result2}`);
    }

    
    console.log('✓ Exercise 05 completed successfully');
};