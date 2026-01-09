export interface Carro {
    id: string;                 // Gerado automaticamente
    marca: string;              // Ex: McLaren
    modelo: string;             // Ex: P1
    code?: string;              // EX: DHX19
    year?: number;              // Ex: 2016 (250)
    numberSerie?: string;       // Ex: 71 (71/250)
    serieName?: string;         // Ex: HW Exotics
    country?: string;           // Ex: Inglaterra
    color: string;              // Ex: Amarelo
    colorDescription?: string;  // Ex: Metalflake Yellow
    brand: string;              // Ex: Hot Wheels

    // Checkboxes
    isNewModel: boolean;
    isCustom: boolean;
    hasRubberTires: boolean;
    isForSale: boolean;

    // Preços
    buyPrice?: number;
    sellPrice?: number;

    // Media
    imageUri?: string;
    dataCadastro: number;
}