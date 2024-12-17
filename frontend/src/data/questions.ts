import { Question } from '../types/questions';

export const questions: Question[] = [
  {
    id: 'status',
    text: 'Votre statut juridique est-il Autoentrepreneur ou Microentreprise ?',
    options: [
      { value: 'yes', label: 'Oui' },
      { value: 'no', label: 'Non' },
    ],
  },
  {
    id: 'experience',
    text: 'Depuis combien de temps exercez-vous votre activité ?',
    options: [
      { value: 'less-1', label: "Moins d'1 an" },
      { value: '1-3', label: '1 à 3 ans' },
      { value: '3-5', label: '3 à 5 ans' },
      { value: 'more-5', label: 'Plus de 5 ans' },
    ],
  },
  {
    id: 'employees',
    text: "Combien d'employés comptez-vous dans votre entreprise ?",
    options: [
      { value: '0-1', label: '0-1' },
      { value: '2-5', label: '2-5' },
      { value: '6-10', label: '6-10' },
      { value: 'more-10', label: 'Plus de 10' },
    ],
  },
  {
    id: 'tax',
    text: "Quel est votre régime d'imposition ?",
    options: [
      { value: '12.3', label: '12,3%' },
      { value: '21', label: '21%' },
      { value: '21.2', label: '21,2%' },
      { value: '6', label: '6%' },
    ],
  },
  {
    id: 'sector',
    text: "Dans quel secteur d'activité exercez-vous ?",
    options: [
      { value: 'retail', label: 'Achat/revente de marchandises' },
      {
        value: 'services-commercial',
        label: 'Prestation de services commerciales et artisanales',
      },
      {
        value: 'services-liberal',
        label: 'Prestation de services (libérales ou non)',
      },
      {
        value: 'rental',
        label: "Location de locaux d'habitation meublés de tourisme classés",
      },
    ],
  },
  {
    id: 'revenue',
    text: "Quelle est votre tranche de chiffre d'affaires annuel ?",
    options: [
      { value: 'less-33200', label: 'Moins de 33 200 €' },
      { value: '33200-72500', label: 'Entre 33 200 € et 72 500 €' },
      { value: '72500-176200', label: 'Entre 72 500 € et 176 200 €' },
      { value: 'more-176200', label: 'Plus de 176 200 €' },
    ],
  },
  {
    id: 'accounting',
    text: 'Comment gérez-vous votre comptabilité actuellement ?',
    options: [
      { value: 'expert', label: 'Avec un expert-comptable' },
      { value: 'software', label: 'Avec un logiciel comptable' },
      { value: 'spreadsheet', label: 'Avec un tableur (Excel ou équivalent)' },
      { value: 'none', label: 'Aucune solution pour le moment' },
    ],
  },
  {
    id: 'goal',
    text: 'Quel est votre objectif principal pour les 12 prochains mois ?',
    options: [
      { value: 'increase-revenue', label: "Augmenter le chiffre d'affaires" },
      { value: 'optimize-costs', label: 'Optimiser les coûts' },
      { value: 'develop-team', label: "Développer l'équipe" },
      { value: 'digitalize', label: "Digitaliser l'activité" },
    ],
  },
];
