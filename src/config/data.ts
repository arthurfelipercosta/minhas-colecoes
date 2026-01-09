// src\config\data.ts

export interface ListItem {
    label: string;
    value: string;
    image?: any;
}

export const MARCAS: ListItem[] = [
    { label: 'Greenlight', value: 'greenlight', image: require('@/assets/brands/greenlight.png') },
    { label: 'Hot Wheels', value: 'hot-wheels', image: require('@/assets/brands/hot-wheels.png') },
    { label: 'Jada', value: 'jada', image: require('@/assets/brands/jada.png') },
    { label: 'Johnny Lightning', value: 'johnny-lightning', image: require('@/assets/brands/johnny-lightning.png') },
    { label: 'Kyosho', value: 'kyosho', image: require('@/assets/brands/kyosho.png') },
    { label: 'Maisto', value: 'maisto', image: require('@/assets/brands/maisto.png') },
    { label: 'M2 Machines', value: 'm2-machines', image: require('@/assets/brands/m2-machines.png') },
    { label: 'Matchbox', value: 'matchbox', image: require('@/assets/brands/matchbox.png') },
];

export const RARIDADES: ListItem[] = [
    { label: 'Super', value: 'STH', image: require('@/assets/rarity/RTH.png') },
    { label: 'Regular', value: 'RTH', image: require('@/assets/rarity/STH.png') },
    { label: 'Normal', value: 'normal', image: require('@/assets/rarity/normal.png') },
]

export const FABRICANTES: ListItem[] = [
    { label: 'Alfa Romeo', value: 'alfaromeo', image: require('@/assets/manufacturers/alfaromeo.png') },
    { label: 'Aston Martin', value: 'astonmartin', image: require('@/assets/manufacturers/astonmartin.png') },
    { label: 'Audi', value: 'audi', image: require('@/assets/manufacturers/audi.png') },
    { label: 'Bentley', value: 'bentley', image: require('@/assets/manufacturers/bentley.png') },
    { label: 'BMW', value: 'bmw', image: require('@/assets/manufacturers/bmw.png') },
    { label: 'Bugatti', value: 'bugatti', image: require('@/assets/manufacturers/bugatti.png') },
    { label: 'Buick', value: 'buick', image: require('@/assets/manufacturers/buick.png') },
    { label: 'Chevrolet', value: 'chevrolet', image: require('@/assets/manufacturers/chevrolet.png') },
    { label: 'Chrysler', value: 'chrysler', image: require('@/assets/manufacturers/chrysler.png') },
    { label: 'Corvette', value: 'corvette', image: require('@/assets/manufacturers/corvette.png') },
    { label: 'Dodge', value: 'dodge', image: require('@/assets/manufacturers/dodge.png') },
    { label: 'Ferrari', value: 'ferrari', image: require('@/assets/manufacturers/ferrari.png') },
    { label: 'Fiat', value: 'fiat', image: require('@/assets/manufacturers/fiat.png') },
    { label: 'Ford', value: 'ford', image: require('@/assets/manufacturers/ford.png') },
    { label: 'Honda', value: 'honda', image: require('@/assets/manufacturers/honda.png') },
    { label: 'Hummer', value: 'hummer', image: require('@/assets/manufacturers/hummer.png') },
    { label: 'Infiniti', value: 'infiniti', image: require('@/assets/manufacturers/infiniti.png') },
    { label: 'Jaguar', value: 'jaguar', image: require('@/assets/manufacturers/jaguar.png') },
    { label: 'Kia', value: 'kia', image: require('@/assets/manufacturers/kia.png') },
    { label: 'Koenigsegg', value: 'koenigsegg', image: require('@/assets/manufacturers/koenigsegg.png') },
    { label: 'Lamborghini', value: 'lamborghini', image: require('@/assets/manufacturers/lamborghini.png') },
    { label: 'Lancia', value: 'lancia', image: require('@/assets/manufacturers/lancia.png') },
    { label: 'Land Rover', value: 'landrover', image: require('@/assets/manufacturers/landrover.png') },
    { label: 'Lexus', value: 'lexus', image: require('@/assets/manufacturers/lexus.png') },
    { label: 'Lincoln', value: 'lincoln', image: require('@/assets/manufacturers/lincoln.png') },
    { label: 'Lotus', value: 'lotus', image: require('@/assets/manufacturers/lotus.png') },
    { label: 'Maserati', value: 'maserati', image: require('@/assets/manufacturers/maserati.png') },
    { label: 'Mazda', value: 'mazda', image: require('@/assets/manufacturers/mazda.png') },
    { label: 'McLaren', value: 'mclaren', image: require('@/assets/manufacturers/mclaren.png') },
    { label: 'Mercedes-Benz', value: 'mercedes', image: require('@/assets/manufacturers/mercedes.png') },
    { label: 'Mini', value: 'mini', image: require('@/assets/manufacturers/mini.png') },
    { label: 'Mitsubishi', value: 'mitsubishi', image: require('@/assets/manufacturers/mitsubishi.png') },
    { label: 'Nissan', value: 'nissan', image: require('@/assets/manufacturers/nissan.png') },
    { label: 'Pagani', value: 'pagani', image: require('@/assets/manufacturers/pagani.png') },
    { label: 'Peugeot', value: 'peugeot', image: require('@/assets/manufacturers/peugeot.png') },
    { label: 'Pontiac', value: 'pontiac', image: require('@/assets/manufacturers/pontiac.png') },
    { label: 'Porsche', value: 'porsche', image: require('@/assets/manufacturers/porsche.png') },
    { label: 'Renault', value: 'renault', image: require('@/assets/manufacturers/renault.png') },
    { label: 'Rimac', value: 'rimac', image: require('@/assets/manufacturers/rimac.png') },
    { label: 'Saleen', value: 'saleen', image: require('@/assets/manufacturers/saleen.png') },
    { label: 'Subaru', value: 'subaru', image: require('@/assets/manufacturers/subaru.png') },
    { label: 'Tesla', value: 'tesla', image: require('@/assets/manufacturers/tesla.png') },
    { label: 'Toyota', value: 'toyota', image: require('@/assets/manufacturers/toyota.png') },
    { label: 'Volkswagen', value: 'volkswagen', image: require('@/assets/manufacturers/volkswagen.png') },
    { label: 'Nenhum', value: 'none', image: require('@/assets/manufacturers/none.png') },
];

export const PAISES: ListItem[] = [
    { label: 'Argentina', value: 'argentina', image: require('@/assets/flags/argentina.png') },
    { label: 'Austrália', value: 'australia', image: require('@/assets/flags/australia.png') },
    { label: 'Áustria', value: 'austria', image: require('@/assets/flags/austria.png') },
    { label: 'Brasil', value: 'brazil', image: require('@/assets/flags/brazil.png') },
    { label: 'Canadá', value: 'canada', image: require('@/assets/flags/canada.png') },
    { label: 'China', value: 'china', image: require('@/assets/flags/china.png') },
    { label: 'Croácia', value: 'croatia', image: require('@/assets/flags/croatia.png') },
    { label: 'República Tcheca', value: 'czech_republic', image: require('@/assets/flags/czech_republic.png') },
    { label: 'Inglaterra', value: 'england', image: require('@/assets/flags/england.png') },
    { label: 'França', value: 'france', image: require('@/assets/flags/france.png') },
    { label: 'Alemanha', value: 'germany', image: require('@/assets/flags/germany.png') },
    { label: 'Itália', value: 'italy', image: require('@/assets/flags/italy.png') },
    { label: 'Japão', value: 'japan', image: require('@/assets/flags/japan.png') },
    { label: 'México', value: 'mexico', image: require('@/assets/flags/mexico.png') },
    { label: 'Coreia do Sul', value: 'south_korea', image: require('@/assets/flags/south_korea.png') },
    { label: 'Espanha', value: 'spain', image: require('@/assets/flags/spain.png') },
    { label: 'Suécia', value: 'sweden', image: require('@/assets/flags/sweden.png') },
    { label: 'Emirados Árabes', value: 'united_arab_emirates', image: require('@/assets/flags/united_arab_emirates.png') },
    { label: 'Reino Unido', value: 'united_kingdom', image: require('@/assets/flags/united_kingdom.png') },
    { label: 'Estados Unidos', value: 'united_states', image: require('@/assets/flags/united_states.png') },
    { label: 'Nenhum', value: 'none', image: require('@/assets/flags/none.png') },
];

export const COLECOES: ListItem[] = [
    { label: 'Factory Fresh', value: 'factoryfresh', image: require('@/assets/collections/factoryfresh.png') },
    { label: 'Green Speed', value: 'greenspeed', image: require('@/assets/collections/greenspeed.png') },
    { label: 'J-Imports', value: 'j-imports', image: require('@/assets/collections/j-imports.png') },
    { label: 'Muscle Mania', value: 'musclemania', image: require('@/assets/collections/musclemania.png') },
    { label: 'Nightburnerz', value: 'nightburnerz', image: require('@/assets/collections/nightburnerz.png') },
    { label: 'Screen Time', value: 'screentime', image: require('@/assets/collections/screentime.png') },
    { label: 'Speed Graphics', value: 'speedgraphics', image: require('@/assets/collections/speedgraphics.png') },
    { label: 'Then and Now', value: 'thenandnow', image: require('@/assets/collections/thenandnow.png') },
];

export const SERIES: ListItem[] = [
    { label: 'Boulevard', value: 'boulevard', image: require('@/assets/series/boulevard.png') },
    { label: 'Car Culture', value: 'car-culture', image: require('@/assets/series/car-culture.png') },
    { label: 'Elite 64', value: 'elite64', image: require('@/assets/series/elite64.png') },
    { label: 'Fast Foodie', value: 'fast-foodie', image: require('@/assets/series/fast-foodie.png') },
    { label: 'Mainline', value: 'mainline', image: require('@/assets/series/mainline.png') },
    { label: 'Nightburnerz', value: 'nightburnerz', image: require('@/assets/series/nightburnerz.png') },
    { label: 'Pop Culture', value: 'pop-culture', image: require('@/assets/series/pop-culture.png') },
    { label: 'Premium', value: 'premium', image: require('@/assets/series/premium.png') },
    { label: 'RLC', value: 'rlc', image: require('@/assets/series/rlc.png') },
    { label: 'Silver', value: 'silver', image: require('@/assets/series/silver.png') },
];