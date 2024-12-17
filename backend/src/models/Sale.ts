// src/models/Sale.ts
import mongoose from 'mongoose';

export interface ISale {
    product: string;
    quantity: number;
    salePrice: number;
    unitCost: number;
    margin: number;
    date: Date;
    client: string;
    paymentMethod: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
    notes?: string;
}

const SaleSchema = new mongoose.Schema<ISale>({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    salePrice: {
        type: Number,
        required: true,
        min: 0
    },
    unitCost: {
        type: Number,
        required: true,
        min: 0
    },
    margin: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    client: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'card', 'transfert']
    },
    status: {
        type: String,
        required: true,
        enum: ['Completed', 'Pending', 'Cancelled'],
        default: 'Pending'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

export const Sale = mongoose.model<ISale>('sales', SaleSchema);
