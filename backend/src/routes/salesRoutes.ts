// src/routes/salesRoutes.ts
import express from 'express';
import { SalesService } from '../services/salesService';

export const salesRouter = express.Router();

// Route pour créer une nouvelle vente
salesRouter.post('/sales', async (req, res) => {
    try {
        const saleData = {
            ...req.body,
            status: req.body.paymentStatus ?
                req.body.paymentStatus.charAt(0).toUpperCase() + req.body.paymentStatus.slice(1) :
                'Pending',
            paymentMethod: req.body.paymentMethod || 'cash'
        };

        const sale = await SalesService.createSale(saleData);
        console.log(sale);

        res.status(201).json(sale);
    } catch (error) {
        console.error('Error creating sale:', error);
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Erreur lors de la création de la vente' });
        }
    }
});

// Route pour récupérer toutes les ventes
salesRouter.get('/sales', async (req, res) => {
    try {
        const sales = await SalesService.getAllSales();

        // Transform sales to match frontend expectations
        const transformedSales = sales.map(sale => ({
            ...sale.toObject(),
            paymentStatus: sale.status.toLowerCase(),
            paymentMethod: sale.paymentMethod.toLowerCase()
        }));

        res.json(transformedSales);
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des ventes' });
    }
});

// ... rest of the routes remain the same

//delete
salesRouter.delete('/sales/:id', async (req, res) => {
    try {
        const saleId = req.params.id;
        await SalesService.deleteSale(saleId);
        res.status(200).send({ message: 'Vente supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la vente' });
    }
});


// Route pour mettre à jour une vente
salesRouter.put('/sales/:id', async (req, res) => {
    try {
        const updatedSale = await SalesService.updateSale(req.params.id, req.body);
        res.json(updatedSale);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Erreur lors de la mise à jour de la vente' });
        }
    }
});

// Route pour récupérer les analyses des ventes
salesRouter.get('/sales/analytics', async (req, res) => {
    try {
        const analytics = await SalesService.getSaleAnalytics();
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des analyses' });
    }
});