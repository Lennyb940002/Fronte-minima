// src/services/salesService.ts
import { Sale, ISale } from '../models/Sale';
import mongoose from 'mongoose';

export class SalesService {
    private static async connectToDatabase() {
        const connectionString = 'mongodb+srv://admin:6JH9NaYBieSNZcge@cluster0.rhy72.mongodb.net/Minima';
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(connectionString);
        }
    }

    static async createSale(saleData: ISale) {
        await this.connectToDatabase();

        // Calculer la marge
        saleData.margin = (saleData.salePrice - (saleData.unitCost * saleData.quantity));

        const sale = new Sale(saleData);
        return await sale.save();
    }

    static async getAllSales() {
        await this.connectToDatabase();
        return await Sale.find().sort({ date: -1 });
    }

    static async deleteSale(saleId: string) {
        await this.connectToDatabase();
        return await Sale.findByIdAndDelete(saleId);
    }

    static async updateSale(saleId: string, updateData: Partial<ISale>) {
        await this.connectToDatabase();

        if (updateData.unitCost && updateData.salePrice && updateData.quantity) {
            updateData.margin = (updateData.salePrice - (updateData.unitCost * updateData.quantity));
        }

        return await Sale.findByIdAndUpdate(saleId, updateData, { new: true });
    }

    static async getSaleAnalytics() {
        await this.connectToDatabase();

        const totalSales = await Sale.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$salePrice' },
                    totalQuantity: { $sum: '$quantity' },
                    totalMargin: { $sum: '$margin' },
                    totalSales: { $sum: 1 }
                }
            }
        ]);

        const monthlySales = await Sale.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    monthlyRevenue: { $sum: '$salePrice' },
                    monthlyQuantity: { $sum: '$quantity' },
                    monthlySales: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        return {
            totalSales: totalSales[0] || {},
            monthlySales
        };
    }
}