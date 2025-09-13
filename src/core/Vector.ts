import { Matrix } from './Matrix';
import { Scalar, VectorData } from './types';

export class Vector<K = Scalar> {
    public readonly data: K[];
    public readonly size: number;

    constructor(data: K[]) {
        this.data = [...data];
        this.size = data.length;
    }

    getSize(): number {
        return this.size;
    }

    print(): void {
        console.log('Vector:', this.data.join(', '));
    }

    toMatrix(rows: number, cols: number): Matrix<K> {
        if (this.size !== rows * cols) {
            throw new Error('Invalid dimensions for conversion');
        }
        
        const matrixData: K[][] = [];
        for (let i = 0; i < rows; i++) {
            matrixData.push(this.data.slice(i * cols, (i + 1) * cols));
        }
        
        return new Matrix(matrixData, rows, cols);
    }
}