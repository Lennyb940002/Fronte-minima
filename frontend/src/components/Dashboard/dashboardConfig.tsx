import { ImagePath } from './imageImports';

export interface DashboardSection {
    title: string;
    imageBlanc: string;
    imageNoir: string;
    path: string;
}

export const DASHBOARD_SECTIONS: DashboardSection[] = [
    {
        title: 'Vente',
        imageBlanc: ImagePath.VenteImageBlanc,
        imageNoir: ImagePath.VenteImageNoir,
        path: '/e-commerce/ventes'
    },
    {
        title: 'Stock',
        imageBlanc: ImagePath.StockImageBlanc,
        imageNoir: ImagePath.StockImageNoir,
        path: '/e-commerce/stock'
    },
    {
        title: 'Comptabilité',
        imageBlanc: ImagePath.ComptabiliteImageBlanc,
        imageNoir: ImagePath.ComptabiliteImageNoir,
        path: '/e-commerce/comptabilite'
    },
    {
        title: 'Déclaration',
        imageBlanc: ImagePath.DeclarationImageBlanc,
        imageNoir: ImagePath.DeclarationImageNoir,
        path: '/e-commerce/decla'
    },
    {
        title: 'Création Produit',
        imageBlanc: ImagePath.CreationProduitImageBlanc,
        imageNoir: ImagePath.CreationProduitImageNoir,
        path: '/e-commerce/product'
    },
    {
        title: 'Marketing',
        imageBlanc: ImagePath.MarketingImageBlanc,
        imageNoir: ImagePath.MarketingImageNoir,
        path: '/e-commerce/marketing'
    }
];