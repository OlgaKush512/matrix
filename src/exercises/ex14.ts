import { Matrix } from "../core/Matrix";
import { Scalar } from "../core/types";

/**
 * 3D Projection Matrix
 *
 * This exercise demonstrates how to construct a perspective projection
 * matrix for 3D rendering. The matrix maps 3D points in camera space
 * to normalized device coordinates (NDC) suitable for rendering.
 *
 * Key concepts:
 * 1. Field of View (FOV) controls the "zoom" of the camera.
 * 2. Aspect ratio ensures objects are not distorted based on screen dimensions.
 * 3. Near and far planes define the visible depth range.
 * 4. The perspective divide (-1 in (2,3) position) projects 3D points
 *    onto the 2D screen with correct perspective foreshortening.
 *
 * Additional utilities included:
 * - identity4x4(): Identity matrix for initializing transforms.
 * - translationMatrix(x,y,z): Creates a translation matrix for moving the camera or objects.
 * - rotationMatrix(X,Y,Z): Constructs a rotation matrix from basis vectors, useful for view orientation.
 */



/**
 * Computes the projection matrix for 3D rendering
 * @param fov Field of view in radians
 * @param ratio Aspect ratio (width / height)
 * @param near Distance to near plane
 * @param far Distance to far plane
 * @returns 4x4 projection matrix in column-major order
 */
export const projection = (fov: number, ratio: number, near: number, far: number): Matrix<Scalar> => {
    // Calculate the tangent of half the field of view
    const tanHalfFov = Math.tan(fov / 2);
    
    // Create zero-filled 4x4 matrix
    const projMat = new Matrix([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]);
    
    // Perspective projection matrix formula
    projMat.data[0][0] = 1 / (ratio * tanHalfFov);  // Scale x
    projMat.data[1][1] = 1 / tanHalfFov;           // Scale y  
    projMat.data[2][2] = -(far + near) / (far - near); // Depth scale
    projMat.data[2][3] = -1;                       // Perspective divide
    projMat.data[3][2] = -(2 * far * near) / (far - near); // Depth translation
    
    return projMat;
};

/**
 * Alternative implementation using explicit formulas
 */
export const projectionExplicit = (fov: number, ratio: number, near: number, far: number): Matrix<Scalar> => {
    const tanHalfFov = Math.tan(fov / 2);
    
    const xScale = 1 / (ratio * tanHalfFov);
    const yScale = 1 / tanHalfFov;
    const zScale = -(far + near) / (far - near);
    const zTrans = -(2 * far * near) / (far - near);
    
    // Column-major order for OpenGL
    return new Matrix([
        [xScale, 0,     0,     0],
        [0,     yScale, 0,     0],
        [0,     0,     zScale, -1],
        [0,     0,     zTrans, 0]
    ]);
};

/**
 * Creates identity matrix
 */
export const identity4x4 = (): Matrix<Scalar> => {
    return new Matrix([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]);
};

/**
 * Creates translation matrix
 */
export const translationMatrix = (x: number, y: number, z: number): Matrix<Scalar> => {
    return new Matrix([
        [1, 0, 0, -x],
        [0, 1, 0, -y],
        [0, 0, 1, -z],
        [0, 0, 0, 1]
    ]);
};

/**
 * Creates rotation matrix from basis vectors
 */
export const rotationMatrix = (X: number[], Y: number[], Z: number[]): Matrix<Scalar> => {
    return new Matrix([
        [X[0], Y[0], Z[0], 0],
        [X[1], Y[1], Z[1], 0],
        [X[2], Y[2], Z[2], 0],
        [0,    0,    0,    1]
    ]);
};

// Test function for exercise 14
export const ex14 = (): void => {
    console.log('\n=== Exercise 14 - Projection Matrix ===');
    
    // Test case 1: Basic projection matrix
    console.log('\n--- Test 1: Basic projection matrix ---');
    const fov = Math.PI / 3; // 60 degrees
    const ratio = 16 / 9;    // 16:9 aspect ratio
    const near = 0.1;
    const far = 100.0;
    
    const proj = projection(fov, ratio, near, far);
    console.log('Projection matrix:'); proj.print();
    console.log(`FOV: ${fov}, Ratio: ${ratio}, Near: ${near}, Far: ${far}`);
    
    // Test case 2: Compare with explicit implementation
    console.log('\n--- Test 2: Comparison with explicit implementation ---');
    const projExplicit = projectionExplicit(fov, ratio, near, far);
    console.log('Explicit projection matrix:'); projExplicit.print();
    
    // Test case 3: Different parameters
    console.log('\n--- Test 3: Different parameters ---');
    const proj2 = projection(Math.PI / 4, 4 / 3, 0.5, 200);
    console.log('Projection matrix (45°, 4:3, near=0.5, far=200):'); proj2.print();
    
    // Test case 4: View matrix components
    console.log('\n--- Test 4: View matrix components ---');
    const cameraPos = [5, 3, 2];
    const translation = translationMatrix(cameraPos[0], cameraPos[1], cameraPos[2]);
    console.log('Translation matrix:'); translation.print();
    
    // Simple rotation: looking along negative Z axis
    const X = [1, 0, 0]; // Right vector
    const Y = [0, 1, 0]; // Up vector  
    const Z = [0, 0, -1]; // Forward vector (looking along -Z)
    const rotation = rotationMatrix(X, Y, Z);
    console.log('Rotation matrix:'); rotation.print();
    
    // Test case 5: Verify projection properties
    console.log('\n--- Test 5: Projection properties ---');
    console.log('Projection matrix should:');
    console.log('1. Scale X coordinate by 1/(ratio * tan(fov/2))');
    console.log('2. Scale Y coordinate by 1/tan(fov/2)');
    console.log('3. Map Z coordinate from [near, far] to [-1, 1] or [0, 1]');
    console.log('4. Have -1 in (2,3) position for perspective divide');
    
    const expectedXScale = 1 / (ratio * Math.tan(fov / 2));
    const expectedYScale = 1 / Math.tan(fov / 2);
    console.log(`Expected X scale: ${expectedXScale}`);
    console.log(`Actual X scale: ${proj.data[0][0]}`);
    console.log(`Expected Y scale: ${expectedYScale}`);
    console.log(`Actual Y scale: ${proj.data[1][1]}`);
    

  console.log('\n=== Test Projection Matrices ===');

    const fovs = [100, 70, 40]; // degrees
    const ratios = [1, 16/9, 4/3];
    const nearFarPairs = [
        [0.1, 100],
        [0.5, 50],
        [1, 200]
    ];

    fovs.forEach((fovDeg, i) => {
        const fovRad = (fovDeg * Math.PI) / 180; // convert to radians

        ratios.forEach((ratio) => {
            nearFarPairs.forEach(([near, far]) => {
                console.log(`\n--- Test ${i+1} ---`);
                console.log(`FoV: ${fovDeg}° (${fovRad.toFixed(4)} rad), Ratio: ${ratio}, Near: ${near}, Far: ${far}`);
                
                const projMat = projection(fovRad, ratio, near, far);
                console.log('Projection matrix:');
                projMat.print();
            });
        });
    });


    console.log('✓ Exercise 14 completed successfully');
};
