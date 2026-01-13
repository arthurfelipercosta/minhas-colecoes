export interface Carro {
    id: string;                 // Gerado automaticamente
    brand: string;              // Ex: Hot Wheels
    marca: string;              // Ex: McLaren
    modelo: string;             // Ex: P1
    code?: string;              // EX: DHX19
    year?: number;              // Ex: 2016 (250)
    numberYear?: string;        // Ex: 71 (71/250)
    serieName?: string;         // Ex: HW Exotics
    numberSerie?: string        // Ex: 1
    totalSerie?: string;        // Ex: 5
    country?: string;           // Ex: Inglaterra
    color: string;              // Ex: Amarelo
    colorDescription?: string;  // Ex: Metalflake Yellow

    // Checkboxes
    isNewModel: boolean;
    isCustom: boolean;
    rarity: 'normal' | 'regular' | 'super';
    hasRubberTires: boolean;
    isForSale: boolean;

    // Preços
    buyPrice?: number;
    sellPrice?: number;

    // Media
    imageUri?: string;
    dataCadastro: number;
}