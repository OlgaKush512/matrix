import { Scalar } from "../core/types";
import { Vector } from "../core/Vector";


/**
 * Vector norms = measure of vector size in different ways.
 *
 * 1-norm (Manhattan): sum of absolute values
 *   ||v||₁ = |v1| + |v2| + ... + |vn|
 *
 * 2-norm (Euclidean): square root of sum of squares
 *   ||v||₂ = √(v1² + v2² + ... + vn²)
 *
 * Infinity-norm (Max): largest absolute value
 *   ||v||∞ = max(|v1|, |v2|, ..., |vn|)
 *
 * Example:
 *   v = [3, -4] → 1-norm=7, 2-norm=5, ∞-norm=4
 */


/**
 * Computes the 1-norm (Manhattan norm) of a vector
 * @param v Vector
 * @returns 1-norm value
 */
export const norm1 = <K = Scalar>(v: Vector<K>): number => {
    let result = 0;
    
    for (let i = 0; i < v.size; i++) {
        result += Math.abs(v.data[i] as number);
    }
    
    return result;
};

/**
 * Computes the 2-norm (Euclidean norm) of a vector
 * @param v Vector
 * @returns 2-norm value
 */
export const norm2 = <K = Scalar>(v: Vector<K>): number => {
    let sumOfSquares = 0;
    
    for (let i = 0; i < v.size; i++) {
        const value = v.data[i] as number;
        sumOfSquares += value * value; // Using fused multiply-add approach
    }
    
    return Math.sqrt(sumOfSquares);
};

/**
 * Computes the infinity-norm (supremum norm) of a vector
 * @param v Vector
 * @returns Infinity-norm value
 */
export const normInf = <K = Scalar>(v: Vector<K>): number => {
    if (v.size === 0) return 0;
    
    let maxAbs = Math.abs(v.data[0] as number);
    
    for (let i = 1; i < v.size; i++) {
        const absValue = Math.abs(v.data[i] as number);
        if (absValue > maxAbs) {
            maxAbs = absValue;
        }
    }
    
    return maxAbs;
};

export const ex04 = (): void => {
    console.log('\n=== Exercise 04 - Vector Norms ===');
    
    // Test case 1: Zero vector
    console.log('\n--- Test 1: Zero vector ---');
    const zeroVec = new Vector([0., 0., 0.]);
    zeroVec.print();
    console.log(`1-norm: ${norm1(zeroVec)}`);
    console.log(`2-norm: ${norm2(zeroVec)}`);
    console.log(`∞-norm: ${normInf(zeroVec)}`);
    // Expected: 0.0, 0.0, 0.0
    
    // Test case 2: Positive vector
    console.log('\n--- Test 2: Positive vector ---');
    const posVec = new Vector([1., 2., 3.]);
    posVec.print();
    console.log(`1-norm: ${norm1(posVec)}`);
    console.log(`2-norm: ${norm2(posVec).toFixed(8)}`);
    console.log(`∞-norm: ${normInf(posVec)}`);
    // Expected: 6.0, 3.74165738, 3.0
    
    // Test case 3: Negative vector
    console.log('\n--- Test 3: Negative vector ---');
    const negVec = new Vector([-1., -2.]);
    negVec.print();
    console.log(`1-norm: ${norm1(negVec)}`);
    console.log(`2-norm: ${norm2(negVec).toFixed(9)}`);
    console.log(`∞-norm: ${normInf(negVec)}`);
    // Expected: 3.0, 2.236067977, 2.0
    
    // Test case 4: Mixed signs vector
    console.log('\n--- Test 4: Mixed signs vector ---');
    const mixedVec = new Vector([-5., 3., -2., 4.]);
    mixedVec.print();
    console.log(`1-norm: ${norm1(mixedVec)}`);
    console.log(`2-norm: ${norm2(mixedVec).toFixed(8)}`);
    console.log(`∞-norm: ${normInf(mixedVec)}`);
    
    // Test case 5: Single element vector
    console.log('\n--- Test 5: Single element vector ---');
    const singleVec = new Vector([-7.]);
    singleVec.print();
    console.log(`1-norm: ${norm1(singleVec)}`);
    console.log(`2-norm: ${norm2(singleVec)}`);
    console.log(`∞-norm: ${normInf(singleVec)}`);
    // All norms should be 7.0
    
    // Test case 6: Large values
    console.log('\n--- Test 6: Large values ---');
    const largeVec = new Vector([1000., -2000., 1500.]);
    largeVec.print();
    console.log(`1-norm: ${norm1(largeVec)}`);
    console.log(`2-norm: ${norm2(largeVec).toFixed(2)}`);
    console.log(`∞-norm: ${normInf(largeVec)}`);
    


 console.log('\n--- Euclidean norm (2-norm) ---');
    console.log("norm2([0]) =", norm2(new Vector([0])));
    console.log("norm2([1]) =", norm2(new Vector([1])));
    console.log("norm2([0, 0]) =", norm2(new Vector([0, 0])));
    console.log("norm2([1, 0]) =", norm2(new Vector([1, 0])));
    console.log("norm2([2, 1]) =", norm2(new Vector([2, 1])).toFixed(9)); // 2.236067977
    console.log("norm2([4, 2]) =", norm2(new Vector([4, 2])).toFixed(9)); // 4.472135955
    console.log("norm2([-4, -2]) =", norm2(new Vector([-4, -2])).toFixed(9)); // 4.472135955

    console.log('\n--- Manhattan norm (1-norm) ---');
    console.log("norm1([0]) =", norm1(new Vector([0])));
    console.log("norm1([1]) =", norm1(new Vector([1])));
    console.log("norm1([0, 0]) =", norm1(new Vector([0, 0])));
    console.log("norm1([1, 0]) =", norm1(new Vector([1, 0])));
    console.log("norm1([2, 1]) =", norm1(new Vector([2, 1]))); // 3
    console.log("norm1([4, 2]) =", norm1(new Vector([4, 2]))); // 6
    console.log("norm1([-4, -2]) =", norm1(new Vector([-4, -2]))); // 6

    console.log('\n--- Supremum norm (∞-norm) ---');
    console.log("normInf([0]) =", normInf(new Vector([0]))); // 0
    console.log("normInf([1]) =", normInf(new Vector([1]))); // 1
    console.log("normInf([0, 0]) =", normInf(new Vector([0, 0]))); // 0
    console.log("normInf([1, 0]) =", normInf(new Vector([1, 0]))); // 1
    console.log("normInf([2, 1]) =", normInf(new Vector([2, 1]))); // 2
    console.log("normInf([4, 2]) =", normInf(new Vector([4, 2]))); // 4
    console.log("normInf([-4, -2]) =", normInf(new Vector([-4, -2]))); // 4


    console.log('✓ Exercise 04 completed successfully');
};