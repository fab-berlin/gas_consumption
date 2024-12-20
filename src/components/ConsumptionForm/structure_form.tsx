const formStructure = [
  {
    name: 'kilometers',
    label: 'Gesamtkilometer',
    type: 'number',
    error: 'Bitte die Gesamtkilometer eingeben',
    width: 'full',
  },
  {
    name: 'dayKilometers',
    label: 'Tageskkilometer',
    type: 'number',
    error: 'Bitte die Tageskilometer eingeben',
    width: 'full',
  },
  {
    name: 'litres',
    label: 'getankte Menge',
    type: 'number',
    error: 'Bitte die getankten Liter eingeben',
    width: 'half',
  },
  {
    name: 'price',
    label: 'Benzinpreis',
    type: 'number',
    error: 'Bitte den Benzinpreis eingeben',
    width: 'half',
  },
];

export default formStructure;
