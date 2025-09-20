import { Scalar } from "../core/types";
import { Vector } from "../core/Vector";


/**
 * Linear combination = take some vectors and multiply them by numbers,
 * then add the results together.
 *
 * Formula:
 *   Result = a1·v1 + a2·v2 + ... + ak·vk
 *
 * Example:
 *   v1 = (1,0), v2 = (0,1)
 *   2·v1 + 3·v2 = (2,3)
 *
 * All vectors must be the same length.
 */

export const linearCombination = <K = Scalar>(
    vectors: Vector<K>[],
    coefs: K[]
): Vector<K> => {
    if (vectors.length !== coefs.length) {
        throw new Error('Vectors and coefficients arrays must have the same length');
    }

    if (vectors.length === 0) {
        throw new Error('At least one vector is required');
    }

    const firstSize = vectors[0].size;
    for (let i = 1; i < vectors.length; i++) {
        if (vectors[i].size !== firstSize) {
            throw new Error('All vectors must have the same size');
        }
    }

    const resultData: K[] = new Array(firstSize).fill(0);
    
    for (let i = 0; i < vectors.length; i++) {
        const vector = vectors[i];
        const coefficient = coefs[i];
        
        for (let j = 0; j < firstSize; j++) {
            const product = (vector.data[j] as any) * (coefficient as any);
            resultData[j] = (resultData[j] as any) + product as K;
        }
    }

    return new Vector(resultData);
};


export const ex01 = (): void => {
    console.log('\n=== Exercise 01 - Linear Combination ===');
    
    console.log('\n--- Test 1: Basis vectors ---');
    const e1 = new Vector([1., 0., 0.]);
    const e2 = new Vector([0., 1., 0.]);
    const e3 = new Vector([0., 0., 1.]);
    
    console.log('e1:'); e1.print();
    console.log('e2:'); e2.print();
    console.log('e3:'); e3.print();
    
    const result1 = linearCombination([e1, e2, e3], [10., -2., 0.5]);
    console.log('10*e1 + (-2)*e2 + 0.5*e3:'); result1.print();

    console.log('\n--- Test 2: Arbitrary vectors ---');
    const v1 = new Vector([1., 2., 3.]);
    const v2 = new Vector([0., 10., -100.]);
    
    console.log('v1:'); v1.print();
    console.log('v2:'); v2.print();
    
    const result2 = linearCombination([v1, v2], [10., -2.]);
    console.log('10*v1 + (-2)*v2:'); result2.print();
    
    console.log('\n--- Test 3: Single vector ---');
    const singleResult = linearCombination([v1], [5.]);
    console.log('5*v1:'); singleResult.print();
    
    console.log('\n--- Test 4: Error handling ---');
    try {
        linearCombination([e1, e2], [1.]); 
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }
    
    try {
        const wrongSizeVector = new Vector([1, 2]);
        linearCombination([e1, wrongSizeVector], [1, 1]); // Different sizes
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', error);
        }
    }

    console.log('\n--- Basic Tests ---');
    const basicTests: [number[][], number[]][] = [
        [[[-42., 42.]], [-1.]],
        [[[-42.], [-42.], [-42.]], [-1., 1., 0.]],
        [[[-42., 42.], [1., 3.], [10., 20.]], [1., -10., -1.]],
        [[[-42., 100., -69.5], [1., 3., 5.]], [1., -10.]]
    ];

    basicTests.forEach(([vecs, coefs], idx) => {
        const vectors = vecs.map(v => new Vector(v));
        const result = linearCombination(vectors, coefs);
        console.log(`Basic Test ${idx+1}:`);
        vectors.forEach((vec, i) => {
            console.log(`v${i+1}:`); vec.print();
        });
        console.log(`coefs: [${coefs}]`);
        console.log('result:'); result.print();
    });
    
    console.log('✓ Exercise 01 completed successfully');
};