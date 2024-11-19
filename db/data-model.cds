namespace material.db;

using {
    cuid,
    managed,
    temporal
} from '@sap/cds/common';


entity MaterialMaster {
    key MaterialNumber  : String(100);
        Description     : String(100);
        IndustrySector  : String(40);
        MaterialType    : String(40);
        Plant           : String(40);
        StorageLocation : String(40);
        UOM             : String(10);
        MaterialGroup   : String(30)
}

entity IndustrySectorF4 : cuid {
    IndustrySectorKey        : String(1);
    IndustrySectorDescrption : String(40)
}

entity PlantF4 : cuid {
    PlantKey         : String(10);
    PlantDescription : String(40)
}

entity StorageLocationF4 : cuid {
    StorageLocKey         : String(10);
    StorageLocDescription : String(40)
}

entity MaterialGroupF4 : cuid {
    MaterialGroupKey         : String(10);
    MaterialGroupDescription : String(40)
}

entity AuthUser : cuid {
    UserName : String(40);
    Password : String(40)
}
