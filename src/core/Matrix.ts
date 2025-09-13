import { Scalar, MatrixData } from './types';
import { Vector } from './Vector';

export class Matrix<K = Scalar> {
    public readonly data: K[][];
    public readonly rows: number;
    public readonly cols: number;

    constructor(data: K[][], rows?: number, cols?: number) {
        this.data = data.map(row => [...row]);
        this.rows = rows || data.length;
        this.cols = cols || (data.length > 0 ? data[0].length : 0);
    }

    shape(): [number, number] {
        return [this.rows, this.cols];
    }

    isSquare(): boolean {
        return this.rows === this.cols;
    }

    print(): void {
        console.log('Matrix:');
        this.data.forEach(row => console.log('  ' + row.join(', ')));
    }

    toVector(): Vector<K> {
        const flatData: K[] = [];
        this.data.forEach(row => flatData.push(...row));
        return new Vector(flatData);
    }

    reshape(newRows: number, newCols: number): Matrix<K> {
        const totalElements = this.rows * this.cols;
        if (totalElements !== newRows * newCols) {
            throw new Error('Cannot reshape matrix - total elements count mismatch');
        }
        
        const flatData = this.toVector().data;
        const newData: K[][] = [];
        
        for (let i = 0; i < newRows; i++) {
            newData.push(flatData.slice(i * newCols, (i + 1) * newCols));
        }
        
        return new Matrix(newData, newRows, newCols);
    }

    static fromVector<K = Scalar>(vector: Vector<K>, rows: number, cols: number): Matrix<K> {
        return vector.toMatrix(rows, cols);
    }
}