import { Scalar } from "../core/types";
import { Vector } from "../core/Vector";

export const dot = <K = Scalar>(u: Vector<K>, v: Vector<K>): K => {
    if (u.size !== v.size) {
        throw new Error('Vectors must have the same dimension for dot product');
    }

    let result: any = 0;
    
    for (let i = 0; i < u.size; i++) {
        result += (u.data[i] as any) * (v.data[i] as any);
    }
    
    return result as K;
};

export const ex03 = (): void => {
    console.log('\n=== Exercise 03 - Dot Product ===');
    
    console.log('\n--- Test 1: Orthogonal vectors ---');
    const u1 = new Vector([0., 0.]);
    const v1 = new Vector([1., 1.]);
    
    console.log('Vector u:'); u1.print();
    console.log('Vector v:'); v1.print();
    console.log(`dot(u, v) = ${dot(u1, v1)}`);
    console.log('\n--- Test 2: Same vectors ---');
    const u2 = new Vector([1., 1.]);
    const v2 = new Vector([1., 1.]);
    
    console.log('Vector u:'); u2.print();
    console.log('Vector v:'); v2.print();
    console.log(`dot(u, v) = ${dot(u2, v2)}`);
    
    console.log('\n--- Test 3: Arbitrary vectors ---');
    const u3 = new Vector([-1., 6.]);
    const v3 = new Vector([3., 2.]);
    
    console.log('Vector u:'); u3.print();
    console.log('Vector v:'); v3.print();
    console.log(`dot(u, v) = ${dot(u3, v3)}`);
    
    console.log('\n--- Test 4: 3D vectors ---');
    const u4 = new Vector([1., 2., 3.]);
    const v4 = new Vector([4., 5., 6.]);
    
    console.log('Vector u:'); u4.print();
    console.log('Vector v:'); v4.print();
    console.log(`dot(u, v) = ${dot(u4, v4)}`);
    
    console.log('\n--- Test 5: Error handling ---');
    try {
        const wrongSizeVector = new Vector([1, 2, 3]);
        dot(u1, wrongSizeVector);
        console.log('ERROR: Should have thrown an exception');
    } catch (error) {
        if (error instanceof Error) {
            console.log('✓ Correctly caught error:', error.message);
        } else {
            console.log('✓ Correctly caught error:', String(error));
        }
    }
    
    console.log('✓ Exercise 03 completed successfully');
};