import { Scalar } from "../core/types";
import { Vector } from "../core/Vector";

/**
 * Computes the cross product of two 3-dimensional vectors
 * @param u First 3D vector
 * @param v Second 3D vector
 * @returns Cross product vector
 */
export const crossProduct = <K = Scalar>(u: Vector<K>, v: Vector<K>): Vector<K> => {
    // Check if vectors are 3-dimensional
    if (u.size !== 3 || v.size !== 3) {
        throw new Error('Cross product is only defined for 3-dimensional vectors');
    }

    const u1 = u.data[0] as number;
    const u2 = u.data[1] as number;
    const u3 = u.data[2] as number;
    
    const v1 = v.data[0] as number;
    const v2 = v.data[1] as number;
    const v3 = v.data[2] as number;

    // Cross product formula:
    // u × v = (u2*v3 - u3*v2, u3*v1 - u1*v3, u1*v2 - u2*v1)
    const resultData: K[] = [
        (u2 * v3 - u3 * v2) as K,
        (u3 * v1 - u1 * v3) as K,
        (u1 * v2 - u2 * v1) as K
    ];

    return new Vector(resultData);
};

// Test function for exercise 06
export const ex06 = (): void => {
    console.log('\n=== Exercise 06 - Cross Product ===');
    
    // Test case 1: Basic cross product (z × x = y)
    console.log('\n--- Test 1: Basic cross product ---');
    const u1 = new Vector([0., 0., 1.]); // z-axis
    const v1 = new Vector([1., 0., 0.]); // x-axis
    
    console.log('Vector u (z-axis):'); u1.print();
    console.log('Vector v (x-axis):'); v1.print();
    
    const result1 = crossProduct(u1, v1);
    console.log('u × v (should be y-axis):'); result1.print();
    // Expected: [0., 1., 0.] (y-axis)
    
    // Test case 2: Example from exercise
    console.log('\n--- Test 2: Exercise example ---');
    const u2 = new Vector([1., 2., 3.]);
    const v2 = new Vector([4., 5., 6.]);
    
    console.log('Vector u:'); u2.print();
    console.log('Vector v:'); v2.print();
    
    const result2 = crossProduct(u2, v2);
    console.log('u × v:'); result2.print();
    // Expected: [-3., 6., -3.]
    
    // Test case 3: Another example from exercise
    console.log('\n--- Test 3: Another example ---');
    const u3 = new Vector([4., 2., -3.]);
    const v3 = new Vector([-2., -5., 16.]);
    
    console.log('Vector u:'); u3.print();
    console.log('Vector v:'); v3.print();
    
    const result3 = crossProduct(u3, v3);
    console.log('u × v:'); result3.print();
    // Expected: [17., -58., -16.]
    
    // Test case 4: Anticommutativity property
    console.log('\n--- Test 4: Anticommutativity ---');
    const result4a = crossProduct(u2, v2);
    const result4b = crossProduct(v2, u2);
    
    console.log('u × v:'); result4a.print();
    console.log('v × u:'); result4b.print();
    console.log('u × v should equal -(v × u)');
    
    // Check if u × v = -(v × u)
    const negativeResult4b = new Vector([
        - (result4b.data[0] as number),
        - (result4b.data[1] as number),
        - (result4b.data[2] as number)
    ]);
    console.log('-(v × u):'); negativeResult4b.print();
    console.log('u × v equals -(v × u):', 
        result4a.data[0] === negativeResult4b.data[0] &&
        result4a.data[1] === negativeResult4b.data[1] &&
        result4a.data[2] === negativeResult4b.data[2]
    );
    
    // Test case 5: Orthogonality property
    console.log('\n--- Test 5: Orthogonality ---');
    // Cross product should be orthogonal to both input vectors
    // We can check this using dot product (should be 0)
    const dotWithU = (result2.data[0] as number) * u2.data[0] + 
                    (result2.data[1] as number) * u2.data[1] + 
                    (result2.data[2] as number) * u2.data[2];
    
    const dotWithV = (result2.data[0] as number) * v2.data[0] + 
                    (result2.data[1] as number) * v2.data[1] + 
                    (result2.data[2] as number) * v2.data[2];
    
    console.log('(u × v) · u ≈', dotWithU.toFixed(10));
    console.log('(u × v) · v ≈', dotWithV.toFixed(10));
    console.log('Both should be approximately 0 (orthogonal)');
    
    // Test case 6: Error handling
    console.log('\n--- Test 6: Error handling ---');
    try {
        const wrongSizeVector = new Vector([1, 2]);
        crossProduct(u1, wrongSizeVector);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }
    
    try {
        const wrongSizeVector2 = new Vector([1, 2, 3, 4]);
        crossProduct(u1, wrongSizeVector2);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }


    const testCases: [number[], number[]][] = [
        [[0, 0, 0], [0, 0, 0]],
        [[1, 0, 0], [0, 0, 0]],
        [[1, 0, 0], [0, 1, 0]],
        [[8, 7, -4], [3, 2, 1]],
        [[1, 1, 1], [0, 0, 0]],
        [[1, 1, 1], [1, 1, 1]],
    ];

    for (const [uArr, vArr] of testCases) {
        const u = new Vector(uArr);
        const v = new Vector(vArr);
        const result = crossProduct(u, v);

        console.log('u:'); u.print();
        console.log('v:'); v.print();
        console.log('crossProduct(u, v):'); result.print();
        console.log('-------------------------');
    }
    
    console.log('✓ Exercise 06 completed successfully');
};