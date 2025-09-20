import { ex00 } from './exercises/ex00';
import { ex01 } from './exercises/ex01';
import { ex02 } from './exercises/ex02';
import { ex03 } from './exercises/ex03';
import { ex04 } from './exercises/ex04';
import { ex05 } from './exercises/ex05';
import { ex06 } from './exercises/ex06';
import { ex07 } from './exercises/ex07';
import { ex08 } from './exercises/ex08';
import { ex09 } from './exercises/ex09';
import { ex10 } from './exercises/ex10';
import { ex11 } from './exercises/ex11';
import { ex12 } from './exercises/ex12';
import { ex13 } from './exercises/ex13';
import { ex14 } from './exercises/ex14';
import { ex15 } from './exercises/ex15';

// Map exercise numbers to functions
const exercises: { [key: number]: () => void } = {
    0: ex00,
    1: ex01,
    2: ex02,
    3: ex03,
    4: ex04,
    5: ex05,
    6: ex06,
    7: ex07,
    8: ex08,
    9: ex09,
    10: ex10,
    11: ex11,
    12: ex12,
    13: ex13,
    14: ex14,
    15: ex15
};

function runSingleExercise(exerciseNumber: number): void {
    const exerciseFunc = exercises[exerciseNumber];
    
    if (!exerciseFunc) {
        console.error(`Exercise ${exerciseNumber} not found!`);
        console.log('Available exercises: 0 to 15');
        process.exit(1);
    }
    
    console.log(`=== Running Exercise ${exerciseNumber} ===\n`);
    exerciseFunc();
}

function showHelp(): void {
    console.log('Usage: ts-node runExercise.ts <exercise-number>');
    console.log('Example: ts-node runExercise.ts 0');
    console.log('Example: ts-node runExercise.ts 15');
    console.log('\nAvailable exercises:');
    console.log('0: Add, Subtract and Scale');
    console.log('1: Linear combination');
    console.log('2: Linear interpolation');
    console.log('3: Dot product');
    console.log('4: Norm');
    console.log('5: Cosine');
    console.log('6: Cross product');
    console.log('7: Matrix multiplication');
    console.log('8: Trace');
    console.log('9: Transpose');
    console.log('10: Row-echelon form');
    console.log('11: Determinant');
    console.log('12: Inverse');
    console.log('13: Rank');
    console.log('14: Projection matrix');
    console.log('15: Complex vector spaces');
}

if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
        showHelp();
        process.exit(0);
    }
    
    const exerciseNumber = parseInt(args[0]);
    
    if (isNaN(exerciseNumber)) {
        console.error('Please provide a valid exercise number!');
        showHelp();
        process.exit(1);
    }
    
    runSingleExercise(exerciseNumber);
}

export { runSingleExercise, showHelp };